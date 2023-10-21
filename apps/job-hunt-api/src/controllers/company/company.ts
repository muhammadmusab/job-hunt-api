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
    const company = await Company.findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      include: [
        {
          model: CompanySocial,
        },
        {
          model: CompanyContact,
        },
        {
          model: CompanyArea,
        },
        {
          model: Address,
          where: {
            CompanyId: req.user.Company?.id,
          },
        },
      ],
    });

    res.status(201).send({ message: 'Success', data: company });
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

    if (!result) {
      const err = new BadRequestError('Could not update the company data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    let company = await Company.findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      include: [
        {
          model: CompanyArea,
        },
        {
          model: CompanyContact,
        },
        {
          model: CompanySocial,
        },
        {
          model: Address,
          where: {
            CompanyId: req.user.Company?.id,
          },
        },
      ],
    });
    res.status(201).send({ message: 'Success', data: company });
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
      res.status(201).send({ message: 'Success' });
    } else {
      const err = new BadRequestError('Bad Request');
      res.status(err.status).send({ message: err.message });
    }
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
