import type { Migration } from '../umguz';
import { DataTypes, Sequelize, UUIDV4 } from 'sequelize';

export const up: Migration = async ({ context }: { context: Sequelize }) => {
  await context.getQueryInterface().removeColumn('Users', 'userName');
};

// export const down: Migration = async ({ context }: { context: Sequelize }) => {
//   await context.getQueryInterface().removeColumn('Users', 'userName');
// };
