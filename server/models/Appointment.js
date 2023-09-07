const { Schema, model, models } = require("mongoose");

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
  service: {
    type: String,
    required: true,
  },
});

// middleware to prevent double-booking
apptSchema.pre("save", async function (next) {
  const appt = this;
  const isDoubleBooked = await models.Appointment.exists({
    _id: { $ne: appt._id },
    date: appt.date,
    time: appt.time,
    stylist: appt.stylist,
  });
  if (isDoubleBooked) {
    const err = "Cannot double-book appointments";
    return next(new Error(err));
  }
  next();
});

const Appointment = model("Appointment", apptSchema);

module.exports = Appointment;
