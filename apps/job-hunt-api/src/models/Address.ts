import { sequelize } from '../config/db';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  UUIDV4,
} from 'sequelize';
interface AddressModel extends Model<InferAttributes<AddressModel>, InferCreationAttributes<AddressModel>> {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  streetAddress: string;
  zipCode:string;
  city:string;
  state:string;
  country:string;
  CompanyId?:number;
  UserId?:number;
}
export const Address = sequelize.define<AddressModel>('Address', {
  uuid: {
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
    unique: true,
  },
  streetAddress:{
    type:DataTypes.STRING,
    allowNull:false
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city:{
    type:DataTypes.STRING,
    allowNull:false
  },
  state:{
    type:DataTypes.STRING,
    allowNull:false
  },
  country:{
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
  UserId: {
    type: DataTypes.INTEGER,
    references: {
      model: 'Users',
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
