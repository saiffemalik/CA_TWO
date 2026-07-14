/**
 * Routes: VFM Card Endpoints
 * Maps incoming HTTP requests to the VFM Card Controller.
 */
const express = require('express');
const router = express.Router();
const vfmCardController = require('../controllers/vfmCardController');

// Route for creating a new VFM card
router.post('/', vfmCardController.createCard);

// Route for fetching all VFM cards
router.get('/', vfmCardController.getAllCards);

// Route for fetching a single VFM card by ID
router.get('/:id', vfmCardController.getCardById);

// Route to handle updating a VFM card by its unique ID
router.put('/:id', vfmCardController.updateCard);

// Route to handle deleting a VFM card by its unique ID
router.delete('/:id', vfmCardController.deleteCard);

module.exports = router;