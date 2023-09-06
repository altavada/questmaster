const router = require("express").Router();

const {
  createStylist,
  getAllStylists,
  getStylist,
  login,
  updateStylist,
} = require("../../controllers/stylist-controllers");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createStylist).get(getAllStylists);
router.route("/login").post(login);
router.route("/me").get(authMiddleware, getStylist);
router.route("/:name").get(getStylist);
router.route("/:id").put(updateStylist);

module.exports = router;
