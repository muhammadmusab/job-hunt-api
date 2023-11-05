import { Job } from '../models/Job';
import { UserJobs } from '../models/UserJobs';
import { Request, Response, NextFunction } from 'express';
import {
  UserType,
  AuthType,
  CompanyBasedJobStatus,
  UserBasedJobStatus,
} from '../types/model-types';
import { BadRequestError } from '../utils/api-errors';
import { getValidUpdates } from '../utils/validate-updates';
import { getPaginated } from '../utils/paginate';
import sequelize, { Op } from 'sequelize';
import { getFiltersAndSearch } from '../utils/QueryFilters';
import { Filters, operators } from '../types/sequelize-custom-types';
import { User } from '../models/User';
import { Company } from '../models/Company';

export const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      title,
      employementType,
      workLevel,
      expiryDate,
      salary,
      paymentFrequency,
      description,
      requirements,
      status = 'new',
      tags,
      openPositions,
      category,
      experience,
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
      employementType,
      workLevel,
      expiryDate,
      salary,
      paymentFrequency,
      description,
      requirements,
      status,
      tags,
      openPositions,
      category,
      experience,
      projectLength,
      location,
      CompanyId: company?.id as number,
    });

    const { data } = getData(job);

    res.status(201).send({ message: 'Success', data });
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
    if (job) {
      delete job.dataValues.id;
    }
    res.send({ message: 'Success', data: job });
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
      'employementType',
      'workLevel',
      'expiryDate',
      'salary',
      'paymentFrequency',
      'description',
      'requirements',
      'status',
      'tags',
      'openPositions',
      'category',
      'experience',
      'projectLength',
      'location',
    ];
    const validBody = getValidUpdates(validUpdates, body);

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }
    // only the company which added the job can update job info
    const result = await Job.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
          CompanyId: req.user.Company?.id,
        },
      },
    );
    if (!result[0]) {
      const err = new BadRequestError('Could not update the job data');
      res.status(err.status).send({ message: err.message });
      return;
    }

    res.send({ message: 'Success', data: result });
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

    const result = await Job.destroy({
      where: {
        uuid: uid,
        CompanyId: req.user.Company?.id,
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

// this is active job list route without authentication
export const ActiveJobsList = async (req: Request, res: Response, next: NextFunction) => {
  try {
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
        operator: operators.eq,
        property: 'category',
        value: req.query.category,
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

    let where = {
      status: CompanyBasedJobStatus.NEW,
    } as any;

    if (filters.length) {
      where = {
        [Op.and]: [
          {
            status: CompanyBasedJobStatus.NEW,
            //@ts-ignore
            [Op.or]: filters,
          },
        ],
      };
    }
    if (search) {
      where = {
        status: CompanyBasedJobStatus.NEW,
        [Op.and]: [search],
      };
    }
    if (search && filters.length) {
      where = {
        status: CompanyBasedJobStatus.NEW,
        [Op.and]: [
          {
            [Op.or]: filters,
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

    res.send({ message: 'Success', data: jobs, total, filtersData });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// List of jobs by the job-seeker(user) without filters
export const UserBasedJobList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user.type === UserType.COMPANY) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    //job-status: 'cancelled' || 'applied' || 'interviews'
    const status: UserBasedJobStatus = req.query.status as UserBasedJobStatus;
    // sortBy
    const sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    const sortAs = req.query.sortAs ? (req.query.sortAs as string) : 'DESC';

    const { limit, offset } = getPaginated(req.query);

    const { user } = await getUserId(req.user.User?.uuid as string);

    // finding job ids with current user
    const result = await UserJobs.findAll({
      where: {
        UserId: user?.id,
        status,
      },
      attributes: ['JobId'],
    });

    // list of found job ids
    const foundJobIds = result.map((item) => item.JobId);

    const { count: total, rows: jobs } = await Job.findAndCountAll({
      where: {
        id: foundJobIds as number[],
      },
      offset: offset,
      limit: limit,
      order: [[sortBy as string, sortAs]],
    });

    res.send({ message: 'Success', data: jobs, total });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// list of jobs by the job-seeker(user) with filters
export const UserBasedJobListWithFilters = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
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
        operator: operators.eq,
        property: 'category',
        value: req.query.category,
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

    res.send({ message: 'Success', data: jobs, total, filtersData });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// list of jobs based on status for company with filters
export const CompanyBasedJobList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    const { company } = await getCompanyId(req.user.Company?.uuid as string);

    //job-status: 'new' || 'past' || 'interviews'
    const status: CompanyBasedJobStatus = req.query.status as CompanyBasedJobStatus;
    // if user clicks on past tab on FE
    if (status === 'past') {
      // get current date
      const current_date = new Date().toISOString().slice(0, 10);
      // find jobs (uuids) with current date greater then  expiryDate  (which means job is expired)
      const jobs = await Job.findAll({
        where: {
          CompanyId: company?.id,
          expiryDate: {
            [Op.lt]: current_date,
          },
        },
        include: ['uuid'],
      });
      // array of uuids of jobs found with expiry date
      const jobIds = jobs.map((item) => item.uuid);
      // updating the status of the jobs with expirydate found above
      const result = await Job.update(
        {
          status:  CompanyBasedJobStatus.PAST,
        },
        {
          where: {
            uuid: jobIds,
          },
        },
      );
      if (!result[0]) {
        const err = new BadRequestError('Could not update the jobs data');
        res.status(err.status).send({ message: err.message });
        return;
      }
    }
    // sortBy
    const sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    const sortAs = req.query.sortAs ? (req.query.sortAs as string) : 'DESC';

    const { limit, offset } = getPaginated(req.query);

    const { count: total, rows: jobs } = await Job.findAndCountAll({
      where: {
        CompanyId: company?.id,
        status,
      },
      offset: offset,
      limit: limit,
      order: [[sortBy as string, sortAs]],
    });

    res.send({ message: 'Success', data: jobs, total });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// set job status as 'interviews' from company
export const UpdateCompanyBasedJobStatus = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }
    // job uuid
    const { uid } = req.params;
    const { company } = await getCompanyId(req.user.Company?.uuid as string);

    const result = await Job.update(
      {
        status: CompanyBasedJobStatus.INTERVIEWS,
      },
      {
        where: {
          uuid: uid,
          CompanyId: company?.id,
        },
      },
    );
    if (!result[0]) {
      const err = new BadRequestError('Could not update the job data');
      res.status(err.status).send({ message: err.message });
      return;
    }

    res.send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// assign user for job interview and set status of user as interview
// company will assign this status
export const AssignUserJobInterview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }
    // job uuid

    const { userUniqueId, jobUniqueId } = req.body;
    const { company } = await getCompanyId(req.user.Company?.uuid as string);
    const { user } = await getUserId(userUniqueId);

    const job = await Job.scope('withId').findOne({
      where: {
        uuid: jobUniqueId,
      },
    });

    if (!job) {
      const err = new BadRequestError('Job data not found');
      res.status(err.status).send({ message: err.message });
      return;
    }

    const result = await UserJobs.update(
      {
        status: CompanyBasedJobStatus.INTERVIEWS,
      },
      {
        where: {
          JobId: job?.id,
          UserId: user?.id,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the job data');
      res.status(err.status).send({ message: err.message });
      return;
    }

    res.send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// list of jobs with its applicants
export const UserJobsList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    // sortBy
    const sortBy = req.query.sortBy ? req.query.sortBy : 'createdAt';
    const sortAs = req.query.sortAs ? (req.query.sortAs as string) : 'DESC';

    const { limit, offset } = getPaginated(req.query);
    const { company } = await getCompanyId(req.user.Company?.uuid as string);
    const { jobUniqueId } = req.body;

    const job = await Job.scope('withId').findOne({
      where: {
        uuid: jobUniqueId,
      },
    });
    
    const { count: total, rows: jobs } = await UserJobs.findAndCountAll({
      where: {
        JobId: job?.id,
      },
      include: [
        {
          model: Job,
          required: true,
          where: {
            CompanyId: company?.id,
          },
        },
        {
          model: User,
        },
      ],
      attributes: [
        'Job.id',
        'User.id',
        'UserId',
        'JobId',
        'id',
        'CompanyId',
        'additionalDocuments',
      ],
      offset: offset,
      limit: limit,
      order: [[sortBy as string, sortAs]],
    });

    res.send({ message: 'Success', data: jobs, total });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// user will set status as cancel for job user applied
export const setUserJobStatusCancelled = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user && req.user.type === UserType.COMPANY) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }
    // job uuid
    const { uid } = req.params;
    const { user } = await getUserId(req.user.User?.uuid as string);

    const job = await Job.scope('withId').findOne({
      where: {
        uuid: uid,
      },
    });

    if (!job) {
      const err = new BadRequestError('Job data not found');
      res.status(err.status).send({ message: err.message });
      return;
    }

    const result = await UserJobs.update(
      {
        status: UserBasedJobStatus.CANCELLED,
      },
      {
        where: {
          JobId: job?.id,
          UserId: user?.id,
        },
      },
    );

    if (!result[0]) {
      const err = new BadRequestError('Could not update the job data');
      res.status(err.status).send({ message: err.message });
      return;
    }

    res.send({ message: 'Success', data: result });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getUserId = async (uuid: string) => {
  const user = await User.scope('withId').findOne({
    where: {
      uuid,
    },
    attributes: ['id'],
  });
  return { user };
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
