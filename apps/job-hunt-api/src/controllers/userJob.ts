import e, { NextFunction, Request, Response } from 'express';
import { UserJobs } from '../models/UserJobs';
import { User } from '../models/User';
import { Job } from '../models/Job';
import { UserType } from '../types/model-types';
import { BadRequestError } from '@codelab/api-errors';

export const Apply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      userUniqueId, //uuid
      jobUniqueId, //uuid
    } = req.body;

    if (req.user && req.user.type === UserType.COMPANY) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
      return;
    }

    let userJob;
    const user = await User.scope('withId').findOne({
      where: {
        uuid: userUniqueId,
      },
    });
    const job = await Job.scope('withId').findOne({
      where: {
        uuid: jobUniqueId,
      },
    });
    if (user?.id && job?.id) {
      userJob = await UserJobs.findOne({
        where: {
          JobId: job?.id,
          UserId: user?.id,
        },
      });
    } else {
      const err = new BadRequestError('Wrong User Information');
      res.status(403).send(err);
      return;
    }

    if (userJob) {
      const err = new BadRequestError('Already applied for the job');
      res.status(403).send(err);
      return;
    } else {
      userJob = await UserJobs.create({
        JobId: job?.id,
        UserId: user?.id,
      });
    }

    if (userJob) {
      res.status(201).send({ message: 'Success', data: userJob });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};

export const ListAppliedJobs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      uid, //uuid
    } = req.params;

    let userJob;
    const user = await User.scope('withId').findOne({
      where: {
        uuid: uid,
      },
    });

    if (user?.id) {
      userJob = await UserJobs.findAll({
        where: {
          UserId: user?.id,
        },
      });
    }

    res.status(201).send({ message: 'Success', data: userJob?userJob:[] });
  } catch (error: any) {
    console.log(error);
    res.status(500).send({ message: error });
  }
};
