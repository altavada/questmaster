const router = require("express").Router();
const {
  createStylist,
  getAllStylists,
} = require("../../controllers/stylist-controllers");


router.route("/").post(createStylist).get(getAllStylists);

module.exports = router;
