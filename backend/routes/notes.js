const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//ROUTE 1: Get all the notes :POST "/api/auth/fetchalnotes". login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("internal server error");
  }
});

//ROUTE 2: Add a new Note :POST "/api/auth/addnote". login required
router.post(
  "/addnote",
  fetchUser,
  [
    // Validate name
    body("title")
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters"),

    // Validate password
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { title, description, tag } = req.body;
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();
      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("internal server error");
    }
  }
);
module.exports = router;
