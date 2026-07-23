import { Link } from 'react-router-dom';
import {
  PlusCircle,
  ClipboardList,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowRight,
  Megaphone,
  Bell,
} from 'lucide-react';
import PageHeader from '../../components/dashboard/PageHeader.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { issues, announcements, studentStats } from '../../data/mockData.jsx';

const statCards = [
  {
    label: 'Reported',
    value: studentStats.reported,
    icon: ClipboardList,
    tone: 'bg-slate-100 text-slate-700',
  },
  {
    label: 'In Progress',
    value: studentStats.inProgress,
    icon: Clock,
    tone: 'bg-amber-100 text-amber-700',
  },
  {
    label: 'Resolved',
    value: studentStats.resolved,
    icon: CheckCircle2,
    tone: 'bg-green-100 text-green-700',
  },
  {
    label: 'Rejected',
    value: studentStats.rejected,
    icon: XCircle,
    tone: 'bg-red-100 text-red-700',
  },
];

const quickActions = [
  {
    title: 'Report an Issue',
    desc: 'Log a new complaint with a photo.',
    icon: PlusCircle,
    to: '//dashboard/report',
    cta: 'Report now',
  },
  {
    title: 'My Issues',
    desc: 'See all complaints you have raised.',
    icon: ClipboardList,
    to: '/dashboard/issues',
    cta: 'View issues',
  },
  {
    title: 'Notifications',
    desc: 'Updates on your reported issues.',
    icon: Bell,
    to: '/dashboard/notifications',
    cta: 'Open',
  },
];

export default function DashboardHome() {
  const recent = issues.slice(0, 4);

  return (
    <div>
      <PageHeader
        title="Welcome back, Priya"
        subtitle="Here is what is happening with your campus issues today."
        actions={
          <Link to="/dashboard/report" className="btn-primary">
            <PlusCircle className="h-4 w-4" />
            Report an Issue
          </Link>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {statCards.map((s) => (
          <div key={s.label} className="card p-5">
            <div className="flex items-center justify-between">
              <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${s.tone}`}>
                <s.icon className="h-4 w-4" />
              </span>
            </div>
            <p className="mt-3 text-2xl font-bold text-slate-900">{s.value}</p>
            <p className="text-sm text-slate-500">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        {/* Recent Complaints */}
        <div className="card lg:col-span-2">
          <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Recent Complaints</h2>
            <Link
              to="/dashboard/issues"
              className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
            >
              View all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {recent.map((i) => (
              <Link
                key={i.id}
                to={`/dashboard/issues/${i.id}`}
                className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50"
              >
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold text-slate-900">{i.title}</p>
                  <p className="mt-0.5 text-xs text-slate-500">
                    {i.id} · {i.category} · {i.location}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="hidden text-xs text-slate-500 sm:block">{i.date}</span>
                  <StatusBadge status={i.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Announcements */}
        <div className="card">
          <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
            <Megaphone className="h-4 w-4 text-brand-600" />
            <h2 className="text-sm font-semibold text-slate-900">Announcements</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {announcements.map((a) => (
              <div key={a.id} className="px-5 py-4">
                <p className="text-sm font-semibold text-slate-900">{a.title}</p>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">{a.body}</p>
                <p className="mt-2 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {a.date}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-6">
        <h2 className="mb-3 text-sm font-semibold text-slate-900">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {quickActions.map((q) => (
            <Link key={q.title} to={q.to} className="card group p-5 transition hover:shadow-card">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                <q.icon className="h-5 w-5" />
              </span>
              <h3 className="mt-3 text-sm font-semibold text-slate-900">{q.title}</h3>
              <p className="mt-1 text-xs leading-relaxed text-slate-600">{q.desc}</p>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-brand-600 group-hover:text-brand-700">
                {q.cta}
                <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
