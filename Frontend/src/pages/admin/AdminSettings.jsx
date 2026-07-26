import PageHeader from '../../components/dashboard/PageHeader.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

export default function AdminSettings() {
  const { user } = useAuth();
  const displayRole = user?.role === 'admin' ? 'Administrator' : 'Staff';

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Settings" subtitle="Configure admin options and preferences." />

      <div className="card p-6">
        <h2 className="text-sm font-semibold text-slate-900">Administrator Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label">Full name</label>
            <input value={user?.name || ''} disabled className="input bg-slate-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="label">Email address</label>
            <input value={user?.email || ''} disabled className="input bg-slate-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="label">Role</label>
            <input value={displayRole} disabled className="input bg-slate-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="label">Campus</label>
            <input value="BBDU Main Campus" disabled className="input bg-slate-50 cursor-not-allowed" />
          </div>
        </div>
      </div>

      <div className="card mt-6 p-6">
        <h2 className="text-sm font-semibold text-slate-900">System Information</h2>
        <div className="mt-4 space-y-4">
          <div className="flex justify-between border-b border-slate-100 pb-2 text-sm">
            <span className="text-slate-500 font-medium">Application Version</span>
            <span className="text-slate-900 font-semibold">v1.0.0 (Production)</span>
          </div>
          <div className="flex justify-between border-b border-slate-100 pb-2 text-sm">
            <span className="text-slate-500 font-medium">Scope Profile</span>
            <span className="text-slate-900 font-semibold">Full Admin Privileges</span>
          </div>
          <div className="flex justify-between pb-1 text-sm">
            <span className="text-slate-500 font-medium">Database Node</span>
            <span className="text-slate-900 font-semibold">MongoDB Atlas</span>
          </div>
        </div>
      </div>
    </div>
  );
}
