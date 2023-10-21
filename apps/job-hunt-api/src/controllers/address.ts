import { Address } from '../models/Address';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../utils/api-errors';
import { getValidUpdates } from '../utils/validate-updates';
import { User } from '../models/User';
import { Company } from '../models/Company';
import { UserType } from '../types/model-types';

export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { city, country, state, streetAddress, zipCode } = req.body;

    const type = req.query.type as UserType;

    let address = null;
    let user = null;
    let company = null;

    if (type === UserType.USER) {
      user = await User.scope('withId').findOne({
        where: {
          uuid: req.user.User?.uuid,
        },
        attributes: ['id'],
      });
    } else {
      company = await Company.scope('withId').findOne({
        where: {
          uuid: req.user.Company?.uuid,
        },
        attributes: ['id'],
      });
    }

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

    res.status(201).send({ message: 'Success', data: address });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const updateAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['city', 'country', 'state', 'streetAddress', 'zipCode'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    const result = await Address.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    if (!result) {
      const err = new BadRequestError('Could not update the address data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const result = await Address.destroy({
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
export const listAddress = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let user = null;
    let company = null;
    let idType = null;
    let addresses = null;
    const type = req.query.type as UserType;

    if (type === UserType.COMPANY) {
      company = await Company.scope('withId').findOne({
        where: {
          uuid: req.user.Company?.uuid,
        },
        attributes: ['id'],
      });
      idType = 'CompanyId';
    } else {
      user = await User.scope('withId').findOne({
        where: {
          uuid: req.user.User?.uuid,
        },
        attributes: ['id'],
      });
      idType = 'UserId';
    }

    addresses = await Address.findAll({
      where: {
        [idType]: type === UserType.COMPANY ? company?.id : (user?.id as number),
      },
    });

    res.status(201).send({ message: 'Success', data: addresses });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
