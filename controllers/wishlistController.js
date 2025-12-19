const Joi = require('joi');
const Wishlist = require('../models/Wishlist');
const Trip = require('../models/Trip');

const wishlistItemSchema = Joi.object({
  name: Joi.string().required(),
  estimatedPrice: Joi.number(),
});

const getWishlist = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const wishlist = await Wishlist.findOne({ trip: tripId });

    if (!wishlist) {
      // Create a new wishlist if one doesn't exist
      const newWishlist = new Wishlist({
        trip: tripId,
        items: [],
      });
      await newWishlist.save();
      return res.json(newWishlist);
    }

    res.json(wishlist);
  } catch (error) {
    next(error);
  }
};

const addWishlistItem = async (req, res, next) => {
  try {
    const { error } = wishlistItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, estimatedPrice } = req.body;
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    let wishlist = await Wishlist.findOne({ trip: tripId });

    if (!wishlist) {
      wishlist = new Wishlist({
        trip: tripId,
        items: [],
      });
    }

    const newItem = {
      name,
      estimatedPrice,
    };

    wishlist.items.push(newItem);
    await wishlist.save();

    res.status(201).json(wishlist);
  } catch (error) {
    next(error);
  }
};

const updateWishlistItem = async (req, res, next) => {
  try {
    const { error } = wishlistItemSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { name, estimatedPrice } = req.body;
    const { tripId, itemId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const wishlist = await Wishlist.findOne({ trip: tripId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const item = wishlist.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    item.name = name || item.name;
    item.estimatedPrice = estimatedPrice || item.estimatedPrice;

    await wishlist.save();
    res.json(wishlist);
  } catch (error) {
    next(error);
  }
};

const deleteWishlistItem = async (req, res, next) => {
  try {
    const { tripId, itemId } = req.params;

    const trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const wishlist = await Wishlist.findOne({ trip: tripId });

    if (!wishlist) {
      return res.status(404).json({ message: 'Wishlist not found' });
    }

    const item = wishlist.items.id(itemId);

    if (!item) {
      return res.status(404).json({ message: 'Wishlist item not found' });
    }

    item.deleteOne();

    await wishlist.save();
    res.json({ message: 'Item removed' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getWishlist,
  addWishlistItem,
  updateWishlistItem,
  deleteWishlistItem,
};
