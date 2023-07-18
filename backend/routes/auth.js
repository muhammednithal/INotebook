const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const JWT_SECRET="heloonithal"

//create a user using :POST "/api/auth/createuser".no login required
router.post(
  "/createuser",
  [
    // Validate email
    body("email")
      .isEmail()
      .withMessage("Invalid email format")
      .custom(async (value) => {
        const user = await User.findOne({ email: value });
        if (user) {
          return Promise.reject("Email already exists");
        }
      }),

    // Validate name
    body("name")
      .isLength({ min: 5 })
      .withMessage("Name must be at least 5 characters"),

    // Validate password
    body("password")
      .isLength({ min: 5 })
      .withMessage("Password must be at least 5 characters"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const salt=await bcrypt.genSalt(10)
      const secPass=await bcrypt.hash(req.body.password,salt)
      const user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
      const data={
        user:{
          id:user.id
        }
      }
      const authToken=jwt.sign(data,JWT_SECRET)
      
      res.json({authToken});
    } catch {
      (error) => {
        console.error(error.message);
        res
          .status(500)
          .json({ error: "An error occurred while saving the user" });
      };
    }
  }
);

module.exports = router;
