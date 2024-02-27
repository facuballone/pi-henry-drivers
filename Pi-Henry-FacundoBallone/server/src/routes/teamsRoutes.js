const { Router } = require("express");
const teamsRoutes = Router();

const getTeamsHandler = require("../handllers/getTeamsHandler");

teamsRoutes.get("/", getTeamsHandler);

module.exports = teamsRoutes;
