const { Teams } = require("../db");
const axios = require("axios");

const getTeams = async () => {
  const teamsDB = await Teams.findAll();

  if (!teamsDB.length) {
    try {
      const response = await axios.get(`http://localhost:5000/drivers`);
      const drivers = response.data;
      let teams = drivers
        .map((driver) => driver.teams)
        .filter((teams) => teams !== undefined)
        .reduce((acc, teams) => {
          const splitTeams = teams.split(",").map((team) => team.trim());
          return [...acc, ...splitTeams];
        }, []);
      teams = [...new Set(teams)]; //borra los dup
      const teamsobj = teams.map((name) => ({ name }));
      await Teams.bulkCreate(teamsobj); //almacenar multiples registros en bd
      return teams.sort();
    } catch (error) {
      throw new Error("Error en la peticion de la API");
    }
  } else {
    const driverTeams = teamsDB.map((driver) => driver.name);
    return driverTeams.sort();
  }
};

module.exports = getTeams;
