import type { Migration } from '../umguz';
import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export const up: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().createTable('Jobs', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
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
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
};

export const down: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().dropTable('Jobs');
};
