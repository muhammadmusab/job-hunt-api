import { Address } from '../models/Address';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../utils/api-errors';
import { getValidUpdates } from '../utils/validate-updates';
import { User } from '../models/User';
import { Company } from '../models/Company';
import { UserType } from '../types/model-types';

export const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city, country, state, streetAddress, zipCode } = req.body;

    let address = null;
    let user = null;
    let company = null;

    if (req.user.type === UserType.USER) user = await getUserId(req.user.User?.uuid as string);
    else company = await getCompanyId(req.user.Company?.uuid as string);
    console.log('running', req.user);
    let body = {
      UserId: null,
      CompanyId: null,
      city,
      country,
      state,
      streetAddress,
      zipCode,
    } as any;

    if (user && user?.id) {
      body.UserId = user?.id;
      delete body.CompanyId;
    } else if (company && company.id) {
      body.CompanyId = company?.id;
      delete body.UserId;
    }

    address = await Address.create(body);
    const { data } = getData(address);
    res.status(201).send({ message: 'Success', data });
  } catch (error: any) {
    console.log(error.message);
    res.status(500).send({ message: error });
  }
};
export const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['city', 'country', 'state', 'streetAddress', 'zipCode'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    let user = null;
    let idType = 'CompanyId';

    if (req.user.type === UserType.COMPANY) {
      user = await getCompanyId(req.user.Company?.uuid as string);
    } else {
      user = await getUserId(req.user.User?.uuid as string);
      idType = 'UserId';
    }
    const result = await Address.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
          [idType]: user?.id,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the address data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    let user = null;
    let idType = 'CompanyId';
    if (req.user.type === UserType.COMPANY) {
      user = await getCompanyId(req.user.Company?.uuid as string);
    } else {
      user = await getUserId(req.user.User?.uuid as string);
      idType = 'UserId';
    }
    const result = await Address.destroy({
      where: {
        uuid: uid,
        [idType]: user?.id,
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
export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = null;

    let idType = null;
    let addresses = null;
    let model = null;

    if (req.user.type === UserType.USER) {
      user = await getUserId(req.user.User?.uuid as string);
      idType = 'UserId';
      model = User;
    } else {
      user = await  getCompanyId(req.user.Company?.uuid as string);
      idType = 'CompanyId';
      model = Company;
    }

    addresses = await Address.findAll({
      where: {
        [idType]: user?.id,
      },
      attributes: {
        exclude: ['UserId', 'CompanyId'],
      },
      include: [
        {
          model,
        },
      ],
      limit: 5,
      order:[['createdAt','DESC']]
    });

    res.status(201).send({ message: 'Success', data: addresses });
  } catch (error: any) {
    console.log(error.message);
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
  return user;
};
const getCompanyId = async (uuid: string) => {
  const company = await Company.scope('withId').findOne({
    where: {
      uuid,
    },
    attributes: ['id'],
  });
  return company;
};

const getData = (instance: any) => {
  delete instance.dataValues.id;
  delete instance.dataValues.CompanyId;
  delete instance.dataValues.UserId;
  return { data: instance };
};
