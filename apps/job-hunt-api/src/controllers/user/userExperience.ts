import { UserExperience } from '../../models/UserExperience';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { User } from '../../models/User';

export const createUserExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { companyName, employmentType, location, startDate, endDate, activeJob, workTitle } =
      req.body;
    const user = await User.scope('withId').findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
      attributes: ['id'],
    });
    let userExperience = null;
    if (user) {
      userExperience = await UserExperience.create({
        companyName,
        employmentType,
        location,
        startDate,
        endDate,
        activeJob,
        UserId: user?.id as number,
        workTitle,
      });
    }

    res.status(201).send({ message: 'Success', data: userExperience });
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

    const result = await UserExperience.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    if (!result) {
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
    const result = await UserExperience.destroy({
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
export const listUserExperience = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.body;

    const user = await User.scope('withId').findOne({
      where: {
        uuid: uid,
      },
      attributes: ['id'],
    });

    const userExperiences = await UserExperience.findAll({
      where: {
        UserId: user?.id as number,
      },
    });

    res.status(201).send({ message: 'Success', data: userExperiences });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
