const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");
const Project = require("./project");

const User = sequelize.define(
  "User",
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,

    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    userEmail: {
      type: DataTypes.STRING,
      validate:{
        isEmail:true
      },
      unique: true
    },
    userPassword:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        is: /^[a-z]+$/i
      }
    },
    userRole:{
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        isIn: [['P', 'S']]
      }
    }
  }
);


module.exports = User;