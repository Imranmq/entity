// models/DataSet.js
const mongoose = require("mongoose");

const dataSetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  linkedEntities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entity",
    },
  ],
  data: {
    type: Map,
    of: String,
    default: {},
  },
});

const DataSet = mongoose.model("DataSet", dataSetSchema);
module.exports = DataSet;
