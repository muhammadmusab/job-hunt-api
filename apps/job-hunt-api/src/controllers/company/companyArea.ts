import { CompanyArea } from '../../models/CompanyArea';
import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../../utils/api-errors';
import { getValidUpdates } from '../../utils/validate-updates';
import { Company } from '../../models/Company';
import { getPaginated } from '../../utils/paginate';

export const createCompanyArea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { area } = req.body;
    const { company } = await getCompanyId(req.user.Company?.uuid as string);

    let companyArea = null;
    companyArea= await CompanyArea.findOne({
      where:{
        CompanyId: company?.id as number,
        area,
      }
    })
    if(companyArea){
      const err = new BadRequestError('This field already exists');
      res.status(err.status).send({ message: err.message });
      return;
    }
    companyArea = await CompanyArea.create({
      area,
      CompanyId: company?.id as number,
    });

    let { data } = getData(companyArea);

    res.status(201).send({ message: 'Success', data });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const updateCompanyArea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const validUpdates = ['area'];
    const validBody = getValidUpdates(validUpdates, req.body);
    const { uid } = req.params;

    const { company } = await getCompanyId(req.user.Company?.uuid as string);

   let companyArea= await CompanyArea.findOne({
      where:{
        CompanyId: company?.id as number,
        area:validBody.area,
      }
    })
    if(companyArea){
      const err = new BadRequestError('This field already exists');
      res.status(err.status).send({ message: err.message });
      return;
    }
    const result = await CompanyArea.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
          CompanyId: company?.id,
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
    const { company } = await getCompanyId(req.user.Company?.uuid as string);
    const result = await CompanyArea.destroy({
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
export const listCompanyArea = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { company } = await getCompanyId(req.user.Company?.uuid as string);
    const { limit, offset } = getPaginated(req.query);
    const { count: total, rows: companyArea } = await CompanyArea.findAndCountAll({
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
    });

    res.status(201).send({ message: 'Success', data: companyArea,total });
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
