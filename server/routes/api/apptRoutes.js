const router = require("express").Router();

const { createAppt, getAppts } = require("../../controllers/appt-controllers");

router.route("/").post(createAppt).get(getAppts);

module.exports = router;
