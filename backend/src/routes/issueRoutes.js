const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const {
  createIssue,
  getMyIssues,
  getIssueById,
} = require('../controllers/issueController');

const router = express.Router();

router.post('/', protect, createIssue);
router.get('/my', protect, getMyIssues);
router.get('/:id', protect, getIssueById);

module.exports = router;
