import { Shield, Award, Users, BookOpen, CheckCircle } from "lucide-react";

const values = [
  {
    icon: Award,
    title: "RN & CCM-Led Clinical Design",
    body: "MedReview24 was designed by registered nurses with Case Management Certification (CCM) and direct experience in hospital UR and carrier UM operations. The criteria logic reflects real-world clinical review, not algorithmic guesswork.",
  },
  {
    icon: BookOpen,
    title: "Criteria Framework Alignment — Without Replication",
    body: "We reference MCG™ and Milliman Care Guidelines® as the industry-standard frameworks our users work with every day. We do not reproduce, incorporate, or substitute for their proprietary content — our tool is a lens on your documentation, not a criteria engine.",
  },
  {
    icon: Shield,
    title: "PHI Responsibility Built In",
    body: "PHI masking by default, no PHI in URLs, 30-minute session timeouts, and a visible disclaimer on every output. We treat the clinical data our users work with the same way a HIPAA-covered entity should.",
  },
  {
    icon: Users,
    title: "Two Audiences, One Platform",
    body: "We serve both sides of the concurrent review workflow — hospital case management teams defending medically necessary admissions and carrier UM departments reviewing incoming authorization requests.",
  },
];

const frameworks = [
  {
    name: "MCG™ (Milliman Care Guidelines)",
    description:
      "Evidence-based clinical criteria for inpatient admission, continued stay, SNF placement, and LTAC. MedReview24 references MCG pathways in determination support outputs and reviewer checklists. MCG criteria are licensed separately and must be confirmed by the reviewing clinician.",
  },
  {
    name: "Milliman Care Guidelines® (MCG Health)",
    description:
      "Widely used by payer UM departments for inpatient, SNF, LTAC, and outpatient clinical review. MedReview24 references Milliman criteria names and pathway labels in outputs to help reviewers map clinical findings to the criteria framework they are already using.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="bg-slate-800 py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <Shield className="mx-auto text-blue-400 mb-4" size={40} />
          <h1 className="text-4xl font-bold mb-5">About MedReview24</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            MedReview24 is a clinical decision support platform built to make utilization management review faster,
            more consistent, and more defensible — for both hospital and payer UM teams.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Our Mission</h2>
          <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed space-y-4">
            <p>
              Utilization management review is one of the most consequential workflows in healthcare — it determines
              whether a patient receives inpatient-level care, SNF placement, or LTAC services, and whether that care
              is covered by their insurance. Despite its importance, the process is often slow, inconsistent, and
              dependent on individual reviewer skill.
            </p>
            <p>
              MedReview24 exists to change that. We built a platform that ingests the clinical documentation that already
              exists in the record, extracts the criteria-relevant findings that reviewers need, and presents them in a
              structured format that supports a faster, more consistent determination — whether you are the hospital defending
              an admission or the carrier reviewing the request.
            </p>
            <p>
              We are not trying to replace clinical judgment. We are trying to give clinical reviewers better raw material
              to work with, faster — so the judgment they apply is informed, not rushed.
            </p>
          </div>
        </div>
      </section>

      {/* Values grid */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-12">What We Stand For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((v, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <v.icon className="text-blue-600 mb-4" size={26} />
                <h3 className="font-semibold text-slate-800 mb-3">{v.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Criteria frameworks */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-slate-800 text-center mb-4">Criteria Framework Alignment</h2>
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-5 py-4 mb-8 text-sm text-amber-800">
            <strong>Important:</strong> MedReview24 references MCG and Milliman criteria frameworks by name to help
            reviewers cross-reference findings. We do not reproduce, license, redistribute, or claim to replicate
            their proprietary clinical criteria content. Users must have independent access to applicable criteria
            products to make final determinations.
          </div>
          <div className="space-y-5">
            {frameworks.map((f, i) => (
              <div key={i} className="bg-white rounded-xl border border-slate-200 p-6 shadow-sm">
                <h3 className="font-semibold text-slate-800 mb-2">{f.name}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance commitments */}
      <section className="py-14 bg-slate-900 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-xl font-bold text-center mb-8">Our Compliance Commitments</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            {[
              "No PHI transmitted or stored in session URLs",
              "30-minute session timeout on all authenticated sessions",
              "PHI masking enabled by default in all outputs",
              "BAA available for covered entity and business associate relationships",
              "Determination disclaimer on every review output",
              "Criteria framework referenced only — not reproduced",
              "All determinations require licensed clinical reviewer confirmation",
              "No final coverage determination functionality",
            ].map((c) => (
              <div key={c} className="flex items-center gap-2 text-slate-300">
                <CheckCircle size={14} className="text-green-400 flex-shrink-0" />
                {c}
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
