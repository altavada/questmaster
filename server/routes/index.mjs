const router = require('express').Router();
const apiRoutes = require("./api/index.mjs");

router.use("/api", apiRoutes);

export default router;
