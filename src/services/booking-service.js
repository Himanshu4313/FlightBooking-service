const axios = require("axios");

const dotenv = require("dotenv");

dotenv.config();

const { BookingRepository } = require("../repositories");

const db = require("../models");

const FLIGHT_SERVICE_URL = process.env.FLIGHT_SERVICE;

const bookingRepository = new BookingRepository();

async function createBooking(data) {
  const transaction = await db.sequelize.transaction();
  try {
    const flight = await axios.get(
      `${FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}`
    );
    const flightData = flight.data.data;

    if (data.noOfSeats > flightData.totalSeats) {
      //  return {status: false, message: "Not enough seats available"};
      throw new Error("Not enough seats available");
    }

    const totalBillingAmount = data.noOfSeats * flightData.price;

    const bookingPayload = { ...data, totalCost: totalBillingAmount };

    const booking = await bookingRepository.createBooking(
      bookingPayload,
      transaction
    );

    const response = await axios.patch(
      `${FLIGHT_SERVICE_URL}/api/v1/flights/${data.flightId}/seats`,
      {
        seats: data.noOfSeats,
      }
    );

    await transaction.commit();
    return booking;
  } catch (error) {
    console.log("Error found :", error.message);
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  createBooking,
};
