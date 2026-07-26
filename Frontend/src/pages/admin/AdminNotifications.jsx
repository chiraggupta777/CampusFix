import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bell, CheckCircle2, User, Wrench, MessageSquare, Loader2 } from 'lucide-react';
import PageHeader from '../../components/dashboard/PageHeader.jsx';
import { notificationService } from '../../services/notificationService.js';

const typeConfig = {
  issue_created: {
    icon: CheckCircle2,
    tone: 'bg-green-50 text-green-600',
  },
  status_changed: {
    icon: Wrench,
    tone: 'bg-amber-50 text-amber-600',
  },
  admin_remark: {
    icon: MessageSquare,
    tone: 'bg-slate-100 text-slate-600',
  },
};

function formatDateTime(dateString) {
  return new Date(dateString).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  });
}

function getNotificationTitle(notification) {
  const issueTitle = notification.issue?.title || 'an issue';

  if (notification.type === 'issue_created') {
    return `New issue: ${issueTitle}`;
  }

  if (notification.type === 'status_changed') {
    return `Status updated: ${issueTitle}`;
  }

  if (notification.type === 'admin_remark') {
    return `New remark: ${issueTitle}`;
  }

  return issueTitle;
}

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchNotifications = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await notificationService.getNotifications();
      setNotifications(response.data.notifications || []);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          'Failed to load notifications. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  const handleMarkAllRead = async () => {
    try {
      await notificationService.markAllAsRead();
      // Refresh list
      fetchNotifications();
    } catch (err) {
      // Fail silently
    }
  };

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl">
        <PageHeader title="Notifications" subtitle="Admin alerts and campus updates." />
        <div className="card flex items-center justify-center gap-2 px-5 py-16 text-sm text-slate-500">
          <Loader2 className="h-5 w-5 animate-spin" />
          Loading notifications…
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <PageHeader 
        title="Notifications" 
        subtitle="Admin alerts and campus updates." 
        actions={
          notifications.some(n => !n.isRead) && (
            <button onClick={handleMarkAllRead} className="btn-secondary py-1.5 px-3 text-xs font-semibold">
              Mark all as read
            </button>
          )
        }
      />

      {error && (
        <div className="card mb-5 border-red-200 bg-red-50 px-5 py-4 text-sm text-red-600">
          {error}
        </div>
      )}

      <div className="card divide-y divide-slate-100">
        {notifications.map((n) => {
          const config = typeConfig[n.type] || {
            icon: User,
            tone: 'bg-indigo-50 text-indigo-600',
          };
          const Icon = config.icon;
          const issueId = n.issue?._id || n.issue;

          const handleMarkAsRead = async () => {
            if (!n.isRead) {
              try {
                await notificationService.markAsRead(n._id);
              } catch (err) {
                // Fail silently
              }
            }
          };

          return (
            <Link
              key={n._id}
              to={issueId ? `/admin/issues/${issueId}` : '/admin/issues'}
              onClick={handleMarkAsRead}
              className={`flex gap-3 px-5 py-4 hover:bg-slate-50 transition ${
                n.isRead ? 'opacity-75' : 'bg-brand-50/30'
              }`}
            >
              <span
                className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.tone}`}
              >
                <Icon className="h-4 w-4" />
              </span>
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {getNotificationTitle(n)}
                  </p>
                  {!n.isRead && (
                    <span className="mt-1.5 inline-flex h-2 w-2 shrink-0 rounded-full bg-brand-500" />
                  )}
                </div>
                <p className="mt-0.5 text-xs leading-relaxed text-slate-600">{n.message}</p>
                <p className="mt-1.5 text-[11px] font-medium uppercase tracking-wide text-slate-400">
                  {formatDateTime(n.createdAt)}
                  {!n.isRead && ' · Unread'}
                </p>
              </div>
            </Link>
          );
        })}
        {!error && notifications.length === 0 && (
          <div className="px-5 py-12 text-center">
            <Bell className="mx-auto h-8 w-8 text-slate-300 animate-pulse" />
            <p className="mt-3 text-sm font-medium text-slate-700">No alerts at the moment</p>
            <p className="mt-1 text-xs text-slate-500">You are all caught up.</p>
          </div>
        )}
      </div>
    </div>
  );
}
