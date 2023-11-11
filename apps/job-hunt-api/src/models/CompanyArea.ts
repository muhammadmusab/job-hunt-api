import { sequelize } from '../config/db';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  NonAttribute,
  UUIDV4,
} from 'sequelize';
interface CompanyAreaModel
  extends Model<InferAttributes<CompanyAreaModel>, InferCreationAttributes<CompanyAreaModel>> {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  area: string;
  CompanyId?: number;
}
export const CompanyArea = sequelize.define<CompanyAreaModel>(
  'CompanyArea',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    area: {
      type: DataTypes.STRING,
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
      },
    },
  },
  {
    defaultScope: {
      attributes: { exclude: ['id','CompanyId'] },
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
