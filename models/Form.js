// models/Form.js
const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fields: [{
    name: {
      type: String,
      required: true,
    },
    fieldType: {
      type: String,
      required: true,
    },
    required: {
      type: Boolean,
      default: false,
    },
  }],
});

const Form = mongoose.model('Form', formSchema);
module.exports = Form;
