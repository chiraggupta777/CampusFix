const express = require('express');
const { protect, authorize } = require('../middleware/authMiddleware');
const {
  getAllIssues,
  updateIssueStatus,
  getDashboardStats,
} = require('../controllers/adminController');

const router = express.Router();

router.use(protect, authorize('admin'));

router.get('/dashboard', getDashboardStats);
router.get('/issues', getAllIssues);
router.patch('/issues/:id/status', updateIssueStatus);

module.exports = router;
