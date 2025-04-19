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

async function makePayment(data) {
  const transaction = await db.sequelize.transaction();
  try {
    /*
      example 
        data :{
         
         bookingId : 1,
         userId: 1,
         totalCost:15000
        
        }
      */
    const bookingDetails = await bookingRepository.get(
      data.bookingId,
      transaction
    );

    if (bookingDetails.status == "cancelled") {
      throw new Error("Booking is expired");
    }

    // Time comparison to check if the booking is still active

    const bookingTime = new Date(bookingDetails.createdAt);
    const currentTime = new Date();


    console.log(bookingTime , currentTime);
    console.log(bookingTime-currentTime);
    
    if (currentTime - bookingTime > 300000) {
      await bookingRepository.update(
        data.bookingId,
        { status: "cancelled" },
        transaction
      );

      // here we write logic of increement of seats in the flight table
           /**
            * //code 
            * 
            */

      throw new Error("Booking is expired");
    }

    if (bookingDetails.totalCost != data.totalCost) {
      throw new Error("Total cost mismatch");
    }

    if (bookingDetails.userId != data.userId) {
      throw new Error("User id mismatch");
    }

    //now assume the payment get success

    await bookingRepository.update(
      data.bookingId,
      { status: "confirmed" },
      transaction
    );

    await transaction.commit();
  } catch (error) {
    console.log("Error found :", error.message);
    await transaction.rollback();
    throw error;
  }
}

module.exports = {
  createBooking,
  makePayment,
};
