import { Link } from 'react-router-dom';
import { PlusCircle, ClipboardList, Clock, CheckCircle2, XCircle, ArrowRight, Bell } from 'lucide-react';
import PageHeader from '../../components/dashboard/PageHeader.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import issues from '../../data/adminMockData.jsx';

const stats = [
  { label: 'Reported', value: issues.length, tone: 'bg-slate-100 text-slate-700', icon: ClipboardList },
  { label: 'Pending', value: issues.filter((i) => i.status === 'Pending').length, tone: 'bg-amber-100 text-amber-700', icon: Clock },
  { label: 'Resolved', value: issues.filter((i) => i.status === 'Resolved').length, tone: 'bg-green-100 text-green-700', icon: CheckCircle2 },
  { label: 'Rejected', value: issues.filter((i) => i.status === 'Rejected').length, tone: 'bg-red-100 text-red-700', icon: XCircle },
];

const actions = [
  { title: 'Review issues', desc: 'Open the issue list and manage reports.', icon: ClipboardList, to: '/admin/issues', cta: 'Open issues' },
  { title: 'Notifications', desc: 'See admin alerts and updates.', icon: Bell, to: '/admin/notifications', cta: 'Open' },
  { title: 'Settings', desc: 'Update admin preferences and controls.', icon: PlusCircle, to: '/admin/settings', cta: 'Open settings' },
];

export default function AdminDashboard() {
  const recent = [...issues].sort((a, b) => new Date(b.reportedDate) - new Date(a.reportedDate)).slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Admin Dashboard"
        subtitle="Manage campus issues and support operations from one place."
        actions={
          <Link to="/admin/issues" className="btn-primary">
            <PlusCircle className="h-4 w-4" />
            View Issues
          </Link>
        }
      />

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="card p-5">
            <div className="flex items-center justify-between">
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${stat.tone}`}>
                <stat.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">{stat.value}</p>
            <p className="text-sm text-slate-500">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Recent Issues</h2>
            <Link
              to="/admin/issues"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recent.map((issue) => (
              <Link
                key={issue.id}
                to={`/admin/issues/${issue.id}`}
                className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{issue.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {issue.id} · {issue.category} · {issue.department}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-slate-500 sm:block">{issue.reportedDate}</span>
                  <StatusBadge status={issue.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
            <Bell className="h-4 w-4 text-brand-600" />
            <h2 className="text-sm font-semibold text-slate-900">Quick Actions</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {actions.map((action) => (
              <Link
                key={action.title}
                to={action.to}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-900">{action.title}</p>
                  <p className="mt-1 text-xs leading-relaxed text-slate-600">{action.desc}</p>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 text-xs font-semibold text-slate-600 transition hover:bg-slate-100">
                  {action.cta}
                  <ArrowRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
