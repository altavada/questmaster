const router = require("express").Router();
const stylistRoutes = require("./stylistRoutes.js");
const apptRoutes = require("./apptRoutes");

router.use("/stylists", stylistRoutes);
router.use("/appointments", apptRoutes);

module.exports = router;
