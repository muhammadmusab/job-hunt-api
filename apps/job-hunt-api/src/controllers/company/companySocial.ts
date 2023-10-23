import { CompanySocial } from '../../models/CompanySocial';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { Company } from '../../models/Company';

export const createCompanySocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url, platformType } = req.body;
    const company = await Company.scope('withId').findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      attributes: ['id'],
    });
    let companySocial = null;
    if (company) {
      companySocial = await CompanySocial.create({
        url,
        platformType,
        CompanyId: company?.id as number,
      });
    }

    res.status(201).send({ message: 'Success', data: companySocial });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const updateCompanySocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['url', 'platformType'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    const result = await CompanySocial.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the company social data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.status(201).send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteCompanySocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const result = await CompanySocial.destroy({
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
export const listCompanySocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const company = await Company.scope('withId').findOne({
      where: {
        uuid: req.user.Company?.uuid,
      },
      attributes: ['id'],
    });

    const companySocial = await CompanySocial.findAll({
      where: {
        CompanyId: company?.id as number,
      },
    });

    res.status(201).send({ message: 'Success', data: companySocial });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
