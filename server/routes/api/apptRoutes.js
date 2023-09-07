const router = require("express").Router();

const { createAppt } = require("../../controllers/appt-controllers");

router.route("/").post(createAppt);

module.exports = router;
