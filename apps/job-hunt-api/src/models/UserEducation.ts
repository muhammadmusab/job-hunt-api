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
interface UserEducationModel
  extends Model<InferAttributes<UserEducationModel>, InferCreationAttributes<UserEducationModel>> {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  instituteName: string;
  degree: string;
  fieldOfStudy: string;
  grade: string;
  startDate: string;
  endDate: string;
  UserId: number;
}
export const UserEducation = sequelize.define<UserEducationModel>(
  'UserEducation',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    instituteName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    degree: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fieldOfStudy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    grade: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    endDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
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
