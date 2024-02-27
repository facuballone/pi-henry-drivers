const getAllDrivers = require("../controllers/getAllDrivers");

const getAllDriversHandller = async (req, res) => {
  const { name } = req.query;
  try {
    if (name) {
      const filteredDrivers = await getAllDrivers(name);
      res.status(200).json(filteredDrivers);
    } else {
      const allDrivers = await getAllDrivers();
      res.status(200).json(allDrivers);
    }
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getAllDriversHandller;
