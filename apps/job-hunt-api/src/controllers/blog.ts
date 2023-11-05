import { Blog } from '../models/Blog';
import { Request, Response, NextFunction } from 'express';
import { UserType, AuthType } from '../types/model-types';
import { BadRequestError } from '../utils/api-errors';
import { getValidUpdates } from '../utils/validate-updates';
import { getPaginated } from '../utils/paginate';
import sequelize, { Op } from 'sequelize';
import { getFiltersAndSearch } from '../utils/QueryFilters';
import { Filters, operators } from '../types/sequelize-custom-types';
import { User } from '../models/User';

export const Create = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, subtitle, description, category, sectionImage, image1, image2, tags } = req.body;

    const blog = await Blog.create({
      title,
      subtitle,
      description,
      category,
      sectionImage,
      image1,
      image2,
      tags,
    });

    res.status(201).send({ message: 'Success', data: blog });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const Get = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;
    const blog = await Blog.findOne({
      where: {
        uuid: uid,
      },
    });

    res.send({ message: 'Success', data: blog });
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
      'subtitle',
      'description',
      'category',
      'sectionImage',
      'image1',
      'image2',
      'tags',
    ];
    const validBody = getValidUpdates(validUpdates, body);

    if (req.user && req.user.type === UserType.USER) {
      const err = new BadRequestError('wrong user request');
      res.status(403).send(err);
    }

    const blog = await Blog.update(
      { ...validBody },
      {
        where: {
          uuid: uid,
        },
      },
    );

    res.send({ message: 'Success', data: blog });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
export const Delete = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { uid } = req.params;

    const blog = await Blog.destroy({
      where: {
        uuid: uid,
      },
    });

    res.send({ message: 'Success', data: blog });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

export const List = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const company = req.user.Company;
    const { limit, offset } = getPaginated(req.query);
    // filters
    const blogFilters = [
      {
        operator: operators.iLike,
        property: 'title',
        value: req.query.search,
        type: 'search',
        parentOperator: operators.or,
      },
      {
        operator: operators.eq,
        property: 'category',
        value: req.query.category,
        type: 'normal',
      },
      {
        operator: operators.contains,
        property: 'tags',
        value: req.query.tags,
        type: 'normal',
      },
    ] as Filters[];

    const { filters, search } = getFiltersAndSearch(blogFilters as Filters[]);

    let where = {};
    if (filters.length) {
      where = {
        [Op.and]: [
          {
            //@ts-ignore
            [Op.or]: filters,
          },
        ],
      };
    }
    if (search) {
      where = {
        [Op.and]: [search],
      };
    }
    if (search && filters.length) {
      where = {
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

    const { count: total, rows: jobs } = await Blog.findAndCountAll({
      where,
      offset: offset,
      limit: limit,
      order: [[sortBy as string, sortAs]],
    });

    res.send({ message: 'Success', data: jobs, total });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
