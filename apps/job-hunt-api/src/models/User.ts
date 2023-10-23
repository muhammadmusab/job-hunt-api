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
import { Gender, identityType } from '../types/model-types';
interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id?: CreationOptional<number>;
  firstName: string;
  lastName: string;
  description?: string;
  headline?: string;
  portfolioUrl?: string;
  dateOfBirth?: string;
  fullName?: CreationOptional<string>;
  uuid: CreationOptional<string>;
  contact?: string;
  gender?: Gender;
  identityType?: identityType;
  identity?: string;
}
export const User = sequelize.define<UserModel>(
  'User',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull:false,
    },
    description: {
      type: DataTypes.STRING,

    },
    headline: {
      type: DataTypes.STRING,
    },
    portfolioUrl: {
      type: DataTypes.STRING,
    },
    gender: {
      type: DataTypes.STRING,
    },
    dateOfBirth: {
      type: DataTypes.STRING,
    },
    identityType: {
      type: DataTypes.STRING,
    },
    identity: {
      type: DataTypes.STRING,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get(this: UserModel): NonAttribute<string> {
        return this.firstName + this.lastName;
      },
    },
    contact: {
      type: DataTypes.STRING,
      allowNull:false,
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
