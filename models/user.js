const Sequelize = require('sequelize');

module.exports =(sequelize, Datatypes) => {
  return sequelize.define("user", {
    user_id: {
      type: Datatypes.INTEGER,
      allowNull: true,
      primaryKey: true,
    },
    password: {
      type: Datatypes.STRING(60),
      allowNull: false,
      unique: true,
    },
    nickname: {
      type: Datatypes.STRING(10),
      allowNull: false,
      unique: true,
    },
    email: { 
      type: Datatypes.STRING(36),
      allowNull: false,
      unique: true,
    }
  },
  {
    sequelize,
    timestamps: false,
    modelName: 'User',
    tableName: 'users',
    paranoid: false,
    charset: 'utf8',
    collate: 'utf8_general_ci',
  });
};