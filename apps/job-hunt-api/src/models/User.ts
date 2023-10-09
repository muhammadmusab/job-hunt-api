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
interface UserModel extends Model<InferAttributes<UserModel>, InferCreationAttributes<UserModel>> {
  id?: CreationOptional<number>;
  firstName: string;
  lastName: string;
  fullName?: CreationOptional<string>;
  uuid: CreationOptional<string>;
  email: string;
  contact: string;
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
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fullName: {
      type: DataTypes.VIRTUAL,
      get(this: UserModel): NonAttribute<string> {
        return this.firstName + this.lastName;
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
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
          exclude:[]
        },
      },
    },
  },
);
