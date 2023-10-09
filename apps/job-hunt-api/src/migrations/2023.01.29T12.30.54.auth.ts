import type { Migration } from '../umguz';
import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export const up: Migration = async ({ context }: { context: Sequelize }) => {

  await context.getQueryInterface().createTable('Auth', {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        min: {
          args: [6],
          msg: 'Password must be atleast six characters long',
        },
      },
    },
    type: {
      type: DataTypes.ENUM('COMPANY', 'USER'),
      allowNull: false,
    },
    authType: {
      type: DataTypes.STRING,
      defaultValue: "CUSTOM",
    },
    verified: {
      type: DataTypes.BOOLEAN,
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
    CompanyId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Companies',
        key: 'id',
      },
    },
    profileImage: {
      type: DataTypes.STRING,
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
  await context.getQueryInterface().dropTable('Auth');
};
