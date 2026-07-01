import Link from "next/link";
import { ArrowRight, CheckCircle, Clock, FileText, ShieldCheck, Users, Building2 } from "lucide-react";

const problems = [
  "Charts reviewed hours or days after admission — jeopardizing same-day concurrent review",
  "Inconsistent extraction of criteria-relevant clinical findings across reviewers",
  "Denial rationale that doesn't clearly tie clinical facts to MCG or Milliman thresholds",
  "Manual, repetitive data entry pulling time away from clinical judgment",
];

const features = [
  {
    icon: FileText,
    title: "Clinical Note Ingestion",
    body: "Paste or upload admission notes, progress notes, vitals, and labs into a single workspace.",
  },
  {
    icon: ShieldCheck,
    title: "Automated Summarization",
    body: "Condense complex documentation into a structured clinical summary highlighting criteria-relevant findings.",
  },
  {
    icon: CheckCircle,
    title: "Determination Support",
    body: "Clearly separated 'supports admission' vs. 'does not meet criteria' findings, each citing the specific clinical facts behind it.",
  },
  {
    icon: Clock,
    title: "Same-Day Concurrent Review",
    body: "Get day-one and day-two reasoning in minutes, not hours — so your team can respond before the payor calls.",
  },
  {
    icon: Users,
    title: "Hospital & Carrier Workflows",
    body: "Separate logic paths for inpatient, SNF, and LTAC — tailored to the fields each criteria framework requires.",
  },
  {
    icon: Building2,
    title: "MCG & Milliman Aligned",
    body: "Outputs reference the frameworks your reviewers already use, with a built-in checklist to confirm against licensed criteria.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero with video background */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-slate-900">
        {/* Video overlay background — replace src with real hospital footage */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
          {/* Decorative grid overlay */}
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Video element — uses a free Pexels/stock hospital ambiance video; swap src for production */}
        <video
          className="absolute inset-0 w-full h-full object-cover z-0 opacity-25"
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-slate-900/70 z-10" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-900/50 border border-blue-700/50 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
            Clinical Decision Support Platform
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
            Faster, Consistent
            <br />
            <span className="text-blue-400">Utilization Management</span>
            <br />
            Review — Day One.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed mb-10">
            ClearPath UM ingests clinical documentation, extracts the key findings, and generates structured
            determination support for inpatient admissions, SNF placement, and LTAC requests — aligned with MCG and
            Milliman criteria frameworks.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/login"
              className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors shadow-lg shadow-blue-900/40"
            >
              Sign In to Platform <ArrowRight size={16} />
            </Link>
            <Link
              href="/hospitals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors"
            >
              For Hospitals
            </Link>
            <Link
              href="/carriers"
              className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg border border-white/20 transition-colors"
            >
              For Carriers
            </Link>
          </div>
        </div>
      </section>

      {/* Problem statement */}
      <section className="bg-slate-50 border-b border-slate-200 py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-4 text-center">The UM Review Problem</h2>
          <p className="text-center text-slate-500 mb-10">
            Hospital case management and payer UM teams face the same bottlenecks every day.
          </p>
          <ul className="space-y-4">
            {problems.map((p, i) => (
              <li key={i} className="flex items-start gap-3 bg-white rounded-lg border border-slate-200 p-4 shadow-sm">
                <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold">
                  ✕
                </span>
                <span className="text-slate-700 text-sm leading-relaxed">{p}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Features grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-4">The ClearPath UM Solution</h2>
          <p className="text-center text-slate-500 max-w-xl mx-auto mb-14">
            One platform, two audiences, three care settings — purpose-built for concurrent UM review.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f, i) => (
              <div key={i} className="p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group">
                <f.icon className="text-blue-600 mb-4 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="font-semibold text-slate-800 mb-2">{f.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Dual-audience CTA */}
      <section className="bg-blue-700 py-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white/10 rounded-xl p-8 text-white">
            <Building2 className="mb-4 text-blue-200" size={32} />
            <h3 className="text-xl font-bold mb-3">Hospital Case Management & UR</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Submit a chart for review in seconds. Get day-one inpatient justification, SNF discharge planning
              support, and LTAC criteria analysis before the payor calls.
            </p>
            <Link
              href="/hospitals"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Learn More <ArrowRight size={14} />
            </Link>
          </div>
          <div className="bg-white/10 rounded-xl p-8 text-white">
            <ShieldCheck className="mb-4 text-blue-200" size={32} />
            <h3 className="text-xl font-bold mb-3">Insurance Carrier UM Departments</h3>
            <p className="text-blue-100 text-sm leading-relaxed mb-6">
              Standardize incoming inpatient, SNF, and LTAC requests with structured clinical summaries. Accelerate
              review turnaround and build a defensible audit trail.
            </p>
            <Link
              href="/carriers"
              className="inline-flex items-center gap-2 bg-white text-blue-700 font-semibold text-sm px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors"
            >
              Learn More <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </section>

      {/* Compliance strip */}
      <section className="bg-slate-900 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-xs text-slate-400 leading-relaxed">
            <span className="text-amber-400 font-semibold">Clinical Decision Support Only:</span> All outputs require
            independent review and final determination by a licensed clinical reviewer. ClearPath UM does not issue
            coverage denials or replace licensed criteria products (MCG™, Milliman Care Guidelines®).
          </p>
        </div>
      </section>
    </>
  );
}
