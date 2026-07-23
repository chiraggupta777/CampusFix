import PageHeader from '../../components/dashboard/PageHeader.jsx';

export default function Settings() {
  return (
    <div className="mx-auto max-w-2xl">
      <PageHeader title="Settings" subtitle="Manage your CampusFix account preferences." />

      <div className="card p-6">
        <h2 className="text-sm font-semibold text-slate-900">Profile</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="name">Full name</label>
            <input id="name" defaultValue="Priya Sharma" className="input" />
          </div>
          <div>
            <label className="label" htmlFor="email">Email</label>
            <input id="email" defaultValue="priya@university.edu" className="input" />
          </div>
          <div>
            <label className="label" htmlFor="dept">Department</label>
            <input id="dept" defaultValue="Computer Science" className="input" />
          </div>
          <div>
            <label className="label" htmlFor="roll">Roll number</label>
            <input id="roll" defaultValue="CS21B042" className="input" />
          </div>
        </div>
        <div className="mt-5 flex justify-end gap-3 border-t border-slate-100 pt-5">
          <button className="btn-secondary">Cancel</button>
          <button className="btn-primary">Save changes</button>
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
            <label key={p.label} className="flex items-center justify-between rounded-lg border border-slate-200 px-4 py-3">
              <span className="text-sm text-slate-700">{p.label}</span>
              <input
                type="checkbox"
                defaultChecked={p.on}
                className="h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}
