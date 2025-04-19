const { StatusCodes } = require("http-status-codes");
const { bookingService } = require("../services");
async function createBooking(req, res) {
  try {
    const flight = await bookingService.createBooking({
      flightId: req.body.flightId,
      userId: req.body.userId,
      noOfSeats: req.body.noOfSeats,
    });
    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Flight booking successfully",
      data: flight,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while booking your flight ",
      data: {},
      error: error,
    });
  }
}

async function makePayment(req, res) {
  try {
    const payment = await bookingService.makePayment({
      bookingId: req.body.bookingId,
      totalCost: req.body.totalCost,
      userId: req.body.userId,
    });

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Flight booking successfully",
      data: payment,
      error: {},
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message: "Something went wrong while initiating your payment ",
      data: {},
      error: error,
    });
  }
}


// Here we right the logic for canceling a booking

/**
 * 
 * code
 */
module.exports = {
  createBooking,
  makePayment,
};
