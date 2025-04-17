const express = require("express");

const information = require("../../controllers/info.controllers.js");
const bookingRoutes = require('./booking-routes.js');
const router = express.Router();

router.get("/info", information.info);

router.use('/booking',bookingRoutes);

module.exports = router;
