import { UserSkill } from '../../models/UserSkill';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { User } from '../../models/User';
import { getPaginated } from '../../utils/paginate';

export const createUserSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { skill } = req.body;

    const { user } = await getUserId(req.user.User?.uuid as string);

    let userSkill = null;

    userSkill = await UserSkill.findOne({
      where: {
        UserId: user?.id,
        skill,
      },
    });
    if (userSkill) {
      const err = new BadRequestError('Skill already exist');
      res.status(err.status).send({ message: err.message });
      return;
    }

    userSkill = await UserSkill.create({
      UserId: user?.id as number,
      skill,
    });

    let { data } = getData(userSkill);

    res.status(201).send({ message: 'Success', data });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error });
  }
};

export const updateUserSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['skill'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;
    const { user } = await getUserId(req.user.User?.uuid as string);

    let userSkill = await UserSkill.findOne({
      where: {
        UserId: user?.id,
        skill: validBody.skill,
      },
    });
    if (userSkill) {
      const err = new BadRequestError('Skill already exist');
      res.status(err.status).send({ message: err.message });
      return;
    }
    const result = await UserSkill.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
          UserId: user?.id,
        },
      },
    );

    if (!result[0]) {
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
    const { user } = await getUserId(req.user.User?.uuid as string);
    const result = await UserSkill.destroy({
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
export const listUserSkill = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user } = await getUserId(req.user.User?.uuid as string);
    const { limit, offset } = getPaginated(req.query);
    const { count: total, rows: userSkills } = await UserSkill.findAndCountAll({
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
      offset: offset,
      limit: limit,
    });

    res.status(201).send({ message: 'Success', data: userSkills,total });
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
