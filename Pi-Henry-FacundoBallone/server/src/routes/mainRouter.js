const { Router } = require("express");
const driversRoutes = require("./DriversRoutes");
const teamsRoutes = require("./teamsRoutes");

const mainRouter = Router();
mainRouter.use("/drivers", driversRoutes);
mainRouter.use("/teams", teamsRoutes);

module.exports = mainRouter;
