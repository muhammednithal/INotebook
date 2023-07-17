const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require('express-validator');

router.post("/", [
  // Validate email
  body('email')
    .isEmail().withMessage('Invalid email format')
    .custom((value) => {
      return User.findOne({ email: value }).then(user => {
        if (user) {
          return Promise.reject('Email already exists');
        }
      });
    }),

  // Validate name
  body('name')
    .isLength({ min: 5 }).withMessage('Name must be at least 5 characters'),

  // Validate password
  body('password')
    .isLength({ min: 5 }).withMessage('Password must be at least 5 characters')
], (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  console.log(req.body);
  const user = new User(req.body);
  user.save()
    .then(() => {
      res.json(req.body);
    })
    .catch(error => {
      res.status(500).json({ error: 'An error occurred while saving the user' });
    });
});

module.exports = router;
