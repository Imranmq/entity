// models/Entity.js
const mongoose = require("mongoose");

const entitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  attributes: {
    type: Map,
    of: String,
    default: {},
  },
  forms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Form",
    },
  ],
  filledForms: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FilledForm",
    },
  ],
});

const Entity = mongoose.model("Entity", entitySchema);
module.exports = Entity;
