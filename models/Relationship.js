// models/Relationship.js
const mongoose = require("mongoose");

const relationshipSchema = new mongoose.Schema({
  source: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entity",
    required: true,
  },
  target: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Entity",
    required: true,
  },
  relationshipType: {
    type: String,
    required: true,
  },
  attributes: {
    type: Map,
    of: String,
    default: {},
  },
});

const Relationship = mongoose.model("Relationship", relationshipSchema);
module.exports = Relationship;
