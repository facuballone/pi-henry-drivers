const axios = require("axios");
const { Driver, Teams } = require("../db");

const noimagen = "https://media-public.canva.com/liUNw/MAEWOiliUNw/1/tl.png";

let allDrivers = [];

const getAllDrivers = async (name) => {
  const allDriversDB = await Driver.findAll({
    includes: {
      model: Teams,
      attributes: ["name"],
      through: {
        attributes: [],
      },
    },
  });

  const getApi = (await axios("http://localhost:5000/drivers")).data;
  const allDriversApi = getApi.map((driver) => {
    return {
      id: driver.id,
      forename: driver.name.forename,
      surname: driver.name.surname,
      description: driver.description,
      image: driver.image.url || noimagen,
      nationality: driver.nationality,
      dob: driver.dob,
      teams: driver.teams || "Does not have defined teams",
      createdinDB: false,
    };
  });

  allDrivers = [...allDriversApi, ...allDriversDB];

  if (name && name !== undefined) {
    let driversByName = allDrivers.filter((driver) =>
      driver.forename.toLowerCase().startsWith(name.toLowerCase())
    );

    let driversBySurName = allDrivers.filter((driver) =>
      driver.surname.toLowerCase().startsWith(name.toLowerCase())
    );

    if (driversByName.length) {
      return driversByName.slice(0, 15);
    } else if (driversBySurName.length) {
      return driversBySurName.slice(0, 15);
    } else {
      throw new Error(`
      Not found by name: ${name}`);
    }
  }

  return allDrivers;
};

module.exports = getAllDrivers;
