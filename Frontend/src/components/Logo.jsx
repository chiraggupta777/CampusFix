import { Wrench } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Logo({ to = '/', className = '' }) {
  return (
    <Link to={to} className={`inline-flex items-center gap-2 ${className}`}>
      <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-white">
        <Wrench className="h-4 w-4" strokeWidth={2.5} />
      </span>
      <span className="text-lg font-bold tracking-tight text-slate-900">
        Campus<span className="text-brand-500">Fix</span>
      </span>
    </Link>
  );
}
