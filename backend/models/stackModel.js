const mongoose = require("mongoose");

const stackSchema = new mongoose.Schema({});

module.exports = mongoose.model("Problems", stackSchema);
