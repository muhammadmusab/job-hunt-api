import { Job } from '../models/Job';
import { UserJobs } from '../models/UserJobs';
import { Request, Response, NextFunction } from 'express';
import { UserType, AuthType } from '../types/model-types';
import { BadRequestError } from '@codelab/api-errors';
import { getValidUpdates } from '../utils/validate-updates';
import { getPaginated } from '../utils/paginate';
import sequelize, { Op } from 'sequelize';
import { getFiltersAndSearch } from '../utils/QueryFilters';
import { Filters, operators } from '../types/sequelize-custom-types';
import { User } from '../models/User';

export const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      descriptionShort,
      descriptionLong,
      requirements,
      tags,
      category,
      expiryDate,
      salary,
      experience,
      employementType,
      projectLength,
      location,
    } = req.body;

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
      return;
    }

    const company = req.user.Company;

    const job = await Job.create({
      title,
      descriptionShort,
      descriptionLong,
      requirements,
      tags,
      category,
      expiryDate,
      salary,
      experience,
      employementType,
      projectLength,
      location,
      CompanyId: company?.id as number,
    });

    res.status(201).send({ message: 'Success', data: job });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const Get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    const job = await Job.findOne({
      where: {
        uuid: uid,
      },
    });

    res.status(201).send({ message: 'Success', data: job });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Update = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const { body } = req;

    const validUpdates = [
      'title',
      'descriptionShort',
      'descriptionLong',
      'requirements',
      'tags',
      'category',
      'expiryDate',
      'salary',
      'experience',
      'employementType',
      'projectLength',
      'location',
    ];
    const validBody = getValidUpdates(validUpdates, body);

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    const job = await Job.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    res.status(201).send({ message: 'Success', data: job });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    // const company = req.user.Company;

    const job = await Job.destroy({
      where: {
        uuid: uid,
      },
    });

    res.status(201).send({ message: 'Success', data: job });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

//job-seeker finding a job
//company is not allowed to find a job

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user.type === UserType.COMPANY) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    // const company = req.user.Company;
    const { limit, offset } = getPaginated(req.query);
    // filters
    const jobFilters = [
      {
        operator: operators.eq,
        property: 'experience',
        value: req.query.experience,
        type: 'normal',
      },

      {
        operator: operators.eq,
        property: 'employementType',
        value: req.query.employementType,
        type: 'normal',
      },
      {
        operator: operators.eq,
        property: 'projectLength',
        value: req.query.projectLength,
        type: 'normal',
      },
      {
        operator: operators.eq,
        property: 'location',
        value: req.query.location,
        type: 'normal',
      },
      {
        operator: operators.gte,
        property: 'salaryMin',
        value: req.query.salaryMin,
        type: 'range',
        parent: 'salary',
        parentOperator: operators.and,
      },
      {
        operator: operators.lte,
        property: 'salaryMax',
        value: req.query.salaryMax,
        type: 'range',
        parent: 'salary',
        parentOperator: operators.and,
      },
      {
        operator: operators.iLike,
        property: 'title',
        value: req.query.search,
        type: 'search',
        parentOperator: operators.or,
      },
    ] as Filters[];

    const { filters, search } = getFiltersAndSearch(jobFilters as Filters[]);

    const foundUserId = await User.scope('withId').findOne({
      where: {
        uuid: req.user.User?.uuid,
      },
    });
    const foundIdsResult = await UserJobs.findAll({
      where: {
        UserId: foundUserId?.id,
      },
      attributes: ['JobId'],
    });

    const foundIds = foundIdsResult.map((item) => item.JobId);

    let where = {
      [Op.and]: [
        {
          [Op.not]: {
            id: foundIds,
          },
        },
      ],
    };
    if (filters.length && foundIds) {
      where = {
        [Op.and]: [
          {
            //@ts-ignore
            [Op.or]: filters,
          },
          {
            [Op.not]: {
              id: foundIds,
            },
          },
        ],
      };
    }
    if (search) {
      where = {
        [Op.and]: [
          {
            [Op.not]: {
              id: foundIds,
            },
          },
          search,
        ],
      };
    }
    if (search && filters.length) {
      where = {
        [Op.and]: [
          {
            [Op.or]: filters,
          },
          {
            [Op.not]: {
              id: foundIds,
            },
          },
          search,
        ],
      };
    }

    // sortBy
    const sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    const sortAs = req.query.sortAs ? (req.query.sortAs as string) : 'DESC';

    const { count: total, rows: jobs } = await Job.findAndCountAll({
      where,
      offset: offset,
      limit: limit,
      order: [[sortBy as string, sortAs]],
    });

    const experience = await Job.findAll({
      attributes: ['experience', [sequelize.fn('COUNT', sequelize.col('experience')), 'count']],
      group: ['experience'],
    });
    const employementType = await Job.findAll({
      attributes: [
        'employementType',
        [sequelize.fn('COUNT', sequelize.col('employementType')), 'count'],
      ],
      group: ['employementType'],
    });
    const filtersData = { experience, employementType };

    res.status(201).send({ message: 'Success', data: jobs, total, filtersData });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
