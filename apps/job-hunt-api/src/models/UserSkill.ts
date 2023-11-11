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
interface UserSkillModel
  extends Model<
    InferAttributes<UserSkillModel>,
    InferCreationAttributes<UserSkillModel>
  > {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  skill: string;
  UserId?:number;
}
export const UserSkill = sequelize.define<UserSkillModel>(
  'UserSkill',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    skill: {
      type: DataTypes.STRING,
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
