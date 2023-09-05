const router = require("express").Router();
const {
  createStylist,
  getAllStylists,
  getStylist,
} = require("../../controllers/stylist-controllers");
const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createStylist).get(getAllStylists);

router.route("/me").get(authMiddleware, getStylist);

module.exports = router;
