require('dotenv').config();
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('../usersdb')   // ✅ updated path
const Protect = require('./middleware/auth');


// 🔐 Generate Token
const genratetoken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d"
  });
};


// 📝 REGISTER
router.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    if (!username || !email || !password) {
      return res.status(400).json({
        status: 'false',
        message: "Please fill all fields"
      });
    }

    // ✅ Sequelize syntax
    const userExists = await User.findOne({
      where: { email }
    });

    if (userExists) {
      return res.status(400).json({
        status: 'false',
        message: "User already exists"
      });
    }

    const user = await User.create({ username, email, password });

    const token = genratetoken(user.id);   // ✅ id instead of _id

    res.status(201).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// 🔑 LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({
        status: 'false',
        message: "Please fill all fields"
      });
    }

    // ✅ Sequelize syntax
    const user = await User.findOne({
      where: { email }
    });

    // ✅ matchPassword from model
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({
        message: "Invalid credentials"
      });
    }

    const token = genratetoken(user.id);
    
    res.status(200).json({
      id: user.id,
      username: user.username,
      email: user.email,
      token
    });
    console.log(user.id);
    console.log("LOGIN TOKEN:", token);

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
});


// 👤 GET CURRENT USER
router.get('/me', Protect, async (req, res) => {
  res.status(200).json(req.user);
});

module.exports = router;