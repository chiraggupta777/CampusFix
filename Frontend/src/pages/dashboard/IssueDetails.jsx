import { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  Tag,
  User,
  Calendar,
  CheckCircle2,
  Circle,
  Send,
  ImageIcon,
} from 'lucide-react';
import PageHeader from '../../components/dashboard/PageHeader.jsx';
import { StatusBadge, PriorityBadge } from '../../components/ui/StatusBadge.jsx';
import { getIssueById } from '../../data/mockData.jsx';

export default function IssueDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const issue = getIssueById(id);

  const [comment, setComment] = useState('');
  const [comments, setComments] = useState(issue ? issue.comments : []);

  if (!issue) {
    return (
      <div className="mx-auto max-w-md py-16 text-center">
        <p className="text-sm font-semibold text-slate-700">Issue not found</p>
        <Link to="/dashboard/issues" className="btn-secondary mt-4">
          Back to My Issues
        </Link>
      </div>
    );
  }

  const addComment = (e) => {
    e.preventDefault();
    if (!comment.trim()) return;
    setComments((c) => [
      ...c,
      {
        author: 'Priya Sharma',
        role: 'Student',
        at: 'Just now',
        text: comment.trim(),
      },
    ]);
    setComment('');
  };

  return (
    <div className="mx-auto max-w-5xl">
      <Link
        to="/dashboard/issues"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to My Issues
      </Link>

      <PageHeader
        title={issue.title}
        subtitle={`${issue.id} · reported ${issue.date}`}
        actions={
          <>
            <StatusBadge status={issue.status} />
            <PriorityBadge priority={issue.priority} />
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left: info + image + comments */}
        <div className="space-y-6 lg:col-span-2">
          {/* Complaint info */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Complaint Information</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <InfoRow icon={Tag} label="Category" value={issue.category} />
              <InfoRow icon={MapPin} label="Location" value={issue.location} />
              <InfoRow
                icon={User}
                label="Assigned to"
                value={issue.assignedTo || 'Not assigned yet'}
              />
              <InfoRow icon={Calendar} label="Reported on" value={issue.date} />
            </div>
            <div className="mt-5 border-t border-slate-100 pt-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                Description
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">{issue.description}</p>
            </div>
          </div>

          {/* Uploaded image */}
          <div className="card p-6">
            <div className="mb-3 flex items-center gap-2">
              <ImageIcon className="h-4 w-4 text-slate-400" />
              <h2 className="text-sm font-semibold text-slate-900">Uploaded Image</h2>
            </div>
            <div className="overflow-hidden rounded-lg border border-slate-200">
              <img
                src={issue.image}
                alt={issue.title}
                className="h-64 w-full object-cover"
              />
            </div>
          </div>

          {/* Comments */}
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Comments</h2>
            <div className="mt-4 space-y-4">
              {comments.length === 0 && (
                <p className="text-sm text-slate-500">No comments yet. Start the conversation.</p>
              )}
              {comments.map((c, idx) => (
                <div key={idx} className="flex gap-3">
                  <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600">
                    {c.author.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                  </span>
                  <div className="flex-1 rounded-lg bg-slate-50 px-3.5 py-2.5">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-slate-900">{c.author}</p>
                      <span className="rounded-full bg-white px-2 py-0.5 text-[10px] font-medium text-slate-500 ring-1 ring-slate-200">
                        {c.role}
                      </span>
                      <span className="ml-auto text-xs text-slate-400">{c.at}</span>
                    </div>
                    <p className="mt-1 text-sm leading-relaxed text-slate-700">{c.text}</p>
                  </div>
                </div>
              ))}
            </div>

            <form onSubmit={addComment} className="mt-5 flex items-start gap-3 border-t border-slate-100 pt-4">
              <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
                PS
              </span>
              <div className="flex-1">
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={2}
                  placeholder="Add a comment…"
                  className="input resize-y"
                />
                <div className="mt-2 flex justify-end">
                  <button type="submit" disabled={!comment.trim()} className="btn-primary">
                    <Send className="h-4 w-4" />
                    Comment
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Right: timeline / status */}
        <div className="space-y-6">
          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Status</h2>
            <div className="mt-3 flex items-center gap-2">
              <StatusBadge status={issue.status} />
              <PriorityBadge priority={issue.priority} />
            </div>
            <p className="mt-3 text-xs leading-relaxed text-slate-500">
              {issue.assignedTo
                ? `Currently with ${issue.assignedTo}.`
                : 'Waiting for admin review.'}
            </p>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Timeline</h2>
            <ol className="mt-4 space-y-4">
              {issue.timeline.map((t, idx) => (
                <li key={idx} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    {t.done ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : (
                      <Circle className="h-5 w-5 text-slate-300" />
                    )}
                    {idx !== issue.timeline.length - 1 && (
                      <span
                        className={`mt-1 w-px flex-1 ${t.done ? 'bg-green-200' : 'bg-slate-200'}`}
                        style={{ minHeight: 16 }}
                      />
                    )}
                  </div>
                  <div className="pb-1">
                    <p
                      className={`text-sm font-medium ${
                        t.done ? 'text-slate-900' : 'text-slate-500'
                      }`}
                    >
                      {t.label}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-400">{t.at}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          <div className="card p-6">
            <h2 className="text-sm font-semibold text-slate-900">Need to make changes?</h2>
            <p className="mt-2 text-xs leading-relaxed text-slate-500">
              You can withdraw this issue if it was reported by mistake.
            </p>
            <button
              onClick={() => navigate('/dashboard/issues')}
              className="btn-secondary mt-4 w-full"
            >
              Withdraw Issue
            </button>
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
