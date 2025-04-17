const express = require('express');
const { bookingControllers } = require('../../controllers');

const router = express.Router();


router.post('/',bookingControllers.createBooking);


module.exports = router;