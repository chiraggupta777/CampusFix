import PageHeader from '../../components/dashboard/PageHeader.jsx';

export default function AdminNotifications() {
  return (
    <div>
      <PageHeader title="Notifications" subtitle="Admin alerts and campus updates." />
      <div className="card p-4">
        <p className="text-sm text-slate-600">No notifications at the moment.</p>
      </div>
    </div>
  );
}
