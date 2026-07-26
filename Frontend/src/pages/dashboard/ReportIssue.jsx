import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Upload, ImageIcon, X, ArrowLeft, Check, AlertCircle } from "lucide-react";
import PageHeader from "../../components/dashboard/PageHeader.jsx";
import { issueService } from "../../services/issueService.js";

const categories = [
  {
    group: "Hostel Facilities",
    items: [
      { label: "Plumbing & Sanitation", value: "Plumbing" },
      { label: "Electricity & Lighting", value: "Electricity" },
      { label: "Furniture & Fitting", value: "Furniture" },
      { label: "Cleanliness & Housekeeping", value: "Cleaning" }
    ]
  },
  {
    group: "Campus Services",
    items: [
      { label: "Wi-Fi & Internet", value: "Internet" },
      { label: "Water Supply", value: "Water" }
    ]
  },
  {
    group: "Others",
    items: [
      { label: "Other Maintenance", value: "Other" }
    ]
  }
];

const locations = [
  {
    group: "Hostel Blocks",
    items: ["Hostel Block A", "Hostel Block B", "Hostel Block C", "Hostel Block D"]
  },
  {
    group: "Academic & Labs",
    items: ["Main Classroom Block", "CSE Computer Labs", "Library Reading Hall", "University Auditorium"]
  },
  {
    group: "Common Areas",
    items: ["Cafeteria / Dining Hall", "Sports Complex", "East Gate Parking Lot"]
  }
];

const initialForm = {
  category: "",
  location: "",
  description: "",
  image: null,
  imageFile: null,
};

function Toast({ toast, onClose }) {
  useEffect(() => {
    if (!toast) return undefined;

    const timer = setTimeout(onClose, 4000);
    return () => clearTimeout(timer);
  }, [toast, onClose]);

  if (!toast) return null;

  const isSuccess = toast.type === "success";

  return (
    <div
      className={`fixed right-4 top-20 z-50 flex max-w-sm items-start gap-3 rounded-lg border px-4 py-3 shadow-lg ${
        isSuccess
          ? "border-green-200 bg-green-50 text-green-800"
          : "border-red-200 bg-red-50 text-red-800"
      }`}
      role="status"
    >
      {isSuccess ? (
        <Check className="mt-0.5 h-4 w-4 shrink-0" />
      ) : (
        <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
      )}
      <p className="text-sm font-medium">{toast.message}</p>
    </div>
  );
}

function buildTitle(description) {
  const trimmed = description.trim();
  if (trimmed.length <= 80) return trimmed;
  return `${trimmed.slice(0, 77)}...`;
}

export default function ReportIssue() {
  const navigate = useNavigate();
  const [form, setForm] = useState(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [toast, setToast] = useState(null);

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onFile = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setForm((f) => ({
        ...f,
        image: URL.createObjectURL(file),
        imageFile: file,
      }));
    }
  };

  const removeImage = () => {
    if (form.image) URL.revokeObjectURL(form.image);
    setForm((f) => ({ ...f, image: null, imageFile: null }));
  };

  const resetForm = () => {
    if (form.image) URL.revokeObjectURL(form.image);
    setForm(initialForm);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setToast(null);

    try {
      let imageUrls = [];

      if (form.imageFile) {
        const uploadResponse = await issueService.uploadImages([form.imageFile]);
        imageUrls = uploadResponse.data.urls || [];
      }

      await issueService.createIssue({
        title: buildTitle(form.description),
        description: form.description.trim(),
        category: form.category,
        location: form.location,
        images: imageUrls,
      });

      resetForm();
      setSubmitted(true);
      setToast({
        type: "success",
        message: "Issue reported successfully. Redirecting to your issues…",
      });

      setTimeout(() => navigate("/dashboard/my-issues"), 1400);
    } catch (err) {
      setToast({
        type: "error",
        message:
          err?.response?.data?.message ||
          "Failed to submit issue. Please try again.",
      });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Toast toast={toast} onClose={() => setToast(null)} />
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
      <Toast toast={toast} onClose={() => setToast(null)} />

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
              disabled={submitting}
            >
              <option value="" disabled>Select a category</option>
              {categories.map((groupObj) => (
                <optgroup key={groupObj.group} label={groupObj.group}>
                  {groupObj.items.map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
                </optgroup>
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
              disabled={submitting}
            >
              <option value="" disabled>Select a location</option>
              {locations.map((groupObj) => (
                <optgroup key={groupObj.group} label={groupObj.group}>
                  {groupObj.items.map((l) => (
                    <option key={l} value={l}>
                      {l}
                    </option>
                  ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>

        <div className="mt-5">
          <label className="label" htmlFor="description">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            required
            rows={5}
            maxLength={1000}
            value={form.description}
            onChange={onChange}
            placeholder={"Describe the issue clearly.\nExample: Water leakage in Hostel Block A, 3rd Floor since yesterday."}
            className="input resize-y"
            disabled={submitting}
          />
          <div className="mt-1 text-right text-xs text-slate-400">
            {form.description.length} / 1000 characters
          </div>
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
                disabled={submitting}
                className="absolute right-2 top-2 inline-flex h-8 w-8 items-center justify-center rounded-md bg-white/90 text-slate-700 shadow-soft hover:bg-white disabled:opacity-50"
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
                  Click to upload or drag & drop
                </p>
                <p className="text-xs text-slate-500">PNG, JPG or JPEG up to 5MB (Attach a clear photo of the problem)</p>
              </div>
              <input
                id="image"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onFile}
                disabled={submitting}
              />
            </label>
          )}
        </div>

        <div className="mt-6 flex items-center justify-end gap-3 border-t border-slate-100 pt-5">
          <button
            type="button"
            className="btn-secondary"
            onClick={() => navigate("/dashboard")}
            disabled={submitting}
          >
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={submitting}>
            <ImageIcon className="h-4 w-4" />
            {submitting ? "Submitting…" : "Submit Issue"}
          </button>
        </div>
      </form>
    </div>
  );
}
