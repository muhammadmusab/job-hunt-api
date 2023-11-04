import { CompanyContact } from '../../models/CompanyContact';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { Company } from '../../models/Company';
import { getPaginated } from '../../utils/paginate';

export const createCompanyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { contactType, title, value } = req.body;
    const { company } = await getCompanyId(req.user.Company?.uuid as string);
    let companyContact = null;

    companyContact = await CompanyContact.create({
      contactType,
      title,
      value,
      CompanyId: company?.id as number,
    });

    let { data } = getData(companyContact);
    res.status(201).send({ message: 'Success', data });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const updateCompanyContact = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['contactType', 'title', 'value'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    const { company } = await getCompanyId(req.user.Company?.uuid as string);
    const result = await CompanyContact.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
          CompanyId: company?.id,
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
    const { company } = await getCompanyId(req.user.Company?.uuid as string);
    const result = await CompanyContact.destroy({
      where: {
        uuid: uid,
        CompanyId: company?.id,
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
    const { company } = await getCompanyId(req.user.Company?.uuid as string);

    const { limit, offset } = getPaginated(req.query);
    // sortBy
    const sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    const sortAs = req.query.sortAs ? (req.query.sortAs as string) : 'DESC';

    const { count: total, rows: companyContact } = await CompanyContact.findAndCountAll({
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

    res.status(201).send({ message: 'Success', data: companyContact ,total});
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
