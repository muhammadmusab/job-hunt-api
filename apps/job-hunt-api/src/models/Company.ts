import { sequelize } from '../config/db';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  UUIDV4,
} from 'sequelize';
interface CompanyModel
  extends Model<InferAttributes<CompanyModel>, InferCreationAttributes<CompanyModel>> {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  name: string;
  vatNumber: string;
  address: string;
  foundationYear: number;
  contact: string;
  industry?: string;
  description?: string;
  website?: string;
  numberOfEmployees?: number;
  hiring?: boolean;
}
export const Company = sequelize.define<CompanyModel>(
  'Company',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    industry: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    website: {
      type: DataTypes.STRING,
    },
    numberOfEmployees: {
      type: DataTypes.INTEGER,
    },
    hiring: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },

    vatNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foundationYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    contact: {
      type: DataTypes.STRING,
      allowNull: false,
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
  },
);
