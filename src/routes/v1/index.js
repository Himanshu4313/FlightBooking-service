const express = require("express");

const information = require("../../controllers/info.controllers.js");
const router = express.Router();

router.get("/info", information.info);

module.exports = router;
