const router = require("express").Router();
const Stylist = require("../../models/Stylist");

// create new stylist
router.post("/", async (req, res) => {
  try {
    const { name, title, bio, image_url, email, password, adminKey } = req.body;
    const stylist = new Stylist({
      name,
      title,
      bio,
      image_url,
      email,
      password,
      adminKey,
    });
    await stylist.save();
    res.status(200).json({
      message: "New stylist created!",
      stylist,
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
});

module.exports = router;
