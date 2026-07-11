/**
 * Routes: VFM Card Endpoints
 * Maps incoming HTTP requests to the VFM Card Controller.
 */
const express = require('express');
const router = express.Router();
const vfmCardController = require('../controllers/vfmCardController');

// Route placeholder for cards
router.post('/', vfmCardController.createCard);

module.exports = router;