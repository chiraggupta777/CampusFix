import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Play,
  Camera,
  Bell,
  ClipboardList,
  Route,
  Sparkles,
  CheckCircle2,
  GraduationCap,
  ShieldCheck,
  Github,
  Mail,
} from 'lucide-react';
import Navbar from '../components/landing/Navbar.jsx';
import DashboardMockup from '../components/landing/DashboardMockup.jsx';

const heroPoints = [
  'Free for Students',
  'AI Assisted Reporting',
  'Real-Time Updates',
];

const features = [
  { icon: ClipboardList, title: 'Report Issues', desc: 'Log a campus problem in under a minute.' },
  { icon: Camera, title: 'Upload Photos', desc: 'Attach photos so the team sees the real issue.' },
  { icon: Route, title: 'Track Status', desc: 'Follow every report from submission to resolution.' },
  { icon: ShieldCheck, title: 'Department Assignment', desc: 'Complaints reach the right department automatically.' },
  { icon: Bell, title: 'Notifications', desc: 'Get updates the moment your issue moves forward.' },
  { icon: Sparkles, title: 'AI Category Suggestion', desc: 'CampusFix suggests the best category for you.' },
];

const steps = [
  { title: 'Report Issue', desc: 'Fill a short form and add a photo if needed.' },
  { title: 'Admin Reviews', desc: 'The admin checks details and accepts the complaint.' },
  { title: 'Department Assigned', desc: 'The right department takes it up.' },
  { title: 'Issue Resolved', desc: 'You get an update once the issue is fixed.' },
];

const whyBenefits = [
  'One place to report issues',
  'Track complaint status',
  'Automatic department assignment',
  'Real-time notifications',
];

const modules = [
  {
    icon: GraduationCap,
    title: 'Student Portal',
    points: ['Report Issues', 'Track Complaints', 'Notifications'],
    cta: 'Open Student Portal',
    to: '/dashboard',
  },
  {
    icon: ShieldCheck,
    title: 'Admin Dashboard',
    points: ['Review Complaints', 'Assign Departments', 'Update Status'],
    cta: 'Open Admin Dashboard',
    to: '/admin',
  },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-4 pb-14 pt-12 sm:px-6 lg:pb-16 lg:pt-16">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600">
                <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
                University Issue Management
              </span>
              <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight text-slate-900 sm:text-5xl">
                Report campus issues.
                <br />
                Track progress.
                <br />
                <span className="text-brand-500">Get updates.</span>
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-slate-600">
                CampusFix helps students report campus problems, monitor complaint status, and
                receive updates through one simple platform.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <Link to="/register" className="btn-primary">
                  Get Started
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link to="/dashboard" className="btn-secondary">
                  <Play className="h-4 w-4" />
                  View Demo
                </Link>
              </div>
              <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-2">
                {heroPoints.map((p) => (
                  <li key={p} className="flex items-center gap-1.5 text-sm text-slate-600">
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <div className="lg:pl-4">
              <div className="origin-top-left scale-95 sm:scale-[0.9]">
                <DashboardMockup />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why CampusFix */}
      <section className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
          <div className="grid gap-8 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
                Why CampusFix?
              </p>
              <h2 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
                A simpler way to handle campus maintenance
              </h2>
              <p className="mt-3 max-w-md text-sm leading-relaxed text-slate-600">
                Campus issues often go unnoticed because there is no clear place to report them.
                CampusFix brings reporting, tracking and updates together for students and college
                admins.
              </p>
            </div>
            <ul className="grid gap-3 sm:grid-cols-2">
              {whyBenefits.map((b) => (
                <li key={b} className="flex items-start gap-2.5 rounded-xl border border-slate-200 bg-white px-4 py-3 shadow-soft">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-brand-500" />
                  <span className="text-sm font-medium text-slate-800">{b}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Features
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              Everything you need to fix campus issues
            </h2>
            <p className="mt-3 text-slate-600">
              Simple tools that make reporting and resolving complaints feel effortless.
            </p>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <div key={f.title} className="card-hover flex h-full flex-col p-6">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <f.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{f.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              How It Works
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              From report to resolution in four steps
            </h2>
          </div>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((s, i) => (
              <div key={s.title} className="card h-full p-6">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand-500 text-sm font-bold text-white">
                  {i + 1}
                </span>
                <h3 className="mt-4 text-base font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Modules */}
      <section id="modules" className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-wide text-brand-600">
              Platform Modules
            </p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-slate-900">
              One platform, two focused views
            </h2>
            <p className="mt-3 text-slate-600">
              Each role gets a clean dashboard with only what it needs.
            </p>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {modules.map((m) => (
              <div key={m.title} className="card-hover flex h-full flex-col p-6">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-lg bg-brand-50 text-brand-600">
                  <m.icon className="h-5 w-5" />
                </span>
                <h3 className="mt-4 text-lg font-semibold text-slate-900">{m.title}</h3>
                <ul className="mt-4 space-y-2.5">
                  {m.points.map((p) => (
                    <li key={p} className="flex items-center gap-2 text-sm text-slate-600">
                      <CheckCircle2 className="h-4 w-4 shrink-0 text-green-500" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link to={m.to} className="btn-secondary mt-6 self-start">
                  {m.cta}
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="border-t bg-[#FAFAFA]">
        <div className="mx-auto max-w-6xl px-4 pt-6 pb-10 sm:px-6" style={{ borderTopColor: 'rgba(15,118,110,0.08)' }}>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <p className="text-lg font-semibold tracking-tight text-slate-900">CampusFix</p>
              <p className="mt-3 max-w-xs text-sm leading-6 text-slate-600">
                A smarter way for students to report, track, and resolve campus issues efficiently.
              </p>
              <p className="mt-6 text-sm text-slate-500">© 2026 CampusFix. All rights reserved.</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">About</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li><a href="#features" className="transition hover:text-slate-900">Features</a></li>
                <li><a href="#how-it-works" className="transition hover:text-slate-900">How it works</a></li>
                <li><a href="#modules" className="transition hover:text-slate-900">Modules</a></li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">Contact</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li className="transition hover:text-slate-900">campusfix@university.edu</li>
                <li className="transition hover:text-slate-900">github.com/campusfix</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-slate-900">Account</p>
              <ul className="mt-4 space-y-3 text-sm text-slate-600">
                <li><Link to="/login" className="transition hover:text-slate-900">Login</Link></li>
                <li><Link to="/register" className="transition hover:text-slate-900">Get Started</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
