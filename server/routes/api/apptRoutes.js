const router = require("express").Router();

const {
  createAppt,
  getAppts,
  getOneAppt,
  getApptsByStylist,
  updateAppt,
} = require("../../controllers/appt-controllers");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createAppt).get(getAppts);
router.route("/:id").get(getOneAppt);
router.route("/stylist/:stylist").get(getApptsByStylist);
router.route("/update").put(authMiddleware, updateAppt);

module.exports = router;
