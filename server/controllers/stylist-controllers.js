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
  async getStylist({ stylist = null, params }, res) {
    const foundStylist = await Stylist.findOne({
      $or: [{ _id: stylist ? stylist._id : params.id }, { name: params.name }],
    });
    if (!foundStylist) {
      return res.status(400).json({ message: "User not found." });
    }
    res.json(foundStylist);
  },
  async login({ body }, res) {
    const stylist = await Stylist.findOne({
      $or: [{ name: body.name }, { email: body.email }],
    });
    if (!stylist) {
      return res.status(400).json({ message: "User not found" });
    }
    const pwcheck = await stylist.isCorrectPassword(body.password);
    if (!pwcheck) {
      return res.status(400).json({ message: "Wrong credentials" });
    }
    const token = signToken(stylist);
    res.json({ token, stylist });
  },
  async updateStylist({ params, body }, res) {
    try {
      const thisStylist = await Stylist.findOne({ _id: params.id });
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
      console.log(err);
      return res.status(400).json(err);
    }
  },
};
