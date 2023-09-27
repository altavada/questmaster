const router = require("express").Router();

const {
  createStylist,
  getAllStylists,
  getStylist,
  login,
  updateStylist,
  deleteStylist
} = require("../../controllers/stylist-controllers");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createStylist).get(getAllStylists);
router.route("/login").post(login);
router.route("/me").get(authMiddleware, getStylist);
router.route("/:id").get(getStylist).delete(authMiddleware, deleteStylist);
router.route("/update").put(authMiddleware, updateStylist);

module.exports = router;
