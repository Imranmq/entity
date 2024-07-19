// models/FilledForm.js
const mongoose = require('mongoose');

const filledFormSchema = new mongoose.Schema({
  form: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  },
  entity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Entity',
    required: true,
  },
  data: {
    type: Map,
    of: String,
    required: true,
  },
  filledBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  filledAt: {
    type: Date,
    default: Date.now,
  },
});

const FilledForm = mongoose.model('FilledForm', filledFormSchema);
module.exports = FilledForm;
