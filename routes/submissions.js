// routes/submissions.js
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Submission = require("../models/Submission");

router.get("/", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 2; // Set smaller limit to test pagination

    const submissions = await Submission.find()
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit);

    const totalSubmissions = await Submission.countDocuments();
    const totalPages = Math.ceil(totalSubmissions / limit);

    res.json({
      submissions,
      currentPage: page,
      totalPages,
      totalSubmissions,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const submission = new Submission({
      ...req.body,
      userId: req.user.userId,
    });
    await submission.save();
    res.status(201).json(submission);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
