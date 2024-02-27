const getTeams = require("../controllers/getTeams");

const getTeamsHandler = async (req, res) => {
  try {
    const allTeams = await getTeams();
    res.status(200).json(allTeams);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = getTeamsHandler;
