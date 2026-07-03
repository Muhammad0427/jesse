"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Shield, Lock, AlertCircle, Eye, EyeOff } from "lucide-react";
import { loginWithApi } from "@/lib/auth";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await loginWithApi(email.toLowerCase(), password);
      router.push("/dashboard");
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Login failed. Please try again.");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-gradient-to-br from-slate-50 to-blue-50 px-4 py-16">
      <div className="w-full max-w-md">
        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="bg-blue-700 px-8 py-7 text-center">
            <Shield className="mx-auto text-white mb-3" size={32} />
            <h1 className="text-white font-bold text-xl">ClearPath UM</h1>
            <p className="text-blue-200 text-sm mt-1">Secure Clinical Platform</p>
          </div>

          <div className="px-8 py-8">
            <h2 className="font-semibold text-slate-800 text-lg mb-1">Sign in to your account</h2>
            <p className="text-sm text-slate-500 mb-6">
              Session expires after 30 minutes of inactivity for PHI protection.
            </p>

            {error && (
              <div className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-700 text-sm px-4 py-3 rounded-lg mb-5">
                <AlertCircle size={15} className="flex-shrink-0" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="email">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="username"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="you@organization.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5" htmlFor="password">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPw ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent pr-10"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPw(!showPw)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    tabIndex={-1}
                  >
                    {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white font-semibold rounded-lg text-sm transition-colors flex items-center justify-center gap-2"
              >
                {loading ? (
                  <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <Lock size={15} />
                )}
                {loading ? "Signing in…" : "Sign in"}
              </button>
            </form>

            {/* Demo credentials helper */}
            <div className="mt-6 bg-slate-50 rounded-lg border border-slate-200 p-4">
              <p className="text-xs font-semibold text-slate-600 mb-2">Demo Credentials</p>
              <div className="space-y-1 text-xs text-slate-500 font-mono">
                <p>hospital@demo.com / demo1234</p>
                <p>carrier@demo.com / demo1234</p>
              </div>
            </div>

            <p className="text-xs text-slate-400 text-center mt-5">
              Need access?{" "}
              <Link href="/contact" className="text-blue-600 hover:underline">
                Contact us
              </Link>{" "}
              to request an account.
            </p>
          </div>
        </div>

        <p className="text-center text-xs text-slate-400 mt-4">
          This system may contain PHI. Unauthorized access is prohibited.
        </p>
      </div>
    </div>
  );
}
