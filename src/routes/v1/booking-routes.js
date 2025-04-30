const express = require("express");
const { bookingControllers } = require("../../controllers");

const router = express.Router();

router.post("/", bookingControllers.createBooking);

router.post("/payments", bookingControllers.makePayment);


// This route help for get  booking details of the user when user get about it.

// id:userId
router.get('/booking-details/:id',bookingControllers.getbookingsDetails);



module.exports = router;
