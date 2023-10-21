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
interface UserCertificationModel
  extends Model<
    InferAttributes<UserCertificationModel>,
    InferCreationAttributes<UserCertificationModel>
  > {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  certificationName: string;
  publishedBy: string;
  location: string;
  startDate: string;
  endDate: string;
  isExpirationDate: boolean;
  certificate: string;
  UserId: number;
}
export const UserCertification = sequelize.define<UserCertificationModel>(
  'UserCertification',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    certificationName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    publishedBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    location: {
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
    isExpirationDate: {
      type: DataTypes.BOOLEAN,
    },
    certificate: {
      type: DataTypes.STRING,
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
