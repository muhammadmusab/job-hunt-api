import { sequelize } from '../config/db';
import {
  Model,
  DataTypes,
  CreationOptional,
  InferAttributes,
  InferCreationAttributes,
  UUIDV4,
} from 'sequelize';
interface BlogModel extends Model<InferAttributes<BlogModel>, InferCreationAttributes<BlogModel>> {
  id?: CreationOptional<number>;
  uuid: CreationOptional<string>;
  title: string;
  subtitle: string;
  description: string;
  category: number;
  sectionImage: string;
  image1: string;
  image2: string;
  tags: string[];
}
export const Blog = sequelize.define<BlogModel>(
  'Blog',
  {
    uuid: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      unique: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    subtitle: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sectionImage: {
      type: DataTypes.STRING,
    },
    image1: {
      type: DataTypes.STRING,
    },
    image2: {
      type: DataTypes.STRING,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
