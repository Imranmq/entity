// routes/filledForms.js
const express = require('express');
const router = express.Router();
const FilledForm = require('../models/FilledForm');
const Entity = require('../models/Entity');

router.post('/', async (req, res) => {
  try {
    const filledForm = new FilledForm(req.body);
    await filledForm.save();
    // Link the filled form to the entity
    await Entity.findByIdAndUpdate(filledForm.entity, {
      $push: { filledForms: filledForm._id },
    });
    res.status(201).json(filledForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const filledForm = await FilledForm.findById(req.params.id).populate('form entity filledBy');
    if (!filledForm) {
      return res.status(404).json({ error: 'FilledForm not found' });
    }
    res.json(filledForm);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
