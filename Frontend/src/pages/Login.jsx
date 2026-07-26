import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff, Check, ArrowRight } from "lucide-react";
import AuthShell from "../components/AuthShell.jsx";
import { useAuth } from "../context/AuthContext.jsx";

const ALLOWED_DOMAIN = "bbdu.ac.in";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    const emailDomain = form.email.split('@')[1];
    if (!emailDomain || emailDomain.toLowerCase() !== ALLOWED_DOMAIN.toLowerCase()) {
      setError(`Only logins with @${ALLOWED_DOMAIN} email addresses are allowed.`);
      setLoading(false);
      return;
    }

    try {
      const response = await login(form);
      const userRole = response?.data?.user?.role;

      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        if (userRole === "admin") {
          navigate("/admin");
        } else {
          navigate("/dashboard");
        }
      }, 1500);
    } catch (err) {
      setError(
        err?.response?.data?.message || "Login failed. Please try again.",
      );
      setLoading(false);
    }
  };

  return (
    <AuthShell
      title="Login to CampusFix"
      subtitle="Login with your university email to report and track campus issues."
      footer={
        <>
          New to CampusFix?{" "}
          <Link
            to="/register"
            className="font-semibold text-brand-600 hover:text-brand-700"
          >
            Create an account
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

        <div>
          <div className="mb-1.5 flex items-center justify-between">
            <label className="label mb-0" htmlFor="password">
              Password
            </label>
            <a
              href="#"
              className="text-xs font-medium text-brand-600 hover:text-brand-700"
            >
              Forgot password?
            </a>
          </div>
          <div className="relative">
            <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              id="password"
              name="password"
              type={show ? "text" : "password"}
              required
              value={form.password}
              onChange={handleChange}
              placeholder="Minimum 8 characters"
              className="input pl-9 pr-9"
              disabled={loading || !!success}
            />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1.5 text-slate-400 hover:text-slate-600"
              aria-label={show ? "Hide password" : "Show password"}
              disabled={loading || !!success}
            >
              {show ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {error && (
          <p className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600">
            {error}
          </p>
        )}

        <button type="submit" className="btn-primary w-full" disabled={loading || !!success}>
          {loading ? "Logging in..." : "Login"}
          <ArrowRight className="h-4 w-4" />
        </button>

        <p className="text-center text-xs text-slate-400">
          Use your campus email and password to sign in.
        </p>
      </form>
    </AuthShell>
  );
}
