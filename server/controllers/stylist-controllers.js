const Stylist = require("../models/Stylist");
const { signToken } = require("../utils/auth");

module.exports = {
  async createStylist({ user, body }, res) {
    try {
      if (!user.isAdmin) {
        return res.status(400).json({ message: "Access denied." });
      }
      const stylist = await Stylist.create(body);
      if (!stylist) {
        return res.status(400).json({ message: "Error creating stylist." });
      }
      res.json({ message: "New stylist created!", stylist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error", err });
    }
  },
  async getAllStylists(req, res) {
    try {
      const stylists = await Stylist.find();
      if (!stylists) {
        return res.status(400).json({ message: "No stylists found" });
      }
      res.json(stylists);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching stylists.", err });
    }
  },
  async getStylist({ user = null, params }, res) {
    try {
      const stylist = await Stylist.findOne({
        $or: [{ _id: user ? user._id : params.id }, { name: params.name }],
      });
      if (!stylist) {
        return res.status(400).json({ message: "User not found." });
      }
      res.json(stylist);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error fetching stylist.", err });
    }
  },
  async login({ body }, res) {
    try {
      const stylist = await Stylist.findOne({
        $or: [{ name: body.name }, { email: body.email }],
      });
      if (!stylist) {
        return res.status(400).json({ message: "User not found" });
      }
      const pwcheck = await stylist.isCorrectPassword(body.password);
      if (!pwcheck) {
        return res.status(400).json({ message: "Wrong credentials", err });
      }
      const token = signToken(stylist);
      res.json({ token, stylist });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Internal server error", err });
    }
  },
  // users can update only their own personal info
  async updateStylist({ user, body }, res) {
    try {
      const stylist = await Stylist.findOne({ _id: user._id });
      if (!stylist) {
        return res.status(400).json({ message: "User not found" });
      }
      stylist.name = body.name || stylist.name;
      stylist.title = body.title || stylist.title;
      stylist.bio = body.bio || stylist.bio;
      stylist.image_url = body.image_url || stylist.image_url;
      stylist.email = body.email || stylist.email;
      stylist.password = body.password || stylist.password;
      stylist.adminKey = body.adminKey || stylist.adminKey;
      await stylist.save();
      const token = signToken(stylist);
      res.json({ message: "Stylist updated!", token, stylist });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating stylist", err });
    }
  },
  // admins can remove accounts from database
  async deleteStylist({ user, params }, res) {
    try {
      if (!user.isAdmin) {
        return res.status(400).json({ message: "Access denied." });
      }
      const deleted = await Stylist.findOneAndDelete({ name: params.name });
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted", deleted });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Internal server error", err });
    }
  },
};
