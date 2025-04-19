const { Booking } = require("../models");
const CrudRepository = require("./crud-repositories");

class BookingRepository extends CrudRepository {
  constructor() {
    super(Booking);
  }

  async createBooking(data, transaction) {
    const result = await Booking.create(data, { transaction: transaction });
    return result;
  }

  async get(id, transaction) {
    const result = await Booking.findByPk(id, { transaction: transaction });
    return result ;
  }

  async update(id, data, transaction) {
    const result = await Booking.update(
      data,
      {
        where: {
          id: id,
        },
      },
      { transaction: transaction }
    );
  }
}
module.exports = BookingRepository;
