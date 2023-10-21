import type { Migration } from '../umguz';
import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export const up: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().createTable('UserCertification', {
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
    createdAt: {
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
  });
};

export const down: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().dropTable('UserCertification');
};
