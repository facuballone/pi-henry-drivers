const getDriverByID = require("../controllers/getDriverByID");

const getDriverByIdHandller = async (req, res) => {
  const { id } = req.params;
  try {
    const driverById = await getDriverByID(id);
    res.status(200).json(driverById);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getDriverByIdHandller;
