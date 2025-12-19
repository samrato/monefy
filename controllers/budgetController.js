const Joi = require('joi');
const Budget = require('../models/Budget');
const Trip = require('../models/Trip');

const budgetSchema = Joi.object({
  totalBudget: Joi.number().required(),
});

const expenseSchema = Joi.object({
  category: Joi.string().required(),
  amount: Joi.number().required(),
  description: Joi.string(),
});

const setBudget = async (req, res, next) => {
  try {
    const { error } = budgetSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { totalBudget } = req.body;
    const { tripId } = req.params;

    const trip = await Trip.findById(tripId);

    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    let budget = await Budget.findOne({ trip: tripId });

    if (budget) {
      budget.totalBudget = totalBudget;
    } else {
      budget = new Budget({
        trip: tripId,
        totalBudget,
      });
    }

    const updatedBudget = await budget.save();
    res.status(201).json(updatedBudget);
  } catch (error) {
    next(error);
  }
};

const getBudget = async (req, res, next) => {
  try {
    const { tripId } = req.params;

    const budget = await Budget.findOne({ trip: tripId });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found for this trip' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    res.json(budget);
  } catch (error) {
    next(error);
  }
};

const addExpense = async (req, res, next) => {
  try {
    const { error } = expenseSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    const { category, amount, description } = req.body;
    const { tripId } = req.params;

    const budget = await Budget.findOne({ trip: tripId });

    if (!budget) {
      return res.status(404).json({ message: 'Budget not found for this trip' });
    }

    const trip = await Trip.findById(tripId);
    if (!trip || trip.user.toString() !== req.user._id.toString()) {
      return res.status(404).json({ message: 'Trip not found' });
    }

    const newExpense = {
      category,
      amount,
      description,
    };

    budget.expenses.push(newExpense);
    await budget.save();

    res.status(201).json(budget);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  setBudget,
  getBudget,
  addExpense,
};
