const Notification = require('../models/Notification');

const createNotification = async ({ recipient, issue, type, message }) => {
  return Notification.create({ recipient, issue, type, message });
};

const notifyIssueCreated = async (issue) => {
  return createNotification({
    recipient: issue.reportedBy,
    issue: issue._id,
    type: 'issue_created',
    message: `Your issue "${issue.title}" has been submitted successfully and is pending review.`,
  });
};

const notifyStatusChanged = async (issue, previousStatus) => {
  return createNotification({
    recipient: issue.reportedBy,
    issue: issue._id,
    type: 'status_changed',
    message: `Your issue "${issue.title}" status changed from "${previousStatus}" to "${issue.status}".`,
  });
};

const notifyAdminRemark = async (issue, remark) => {
  return createNotification({
    recipient: issue.reportedBy,
    issue: issue._id,
    type: 'admin_remark',
    message: `Admin remark on "${issue.title}": ${remark}`,
  });
};

module.exports = {
  createNotification,
  notifyIssueCreated,
  notifyStatusChanged,
  notifyAdminRemark,
};
