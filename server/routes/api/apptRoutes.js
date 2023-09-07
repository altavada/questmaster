const router = require("express").Router();

const {
  createAppt,
  getAppts,
  getOneAppt,
  getApptsByStylist,
} = require("../../controllers/appt-controllers");

router.route("/").post(createAppt).get(getAppts);
router.route("/:id").get(getOneAppt);
router.route("/stylist/:stylist").get(getApptsByStylist);

module.exports = router;
