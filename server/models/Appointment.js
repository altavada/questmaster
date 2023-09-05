const { Schema, model } = require("mongoose");

const apptSchema = new Schema({
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  stylist: {
    type: Schema.Types.ObjectId,
    ref: "Stylist",
    required: true,
  },
  customer: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
});

const Appointment = model("Appointment", apptSchema);

module.exports = Appointment;