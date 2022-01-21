const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Assessment = sequelize.define(
  "Assessment",
  {
    evaluatorID: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    grade: {
        type: DataTypes.FLOAT,
    },
    evaluationDate:{
        type: DataTypes.DATE
    }
  }
);

module.exports = Assessment;