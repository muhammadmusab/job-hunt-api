import { CompanySocial } from '../../models/CompanySocial';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { Company } from '../../models/Company';
import { getPaginated } from '../../utils/paginate';

export const createCompanySocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { url, platformType } = req.body;
    const { company } = await getCompanyId(req.user.Company?.uuid as string);

    let companySocial = null;

    companySocial = await CompanySocial.create({
      url,
      platformType,
      CompanyId: company?.id as number,
    });

    let { data } = getData(companySocial);

    res.status(201).send({ message: 'Success', data });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const updateCompanySocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['url', 'platformType'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;
    const { company } = await getCompanyId(req.user.Company?.uuid as string);

    const result = await CompanySocial.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
          CompanyId: company?.id,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the company social data');
      res.status(err.status).send({ message: err.message });
      return;
    }
    res.send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const deleteCompanySocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const { company } = await getCompanyId(req.user.Company?.uuid as string);
    const result = await CompanySocial.destroy({
      where: {
        uuid: uid,
        CompanyId: company?.id,
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
export const listCompanySocial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company } = await getCompanyId(req.user.Company?.uuid as string);

    const { limit, offset } = getPaginated(req.query);
    // sortBy
    const sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    const sortAs = req.query.sortAs ? (req.query.sortAs as string) : 'DESC';

    const { count: total, rows: companySocial } = await CompanySocial.findAndCountAll({
      where: {
        CompanyId: company?.id as number,
      },
      attributes: {
        exclude: ['CompanyId'],
      },
      include: [
        {
          model: Company,
        },
      ],
      offset: offset,
      limit: limit,
      order: [[sortBy as string, sortAs]],
    });

    res.send({ message: 'Success', data: companySocial, total });
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
  return { company };
};

const getData = (instance: any) => {
  delete instance.dataValues.id;
  delete instance.dataValues.CompanyId;
  return { data: instance };
};
