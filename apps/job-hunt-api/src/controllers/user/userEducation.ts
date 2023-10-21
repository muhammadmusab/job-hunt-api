import { UserEducation } from '../../models/UserEducation';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { User } from '../../models/User';

export const createUserEducation = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { degree, startDate, endDate, fieldOfStudy, grade, instituteName } = req.body;

    const user = await User.scope('withId').findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
      attributes: ['id'],
    });
    let userEducation = null;
    if (user) {
      userEducation = await UserEducation.create({
        UserId: user?.id as number,
        degree,
        startDate,
        endDate,
        fieldOfStudy,
        grade,
        instituteName,
      });
    }

    res.status(201).send({ message: 'Success', data: userEducation });
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

    const result = await UserEducation.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    if (!result) {
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
    const result = await UserEducation.destroy({
      where: {
        uuid: uid,
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
    const user = await User.scope('withId').findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
      attributes: ['id'],
    });

    const userEducation = await UserEducation.findAll({
      where: {
        UserId: user?.id as number,
      },
    });

    res.status(201).send({ message: 'Success', data: userEducation });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
