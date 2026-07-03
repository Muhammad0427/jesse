import Link from "next/link";
import { Building2, Clock, CheckCircle, ArrowRight, FileText, Users, Activity } from "lucide-react";

const steps = [
  { n: "01", title: "Paste or upload the chart", body: "Copy the admission note, progress notes, vitals, and labs directly into the review workspace." },
  { n: "02", title: "Select Inpatient, SNF, or LTAC", body: "Each pathway has criteria-specific fields — the tool knows what to look for based on the level of care you are requesting." },
  { n: "03", title: "Generate the UM review output", body: "In seconds, receive a structured clinical summary, extracted member identification fields, and separated admission-support vs. denial-risk findings." },
  { n: "04", title: "Confirm against MCG / Milliman", body: "Use the built-in reviewer checklist to confirm findings against your licensed criteria framework before submitting to the payor." },
];

const inpatientFields = [
  "Admitting diagnosis and ICD-10 code",
  "Day-one severity indicators (vitals, labs, SpO2)",
  "IV therapy or monitoring requirement",
  "Telemetry indication",
  "Day-two reasoning summary for continued stay",
  "Concurrent conditions complicating management",
];

const snfFields = [
  "Functional status at discharge (ADLs, mobility)",
  "Prior level of function",
  "Skilled nursing / therapy need identified",
  "Rehab potential assessment",
  "Ability to self-manage in lower care setting",
  "Discharge destination options considered",
];

const ltacFields = [
  "Intensity of service (IV therapy, wound care, ventilator)",
  "Projected length of stay with rationale",
  "Medical complexity factors",
  "Ventilator weaning plan (if applicable)",
  "Attending documentation of expected care level",
  "MCG / Milliman LTAC pathway criteria reference",
];

export default function HospitalsPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-900 to-slate-900 py-20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-800/50 border border-blue-700/50 text-blue-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6 uppercase tracking-wider">
            <Building2 size={12} /> For Hospital Case Management & UR
          </div>
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">
            Justify Inpatient Status <br className="hidden sm:block" />Same Day — Every Time
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-blue-100 leading-relaxed mb-8">
            MedReview24 gives your case management and UR team the clinical documentation analysis they need to defend
            inpatient status, support SNF placement, and build LTAC criteria before the payor calls — not after.
          </p>
          <Link
            href="/login"
            className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-800 font-bold rounded-lg hover:bg-blue-50 transition-colors shadow-lg"
          >
            Access the Platform <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Workflow steps */}
      <section className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-12">How It Works for Your Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4 p-5 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-sm transition-all">
                <span className="text-3xl font-black text-blue-100 leading-none flex-shrink-0">{s.n}</span>
                <div>
                  <h3 className="font-semibold text-slate-800 mb-1">{s.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{s.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Care settings section */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">Three Care Settings, One Platform</h2>
          <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
            Different levels of care require different criteria-relevant fields. MedReview24 knows what to extract for each.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Activity, title: "Inpatient Admission", color: "blue", fields: inpatientFields, tag: "Severity / Intensity of Service" },
              { icon: Users, title: "SNF Placement", color: "teal", fields: snfFields, tag: "Functional Status / Skilled Need" },
              { icon: FileText, title: "LTAC", color: "purple", fields: ltacFields, tag: "Expected LOS / Medical Complexity" },
            ].map((section) => (
              <div key={section.title} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
                <div className={`px-5 py-4 bg-${section.color}-50 border-b border-${section.color}-100`}>
                  <section.icon className={`text-${section.color}-600 mb-2`} size={20} />
                  <h3 className="font-bold text-slate-800">{section.title}</h3>
                  <span className={`text-xs text-${section.color}-700 font-medium`}>{section.tag}</span>
                </div>
                <ul className="p-5 space-y-2">
                  {section.fields.map((f, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle size={13} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Day-one vs day-two */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">Day-One vs. Day-Two Reasoning</h2>
          <p className="text-center text-slate-500 mb-10 max-w-xl mx-auto">
            MedReview24 outputs are structured to support both the initial admission and continued stay determinations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <Clock className="text-blue-600 mb-3" size={24} />
              <h3 className="font-bold text-blue-900 mb-2">Day-One Reasoning</h3>
              <p className="text-sm text-blue-800 leading-relaxed">
                Severity indicators at presentation — vital sign abnormalities, lab values, oxygen requirements, IV therapy initiation — that establish the medical necessity for inpatient admission at the time of admit.
              </p>
            </div>
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
              <Activity className="text-slate-600 mb-3" size={24} />
              <h3 className="font-bold text-slate-800 mb-2">Day-Two Reasoning</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Continued IV therapy, ongoing monitoring requirements, response to treatment, or evolving complications — documentation that supports maintaining inpatient level for a concurrent stay review.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-14 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to streamline your UM workflow?</h2>
        <p className="text-blue-100 mb-6 max-w-md mx-auto text-sm">
          Contact us to request access or to schedule a demo with your case management leadership team.
        </p>
        <div className="flex gap-4 justify-center flex-wrap">
          <Link href="/contact" className="px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors">
            Request Access
          </Link>
          <Link href="/login" className="px-6 py-3 bg-blue-600 border border-white/30 text-white font-bold rounded-lg hover:bg-blue-500 transition-colors">
            Sign In
          </Link>
        </div>
      </section>
    </>
  );
}
