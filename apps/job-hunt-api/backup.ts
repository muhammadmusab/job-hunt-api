export const List = async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user && req.user.type === UserType.COMPANY) {
        const err = new BadRequestError('wrong user request');
        res.status(403).send(err);
      }
  
      // const company = req.user.Company;
      const { limit, offset } = getPaginated(req.query);
      // filters
      const queryFilters = {
        experience: req.query.experience,
        employementType: req.query.employementType,
        projectLength: req.query.projectLength,
        location: req.query.location,
        salaryMin: req.query.salaryMin,
        salaryMax: req.query.salaryMax,
        search: req.query.search,
      };
  
      const { filters, search } = getFiltersAndSearchQuery(queryFilters as unknown as Filters);
  
      let where = {};
      if (filters.length) {
        where = {
          [Op.and]: [
            {
              [Op.or]: filters,
            },
          ],
        };
      }
      if (search) {
        where = {
          [Op.and]: [
            {
              title: search,
            },
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
              title: search,
            },
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