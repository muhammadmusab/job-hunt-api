import { UserCertification } from '../../models/UserCertification';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { User } from '../../models/User';

export const createUserCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      certificate,
      certificationName,
      isExpirationDate,
      location,
      publishedBy,
      startDate,
      endDate,
    } = req.body;

    const user = await User.scope('withId').findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
      attributes: ['id'],
    });
    let userCertification = null;
    if (user) {
      userCertification = await UserCertification.create({
        UserId: user?.id as number,
        certificate,
        certificationName,
        isExpirationDate,
        location,
        publishedBy,
        startDate,
        endDate,
      });
    }

    res.status(201).send({ message: 'Success', data: userCertification });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const updateUserCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = [
      'certificate',
      'certificationName',
      'isExpirationDate',
      'location',
      'publishedBy',
      'startDate',
      'endDate',
    ];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    const result = await UserCertification.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    if (!result) {
      const err = new BadRequestError('Could not update the user certification data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteUserCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const result = await UserCertification.destroy({
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
export const listUserCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.scope('withId').findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
      attributes: ['id'],
    });

    const userCertification = await UserCertification.findAll({
      where: {
        UserId: user?.id as number,
      },
    });

    res.status(201).send({ message: 'Success', data: userCertification });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
