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
import { contactType } from '../types/model-types';
interface CompanyContactModel
  extends Model<
    InferAttributes<CompanyContactModel>,
    InferCreationAttributes<CompanyContactModel>
  > {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  contactType: contactType;
  title: string;
  value: string;
  CompanyId?: number;
}
export const CompanyContact = sequelize.define<CompanyContactModel>(
  'CompanyContact',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    contactType: {
      type: DataTypes.STRING,
      allowNull:false
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false
    },
    value: {
      type: DataTypes.STRING,
      allowNull:false
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
