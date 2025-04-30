const { where, Op, and } = require("sequelize");
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

  async cancelOldBooking(timestemp){
        const response = await Booking.update({status:"cancelled"},{
             where : {
               [Op.and] : [
                 
                    {
                      createdAt : {
                        [Op.lt] : timestemp
                      }
                    },
                    {
                        status : {
                          [Op.ne] : "cancelled"
                        }
                    },
                    {
                         status : {
                          [Op.ne] : "confirmed"
                         }
                    }

               ]
             }
        });

         return response;
  
  }


  async getBookingDetailsByUserId(userId){
        const result = await Booking.findAll({
             where : {
                 userId:userId
             }
        })
        return result;
  }
}
module.exports = BookingRepository;
