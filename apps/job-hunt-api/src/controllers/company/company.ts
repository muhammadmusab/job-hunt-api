import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { Company } from '../../models/Company';
import { CompanySocial } from '../../models/CompanySocial';
import { CompanyContact } from '../../models/CompanyContact';
import { CompanyArea } from '../../models/CompanyArea';
import { Address } from '../../models/Address';

export const Get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let company = await getCompanyId(req.user.Company?.uuid as string);
    let data = await Company.findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      include: [
        {
          model: CompanyArea,
          attributes: {
            exclude: ['CompanyId', 'id'],
          },
        },
        {
          model: CompanyContact,
          attributes: {
            exclude: ['CompanyId', 'id'],
          },
        },
        {
          model: CompanySocial,
          attributes: {
            exclude: ['CompanyId', 'id'],
          },
        },
        {
          model: Address,
          required: false,
          where: {
            CompanyId: company?.id,
          },
          attributes: {
            exclude: ['CompanyId', 'id'],
          },
        },
      ],
    });

    res.send({ message: 'Success', data });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['industry', 'description', 'website', 'numberOfEmployees', 'hiring'];
    const validBody = getValidUpdates(validUpdates, req.body);

    const result = await Company.update(
      { ...validBody },
      {
        where: {
          uuid: req.user.Company?.uuid,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the company data');
      res.status(err.status).send({ message: err.message });
      return;
    }

    let company = await getCompanyId(req.user.Company?.uuid as string);

    let data = await Company.findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      include: [
        {
          model: CompanyArea,
          attributes: {
            exclude: ['CompanyId', 'id'],
          },
        },
        {
          model: CompanyContact,
          attributes: {
            exclude: ['CompanyId', 'id'],
          },
        },
        {
          model: CompanySocial,
          attributes: {
            exclude: ['CompanyId', 'id'],
          },
        },
        {
          model: Address,
          required: false,
          where: {
            CompanyId: company?.id,
          },
          attributes: {
            exclude: ['CompanyId', 'id'],
          },
        },
      ],
    });
    res.send({ message: 'Success', data });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await Company.destroy({
      where: {
        uuid: req.user.Company?.uuid,
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

const getCompanyId = async (uuid: string) => {
  const company = await Company.scope('withId').findOne({
    where: {
      uuid,
    },
    attributes: ['id'],
  });
  return company;
};
