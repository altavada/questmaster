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

apptSchema.pre("save", async function (next) {
  const isDoubleBooked = await mongoose.models.Appointment.exists({
    _id: { $ne: this._id },
    date: this.date,
    time: this.time,
    stylist: this.stylist,
  });
  if (isDoubleBooked) {
    const err = "Cannot double-book appointments";
    return next(new Error(err));
  }
  next();
});

const Appointment = model("Appointment", apptSchema);

module.exports = Appointment;
