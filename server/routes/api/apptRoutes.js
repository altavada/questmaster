const router = require("express").Router();

const {
  createAppt,
  getAppts,
  getOneAppt,
} = require("../../controllers/appt-controllers");

router.route("/").post(createAppt).get(getAppts);
router.route("/:id").get(getOneAppt);

module.exports = router;
