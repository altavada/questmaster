const router = require("express").Router();

const {
  createAppt,
  getAppts,
  getFutureAppts,
  getArchivedAppts,
  getOneAppt,
  getApptsByStylist,
  getFutureApptsByStylist,
  getArchivedApptsByStylist,
  updateAppt,
  cancelAppt,
} = require("../../controllers/appt-controllers");

const { authMiddleware } = require("../../utils/auth");

router.route("/").post(createAppt).get(getAppts);
router.route("/lookup/:id").get(getOneAppt).delete(authMiddleware, cancelAppt);
router.route("/stylist/:stylist").get(getApptsByStylist);
router.route("/update").put(authMiddleware, updateAppt);
router.route("/future").get(getFutureAppts);
router.route("/archive").get(getArchivedAppts);
router.route("/stylist/future/:stylist").get(getFutureApptsByStylist);
router.route("/stylist/archive/:stylist").get(getArchivedApptsByStylist);

module.exports = router;
