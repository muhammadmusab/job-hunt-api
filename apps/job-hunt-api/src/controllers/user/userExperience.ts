import { UserExperience } from '../../models/UserExperience';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { User } from '../../models/User';

export const createUserExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyName, employmentType, location, startDate, endDate, activeJob, workTitle } =
      req.body;

    let userExperience = null;

    const { user } = await getUserId(req.user.User?.uuid as string);

    userExperience = await UserExperience.create({
      companyName,
      employmentType,
      location,
      startDate,
      endDate: endDate ? endDate : null,
      activeJob,
      UserId: user?.id as number,
      workTitle,
    });

    let { data } = getData(userExperience);

    res.status(201).send({ message: 'Success', data });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const updateUserExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = [
      'companyName',
      'employmentType',
      'location',
      'startDate',
      'endDate',
      'activeJob',
      'workTitle',
    ];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    const { user } = await getUserId(req.user.User?.uuid as string);

    const result = await UserExperience.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
          UserId: user?.id,
        },
      },
    );
    if (!result[0]) {
      const err = new BadRequestError('Could not update the user experience data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteUserExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;

    const { user } = await getUserId(req.user.User?.uuid as string);

    let result = await UserExperience.destroy({
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
export const listUserExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = await getUserId(req.user.User?.uuid as string);

    const userExperiences = await UserExperience.findAll({
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

    res.status(201).send({ message: 'Success', data: userExperiences });
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
