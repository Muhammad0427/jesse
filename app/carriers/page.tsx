import Link from "next/link";
import { ShieldCheck, BarChart3, Clock, FileText, CheckCircle, ArrowRight, Scale } from "lucide-react";

const benefits = [
  {
    icon: Clock,
    title: "Faster Review Turnaround",
    body: "Incoming authorization requests arrive pre-structured with extracted clinical summaries, reducing the time your UM nurses spend parsing raw documentation.",
  },
  {
    icon: CheckCircle,
    title: "Standardized Criteria Application",
    body: "Every review follows the same structured analysis — consistent extraction of criteria-relevant findings reduces reviewer-to-reviewer variability.",
  },
  {
    icon: FileText,
    title: "Denial-Ready Documentation",
    body: "When criteria are not met, the output provides a structured, fact-cited rationale tied to clinical documentation — not reviewer opinion.",
  },
  {
    icon: BarChart3,
    title: "Audit Trail Value",
    body: "Each review generates a timestamped output tied to the submitted documentation, providing a defensible record for appeal and external review.",
  },
  {
    icon: ShieldCheck,
    title: "MCG & Milliman Aligned",
    body: "Outputs reference the criteria frameworks your reviewers use, with a built-in checklist to confirm licensed criteria before finalizing any determination.",
  },
  {
    icon: Scale,
    title: "Regulatory Defensibility",
    body: "Structured, citation-level documentation supports compliance with state and federal UM timeliness and transparency requirements.",
  },
];

const reviewTypes = [
  {
    type: "Inpatient Admission Review",
    what: "Incoming admission authorization requests with supporting clinical documentation",
    output: "Structured severity analysis, IV/monitoring criteria mapping, day-one justification assessment",
    criteria: "MCG Inpatient criteria pathways; Milliman Care Guidelines inpatient thresholds",
  },
  {
    type: "SNF Placement Review",
    what: "Skilled nursing facility placement requests following acute hospitalization",
    output: "Functional status extraction, skilled need identification, prior-level-of-function assessment",
    criteria: "MCG SNF — Skilled Service criteria; Milliman SNF placement guidelines",
  },
  {
    type: "LTAC Authorization Review",
    what: "Long-term acute care transfer requests with projected LOS and medical complexity documentation",
    output: "Intensity-of-service mapping, LOS projection review, medical complexity factor extraction",
    criteria: "MCG LTAC — Complex Medical Need pathway; Milliman LTAC criteria",
  },
];

export default function CarriersPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 py-20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 text-slate-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <ShieldCheck size={12} /> For Insurance Carrier UM Departments
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
            Standardize Incoming UM Reviews. <br className="hidden sm:block" />
            Build Defensible Determinations.
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed mb-8">
            ClearPath UM helps carrier UM departments process inpatient, SNF, and LTAC authorization requests faster —
            with structured clinical summaries, consistent criteria mapping, and denial-ready documentation.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors shadow-lg"
          >
            Access the Platform <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Benefits grid */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">What ClearPath UM Does for Your UM Team</h2>
          <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
            Designed to integrate with the workflows of UM nurses, medical directors, and UM operations teams.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {benefits.map((b, i) => (
              <div key={i} className="p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all">
                <b.icon className="text-blue-600 mb-4" size={24} />
                <h3 className="font-semibold text-slate-800 mb-2">{b.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{b.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Review types table */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-12">Three Authorization Review Pathways</h2>
          <div className="space-y-4">
            {reviewTypes.map((r, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
                <h3 className="font-bold text-slate-800 mb-4 text-lg border-b border-slate-100 pb-3">{r.type}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Input</span>
                    <p className="text-slate-600 leading-relaxed">{r.what}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">ClearPath UM Output</span>
                    <p className="text-slate-600 leading-relaxed">{r.output}</p>
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-400 uppercase tracking-wide block mb-1">Criteria Framework Reference</span>
                    <p className="text-slate-600 leading-relaxed">{r.criteria}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance section */}
      <section className="py-14 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Scale className="mx-auto text-blue-700 mb-4" size={36} />
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Built for Regulatory and Audit Environments</h2>
          <p className="text-slate-500 leading-relaxed max-w-2xl mx-auto mb-8">
            All outputs are structured, citation-level, and tied to the clinical documentation submitted. ClearPath UM
            does not issue determinations — it supports the licensed clinical reviewer who does, maintaining clear
            accountability for the final decision.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            {[
              "No PHI in session URLs",
              "Session timeout enforcement",
              "Disclaimer on every output",
              "MCG / Milliman referenced, not replicated",
              "Reviewer confirmation checklist",
              "Timestamped review records",
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 text-slate-700">
                <CheckCircle size={14} className="text-green-500 flex-shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-slate-900 py-14 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Interested in a UM operations pilot?</h2>
        <p className="text-slate-400 mb-6 max-w-md mx-auto text-sm">
          We work directly with UM medical directors and UM operations teams to configure the platform for your review workflows.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/contact" className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition-colors">
            Contact Us
          </Link>
          <Link href="/about" className="px-6 py-3 bg-white/10 border border-white/20 text-white font-bold rounded-lg hover:bg-white/20 transition-colors">
            About ClearPath UM
          </Link>
        </div>
      </section>
    </>
  );
}
