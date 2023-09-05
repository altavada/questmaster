const router = require('express').Router();
const stylistRoutes = require("./stylistRoutes.js");

router.use("/stylists", stylistRoutes);

module.exports = router;