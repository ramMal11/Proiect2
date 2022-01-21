const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Team = sequelize.define(
  "Team",
  {
    teamId: {
      type: DataTypes.INTEGER
    },
    projectID: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    teamName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }
);

module.exports = Team;