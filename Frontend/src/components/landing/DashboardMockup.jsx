import {
  LayoutDashboard,
  PlusCircle,
  ListChecks,
  Bell,
  Search,
  Wrench,
  Droplets,
  Wind,
  Projector,
} from 'lucide-react';
import { StatusBadge } from '../ui/StatusBadge.jsx';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', active: true },
  { icon: PlusCircle, label: 'Report Issue' },
  { icon: ListChecks, label: 'My Issues' },
  { icon: Bell, label: 'Notifications' },
];

const rows = [
  { id: 'CF-1042', title: 'Hostel Block A - Water Leakage', cat: 'Plumbing', status: 'In Progress', icon: Droplets },
  { id: 'CF-1041', title: 'Library AC Not Working', cat: 'HVAC', status: 'Assigned', icon: Wind },
  { id: 'CF-1035', title: 'Classroom Projector Issue', cat: 'Electrical', status: 'Resolved', icon: Projector },
];

export default function DashboardMockup() {
  return (
    <div className="card overflow-hidden shadow-card">
      {/* Top bar */}
      <div className="flex items-center justify-between border-b border-slate-200 px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-brand-500 text-white">
            <Wrench className="h-3.5 w-3.5" strokeWidth={2.5} />
          </span>
          <span className="text-sm font-bold text-slate-900">CampusFix</span>
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <div className="flex items-center gap-2 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs text-slate-400">
            <Search className="h-3.5 w-3.5" />
            <span>Search issues…</span>
          </div>
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 text-[10px] font-semibold text-slate-600">
            PS
          </span>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className="hidden w-44 shrink-0 border-r border-slate-200 bg-slate-50/60 p-3 sm:block">
          <nav className="space-y-1">
            {navItems.map((n) => (
              <div
                key={n.label}
                className={`flex items-center gap-2 rounded-md px-2.5 py-2 text-xs font-medium ${
                  n.active
                    ? 'bg-white text-brand-600 shadow-soft ring-1 ring-slate-200'
                    : 'text-slate-600'
                }`}
              >
                <n.icon className="h-3.5 w-3.5" />
                {n.label}
              </div>
            ))}
          </nav>
        </aside>

        {/* Main */}
        <div className="flex-1 p-4">
          <div className="mb-3">
            <p className="text-xs text-slate-400">Welcome back,</p>
            <p className="text-sm font-bold text-slate-900">Priya Sharma</p>
          </div>

          {/* Stat cards */}
          <div className="grid grid-cols-3 gap-2.5">
            {[
              { label: 'Reported', value: '12', tone: 'text-slate-900' },
              { label: 'In Progress', value: '3', tone: 'text-amber-600' },
              { label: 'Resolved', value: '8', tone: 'text-green-600' },
            ].map((s) => (
              <div key={s.label} className="rounded-lg border border-slate-200 bg-white p-2.5">
                <p className="text-[10px] font-medium uppercase tracking-wide text-slate-400">
                  {s.label}
                </p>
                <p className={`mt-0.5 text-lg font-bold ${s.tone}`}>{s.value}</p>
              </div>
            ))}
          </div>

          {/* Recent issues */}
          <div className="mt-4">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs font-semibold text-slate-700">Recent Complaints</p>
              <span className="text-[10px] font-medium text-brand-600">View all</span>
            </div>
            <div className="space-y-2">
              {rows.map((r) => (
                <div
                  key={r.id}
                  className="flex items-center justify-between rounded-lg border border-slate-200 bg-white px-3 py-2"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="inline-flex h-7 w-7 items-center justify-center rounded-md bg-slate-100 text-slate-600">
                      <r.icon className="h-3.5 w-3.5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold text-slate-900">{r.title}</p>
                      <p className="text-[10px] text-slate-400">
                        {r.id} · {r.cat}
                      </p>
                    </div>
                  </div>
                  <StatusBadge status={r.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
