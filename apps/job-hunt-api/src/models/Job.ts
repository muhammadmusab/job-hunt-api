import { sequelize } from '../config/db';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  UUIDV4,
} from 'sequelize';
interface JobModel extends Model<InferAttributes<JobModel>, InferCreationAttributes<JobModel>> {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  title: string;
  descriptionShort: CreationOptional<string>;
  descriptionLong?: CreationOptional<string>;
  requirements: string[];
  tags?: string[];
  category: CreationOptional<string[]>;
  expiryDate:string;
  salary:number;
  experience:string;
  employementType:string;
  projectLength:string;
  location:string;
  CompanyId:number;
  
}
export const Job = sequelize.define<JobModel>('Job', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    unique: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionShort: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descriptionLong: {
    type: DataTypes.TEXT,
  },
  requirements: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  tags: {
    type: DataTypes.JSON,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  expiryDate:{
    type:DataTypes.DATE,
    allowNull:false
  },
  salary:{
    type:DataTypes.FLOAT,
    allowNull:false
  },
  experience:{
    type:DataTypes.STRING,
    allowNull:false
  },
  employementType:{
    type:DataTypes.STRING,
    allowNull:false
  },
  projectLength:{
    type:DataTypes.STRING,
    allowNull:false
  },
  location:{
    type:DataTypes.STRING,
    allowNull:false
  },
  CompanyId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Companies',
      key: 'id',
    },
  },
},{
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
});
