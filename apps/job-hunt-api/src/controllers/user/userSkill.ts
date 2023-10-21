import { UserSkill } from '../../models/UserSkill';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { User } from '../../models/User';

export const createUserSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skill } = req.body;

    const user = await User.scope('withId').findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
      attributes: ['id'],
    });
    let userSkill = null;

    userSkill = await UserSkill.findOne({
      where: {
        uuid: req.user.User?.uuid,
        skill,
      },
    });
    if (userSkill) {
      const err = new BadRequestError('Skill already exist');
      res.status(err.status).send({ message: err.message });
      return;
    }
    if (user) {
      userSkill = await UserSkill.create({
        UserId: user?.id as number,
        skill,
      });
    }

    res.status(201).send({ message: 'Success', data: userSkill });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const updateUserSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['skill'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    const result = await UserSkill.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    if (!result) {
      const err = new BadRequestError('Could not update the user skill data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteUserSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const result = await UserSkill.destroy({
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
export const listUserSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.scope('withId').findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
      attributes: ['id'],
    });

    const userSkills = await UserSkill.findAll({
      where: {
        UserId: user?.id as number,
      },
    });

    res.status(201).send({ message: 'Success', data: userSkills });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
