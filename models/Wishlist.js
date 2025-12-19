const mongoose = require('mongoose');

const wishlistItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  estimatedPrice: {
    type: Number,
  },
});

const wishlistSchema = new mongoose.Schema({
  trip: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Trip',
    required: true,
  },
  items: [wishlistItemSchema],
});

const Wishlist = mongoose.model('Wishlist', wishlistSchema);

module.exports = Wishlist;
