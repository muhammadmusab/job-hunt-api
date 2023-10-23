import { CompanyArea } from '../../models/CompanyArea';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { Company } from '../../models/Company';

export const createCompanyArea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { area } = req.body;
    const company = await Company.scope('withId').findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      attributes: ['id'],
    });
    let companyCompanyArea = null;
    if (company) {
      companyCompanyArea = await CompanyArea.create({
        area,
        CompanyId: company?.id as number,
      });
    }

    res.status(201).send({ message: 'Success', data: companyCompanyArea });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const updateCompanyArea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['area'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    const result = await CompanyArea.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the company area');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteCompanyArea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const result = await CompanyArea.destroy({
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
export const listCompanyArea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await Company.scope('withId').findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      attributes: ['id'],
    });

    const companyArea = await CompanyArea.findAll({
      where: {
        CompanyId: company?.id as number,
      },
    });

    res.status(201).send({ message: 'Success', data: companyArea });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
