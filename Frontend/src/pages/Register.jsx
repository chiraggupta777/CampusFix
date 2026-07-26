import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Check, ArrowRight } from "lucide-react";
import AuthShell from "../components/AuthShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const ALLOWED_DOMAIN = "bbdu.ac.in";

export default function Register() {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    hostelBlock: "",
    roomNumber: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    let value = e.target.value;
    if (e.target.name === "roomNumber") {
      value = value.replace(/\D/g, "");
    }
    if (e.target.name === "hostelBlock") {
      value = value.toUpperCase();
    }
    setForm((prev) => ({ ...prev, [e.target.name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const emailDomain = form.email.split('@')[1];
    if (!emailDomain || emailDomain.toLowerCase() !== ALLOWED_DOMAIN.toLowerCase()) {
      setError(`Only registrations with @${ALLOWED_DOMAIN} email addresses are allowed.`);
      setLoading(false);
      return;
    }

    if (form.password.length < 8) {
      setError("Password must be at least 8 characters long.");
      setLoading(false);
      return;
    }

    try {
      await register({
        name: form.name,
        email: form.email,
        password: form.password,
        hostelBlock: form.hostelBlock,
        roomNumber: form.roomNumber,
      });
      setSuccess("Account created successfully! Redirecting to login...");
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(
        err?.response?.data?.message ||
          "Registration failed. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Create Student Account"
      subtitle="Register with your university email to report and track campus issues."
      footer={
        <>
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Login
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        {success && (
          <div className="flex items-center gap-2 rounded-lg border border-green-200 bg-green-50 px-3 py-2 text-sm text-green-700 font-medium animate-pulse">
            <Check className="h-4 w-4 shrink-0" />
            <span>{success}</span>
          </div>
        )}

        <div>
          <label className="label" htmlFor="name">
            Full name
          </label>
          <div className="relative">
            <User className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="name"
              name="name"
              type="text"
              required
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Chirag Gupta"
              className="input pl-9"
              disabled={loading || !!success}
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="email">
            University email
          </label>
          <div className="relative">
            <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="email"
              name="email"
              type="email"
              required
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. chirag.gupta23@bbdu.ac.in"
              className="input pl-9"
              disabled={loading || !!success}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="label" htmlFor="hostelBlock">
              Hostel block
            </label>
            <input
              id="hostelBlock"
              name="hostelBlock"
              type="text"
              required
              value={form.hostelBlock}
              onChange={handleChange}
              placeholder="A"
              className="input"
              disabled={loading || !!success}
            />
          </div>
          <div>
            <label className="label" htmlFor="roomNumber">
              Room number
            </label>
            <input
              id="roomNumber"
              name="roomNumber"
              type="text"
              required
              value={form.roomNumber}
              onChange={handleChange}
              placeholder="101"
              className="input"
              disabled={loading || !!success}
            />
          </div>
        </div>

        <div>
          <label className="label" htmlFor="password">
            Password
          </label>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              name="password"
              type="password"
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              className="input pl-9"
              disabled={loading || !!success}
            />
          </div>
        </div>

        <label className="flex items-start gap-2 text-xs text-slate-600">
          <input
            type="checkbox"
            required
            className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-500 focus:ring-brand-500"
            disabled={loading || !!success}
          />
          <span>
            I agree to the{" "}
            <a
              href="#"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              Terms
            </a>{" "}
            and{" "}
            <a
              href="#"
              className="font-medium text-brand-600 hover:text-brand-700"
            >
              Privacy Policy
            </a>
            .
          </span>
        </label>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary w-full" disabled={loading || !!success}>
          {loading ? "Creating account..." : "Create account"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </form>
    </AuthShell>
  );
}
