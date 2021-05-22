require('dotenv').config();

const Sequelize = require('sequelize');

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: 'postgres',
});

sequelize.authenticate().then(
  function success() {
    console.log('Connected to DB');
  },

  function fail(err) {
    console.log(`Error: ${err}`);
  },
);

module.exports = sequelize;
