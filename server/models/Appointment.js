const { Schema, model, models } = require("mongoose");
const Stylist = require("./Stylist");

const apptSchema = new Schema({
  time: {
    type: Number,
    required: true,
  },
  stylist: {
    type: Schema.Types.ObjectId,
    ref: "Stylist",
    required: true,
  },
  stylistName: String,
  customer: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    isEmail: true,
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
    time: appt.time,
    stylist: appt.stylist,
  });
  if (isDoubleBooked) {
    const err = "Cannot double-book appointments";
    return next(new Error(err));
  }
  next();
});

// middleware to automatically add stylist name to appointment
apptSchema.pre("save", async function (next) {
  if (this.isNew || this.isModified("stylist")) {
    const stylist = await Stylist.findById(this.stylist);
    this.stylistName = stylist.name;
  }
  next();
});

const Appointment = model("Appointment", apptSchema);

module.exports = Appointment;
