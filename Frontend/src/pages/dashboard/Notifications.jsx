import { Link } from 'react-router-dom';
import { Bell, CheckCircle2, User, Wrench, MessageSquare } from 'lucide-react';
import PageHeader from '../../components/dashboard/PageHeader.jsx';

const notifications = [
  {
    id: 1,
    icon: User,
    tone: 'bg-indigo-50 text-indigo-600',
    title: 'Admin reviewed your issue CF-1042',
    body: 'Your complaint was accepted and forwarded to the Electrical team.',
    at: 'Jul 18, 2026 — 11:12',
    to: '/dashboard/issues/CF-1042',
  },
  {
    id: 2,
    icon: Wrench,
    tone: 'bg-amber-50 text-amber-600',
    title: 'Technician assigned to CF-1041',
    body: 'Suresh N. from the Plumbing team has been assigned.',
    at: 'Jul 18, 2026 — 09:40',
    to: '/dashboard/issues/CF-1041',
  },
  {
    id: 3,
    icon: CheckCircle2,
    tone: 'bg-green-50 text-green-600',
    title: 'Issue CF-1035 has been resolved',
    body: 'The Network Team replaced the faulty access point.',
    at: 'Jul 12, 2026 — 17:00',
    to: '/dashboard/issues/CF-1035',
  },
  {
    id: 4,
    icon: MessageSquare,
    tone: 'bg-slate-100 text-slate-600',
    title: 'New comment on CF-1042',
    body: 'Ravi Kumar: I will visit tomorrow morning with replacement starters.',
    at: 'Jul 18, 2026 — 13:30',
    to: '/dashboard/issues/CF-1042',
  },
];

export default function Notifications() {
  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader title="Notifications" subtitle="Updates on the issues you reported." />

      <div className="card divide-y divide-slate-100">
        {notifications.map((n) => (
          <Link
            key={n.id}
            to={n.to}
            className="flex gap-3 px-5 py-4 hover:bg-slate-50"
          >
            <span className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${n.tone}`}>
              <n.icon className="h-4 w-4" />
            </span>
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-900">{n.title}</p>
              <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{n.body}</p>
              <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                {n.at}
              </p>
            </div>
          </Link>
        ))}
        {notifications.length === 0 && (
          <div className="px-5 py-12 text-center">
            <Bell className="mx-auto h-8 w-8 text-slate-300" />
            <p className="mt-3 text-sm font-medium text-slate-700">You are all caught up</p>
            <p className="mt-1 text-xs text-slate-500">No new notifications.</p>
          </div>
        )}
      </div>
    </div>
  );
}
