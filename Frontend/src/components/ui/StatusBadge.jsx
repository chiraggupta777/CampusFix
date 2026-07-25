import Badge from './Badge.jsx';

const statusTone = {
  Pending: 'blue',
  Open: 'blue',
  'In Review': 'amber',
  Assigned: 'indigo',
  'In Progress': 'amber',
  Resolved: 'green',
  Rejected: 'red',
};

const priorityTone = {
  Low: 'slate',
  Medium: 'blue',
  High: 'amber',
  Urgent: 'red',
};

export function StatusBadge({ status }) {
  return <Badge tone={statusTone[status] || 'slate'}>{status}</Badge>;
}

export function PriorityBadge({ priority }) {
  return <Badge tone={priorityTone[priority] || 'slate'}>{priority}</Badge>;
}
