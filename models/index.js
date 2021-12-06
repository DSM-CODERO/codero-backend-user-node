'use strict';

const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require("/../config/config.json")[env];
const db = {};

const sequelize = new Sequelize(
    config.database, 
    config.username, 
    config.password, 
    config
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = this.User;
db.Comment = this.Comment;
db.Board = this.Board;
db.Like = this.Like;

db.User = require("./user")(sequelize, Sequelize);
db.Comment = require("./comment")(sequelize, Sequelize);
db.Board = require("./board")(sequelize, Sequelize);
db.Like = require("./like")(sequelize, Sequelize);
db.RefreshToken = require("./refresh_token")(sequelize, Sequelize);
db.Role = require("./role")(sequelize, Sequelize);
db.userRole = require("./user_role")(sequelize, Sequelize);

db.User.hasMany(db.Comment, { foreignKey: "user_id", tatgetKey: "user_id"});
db.Comment.belongsTo(db.User, { foreignKey: "user_id"});

db.User.hasMany(db.Like, { foreignKey: "user_id", tatgetKey: "user_id"});
db.Like.belongsTo(db.User, { foreignKey: "user_id"});

db.Board.hasMany(db.Comment, { foreignKey: "board_id", tatgetKey: "board_id"});
db.Comment.belongsTo(db.Board, { foreignKey: "board_id"});

db.Board.hasMany(db.Like, { foreignKey: "board_id", tatgetKey: "board_id"});
db.Like.belongsTo(db.Board, { foreignKey: "board_id"});

db.User.hasMany(db.RefreshToken, { foreignKey: "user_id", tatgetKey: "user_id"});
db.RefreshToken.belongsTo(db.User, { foreignKey: "user_id"});

module.exports = db;