const express = require('express');
const dotenv = require("dotenv");
dotenv.config();

const cron = require('../src/utils/cron-jobs.js');
const app = require("./app.js");

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is runnig at http://localhost:${PORT}`);
  cron();
});
