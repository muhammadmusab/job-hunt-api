import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { User } from '../../models/User';
import { UserCertification } from '../../models/UserCertification';
import { UserEducation } from '../../models/UserEducation';
import { UserExperience } from '../../models/UserExperience';
import { UserSkill } from '../../models/UserSkill';
import { Address } from '../../models/Address';
import {
  identityType,
  Gender,
  employmentTypes,
  socialplatformType,
  contactType,
  UserType,
} from '../../types/model-types';

export const Get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
      include: [
        {
          model: UserCertification,
        },
        {
          model: UserEducation,
        },
        {
          model: UserExperience,
        },
        {
          model: UserSkill,
        },
        {
          model: Address,
          where: {
            UserId: req.user.User?.id,
          },
        },
      ],
    });

    res.send({ message: 'Success', data: user });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = [
      'description',
      'headline',
      'portfolioUrl',
      'gender' as Gender,
      'dateOfBirth',
      'identityType' as identityType,
      'identity',
    ];
    const validBody = getValidUpdates(validUpdates, req.body);
    const result = await User.update(
      { ...validBody },

      {
        where: {
          uuid: req.user.User?.uuid,
        },
      },
    );
    if (!result[0]) {
      const err = new BadRequestError('Could not update the user data');
      res.status(err.status).send({ message: err.message });
      return;
    }

    let user = await User.findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
      include: [
        {
          model: UserCertification,
        },
        {
          model: UserEducation,
        },
        {
          model: UserExperience,
        },
        {
          model: UserSkill,
        },
        {
          model: Address,
          where: {
            UserId: req.user.User?.id,
          },
        },
      ],
    });

    res.send({ message: 'Success', data: user });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.destroy({
      where: {
        uuid: req.user.User?.uuid,
      },
    });
    if (user === 1) {
      res.send({ message: 'Success' });
    } else {
      const err = new BadRequestError('Bad Request');
      res.status(err.status).send({ message: err.message });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};