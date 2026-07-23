import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Filter, PlusCircle, ArrowRight } from "lucide-react";
import PageHeader from "../../components/dashboard/PageHeader.jsx";
import {
  StatusBadge,
  PriorityBadge,
} from "../../components/ui/StatusBadge.jsx";
import { issues } from "../../data/mockData.jsx";

const statusOptions = [
  "All",
  "Open",
  "Assigned",
  "In Progress",
  "Resolved",
  "Rejected",
];
const priorityOptions = ["All", "Low", "Medium", "High", "Urgent"];

export default function MyIssues() {
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState("All");
  const [priority, setPriority] = useState("All");

  const filtered = useMemo(() => {
    return issues.filter((i) => {
      const matchesQuery =
        !query ||
        i.title.toLowerCase().includes(query.toLowerCase()) ||
        i.id.toLowerCase().includes(query.toLowerCase()) ||
        i.location.toLowerCase().includes(query.toLowerCase());
      const matchesStatus = status === "All" || i.status === status;
      const matchesPriority = priority === "All" || i.priority === priority;
      return matchesQuery && matchesStatus && matchesPriority;
    });
  }, [query, status, priority]);

  return (
    <div>
      <PageHeader
        title="My Issues"
        subtitle="All the complaints you have raised, in one place."
        actions={
          <Link to="/dashboard/report" className="btn-primary">
            <PlusCircle className="h-4 w-4" />
            Report an Issue
          </Link>
        }
      />

      {/* Filters */}
      <div className="card mb-5 p-4">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by title, ID or location…"
              className="input pl-9"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400" />
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="input w-auto py-2"
            >
              {statusOptions.map((s) => (
                <option key={s} value={s}>
                  Status: {s}
                </option>
              ))}
            </select>
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="input w-auto py-2"
            >
              {priorityOptions.map((p) => (
                <option key={p} value={p}>
                  Priority: {p}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="card overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-slate-200">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Issue
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Category
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Status
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Priority
                </th>
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Date
                </th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center">
                    <p className="text-sm font-medium text-slate-700">
                      No issues found
                    </p>
                    <p className="mt-1 text-xs text-slate-500">
                      Try adjusting your search or filters.
                    </p>
                  </td>
                </tr>
              )}
              {filtered.map((i) => (
                <tr key={i.id} className="hover:bg-slate-50">
                  <td className="px-5 py-4">
                    <Link
                      to={`/dashboard/issues/${i.id}`}
                      className="block max-w-xs"
                    >
                      <p className="truncate text-sm font-semibold text-slate-900 hover:text-brand-600">
                        {i.title}
                      </p>
                      <p className="mt-0.5 text-xs text-slate-500">{i.id}</p>
                    </Link>
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">
                    {i.category}
                  </td>
                  <td className="px-5 py-4">
                    <StatusBadge status={i.status} />
                  </td>
                  <td className="px-5 py-4">
                    <PriorityBadge priority={i.priority} />
                  </td>
                  <td className="px-5 py-4 text-sm text-slate-600">{i.date}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/dashboard/issues/${i.id}`}
                      className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-700"
                    >
                      View
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
