import { UserCertification } from '../../models/UserCertification';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { User } from '../../models/User';
import { getPaginated } from '../../utils/paginate';

export const createUserCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { certificationName, isExpirationDate, location, publishedBy, startDate, endDate } =
      req.body;

    let userCertification = null;
    let certificate: any = null;
    let file = [];
    if (req.files && req.files?.length) {
      let files = req.files as any;
      file = files[0];
      certificate = `${process.env.API_URL}media/${file.filename}`;
    }

    const { user } = await getUserId(req.user.User?.uuid as string);

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

    let { data } = getData(userCertification);

    res.status(201).send({ message: 'Success', data });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const updateUserCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = [
      'certificationName',
      'isExpirationDate',
      'location',
      'publishedBy',
      'startDate',
      'endDate',
    ];
    const validBody = getValidUpdates(validUpdates, req.body);
    let file = [];

    if (req.files && req.files?.length) {
      let files = req.files as any;
      file = files[0];
      validBody['certificate'] = `${process.env.API_URL}media/${file.filename}`;
    }

    const { uid } = req.params;

    const { user } = await getUserId(req.user.User?.uuid as string);

    const result = await UserCertification.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
          UserId: user?.id,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the user certification data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteUserCertification = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const { user } = await getUserId(req.user.User?.uuid as string);
    const result = await UserCertification.destroy({
      where: {
        uuid: uid,
        UserId: user?.id,
      },
    });
    if (result === 1) {
      res.send({ message: 'Success' });
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
    const { user } = await getUserId(req.user.User?.uuid as string);
    const { limit, offset } = getPaginated(req.query);
    // sortBy
    const sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    const sortAs = req.query.sortAs ? (req.query.sortAs as string) : 'DESC';
    const { count: total, rows: userCertification } = await UserCertification.findAndCountAll({
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
      order: [[sortBy as string, sortAs]],
    });

    res.send({ message: 'Success', data: userCertification, total });
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
