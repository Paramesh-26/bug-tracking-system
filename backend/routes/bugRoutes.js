const express = require("express");
const Bug = require("../models/Bug");
const router = express.Router();

// CREATE BUG
router.post("/", async (req, res) => {
  try {
    const bug = await Bug.create(req.body);
    res.status(201).json(bug);
  } catch (error) {
    console.error("BUG CREATE ERROR:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// READ BUGS
router.get("/", async (req, res) => {
  const bugs = await Bug.find().sort({ createdAt: -1 });
  res.json(bugs);
});

// UPDATE BUG STATUS
router.put("/:id", async (req, res) => {
  try {
    const bug = await Bug.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(bug);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// DELETE BUG
router.delete("/:id", async (req, res) => {
  await Bug.findByIdAndDelete(req.params.id);
  res.json({ message: "Bug deleted" });
});

module.exports = router;