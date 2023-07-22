// users.js

const express = require('express');
const router = express.Router();
const User = require('./models/user'); // Assuming you have the user model defined in a separate file

// GET /users - Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// GET /users/:id - Get a user by ID
router.get('/:id', getUser, (req, res) => {
  res.json(res.user);
});

// POST /users - Create a new user
router.post('/', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// PUT /users/:id - Update a user by ID
router.put('/:id', getUser, async (req, res) => {
  if (req.body.name != null) {
    res.user.name = req.body.name;
  }

  if (req.body.email != null) {
    res.user.email = req.body.email;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// DELETE /users/:id - Delete a user by ID
router.delete('/:id', getUser, async (req, res) => {
  try {
    await res.user.remove();
    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Middleware function to fetch a user by ID and store it in res.user
async function getUser(req, res, next) {
  try {
    const user = await User.findById(req.params.id);
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.user = user;
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

module.exports = router;
