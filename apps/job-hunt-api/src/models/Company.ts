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
  email: string;
  contact: string;
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
    vatNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    foundationYear: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
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
      withId:{
        attributes: {
          exclude:[]
        },
      }
    },
  },
);
