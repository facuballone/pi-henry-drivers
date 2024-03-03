const { Driver, Teams } = require("../db");

const postDrivers = async (
  forename,
  surname,
  description,
  image,
  dob,
  nationality,
  createdinDB,
  teams
) => {
  Driver.findOrCreate({ //para buscar si existe lo de where
    where: { forename, surname },
    defaults: {
      forename,
      surname,
      description,
      image,
      dob,
      nationality,
      createdinDB,
      teams,
    },
  })
    .then(([user, created]) => {  // rp
      if (created) {
        return `Nuevo usuario creado: ${user.surname}`;
      } else {
        return `Usuario existente: ${user.surname}`;
      }
    })
    .catch((err) => {
      throw new Error(err);
    });
};

module.exports = postDrivers;
