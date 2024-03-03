const axios = require("axios");
const { Op } = require("sequelize");
const { Driver, Teams } = require("../db");

const getDriverByName = async (name) => {
  let driver;
  if (name) {
    const driverDB = await Driver.findAll({
      where: {
        name: {
          [Op.iLike]: `%${name}%`,
        },
      },
      Include: Teams,
    });
    const driverApi = await axios(`http://localhost:5000/drivers/name?=${name}`)
      .data;
    driver = [...driverDB, ...driverApi];
    driver = driver.slice(0, 16);
    return driver;
  }
};
module.exports = getDriverByName;
