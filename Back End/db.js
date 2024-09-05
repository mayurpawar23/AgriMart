const mongoose = require('mongoose');
const { Schema } = mongoose;

mongoose.connect('mongodb+srv://system:manager@cluster0.wrcvn.mongodb.net/agrimart')

// 1. User Schema
const userSchema = new Schema({
  mobile_number: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true } 
});

const User = mongoose.model('User', userSchema);

// 2. Product Schema
const productSchema = new Schema({
  product_id: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String },
  available_quantity: { type: Number, required: true },
  
});

const Product = mongoose.model('Product', productSchema);

// 3. Transaction Schema
const transactionSchema = new Schema({
  transaction_id: { type: String, required: true, unique: true },
  user_id: { type: String, required: true, ref: 'User' },
  product_id: { type: String, required: true, ref: 'Product' },
  quantity: { type: Number, required: true },
  total_price: { type: Number, required: true },
  transaction_date: { type: Date, default: Date.now }
});

const Transaction = mongoose.model('Transaction', transactionSchema);



module.exports = { User, Product, Transaction };