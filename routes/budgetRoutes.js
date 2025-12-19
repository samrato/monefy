const express = require('express');
const {
  getBudget,
  setBudget,
  addExpense,
} = require('../controllers/budgetController');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router({ mergeParams: true });

router.route('/').get(protect, getBudget).post(protect, setBudget);
router.route('/expenses').post(protect, addExpense);

module.exports = router;
