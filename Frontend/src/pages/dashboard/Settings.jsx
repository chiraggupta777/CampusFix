import PageHeader from '../../components/dashboard/PageHeader.jsx';
import { useAuth } from '../../context/AuthContext.jsx';

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function Settings() {
  const { user } = useAuth();
  const displayRole = user?.role === 'admin' ? 'Administrator' : 'Student';

  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Settings" subtitle="Manage your CampusFix account preferences." />

      <div className="card mb-5 border-blue-200 bg-blue-50 px-5 py-4 text-sm text-blue-700 font-medium">
        Note: Profile editing is currently read-only. Updates require a MERN backend endpoint implementation (e.g. <code>PUT/PATCH /api/auth/profile</code>).
      </div>

      <div className="card p-6">
        <h2 className="text-sm font-semibold text-slate-900">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">Full name</label>
            <input id="name" value={user?.name || ''} disabled className="input bg-slate-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" value={user?.email || ''} disabled className="input bg-slate-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="label" htmlFor="hostelBlock">Hostel block</label>
            <input id="hostelBlock" value={user?.hostelBlock || ''} disabled className="input bg-slate-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="label" htmlFor="roomNumber">Room number</label>
            <input id="roomNumber" value={user?.roomNumber || ''} disabled className="input bg-slate-50 cursor-not-allowed" />
          </div>
          <div>
            <label className="label" htmlFor="role">Role</label>
            <input id="role" value={displayRole} disabled className="input bg-slate-50 cursor-not-allowed" />
          </div>
          {user?.createdAt && (
            <div>
              <label className="label" htmlFor="createdAt">Joined on</label>
              <input id="createdAt" value={formatDate(user.createdAt)} disabled className="input bg-slate-50 cursor-not-allowed" />
            </div>
          )}
        </div>
        <div className="mt-5 flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button className="btn-secondary opacity-50 cursor-not-allowed" disabled>Cancel</button>
          <button className="btn-primary opacity-50 cursor-not-allowed" disabled>Save changes</button>
        </div>
      </div>

      <div className="card mt-6 p-6">
        <h2 className="text-sm font-semibold text-slate-900">Notifications</h2>
        <div className="mt-4 space-y-3">
          {[
            { label: 'Email me when my issue is reviewed', on: true },
            { label: 'Email me when a technician is assigned', on: true },
            { label: 'Email me when an issue is resolved', on: true },
            { label: 'Weekly digest of campus announcements', on: false },
          ].map((p) => (
            <label key={p.label} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3 opacity-75 cursor-not-allowed">
              <span className="text-sm text-slate-700">{p.label}</span>
              <input
                type="checkbox"
                defaultChecked={p.on}
                disabled
                className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500 cursor-not-allowed"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
