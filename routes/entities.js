const express = require('express');
const router = express.Router();
const Entity = require('../models/Entity');
/**
 * @swagger
 * /entity:
 *   post:
 *     summary: Create a new entity
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               type:
 *                 type: string
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad request
 */

router.post('/', async (req, res) => {
  try {
    const entity = new Entity(req.body);
    await entity.save();
    res.status(201).json(entity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});


router.get('/:id', async (req, res) => {
  try {
    const entity = await Entity.findById(req.params.id);
    if (!entity) {
      return res.status(404).json({ error: 'Entity not found' });
    }
    res.json(entity);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
