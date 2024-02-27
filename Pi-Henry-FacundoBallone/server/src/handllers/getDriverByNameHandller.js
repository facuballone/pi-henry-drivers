const getDriverByName = require("../controllers/getDriverByName");

const getDriverByNameHandller = async (req, res) => {
  const name = req.query.name;
  try {
    const driverByName = await getDriverByName(name);
    res.status(200).json(driverByName);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getDriverByNameHandller;
