import { sequelize } from '../config/db';
import { status } from '../types/job-model';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  UUIDV4,
} from 'sequelize';
interface UserJobsModel
  extends Model<InferAttributes<UserJobsModel>, InferCreationAttributes<UserJobsModel>> {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  UserId?: CreationOptional<number>;
  JobId?: CreationOptional<number>;
  status: CreationOptional<string>;
  additionalDocuments?: CreationOptional<string[]>;
}
export const UserJobs = sequelize.define<UserJobsModel>(
  'UserJobs',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: status.APPLIED as string,
    },
    additionalDocuments: {
      type: DataTypes.ARRAY(DataTypes.STRING),
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['JobId', 'UserId'] },
    },
    scopes: {
      withId: {
        attributes: {
          exclude: [],
        },
      },
    },
    freezeTableName: true,
  },
);
