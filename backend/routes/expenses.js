const express = require('express');
const Expense = require('../models/Expense');
const { protect } = require('../middleware/auth');

const router = express.Router();

// All routes are protected
router.use(protect);

// POST /api/expenses — Create a new expense
router.post('/', async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({ message: 'Please provide title, amount, category and date' });
    }

    const expense = await Expense.create({
      title,
      amount,
      category,
      date,
      user: req.user._id,
    });

    res.status(201).json({ message: 'Expense created', expense });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error creating expense' });
  }
});

// GET /api/expenses — Get all expenses with advanced filtering & pagination
router.get('/', async (req, res) => {
  try {
    const { category, search, startDate, endDate, page = 1, limit = 10 } = req.query;
    const query = { user: req.user._id };

    if (category && category !== 'all') query.category = category;
    if (search) query.title = { $regex: search, $options: 'i' };
    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const total = await Expense.countDocuments(query);
    const expenses = await Expense.find(query)
      .sort({ date: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    res.json({
      expenses,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      totalCount: total,
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching expenses' });
  }
});

// GET /api/expenses/summary — Total + breakdown by category with percentages
router.get('/summary', async (req, res) => {
  try {
    const summary = await Expense.aggregate([
      { $match: { user: req.user._id } },
      {
        $group: {
          _id: '$category',
          total: { $sum: '$amount' },
          count: { $sum: 1 },
        },
      },
      { $sort: { total: -1 } },
    ]);

    const grandTotal = summary.reduce((acc, item) => acc + item.total, 0);

    res.json({
      grandTotal,
      budgetLimit: req.user.monthlyBudget || 0,
      breakdown: summary.map((item) => ({
        category: item._id,
        total: item.total,
        count: item.count,
        percentage: grandTotal > 0 ? ((item.total / grandTotal) * 100).toFixed(1) : 0,
      })),
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching summary' });
  }
});

// GET /api/expenses/stats — Daily trends for Chart.js
router.get('/stats', async (req, res) => {
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

    const stats = await Expense.aggregate([
      { 
        $match: { 
          user: req.user._id,
          date: { $gte: thirtyDaysAgo }
        } 
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$date" } },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { "_id": 1 } }
    ]);

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: 'Server error fetching stats' });
  }
});

// DELETE /api/expenses/:id — Delete an expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Make sure the expense belongs to the logged-in user
    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this expense' });
    }

    await expense.deleteOne();
    res.json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error deleting expense' });
  }
});

// PUT /api/expenses/:id — Update an expense
router.put('/:id', async (req, res) => {
  try {
    const { title, amount, category, date } = req.body;
    let expense = await Expense.findById(req.params.id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    if (expense.user.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this expense' });
    }

    expense = await Expense.findByIdAndUpdate(
      req.params.id,
      { title, amount, category, date },
      { new: true, runValidators: true }
    );

    res.json({ message: 'Expense updated', expense });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ message: messages.join(', ') });
    }
    res.status(500).json({ message: 'Server error updating expense' });
  }
});

module.exports = router;
