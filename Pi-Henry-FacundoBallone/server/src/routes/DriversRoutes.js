const { Router } = require("express");
const driversRoutes = Router();

const getAllDriversHandller = require("../handllers/getAllDriversHandller");
const getDriverByIdHandller = require("../handllers/getDriverByIDHandller");
const postDriverHandler = require("../handllers/postDriversHandler");

driversRoutes.get("/", getAllDriversHandller);
driversRoutes.get("/:id", getDriverByIdHandller);
driversRoutes.post("/form", postDriverHandler);

module.exports = driversRoutes;
