const { BookingRepository } = require("../repositories");

const bookingRepository = new BookingRepository();
async function getBookingDetails(userId) {
  try {
    const result = await bookingRepository.getBookingDetailsByUserId(userId);
    return result;
  } catch (error) {
    console.log(
      "Error in getBookingDetails service function : ",
      error.message
    );
    throw error;
  }
}

module.exports = {
  getBookingDetails,
};
