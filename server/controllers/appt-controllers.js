const Stylist = require("../models/Stylist");
const Appt = require("../models/Appointment");
const Appointment = require("../models/Appointment");

module.exports = {
  async createAppt({ body }, res) {
    try {
      const appt = await Appt.create(body);
      if (!appt) {
        return res.status(400).json({ message: "Error creating appointment" });
      }
      const stylist = await Stylist.findById(body.stylist);
      if (!stylist) {
        return res.status(400).json({ message: "Assigned stylist not found" });
      }
      stylist.appointments.push(appt._id);
      await stylist.save();
      res.json({ message: "Appointment created!", appt });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getAppts(req, res) {
    try {
      const appts = await Appointment.find();
      if (!appts) {
        return res.status(400).json({ message: "No appointments found" });
      }
      res.json(appts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getOneAppt({ params }, res) {
    try {
      const appt = await Appointment.findById(params.id);
      if (!appt) {
        res.status(400).json({ message: "Appointment not found" });
      }
      res.json(appt);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    }
  },
  async getApptsByStylist({ params }, res) {
    try {
      const stylistId = params.stylist;
      const stylist = await Stylist.findById(stylistId);
      if (!stylist) {
        return res.status(400).json({ message: "No such stylist" });
      }
      const appointments = await Appt.find({ stylist: stylistId });
      if (!appointments) {
        return res
          .status(400)
          .json({ message: "Stylist currently has no appointments" });
      }
      res.json(appointments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error", err });
    }
  },
};
