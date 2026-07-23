import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag, User, Calendar, ImageIcon } from 'lucide-react';
import PageHeader from '../../components/dashboard/PageHeader.jsx';
import { StatusBadge, PriorityBadge } from '../../components/ui/StatusBadge.jsx';
import issues from '../../data/adminMockData.jsx';

export default function AdminIssueDetails() {
  const { id } = useParams();
  const issue = issues.find((i) => i.id === id) || issues[0];
  const [status, setStatus] = useState(issue.status);
  const [priority, setPriority] = useState(issue.priority);
  const [notes, setNotes] = useState(issue.resolutionNotes || '');

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/admin/issues"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Issues
      </Link>

      <PageHeader
        title={issue.title}
        subtitle={`${issue.id} · reported ${issue.reportedDate}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <StatusBadge status={status} />
            <PriorityBadge priority={priority} />
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Issue details</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <InfoRow icon={Tag} label="Category" value={issue.category} />
              <InfoRow icon={MapPin} label="Department" value={issue.department} />
              <InfoRow icon={User} label="Reported by" value={issue.studentName} />
              <InfoRow icon={Calendar} label="Reported on" value={issue.reportedDate} />
            </div>
            <div className="mt-5 border-t border-slate-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">Description</p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{issue.description}</p>
            </div>
          </div>

          <div className="card p-6">
            <div className="mb-3 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-900">Attachments</h2>
            </div>
            {issue.attachments.length === 0 ? (
              <p className="text-sm text-slate-500">No attachments uploaded.</p>
            ) : (
              <ul className="space-y-2">
                {issue.attachments.map((file) => (
                  <li key={file} className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700">
                    {file}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Resolution notes</h2>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={6}
              className="input mt-4 w-full resize-y"
              placeholder="Write notes for this issue..."
            />
          </div>
        </div>

        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Status</h2>
            <div className="mt-4 space-y-4">
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Priority</p>
                <PriorityBadge priority={priority} />
              </div>
              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">Current status</p>
                <StatusBadge status={status} />
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Actions</h2>
            <div className="mt-4 space-y-3">
              <button className="btn-primary w-full" onClick={() => alert('Save changes (UI only)')}>
                Save Changes
              </button>
              <Link to="/admin/issues" className="btn-secondary w-full">
                Back to Issues
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
        <Icon className="h-4 w-4" />
      </span>
      <div>
        <p className="text-xs font-medium uppercase tracking-wide text-slate-400">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-slate-800">{value}</p>
      </div>
    </div>
  );
}
