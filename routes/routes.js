const express = require('express');
const authRoutes = require('./authRoutes');
const tripRoutes = require('./tripRoutes');
const budgetRoutes = require('./budgetRoutes');
const wishlistRoutes = require('./wishlistRoutes');

const router = express.Router();

router.use('/auth', authRoutes);
router.use('/trips', tripRoutes);

// Nest budget and wishlist routes under trips
tripRoutes.use('/:tripId/budget', budgetRoutes);
tripRoutes.use('/:tripId/wishlist', wishlistRoutes);

module.exports = router;
