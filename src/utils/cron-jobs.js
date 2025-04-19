// We use cron jobs for cancel the booking data that are older than 30 min.But We only cancel those data that are in the "pending" status or "initiate" status.

const cron = require("node-cron");

const {cancelOldBookingData }= require('../services/booking-service');

function cronScheduling() {
  cron.schedule("*/30 * * * * ", async () => {
    const res =  await cancelOldBookingData();
    console.log(res);
  });
}


module.exports = cronScheduling;