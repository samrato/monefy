const Joi = require('joi');
const Trip = require('../models/Trip');

const tripSchema = Joi.object({
  destination: Joi.string().required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().required(),
  currency: Joi.string().required(),
});

const createTrip = async (req, res, next) => {
  try {
    const { error } = tripSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { destination, startDate, endDate, currency } = req.body;

    const trip = new Trip({
      user: req.user._id,
      destination,
      startDate,
      endDate,
      currency,
    });

    const createdTrip = await trip.save();
    res.status(201).json(createdTrip);
  } catch (error) {
    next(error);
  }
};

const getTrips = async (req, res, next) => {
  try {
    const trips = await Trip.find({ user: req.user._id });
    res.json(trips);
  } catch (error) {
    next(error);
  }
};

const getTripById = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
      res.json(trip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    next(error);
  }
};

const updateTrip = async (req, res, next) => {
  try {
    const { error } = tripSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
      trip.destination = req.body.destination || trip.destination;
      trip.startDate = req.body.startDate || trip.startDate;
      trip.endDate = req.body.endDate || trip.endDate;
      trip.currency = req.body.currency || trip.currency;

      const updatedTrip = await trip.save();
      res.json(updatedTrip);
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    next(error);
  }
};

const deleteTrip = async (req, res, next) => {
  try {
    const trip = await Trip.findById(req.params.id);

    if (trip && trip.user.toString() === req.user._id.toString()) {
      await trip.deleteOne();
      res.json({ message: 'Trip removed' });
    } else {
      res.status(404).json({ message: 'Trip not found' });
    }
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createTrip,
  getTrips,
  getTripById,
  updateTrip,
  deleteTrip,
};
