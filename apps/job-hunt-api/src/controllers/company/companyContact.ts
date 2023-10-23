import { CompanyContact } from '../../models/CompanyContact';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { Company } from '../../models/Company';

export const createCompanyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contactType, title, value } = req.body;
    const company = await Company.scope('withId').findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      attributes: ['id'],
    });
    let companyContact = null;
    if (company) {
      companyContact = await CompanyContact.create({
        contactType,
        title,
        value,
        CompanyId: company?.id as number,
      });
    }

    res.status(201).send({ message: 'Success', data: companyContact });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const updateCompanyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['contactType', 'title', 'value'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    const result = await CompanyContact.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the company contact data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteCompanyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const result = await CompanyContact.destroy({
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
export const listCompanyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await Company.scope('withId').findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      attributes: ['id'],
    });

    const companyContact = await CompanyContact.findAll({
      where: {
        CompanyId: company?.id as number,
      },
    });

    res.status(201).send({ message: 'Success', data: companyContact });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
