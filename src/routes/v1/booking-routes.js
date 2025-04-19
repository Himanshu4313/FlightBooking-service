const express = require("express");
const { bookingControllers } = require("../../controllers");

const router = express.Router();

router.post("/", bookingControllers.createBooking);

router.post("/payments", bookingControllers.makePayment);



module.exports = router;
