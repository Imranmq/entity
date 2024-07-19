// routes/dataSets.js
const express = require('express');
const router = express.Router();
const DataSet = require('../models/DataSet');

router.post('/', async (req, res) => {
  try {
    const dataSet = new DataSet(req.body);
    await dataSet.save();
    res.status(201).json(dataSet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const dataSet = await DataSet.findById(req.params.id).populate('linkedEntities');
    if (!dataSet) {
      return res.status(404).json({ error: 'DataSet not found' });
    }
    res.json(dataSet);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
