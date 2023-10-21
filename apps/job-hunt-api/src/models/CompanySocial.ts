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
import { socialplatformType } from '../types/model-types';
interface CompanySocialModel
  extends Model<InferAttributes<CompanySocialModel>, InferCreationAttributes<CompanySocialModel>> {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  platformType: socialplatformType;
  url: string;
  CompanyId: number;
}
export const CompanySocial = sequelize.define<CompanySocialModel>(
  'CompanySocial',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    platformType: {
      type: DataTypes.ENUM('facebook', 'linkedin', 'twitter', 'crunchbase'),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
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
      attributes: { exclude: ['id'] },
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
