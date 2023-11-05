import { NextFunction, Request, Response } from 'express';
import { UserJobs } from '../models/UserJobs';
import { User } from '../models/User';
import { Job } from '../models/Job';
import { UserType } from '../types/model-types';
import { BadRequestError } from '../utils/api-errors';

export const Apply = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
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
        uuid: req.user.User?.uuid,
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
      res.send({ message: 'Success', data: userJob });
    } else {
      res.status(500).send({ message: 'Internal Server Error' });
    }
  } catch (error: any) {
    res.status(500).send({ message: error });
  }
};

export const createAdditionalDocuments = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const {
      jobUniqueId, //uuid
    } = req.body;

    if (req.user && req.user.type === UserType.COMPANY) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
      return;
    }

    let files: string[] = [];
    if (req.files && req.files?.length) {
      let filesArray = req.files as any[];
      filesArray.forEach((file) => {
        files.push(`${process.env.API_URL}media/${file.filename}`);
      });
    }

    let userJob;
    const user = await User.scope('withId').findOne({
      where: {
        uuid: req.user.User?.uuid,
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
    if (userJob && files.length) {
      userJob.additionalDocuments = files;
      await userJob.save();
      res.status(201).send({ message: 'Success' });
    } else {
      res.status(403).send({ message: 'Bad request' });
    }
  } catch (error: any) {
    res.status(500).send({ message: error });
  }
};
