const express = require('express');
const apiRoutes = require("./routes/index.js");
const app = express();


//for routes
app.use('/api',apiRoutes);

app.use("/", (req, res) => {
  res.status(200).json({ message: "Hey welcome,to my Flight Booking server" });
});

//This route for unknown url request to server
app.use("*", (req, res) => {
  res.status(400).send("OOPS! 404 page not found");
});

module.exports = app;