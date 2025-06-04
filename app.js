const express = require('express');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
//  mongodb+srv://saumya:saumya2005@cluster0.ii2ki.mongodb.net/ArtGallery
//   mongodb://localhost:27017/ArtGallery

mongoose.connect("mongodb+srv://saumya:saumya2005@cluster0.ii2ki.mongodb.net/ArtGallery")
  .then(() => console.log("Connected to the database"))
  .catch((err) => console.log("Database connection error:", err));

  // Add this after MongoDB connection
const SHIPPING_COST = 99; // ₹99 shipping fee


// User Schema
const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  wishlist: [{ 
    id: String,
    title: String,
    artist: String,
    price: Number,
    ratings: String,
    img: String
  }],
  cart: [{ 
    id: String,
    title: String,
    artist: String,
    price: Number,
    ratings: String,
    img: String
  }]
});

const User = mongoose.model("User", userSchema);

// Authentication Middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, 'Secret_key');
    req.userId = decoded.userId;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Auth Endpoints
app.post("/signup", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    
    const token = jwt.sign({ userId: user._id }, 'Secret_key', { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Wishlist Endpoints
app.get('/api/wishlist', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('wishlist');
    res.json({ wishlist: user.wishlist || [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/wishlist', authenticate, async (req, res) => {
  try {
    const { artwork } = req.body;
    const user = await User.findById(req.userId);

    const existingIndex = user.wishlist.findIndex(item => item.id === artwork.id);
    
    if (existingIndex >= 0) {
      user.wishlist.splice(existingIndex, 1);
    } else {
      user.wishlist.push(artwork);
    }
    
    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove from wishlist
app.delete('/api/wishlist/:artId', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.wishlist = user.wishlist.filter(item => item.id !== req.params.artId);
    await user.save();
    res.json({ wishlist: user.wishlist });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Cart Endpoints
app.get('/api/cart', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('cart');
    res.json({ cart: user.cart || [] });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.post('/api/cart', authenticate, async (req, res) => {
  try {
    const { artwork } = req.body;
    const user = await User.findById(req.userId);

    if (!user.cart.some(item => item.id === artwork.id)) {
      user.cart.push(artwork);
      await user.save();
    }
    
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

app.delete('/api/cart/:artId', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    user.cart = user.cart.filter(item => item.id !== req.params.artId);
    await user.save();
    res.json({ cart: user.cart });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Order Schema
const orderSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  items: [{
    id: String,
    title: String,
    artist: String,
    price: Number,
    img: String,
    quantity: { type: Number, default: 1 }
  }],
  total: { type: Number, required: true },
  shipping: { type: Number, default: 99 },
  status: { type: String, enum: ['pending', 'shipped', 'delivered'], default: 'pending' },
  createdAt: { type: Date, default: Date.now }
});

const Order = mongoose.model('Order', orderSchema);

// Create Order
app.post('/api/orders', authenticate, async (req, res) => {
  try {
    const user = await User.findById(req.userId);
    const { items, total } = req.body;

    const newOrder = new Order({
      user: user._id,
      items: items,
      total: total + SHIPPING_COST, // Use your SHIPPING_COST variable
      shipping: SHIPPING_COST
    });

    await newOrder.save();
    
    // Clear user's cart
    user.cart = [];
    await user.save();

    res.status(201).json({ 
      message: 'Order placed successfully',
      orderId: newOrder._id 
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get User Orders
app.get('/api/orders', authenticate, async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId })
      .sort({ createdAt: -1 })
      .lean();
      
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});



// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
