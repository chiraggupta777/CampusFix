const mongoose = require('mongoose');

const CATEGORIES = [
  'Plumbing',
  'Electricity',
  'Internet',
  'Cleaning',
  'Furniture',
  'Water',
  'Other',
];

const STATUSES = ['Pending', 'In Progress', 'Resolved', 'Rejected'];

const PRIORITIES = ['Low', 'Medium', 'High'];

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title is required'],
      trim: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      trim: true,
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: CATEGORIES,
    },
    location: {
      type: String,
      required: [true, 'Location is required'],
      trim: true,
    },
    images: {
      type: [String],
      default: [],
    },
    status: {
      type: String,
      enum: STATUSES,
      default: 'Pending',
    },
    priority: {
      type: String,
      enum: PRIORITIES,
      default: 'Medium',
    },
    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    assignedTo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    remarks: {
      type: String,
      trim: true,
      default: '',
    },
    adminRemark: {
      type: String,
      trim: true,
      default: '',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Issue', issueSchema);
