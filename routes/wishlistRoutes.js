const express = require('express');
const {
  getWishlist,
  addWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
} = require('../controllers/wishlistController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.route('/').get(protect, getWishlist).post(protect, addWishlistItem);
router
  .route('/items/:itemId')
  .put(protect, updateWishlistItem)
  .delete(protect, deleteWishlistItem);

module.exports = router;
