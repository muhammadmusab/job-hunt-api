import { UserEducation } from '../../models/UserEducation';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { User } from '../../models/User';

export const createUserEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { degree, startDate, endDate, fieldOfStudy, grade, instituteName } = req.body;

    const { user } = await getUserId(req.user.User?.uuid as string);

    let userEducation = null;

    userEducation = await UserEducation.create({
      UserId: user?.id as number,
      degree,
      startDate,
      endDate,
      fieldOfStudy,
      grade,
      instituteName,
    });

    let { data } = getData(userEducation);

    res.status(201).send({ message: 'Success', data });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const updateUserEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = [
      'degree',
      'fieldOfStudy',
      'grade',
      'startDate',
      'endDate',
      'instituteName',
    ];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;
    const { user } = await getUserId(req.user.User?.uuid as string);

    const result = await UserEducation.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
          UserId: user?.id,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the user education data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteUserEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const { user } = await getUserId(req.user.User?.uuid as string);
    const result = await UserEducation.destroy({
      where: {
        uuid: uid,
        UserId: user?.id,
      },
    });
    if (result === 1) {
      res.status(201).send({ message: 'Success' });
    } else {
      const err = new BadRequestError('Bad Request');
      res.status(err.status).send({ message: err.message });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const listUserEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = await getUserId(req.user.User?.uuid as string);

    const userEducation = await UserEducation.findAll({
      where: {
        UserId: user?.id as number,
      },
      attributes: {
        exclude: ['UserId'],
      },
      include: [
        {
          model: User,
        },
      ],
    });

    res.status(201).send({ message: 'Success', data: userEducation });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getUserId = async (uuid: string) => {
  const user = await User.scope('withId').findOne({
    where: {
      uuid,
    },
    attributes: ['id'],
  });
  return { user };
};

const getData = (instance: any) => {
  delete instance.dataValues.id;
  delete instance.dataValues.UserId;
  return { data: instance };
};
