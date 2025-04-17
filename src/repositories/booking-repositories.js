const { Booking } = require("../models");
const CrudRepository = require('./crud-repositories');

class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  async createBooking(data){
    const result = await Booking.create(data);
    return result;
  }
}
module.exports = BookingRepository;
