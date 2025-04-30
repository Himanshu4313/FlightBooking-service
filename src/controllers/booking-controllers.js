const { StatusCodes } = require("http-status-codes");
const { bookingService, bookingDetails } = require("../services");

const inMemDB = {};

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
    const idempotencyKey = req.headers["x-idempotency-key"];

    if (!idempotencyKey) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message: "Idempotency key is required",
      });
    }

    console.log(inMemDB[idempotencyKey]);
    if (inMemDB[idempotencyKey]) {
      return res.status(StatusCodes.BAD_REQUEST).json({
        success: false,
        message:
          "Duplicate payment attempt OR Cannot retry a payment that has already been processed",
      });
    }

    const payment = await bookingService.makePayment({
      bookingId: req.body.bookingId,
      totalCost: req.body.totalCost,
      userId: req.body.userId,
    });

    inMemDB[idempotencyKey] = idempotencyKey;

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

// This function for get Booking details of the user

async function getbookingsDetails(req, res) {
  try {
    const userId = req.params.id;

    const bookings = await bookingDetails.getBookingDetails(userId);

    return res.status(StatusCodes.OK).json({
      success: true,
      message: "Get Booking details successfully",
      data: bookings,
    });
  } catch (error) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      message:
        "Something went wrong while geting booking details of the user from booking server ",
      data: {},
      error: error,
    });
  }
}

module.exports = {
  createBooking,
  makePayment,
  getbookingsDetails
};
