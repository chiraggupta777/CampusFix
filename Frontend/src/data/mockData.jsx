// Static demo data for the CampusFix frontend prototype.
// In a real build this would be replaced by Supabase queries.

export const categories = [
  'Electrical',
  'Plumbing',
  'Furniture',
  'Network',
  'Cleanliness',
  'HVAC',
  'Safety',
  'Other',
];

export const locations = [
  'Hostel Block A — 3rd Floor',
  'Library — Reading Hall',
  'Classroom Block — Room 204',
  'Computer Lab 3',
  'Cafeteria',
  'Auditorium',
  'Parking Lot — East Gate',
  'Sports Complex',
];

export const issues = [
  {
    id: 'CF-1042',
    title: 'Hostel Block A - Water Leakage',
    category: 'Plumbing',
    location: 'Hostel Block A — 3rd Floor',
    priority: 'High',
    status: 'In Progress',
    date: 'Jul 18, 2026',
    assignedTo: 'Suresh N.',
    description:
      'Water has been leaking from the pipe near room 308 for two days. The corridor floor is wet and slippery, especially in the morning.',
    image:
      'https://images.pexels.com/photos/54281/pexels-photo-54281.jpeg?auto=compress&cs=tinysrgb&w=900',
    timeline: [
      { label: 'Issue reported', at: 'Jul 18, 2026 — 09:42', done: true },
      { label: 'Admin reviewed and accepted', at: 'Jul 18, 2026 — 11:10', done: true },
      { label: 'Assigned to Suresh N. (Plumbing)', at: 'Jul 18, 2026 — 13:25', done: true },
      { label: 'Technician visit scheduled', at: 'Jul 19, 2026 — 10:00', done: false },
      { label: 'Issue resolved', at: 'Pending', done: false },
    ],
    comments: [
      {
        author: 'Priya Sharma',
        role: 'Student',
        at: 'Jul 18, 2026 — 09:45',
        text: 'The floor gets really slippery. Please look into it soon.',
      },
      {
        author: 'Admin Office',
        role: 'Admin',
        at: 'Jul 18, 2026 — 11:12',
        text: 'Thanks for reporting. Forwarded to the Plumbing team.',
      },
      {
        author: 'Suresh N.',
        role: 'Technician',
        at: 'Jul 18, 2026 — 13:30',
        text: 'I will visit tomorrow morning with replacement parts.',
      },
    ],
  },
  {
    id: 'CF-1041',
    title: 'Library AC Not Working',
    category: 'HVAC',
    location: 'Library — Reading Hall',
    priority: 'Medium',
    status: 'Assigned',
    date: 'Jul 17, 2026',
    assignedTo: 'Mohammed I.',
    description:
      'The air conditioner in the reading hall is not cooling. It gets very warm during afternoon hours and hard to concentrate.',
    image:
      'https://images.pexels.com/photos/4210347/pexels-photo-4210347.jpeg?auto=compress&cs=tinysrgb&w=900',
    timeline: [
      { label: 'Issue reported', at: 'Jul 17, 2026 — 18:02', done: true },
      { label: 'Admin reviewed and accepted', at: 'Jul 18, 2026 — 09:05', done: true },
      { label: 'Assigned to Mohammed I. (HVAC)', at: 'Jul 18, 2026 — 09:40', done: true },
      { label: 'Issue resolved', at: 'Pending', done: false },
    ],
    comments: [
      {
        author: 'Aman Verma',
        role: 'Student',
        at: 'Jul 17, 2026 — 18:05',
        text: 'It has been like this for two days now.',
      },
    ],
  },
  {
    id: 'CF-1038',
    title: 'Broken Bench - Room 204',
    category: 'Furniture',
    location: 'Classroom Block — Room 204',
    priority: 'Low',
    status: 'Open',
    date: 'Jul 16, 2026',
    assignedTo: null,
    description:
      'One of the benches in the third row has a broken backrest. It is uncomfortable and slightly unsafe to sit on.',
    image:
      'https://images.pexels.com/photos/276452/pexels-photo-276452.jpeg?auto=compress&cs=tinysrgb&w=900',
    timeline: [
      { label: 'Issue reported', at: 'Jul 16, 2026 — 14:22', done: true },
      { label: 'Waiting for admin review', at: 'Pending', done: false },
    ],
    comments: [],
  },
  {
    id: 'CF-1035',
    title: 'Classroom Projector Issue',
    category: 'Electrical',
    location: 'Classroom Block — Room 204',
    priority: 'Urgent',
    status: 'Resolved',
    date: 'Jul 12, 2026',
    assignedTo: 'Ravi Kumar',
    description:
      'The projector in room 204 is not displaying anything. Lectures are affected as the faculty cannot show slides.',
    image:
      'https://images.pexels.com/photos/7809971/pexels-photo-7809971.jpeg?auto=compress&cs=tinysrgb&w=900',
    timeline: [
      { label: 'Issue reported', at: 'Jul 12, 2026 — 10:05', done: true },
      { label: 'Admin reviewed and accepted', at: 'Jul 12, 2026 — 10:30', done: true },
      { label: 'Assigned to Ravi Kumar (Electrical)', at: 'Jul 12, 2026 — 10:45', done: true },
      { label: 'Projector cable replaced', at: 'Jul 12, 2026 — 16:20', done: true },
      { label: 'Issue resolved', at: 'Jul 12, 2026 — 17:00', done: true },
    ],
    comments: [
      {
        author: 'Ravi Kumar',
        role: 'Technician',
        at: 'Jul 12, 2026 — 16:25',
        text: 'Faulty HDMI cable replaced. Projector is working now.',
      },
    ],
  },
  {
    id: 'CF-1031',
    title: 'Washroom Cleaning Request',
    category: 'Cleanliness',
    location: 'Computer Lab 3',
    priority: 'Medium',
    status: 'Resolved',
    date: 'Jul 08, 2026',
    assignedTo: 'Housekeeping Team',
    description:
      'The washroom near Computer Lab 3 was not cleaned for two days and the floor was sticky.',
    image:
      'https://images.pexels.com/photos/262047/pexels-photo-262047.jpeg?auto=compress&cs=tinysrgb&w=900',
    timeline: [
      { label: 'Issue reported', at: 'Jul 08, 2026 — 09:00', done: true },
      { label: 'Admin reviewed and accepted', at: 'Jul 08, 2026 — 09:30', done: true },
      { label: 'Assigned to Housekeeping Team', at: 'Jul 08, 2026 — 10:00', done: true },
      { label: 'Washroom cleaned', at: 'Jul 09, 2026 — 14:00', done: true },
      { label: 'Issue resolved', at: 'Jul 09, 2026 — 15:30', done: true },
    ],
    comments: [],
  },
  {
    id: 'CF-1029',
    title: 'Parking Light Not Working',
    category: 'Electrical',
    location: 'Parking Lot — East Gate',
    priority: 'Medium',
    status: 'Rejected',
    date: 'Jul 05, 2026',
    assignedTo: null,
    description:
      'The street light near the east gate parking is not working and it gets very dark in the evening.',
    image:
      'https://images.pexels.com/photos/2693208/pexels-photo-2693208.jpeg?auto=compress&cs=tinysrgb&w=900',
    timeline: [
      { label: 'Issue reported', at: 'Jul 05, 2026 — 13:10', done: true },
      { label: 'Marked as duplicate of CF-1027', at: 'Jul 05, 2026 — 16:40', done: true },
    ],
    comments: [
      {
        author: 'Admin Office',
        role: 'Admin',
        at: 'Jul 05, 2026 — 16:42',
        text: 'Closing as duplicate. Already tracked under CF-1027.',
      },
    ],
  },
];

export const announcements = [
  {
    id: 1,
    title: 'Scheduled power maintenance on Jul 22',
    body: 'Library and Engineering Block will have a short power interruption between 6:00 AM and 7:30 AM.',
    date: 'Jul 19, 2026',
  },
  {
    id: 2,
    title: 'New category added: HVAC',
    body: 'You can now report air conditioning and ventilation issues under the HVAC category.',
    date: 'Jul 15, 2026',
  },
  {
    id: 3,
    title: 'Resolved issues can be reopened',
    body: 'If a resolved issue comes back, you can reopen it from the issue page within 7 days.',
    date: 'Jul 10, 2026',
  },
];

export const studentStats = {
  reported: 12,
  inProgress: 3,
  resolved: 8,
  rejected: 1,
};

export function getIssueById(id) {
  return issues.find((i) => i.id === id);
}
