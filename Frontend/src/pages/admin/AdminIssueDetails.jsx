import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Tag, User, Calendar, ImageIcon, Loader2 } from 'lucide-react';
import PageHeader from '../../components/dashboard/PageHeader.jsx';
import { StatusBadge, PriorityBadge } from '../../components/ui/StatusBadge.jsx';
import { issueService } from '../../services/issueService.js';

function formatDate(dateString) {
  if (!dateString) return '';
  return new Date(dateString).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export default function AdminIssueDetails() {
  const { id } = useParams();
  const [issue, setIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [status, setStatus] = useState('Pending');
  const [priority, setPriority] = useState('Medium');
  const [notes, setNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const fetchIssue = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await issueService.getAdminIssueById(id);
        const fetchedIssue = response.data.issue;
        if (fetchedIssue) {
          setIssue(fetchedIssue);
          setStatus(fetchedIssue.status || 'Pending');
          setPriority(fetchedIssue.priority || 'Medium');
          setNotes(fetchedIssue.adminRemark || fetchedIssue.remarks || '');
        } else {
          setError('Issue not found');
        }
      } catch (err) {
        setError(
          err?.response?.data?.message ||
            'Failed to load issue details. Please try again.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchIssue();
  }, [id]);

  const handleSaveChanges = async () => {
    setSaving(true);
    setSuccessMessage('');
    setErrorMessage('');
    try {
      await issueService.updateAdminIssueStatus(id, {
        status,
        adminRemark: notes,
      });
      setSuccessMessage('Issue status updated successfully!');
      
      // Auto-clear success message after 3 seconds
      setTimeout(() => setSuccessMessage(''), 3000);

      // Refresh issue details
      const refreshResponse = await issueService.getAdminIssueById(id);
      const fetchedIssue = refreshResponse.data.issue;
      if (fetchedIssue) {
        setIssue(fetchedIssue);
        setStatus(fetchedIssue.status || 'Pending');
        setPriority(fetchedIssue.priority || 'Medium');
        setNotes(fetchedIssue.adminRemark || fetchedIssue.remarks || '');
      }
    } catch (err) {
      setErrorMessage(
        err?.response?.data?.message || 'Failed to update status. Please try again.'
      );
      setTimeout(() => setErrorMessage(''), 5000);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
        <Loader2 className="h-8 w-8 animate-spin text-brand-600" />
        <p className="text-sm text-slate-500 font-medium">Loading issue details...</p>
      </div>
    );
  }

  if (error || !issue) {
    return (
      <div className="mx-auto max-w-lg mt-12 text-center">
        <div className="card border-red-200 bg-red-50 p-6 rounded-xl">
          <p className="text-sm font-semibold text-red-700">Error Loading Issue</p>
          <p className="mt-2 text-xs text-red-600 leading-relaxed">{error || 'Issue not found'}</p>
          <Link
            to="/admin/issues"
            className="mt-5 inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Issues
          </Link>
        </div>
      </div>
    );
  }

  const attachments = issue.images || [];

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
        subtitle={`${issue._id.slice(-8).toUpperCase()} · reported ${formatDate(issue.createdAt)}`}
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
              <InfoRow icon={MapPin} label="Location" value={issue.location} />
              <InfoRow icon={User} label="Reported by" value={issue.reportedBy?.name || 'Unknown Student'} />
              <InfoRow icon={Calendar} label="Reported on" value={formatDate(issue.createdAt)} />
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
            {attachments.length === 0 ? (
              <p className="text-sm text-slate-500">No attachments uploaded.</p>
            ) : (
              <ul className="space-y-2">
                {attachments.map((url, idx) => {
                  const fileName = url.split('/').pop() || `Attachment ${idx + 1}`;
                  return (
                    <li key={url} className="rounded-lg border border-slate-200 px-4 py-3 text-sm text-slate-700">
                      <a href={url} target="_blank" rel="noopener noreferrer" className="text-brand-600 hover:underline break-all">
                        {fileName}
                      </a>
                    </li>
                  );
                })}
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
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="input mt-1.5 w-full py-2"
                >
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Actions</h2>
            <div className="mt-4 space-y-3">
              {successMessage && (
                <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-2.5 text-xs text-green-700 font-medium">
                  {successMessage}
                </div>
              )}
              {errorMessage && (
                <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-2.5 text-xs text-red-700 font-medium">
                  {errorMessage}
                </div>
              )}
              <button
                className="btn-primary w-full flex items-center justify-center gap-1.5"
                onClick={handleSaveChanges}
                disabled={saving}
              >
                {saving ? (
                  <>
                    <Loader2 className="h-3.5 w-3.5 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </button>
              <Link to="/admin/issues" className="btn-secondary w-full text-center">
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
