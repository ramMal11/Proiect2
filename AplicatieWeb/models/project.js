const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Project = sequelize.define(
 'Project',
  {
    projectID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    projectName: {
      type: DataTypes.STRING,
      allowNull: false,

    }
  }
);


module.exports = Project;