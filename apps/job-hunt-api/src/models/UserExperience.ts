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
interface UserExperienceModel extends Model<InferAttributes<UserExperienceModel>, InferCreationAttributes<UserExperienceModel>> {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  workTitle: string;
  employmentType: string;
  companyName: string;
  location:string;
  startDate:string;
  endDate:string;
  UserId?:number;
  activeJob:boolean;
}
export const UserExperience = sequelize.define<UserExperienceModel>(
  'UserExperience',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    workTitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    employmentType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    companyName:{
      type:DataTypes.STRING,
      allowNull:false
    },
    location:{
      type:DataTypes.STRING,
      allowNull:false
    },
    startDate:{
      type:DataTypes.DATE,
      allowNull:false
    },
    endDate:{
      type:DataTypes.DATE,
    },
    activeJob:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
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
      attributes: { exclude: ['id','UserId'] },
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
