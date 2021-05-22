import { config } from 'dotenv';
import { Sequelize } from 'sequelize';

config();

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
  },
);

sequelize.authenticate()
  .then(() => console.log('Connected to DB'))
  .catch((error) => console.log(`Error: ${error}`));
