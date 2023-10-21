import type { Migration } from '../umguz';
import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export const up: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().createTable('CompanySocial', {
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
    platformType: {
      type: DataTypes.ENUM('facebook', 'linkedin', 'twitter', 'crunchbase'),
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
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
  await context.getQueryInterface().dropTable('CompanySocial');
};
