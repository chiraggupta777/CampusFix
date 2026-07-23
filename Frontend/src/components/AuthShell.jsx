import { Link } from 'react-router-dom';
import { ArrowLeft, Wrench } from 'lucide-react';

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="min-h-screen bg-slate-50/60">
      <div className="mx-auto flex min-h-screen max-w-md flex-col px-4 py-8">
        <Link to="/" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900">
          <ArrowLeft className="h-4 w-4" />
          Back to home
        </Link>

        <div className="flex flex-1 items-center justify-center py-8">
          <div className="w-full">
            <div className="mb-6 flex items-center gap-2">
              <span className="inline-flex h-9 w-9 items-center justify-center rounded-lg bg-brand-500 text-white">
                <Wrench className="h-4 w-4" strokeWidth={2.5} />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900">
                Campus<span className="text-brand-500">Fix</span>
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">{title}</h1>
            <p className="mt-1.5 text-sm text-slate-600">{subtitle}</p>

            <div className="card mt-6 p-6">{children}</div>

            {footer && <div className="mt-4 text-center text-sm text-slate-600">{footer}</div>}
          </div>
        </div>
      </div>
    </div>
  );
}
