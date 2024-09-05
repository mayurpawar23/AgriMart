const express = require('express');
const mongoose = require('mongoose');
const { User, Product, Transaction } = require('./db');
const app = express();
app.use(express.json());
const jwt = require('jsonwebtoken');

const secretKey = 'jhxdjx@199ccdh11'; // Replace with a strong secret key

// Middleware to verify JWT
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ message: 'No token provided' });
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Failed to authenticate token' });
    }

    req.userId = decoded.id; // Set the user ID for use in other routes
    next();
  });
};

// Sign-in route (No bcrypt, just string matching)
app.post('/signin', async (req, res) => {
  const { mobile_number, password } = req.body;

  try {
    // Find the user by mobile number
    const user = await User.findOne({ mobile_number });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare provided password with the stored password
    if (user.password !== password) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, secretKey);

    res.status(200).json({ message: 'Sign-in successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Error signing in', error: error.message });
  }
});

// Sign-up route (no token verification needed)
app.post('/signup', async (req, res) => {
  const { mobile_number, email, password } = req.body;

  try {
    const newUser = new User({ mobile_number, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User created successfully', user: newUser });
  } catch (error) {
    res.status(400).json({ message: 'Error creating user', error: error.message });
  }
});

// Apply JWT middleware to all routes except /signin and /signup
app.use(verifyToken);

// POST route for creating a transaction
app.post('/transaction', async (req, res) => {
  const { transaction_id, user_id, product_id, quantity } = req.body;

  try {
    const product = await Product.findOne({ product_id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    const total_price = product.price * quantity;

    const newTransaction = new Transaction({
      transaction_id,
      user_id,
      product_id,
      quantity,
      total_price
    });

    await newTransaction.save();
    res.status(201).json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    res.status(400).json({ message: 'Error creating transaction', error: error.message });
  }
});

// POST route for creating a product
app.post('/product', async (req, res) => {
  const { product_id, name, price, description, available_quantity } = req.body;

  try {
    const newProduct = new Product({ product_id, name, price, description, available_quantity });
    await newProduct.save();
    res.status(201).json({ message: 'Product created successfully', product: newProduct });
  } catch (error) {
    res.status(400).json({ message: 'Error creating product', error: error.message });
  }
});

app.get('/product/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ product_id: req.params.id });
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching product', error: error.message });
  }
});

// GET route for retrieving a transaction by ID
app.get('/transaction/:id', async (req, res) => {
  try {
    const transaction = await Transaction.findOne({ transaction_id: req.params.id });
    if (!transaction) {
      return res.status(404).json({ message: 'Transaction not found' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transaction', error: error.message });
  }
});

// GET route for fetching all transactions of a specific user
app.get('/transactions/:user_id', async (req, res) => {
  try {
    const transactions = await Transaction.find({ user_id: req.params.user_id });
    if (!transactions.length) {
      return res.status(404).json({ message: 'No transactions found for this user' });
    }
    res.status(200).json(transactions);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching transactions', error: error.message });
  }
});

// GET route for fetching all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    if (!products.length) {
      return res.status(404).json({ message: 'No products found' });
    }
    res.status(200).json(products);
  } catch (error) {
    res.status(400).json({ message: 'Error fetching products', error: error.message });
  }
});

app.listen(3000, () => {
  console.log('listening on 3000');
});
