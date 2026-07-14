"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loadSession, clearSession, getRemainingMs, AuthUser } from "@/lib/auth";
import { FileText, Plus, Building2, ShieldCheck, Clock, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const HOSPITAL_REVIEWS = [
  { id: "R-1001", patient: "J. Smith", type: "Inpatient", status: "Supports Admission", date: "2026-07-01", dos: "07/01/26" },
  { id: "R-1000", patient: "M. Garcia", type: "SNF Placement", status: "Pending Review", date: "2026-06-30", dos: "06/29/26" },
  { id: "R-0999", patient: "D. Johnson", type: "LTAC", status: "Does Not Meet Criteria", date: "2026-06-30", dos: "06/28/26" },
  { id: "R-0998", patient: "L. Chen", type: "Inpatient", status: "Supports Admission", date: "2026-06-29", dos: "06/29/26" },
];

const CARRIER_REVIEWS = [
  { id: "A-4401", patient: "T. Williams", type: "Inpatient", status: "Approved", date: "2026-07-01", dos: "07/01/26" },
  { id: "A-4400", patient: "R. Patel", type: "SNF Placement", status: "Pending Review", date: "2026-06-30", dos: "06/28/26" },
  { id: "A-4399", patient: "B. Jones", type: "LTAC", status: "Denied", date: "2026-06-30", dos: "06/27/26" },
  { id: "A-4398", patient: "K. Davis", type: "Inpatient", status: "Approved", date: "2026-06-29", dos: "06/29/26" },
];

const hospitalStatusColor: Record<string, string> = {
  "Supports Admission": "bg-green-100 text-green-800",
  "Pending Review": "bg-amber-100 text-amber-800",
  "Does Not Meet Criteria": "bg-red-100 text-red-800",
};

const carrierStatusColor: Record<string, string> = {
  "Approved": "bg-green-100 text-green-800",
  "Pending Review": "bg-amber-100 text-amber-800",
  "Denied": "bg-red-100 text-red-800",
};

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionWarning, setSessionWarning] = useState(false);

  useEffect(() => {
    const u = loadSession();
    if (!u) { router.push("/login"); return; }
    setUser(u);
    setLoading(false);

    // Auto-redirect when session expires
    const remaining = getRemainingMs();
    const expireTimer = setTimeout(() => {
      clearSession();
      router.push("/login");
    }, remaining);

    // Warn 5 minutes before expiry
    const warnTimer = setTimeout(() => {
      setSessionWarning(true);
    }, Math.max(0, remaining - 5 * 60 * 1000));

    return () => { clearTimeout(expireTimer); clearTimeout(warnTimer); };
  }, [router]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <Loader2 className="animate-spin text-blue-600" size={32} />
    </div>
  );

  if (!user) return null;

  const isHospital = user.role === "hospital";
  const reviews = isHospital ? HOSPITAL_REVIEWS : CARRIER_REVIEWS;
  const statusColor = isHospital ? hospitalStatusColor : carrierStatusColor;

  const hospitalStats = [
    { label: "Reviews This Month", value: "24", icon: FileText, color: "text-blue-600" },
    { label: "Supports Admission", value: "18", icon: CheckCircle, color: "text-green-600" },
    { label: "Does Not Meet Criteria", value: "4", icon: ShieldCheck, color: "text-red-600" },
    { label: "Avg. Review Time", value: "4 min", icon: Clock, color: "text-amber-600" },
  ];

  const carrierStats = [
    { label: "Auth Requests This Month", value: "41", icon: FileText, color: "text-blue-600" },
    { label: "Approved", value: "29", icon: CheckCircle, color: "text-green-600" },
    { label: "Denied", value: "8", icon: ShieldCheck, color: "text-red-600" },
    { label: "Avg. Review Time", value: "6 min", icon: Clock, color: "text-amber-600" },
  ];

  const stats = isHospital ? hospitalStats : carrierStats;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      {/* Session expiry warning */}
      {sessionWarning && (
        <div className="mb-6 bg-amber-50 border border-amber-300 rounded-lg px-4 py-3 flex items-center gap-3">
          <AlertCircle size={16} className="text-amber-600 flex-shrink-0" />
          <p className="text-sm text-amber-800">
            <strong>Session expiring soon.</strong> You will be signed out in less than 5 minutes. Save your work.
          </p>
        </div>
      )}

      {/* Header */}
      <div className="flex items-start justify-between mb-8 flex-wrap gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">Welcome back, {user.name.split(",")[0]}</h1>
          <p className="text-slate-500 text-sm mt-1">
            {user.organization} &nbsp;·&nbsp;
            <span className="inline-flex items-center gap-1">
              {isHospital ? <Building2 size={12} /> : <ShieldCheck size={12} />}
              {isHospital ? "Hospital / UR" : "Carrier / UM"}
            </span>
          </p>
        </div>
        <Link
          href="/review"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm rounded-lg transition-colors shadow"
        >
          <Plus size={16} /> {isHospital ? "New UR Review" : "New Auth Review"}
        </Link>
      </div>

      {/* Role-specific banner */}
      {isHospital ? (
        <div className="mb-6 bg-blue-50 border border-blue-200 rounded-lg px-4 py-3 flex items-start gap-3">
          <Building2 size={15} className="text-blue-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-blue-800">
            <strong>Hospital UR View:</strong> Use this dashboard to manage concurrent reviews, track determination support outputs, and prepare documentation for payer submissions.
          </p>
        </div>
      ) : (
        <div className="mb-6 bg-purple-50 border border-purple-200 rounded-lg px-4 py-3 flex items-start gap-3">
          <ShieldCheck size={15} className="text-purple-600 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-purple-800">
            <strong>Carrier UM View:</strong> Use this dashboard to review inbound authorization requests, apply MCG/Milliman criteria, and track determination outcomes across your review queue.
          </p>
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
            <s.icon className={`${s.color} mb-3`} size={22} />
            <div className="text-2xl font-bold text-slate-800">{s.value}</div>
            <div className="text-xs text-slate-500 mt-1">{s.label}</div>
          </div>
        ))}
      </div>

      {/* PHI notice */}
      <div className="bg-amber-50 border border-amber-200 rounded-lg px-4 py-3 mb-6 flex items-start gap-2">
        <span className="text-amber-600 text-xs font-semibold uppercase tracking-wide mt-0.5">PHI Notice</span>
        <p className="text-xs text-amber-800">
          Patient identifiers below are masked by default. Click any blurred name to reveal. All data is transmitted over TLS and session expires after 30 minutes of inactivity.
        </p>
      </div>

      {/* Reviews table */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
          <h2 className="font-semibold text-slate-800">
            {isHospital ? "Recent UR Reviews" : "Recent Authorization Reviews"}
          </h2>
          <Link href="/review" className="text-sm text-blue-600 hover:underline">
            {isHospital ? "Start new review →" : "Start new auth review →"}
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-slate-50 text-xs text-slate-500 uppercase tracking-wide">
              <tr>
                <th className="px-6 py-3 text-left">{isHospital ? "Review ID" : "Auth ID"}</th>
                <th className="px-6 py-3 text-left">Patient</th>
                <th className="px-6 py-3 text-left">Type</th>
                <th className="px-6 py-3 text-left">DOS</th>
                <th className="px-6 py-3 text-left">Status</th>
                <th className="px-6 py-3 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {reviews.map((r) => (
                <tr key={r.id} className="hover:bg-slate-50 transition-colors">
                  <td className="px-6 py-4 font-mono text-slate-600">{r.id}</td>
                  <td className="px-6 py-4">
                    <span className="phi-masked font-mono text-xs">{r.patient}</span>
                  </td>
                  <td className="px-6 py-4 text-slate-700">{r.type}</td>
                  <td className="px-6 py-4 text-slate-600 font-mono text-xs">{r.dos}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor[r.status] ?? "bg-slate-100 text-slate-700"}`}>
                      {r.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-slate-500">{r.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
