const Issue = require('../models/Issue');
const {
  notifyStatusChanged,
  notifyAdminRemark,
} = require('../services/notificationService');

const VALID_STATUSES = ['Pending', 'In Progress', 'Resolved', 'Rejected'];

const populateOptions = {
  path: 'reportedBy',
  select: 'name email',
};

const getAllIssues = async (req, res) => {
  try {
    const issues = await Issue.find()
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
      message: 'Server error while fetching issues',
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

const updateIssueStatus = async (req, res) => {
  try {
    const { status, adminRemark } = req.body;

    if (!status) {
      return res.status(400).json({
        success: false,
        message: 'Status is required',
      });
    }

    if (!VALID_STATUSES.includes(status)) {
      return res.status(400).json({
        success: false,
        message: `Invalid status. Must be one of: ${VALID_STATUSES.join(', ')}`,
      });
    }

    const issue = await Issue.findById(req.params.id);

    if (!issue) {
      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      });
    }

    const previousStatus = issue.status;

    issue.status = status;

    if (adminRemark !== undefined) {
      issue.adminRemark = adminRemark.trim();
    }

    await issue.save();
    await issue.populate(populateOptions);

    if (previousStatus !== status) {
      await notifyStatusChanged(issue, previousStatus);
    }

    if (adminRemark !== undefined && adminRemark.trim()) {
      await notifyAdminRemark(issue, adminRemark.trim());
    }

    return res.status(200).json({
      success: true,
      message: 'Issue updated successfully',
      issue,
    });
  } catch (error) {
    if (error.name === 'CastError') {
      return res.status(404).json({
        success: false,
        message: 'Issue not found',
      });
    }

    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        message: messages.join(', '),
      });
    }

    return res.status(500).json({
      success: false,
      message: 'Server error while updating issue',
    });
  }
};

const getDashboardStats = async (req, res) => {
  try {
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    const [
      totalIssues,
      pendingIssues,
      inProgressIssues,
      resolvedIssues,
      rejectedIssues,
      todayIssues,
      categoryWiseStats,
      monthlyIssueStats,
    ] = await Promise.all([
      Issue.countDocuments(),
      Issue.countDocuments({ status: 'Pending' }),
      Issue.countDocuments({ status: 'In Progress' }),
      Issue.countDocuments({ status: 'Resolved' }),
      Issue.countDocuments({ status: 'Rejected' }),
      Issue.countDocuments({ createdAt: { $gte: startOfToday } }),
      Issue.aggregate([
        { $group: { _id: '$category', count: { $sum: 1 } } },
        { $project: { _id: 0, category: '$_id', count: 1 } },
        { $sort: { count: -1 } },
      ]),
      Issue.aggregate([
        {
          $match: {
            createdAt: {
              $gte: new Date(new Date().getFullYear(), new Date().getMonth() - 11, 1),
            },
          },
        },
        {
          $group: {
            _id: {
              year: { $year: '$createdAt' },
              month: { $month: '$createdAt' },
            },
            count: { $sum: 1 },
          },
        },
        { $sort: { '_id.year': 1, '_id.month': 1 } },
        {
          $project: {
            _id: 0,
            year: '$_id.year',
            month: '$_id.month',
            count: 1,
          },
        },
      ]),
    ]);

    const monthNames = [
      'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
      'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const formattedMonthlyStats = monthlyIssueStats.map((item) => ({
      month: monthNames[item.month - 1],
      year: item.year,
      count: item.count,
    }));

    return res.status(200).json({
      success: true,
      stats: {
        totalIssues,
        pendingIssues,
        inProgressIssues,
        resolvedIssues,
        rejectedIssues,
        todayIssues,
        categoryWiseStats,
        monthlyIssueStats: formattedMonthlyStats,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Server error while fetching dashboard stats',
    });
  }
};

module.exports = {
  getAllIssues,
  getIssueById,
  updateIssueStatus,
  getDashboardStats,
};
