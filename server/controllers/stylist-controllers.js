const Stylist = require("../models/Stylist");
const { signToken } = require("../utils/auth");

module.exports = {
  async createStylist({ body }, res) {
    const stylist = await Stylist.create(body);
    if (!stylist) {
      return res.status(400).json({ message: "Error creating stylist." });
    }
    const token = signToken(stylist);
    res.json({ message: "New stylist created!", token, stylist });
  },
  async getAllStylists(req, res) {
    try {
      const stylists = await Stylist.find();
      res.json(stylists);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Error fetching stylists." });
    }
  },
};
