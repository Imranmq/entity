// routes/relationships.js
const express = require('express');
const router = express.Router();
const Relationship = require('../models/Relationship');

router.post('/', async (req, res) => {
  try {
    const relationship = new Relationship(req.body);
    await relationship.save();
    res.status(201).json(relationship);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const relationship = await Relationship.findById(req.params.id).populate('source target');
    if (!relationship) {
      return res.status(404).json({ error: 'Relationship not found' });
    }
    res.json(relationship);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
