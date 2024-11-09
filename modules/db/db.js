const { Sequelize, DataTypes } = require('sequelize');

// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('oneway', 'root', '1234', {
    host: 'localhost',
    dialect: 'mysql' /* one of 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake' | 'oracle' */
  });

//   sequelize.authenticate().then(val=>console.log("conectado")).catch(err=>console.log("erro",err));

module.exports = {DataTypes, Sequelize, sequelize};