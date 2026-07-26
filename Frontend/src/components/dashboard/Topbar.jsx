import { Search, Bell, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';

function getInitials(name) {
  if (!name) return 'U';
  return name
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
}

export default function Topbar({ onMenu }) {
  const { user } = useAuth();
  const displayRole = user?.role === 'admin' 
    ? 'Administrator' 
    : user?.role === 'student' 
      ? 'Student' 
      : (user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'User');

  return (
    <header className="sticky top-0 z-20 flex h-16 items-center justify-between gap-4 border-b border-slate-200 bg-white/90 px-4 backdrop-blur sm:px-6">
      <div className="flex flex-1 items-center gap-3">
        <button
          onClick={onMenu}
          className="rounded-md p-2 text-slate-600 hover:bg-slate-100 lg:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="relative w-full max-w-md">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search issues, categories, locations…"
            className="hidden h-9 w-full rounded-lg border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm text-slate-700 placeholder:text-slate-400 focus:border-brand-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-500/30 sm:block"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="relative rounded-md p-2 text-slate-600 hover:bg-slate-100"
          aria-label="Notifications"
        >
          <Bell className="h-5 w-5" />
          <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
        </button>
        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-brand-100 text-xs font-semibold text-brand-700">
            {getInitials(user?.name)}
          </span>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold leading-tight text-slate-900">{user?.name || 'User'}</p>
            <p className="text-[11px] leading-tight text-slate-500">{displayRole}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
