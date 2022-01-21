const { DataTypes } = require("sequelize");
const sequelize = require("../config/sequelize");

const Stage = sequelize.define(
  "Stage",
  {
    stageNumber: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    stageDeadlineDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    stageDeliveryContent:{
        type: DataTypes.BLOB
    }
  }
);


module.exports = Stage;