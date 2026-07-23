import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, Sparkles, ImageIcon, X, ArrowLeft, Check } from "lucide-react";
import PageHeader from "../../components/dashboard/PageHeader.jsx"; 
import { categories, locations } from "../../data/mockData.jsx";

export default function ReportIssue() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    category: "",
    location: "",
    description: "",
    image: null,
  });
  const [analyzing, setAnalyzing] = useState(false);
  const [suggested, setSuggested] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((f) => ({ ...f, image: URL.createObjectURL(file) }));
    }
  };

  const removeImage = () => setForm((f) => ({ ...f, image: null }));

  const analyze = () => {
    if (!form.description.trim()) return;
    setAnalyzing(true);
    setSuggested("");
    setTimeout(() => {
      const text = form.description.toLowerCase();
      let pick = "Other";
      if (/(light|tube|bulb|fan|electrical|wire|switch|power)/.test(text))
        pick = "Electrical";
      else if (/(tap|leak|water|drain|pipe|toilet|washroom)/.test(text))
        pick = "Plumbing";
      else if (/(chair|table|desk|furniture|broken)/.test(text))
        pick = "Furniture";
      else if (/(wi-?fi|wifi|network|internet|router)/.test(text))
        pick = "Network";
      else if (/(ac|cool|heat|air|vent)/.test(text)) pick = "HVAC";
      else if (/(clean|dust|garbage|waste|dirty)/.test(text))
        pick = "Cleanliness";
      else if (/(safe|fire|smoke|lock|gate)/.test(text)) pick = "Safety";
      setSuggested(pick);
      setForm((f) => ({ ...f, category: pick }));
      setAnalyzing(false);
    }, 900);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => navigate("/dashboard/my-issues"), 1400);
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="card max-w-md p-8 text-center">
          <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-green-600">
            <Check className="h-6 w-6" />
          </span>
          <h2 className="mt-4 text-lg font-bold text-slate-900">
            Issue reported
          </h2>
          <p className="mt-1.5 text-sm text-slate-600">
            Your complaint has been submitted. The admin will review it shortly.
          </p>
          <p className="mt-3 text-xs text-slate-400">
            Redirecting to your issues…
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl">
      <Link
        to="/dashboard"
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-slate-600 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to dashboard
      </Link>

      <PageHeader
        title="Report an Issue"
        subtitle="Fill in the details below and we will route it to the right team."
      />

      <form onSubmit={handleSubmit} className="card p-6">
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="category">
              Category
            </label>
            <select
              id="category"
              name="category"
              required
              value={form.category}
              onChange={onChange}
              className="input"
            >
              <option value="">Select a category</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label" htmlFor="location">
              Location
            </label>
            <select
              id="location"
              name="location"
              required
              value={form.location}
              onChange={onChange}
              className="input"
            >
              <option value="">Select a location</option>
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5">
          <div className="mb-1.5 flex items-center justify-between">
            <label className="label mb-0" htmlFor="description">
              Description
            </label>
            <button
              type="button"
              onClick={analyze}
              disabled={!form.description.trim() || analyzing}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-600 hover:text-brand-700 disabled:opacity-50"
            >
              <Sparkles
                className={`h-3.5 w-3.5 ${analyzing ? "animate-pulse" : ""}`}
              />
              {analyzing ? "Analyzing…" : "Analyze with AI"}
            </button>
          </div>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            value={form.description}
            onChange={onChange}
            placeholder="Describe the issue. What happened, where exactly, and since when?"
            className="input resize-y"
          />
          {suggested && !analyzing && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-md bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
              <Sparkles className="h-3.5 w-3.5" />
              Suggested category:{" "}
              <strong className="font-semibold">{suggested}</strong>
            </p>
          )}
        </div>

        <div className="mt-5">
          <label className="label">Upload Image</label>
          {form.image ? (
            <div className="relative overflow-hidden rounded-lg border border-slate-200">
              <img
                src={form.image}
                alt="Preview"
                className="h-56 w-full object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-slate-700 shadow-soft hover:bg-white"
                aria-label="Remove image"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <label
              htmlFor="image"
              className="flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-slate-300 bg-slate-50 px-6 py-10 text-center transition hover:border-brand-400 hover:bg-brand-50/40"
            >
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-white text-slate-500 ring-1 ring-slate-200">
                <Upload className="h-5 w-5" />
              </span>
              <div>
                <p className="text-sm font-semibold text-slate-700">
                  Click to upload
                </p>
                <p className="text-xs text-slate-500">PNG, JPG up to 5MB</p>
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFile}
              />
            </label>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/dashboard")}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary">
            <ImageIcon className="h-4 w-4" />
            Submit Issue
          </button>
        </div>
      </form>
    </div>
  );
}
