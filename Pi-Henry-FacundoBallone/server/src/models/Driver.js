const { DataTypes } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Driver", {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    forename: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    surname: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      length: 500,
    },
    nationality: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    dob: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    createdinDB: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    teams: {
      type: DataTypes.STRING,
    },
  });
};
