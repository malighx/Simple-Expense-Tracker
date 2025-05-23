const express = require('express');
const mongoose = require('mongoose');
const Expense = require('./models/Expense');
require('dotenv').config();

const app = express();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Middleware
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
  const expenses = await Expense.find().sort({ date: -1 });
  res.render('index', { expenses });
});

app.post('/add', async (req, res) => {
  const { title, amount } = req.body;
  await Expense.create({ title, amount });
  res.redirect('/');
});

app.post('/delete/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
