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
      if (!appts || appts.length == 0) {
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
      if (!appointments || appointments.length === 0) {
        return res
          .status(400)
          .json({ message: "No appointments found for this stylist" });
      }
      res.json(appointments);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error", err });
    }
  },
  // "user" data from jwt via authMiddleware, must be admin
  // localhost:3001/api/appointments/update
  // request must contain body.id (appointment ID)
  async updateAppt({ user, body }, res) {
    try {
      if (!user.isAdmin) {
        return res.status(400).json({ message: "Permission denied" });
      }
      const appt = await Appt.findById(body.id);
      if (!appt) {
        return res.status(400).json({ message: "Appointment not found" });
      }
      appt.time = body.time || appt.time;
      appt.stylist = body.stylist || appt.stylist;
      appt.customer = body.customer || appt.customer;
      appt.phone = body.phone || appt.phone;
      appt.email = body.email || appt.email;
      appt.service = body.service || appt.service;
      await appt.save();
      res.json({ message: "Appointment updated!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error", err });
    }
  },
  // admin authentication
  // localhost:3001/api/appointments/:id
  async cancelAppt({ user, params }, res) {
    try {
      if (!user.isAdmin) {
        return res.status(400).json({ message: "Permission denied" });
      }
      const deleted = await Appt.findOneAndDelete({ _id: params.id });
      if (!deleted) {
        return res.status(404).json({ message: "Appointment not found" });
      }
      const stylistId = deleted.stylist;
      const stylist = await Stylist.findByIdAndUpdate(
        stylistId,
        { $pull: { appointments: params.id } },
        { new: true }
      );
      res.json({ message: "Appointment canceled", deleted, stylist });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error", err });
    }
  },
};
