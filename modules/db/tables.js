const {sequelize, DataTypes} = require('./db');

const User = sequelize.define(
    'User',
    {
      // Model attributes are defined here
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        // allowNull defaults to true
      },
    })

    
    // User.sync({force:true});

    module.exports = {User};

