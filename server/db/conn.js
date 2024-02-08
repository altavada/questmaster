const mongoose = require("mongoose");

mongoose.connect(process.env.ATLAS_URI);

module.exports = mongoose.connection;
