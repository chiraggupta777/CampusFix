const Issue = require('../models/Issue');
const { notifyIssueCreated } = require('../services/notificationService');

const VALID_CATEGORIES = [
  'Plumbing',
  'Electricity',
  'Internet',
  'Cleaning',
  'Furniture',
  'Water',
  'Other',
];

const populateOptions = {
  path: 'reportedBy',
  select: 'name email',
};

const createIssue = async (req, res) => {
  try {
    if (req.user.role !== 'student') {
      return res.status(403).json({
        success: false,
        message: 'Only students can report issues',
      });
    }

    const { title, description, category, location, images } = req.body;

    if (!title || !description || !category || !location) {
      return res.status(400).json({
        success: false,
        message:
          'Please provide all required fields: title, description, category, location',
      });
    }

    if (!VALID_CATEGORIES.includes(category)) {
      return res.status(400).json({
        success: false,
        message: `Invalid category. Must be one of: ${VALID_CATEGORIES.join(', ')}`,
      });
    }

    if (images !== undefined && !Array.isArray(images)) {
      return res.status(400).json({
        success: false,
        message: 'Images must be an array of strings',
      });
    }

    const issue = await Issue.create({
      title: title.trim(),
      description: description.trim(),
      category,
      location: location.trim(),
      images: images || [],
      reportedBy: req.user._id,
    });

    await issue.populate(populateOptions);

    await notifyIssueCreated(issue);

    return res.status(201).json({
      success: true,
      issue,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while creating issue',
    });
  }
};

const getMyIssues = async (req, res) => {
  try {
    const issues = await Issue.find({ reportedBy: req.user._id })
      .populate(populateOptions)
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: issues.length,
      issues,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching your issues',
    });
  }
};

const getIssueById = async (req, res) => {
  try {
    const issue = await Issue.findById(req.params.id).populate(populateOptions);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      });
    }

    const isOwner = issue.reportedBy._id.toString() === req.user._id.toString();
    const isAdmin = req.user.role === 'admin';

    if (!isOwner && !isAdmin) {
      return res.status(403).json({
        success: false,
        message: 'You are not authorized to view this issue',
      });
    }

    return res.status(200).json({
      success: true,
      issue,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while fetching issue',
    });
  }
};

module.exports = {
  createIssue,
  getMyIssues,
  getIssueById,
};
