import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PlusCircle, ClipboardList, Clock, CheckCircle2, XCircle, ArrowRight, Bell, Loader2, LayoutDashboard, Settings } from 'lucide-react';
import PageHeader from '../../components/dashboard/PageHeader.jsx';
import { StatusBadge } from '../../components/ui/StatusBadge.jsx';
import { issueService } from '../../services/issueService.js';

const actions = [
  { title: 'Review Pending Complaints', desc: 'Open the issues log to review, update, and resolve reported complaints.', icon: ClipboardList, to: '/admin/issues', cta: 'Review' },
  { title: 'Dashboard Summary', desc: 'View high-level metrics, pending trends, and complaint logs.', icon: LayoutDashboard, to: '/admin', cta: 'View' },
  { title: 'Notifications', desc: 'Check current admin alerts and student update notifications.', icon: Bell, to: '/admin/notifications', cta: 'Check' },
  { title: 'Administrator Settings', desc: 'Manage system settings, details, and administrator credentials.', icon: Settings, to: '/admin/settings', cta: 'Manage' },
];

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminDashboard() {
  const [statsData, setStatsData] = useState(null);
  const [recentIssues, setRecentIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      setError('');
      try {
        const [statsResponse, issuesResponse] = await Promise.all([
          issueService.getDashboardStats(),
          issueService.getAdminIssues(),
        ]);

        setStatsData(statsResponse.data?.stats || null);
        setRecentIssues((issuesResponse.data?.issues || []).slice(0, 4));
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            'Failed to load dashboard data. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        <p className="text-sm text-slate-500 font-medium">Loading dashboard stats...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-lg mt-12 text-center">
        <div className="card border-red-200 bg-red-50 p-6 rounded-xl">
          <p className="text-sm font-semibold text-red-700">Error Loading Dashboard</p>
          <p className="mt-2 text-xs text-red-600 leading-relaxed">{error}</p>
        </div>
      </div>
    );
  }

  const statsList = [
    { label: 'Total Complaints', value: statsData?.totalIssues || 0, tone: 'bg-slate-100 text-slate-700', icon: ClipboardList },
    { label: 'Pending', value: statsData?.pendingIssues || 0, tone: 'bg-amber-100 text-amber-700', icon: Clock },
    { label: 'In Progress', value: statsData?.inProgressIssues || 0, tone: 'bg-blue-100 text-blue-700', icon: Clock },
    { label: 'Resolved', value: statsData?.resolvedIssues || 0, tone: 'bg-green-100 text-green-700', icon: CheckCircle2 },
    { label: 'Rejected', value: statsData?.rejectedIssues || 0, tone: 'bg-red-100 text-red-700', icon: XCircle },
  ];

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

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
        {statsList.map((stat) => (
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
            {recentIssues.length === 0 ? (
              <div className="px-5 py-8 text-center text-sm text-slate-500">
                No recent issues found.
              </div>
            ) : (
              recentIssues.map((issue) => (
                <Link
                  key={issue._id}
                  to={`/admin/issues/${issue._id}`}
                  className="flex items-center justify-between gap-4 px-5 py-3.5 hover:bg-slate-50"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-900">{issue.title}</p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      {issue._id.slice(-8).toUpperCase()} · {issue.category} · {issue.location || 'Facilities'}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="hidden text-xs text-slate-500 sm:block">{formatDate(issue.createdAt)}</span>
                    <StatusBadge status={issue.status} />
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>

        <div className="card">
          <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-4">
            <h2 className="text-sm font-semibold text-slate-900">Quick Actions</h2>
          </div>
          <div className="divide-y divide-slate-100">
            {actions.map((action) => (
              <Link
                key={action.title}
                to={action.to}
                className="flex items-center justify-between gap-4 px-5 py-4 hover:bg-slate-50"
              >
                <div className="flex items-start gap-3 min-w-0">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-50 text-brand-600 shrink-0 mt-0.5">
                    <action.icon className="h-4 w-4" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-slate-900 truncate">{action.title}</p>
                    <p className="mt-1 text-xs leading-relaxed text-slate-500">{action.desc}</p>
                  </div>
                </div>
                <span className="inline-flex items-center gap-1 rounded-full border border-slate-200 px-2 py-1 text-[11px] font-semibold text-slate-600 shrink-0 hover:bg-slate-100 transition">
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
