const Stylist = require("../models/Stylist");
const { signToken } = require("../utils/auth");

module.exports = {
  async createStylist({ body }, res) {
    try {
      const stylist = await Stylist.create(body);
      if (!stylist) {
        return res.status(400).json({ message: "Error creating stylist." });
      }
      const token = signToken(stylist);
      res.json({ message: "New stylist created!", token, stylist });
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
  async getStylist({ stylist = null, params }, res) {
    try {
      const foundStylist = await Stylist.findOne({
        $or: [
          { _id: stylist ? stylist._id : params.id },
          { name: params.name },
        ],
      });
      if (!foundStylist) {
        return res.status(400).json({ message: "User not found." });
      }
      res.json(foundStylist);
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
  async updateStylist({ stylist, body }, res) {
    try {
      const thisStylist = await Stylist.findOne({ _id: stylist._id });
      if (!thisStylist) {
        return res.status(400).json({ message: "User not found" });
      }
      thisStylist.name = body.name || thisStylist.name;
      thisStylist.title = body.title || thisStylist.title;
      thisStylist.bio = body.bio || thisStylist.bio;
      thisStylist.image_url = body.image_url || thisStylist.image_url;
      thisStylist.email = body.email || thisStylist.email;
      thisStylist.password = body.password || thisStylist.password;
      thisStylist.adminKey = body.adminKey || thisStylist.adminKey;
      await thisStylist.save();
      const token = signToken(thisStylist);
      res.json({ message: "Stylist updated!", token, thisStylist });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: "Error updating stylist", err });
    }
  },
  // admins can remove accounts from database
  async deleteStylist({ stylist, params }, res) {
    try {
      if (!stylist.isAdmin) {
        return res.status(400).json({ message: "Access denied." });
      }
      const deleted = await Stylist.findOneAndDelete({ name: params.name });
      if (!deleted) {
        return res.status(404).json({ message: "User not found" });
      }
      res.json({ message: "User deleted", deleted });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ message: "Error deleting stylist", err });
    }
  },
};
