const Submission = require("../models/Submission");

exports.createSubmission = async (req, res) => {
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
};
exports.getSubmissions = async (req, res) => {
  const { page = 1, limit = 10 } = req.query;
  try {
    const submissions = await Submission.find()
      .limit(limit)
      .skip((page - 1) * limit)
      .populate("userId", "name")
      .sort("-createdAt");

    const count = await Submission.countDocuments();

    res.json({
      submissions,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
