import Link from "next/link";
import { ArrowRight, CheckCircle, Building2, ShieldCheck, HelpCircle } from "lucide-react";

const tiers = [
  {
    name: "Community",
    price: "$2,500",
    audience: "Hospitals under 150 beds",
    description: "For a single case management / UR team getting started with structured concurrent review.",
    features: [
      "Unlimited inpatient, SNF, and LTAC reviews",
      "Up to 10 reviewer seats",
      "MCG & Milliman-aligned outputs",
      "Reviewer confirmation checklist",
      "Standard email support",
    ],
    highlighted: false,
  },
  {
    name: "Health System",
    price: "$5,000",
    audience: "Hospitals 150–400 beds",
    description: "For larger UR teams or multi-unit case management departments with higher review volume.",
    features: [
      "Everything in Community",
      "Up to 25 reviewer seats",
      "Priority support with named onboarding contact",
      "Multi-facility reporting",
      "BAA included",
    ],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    audience: "Multi-facility health systems",
    description: "For health systems with several facilities or review volume beyond standard tiers.",
    features: [
      "Everything in Health System",
      "Unlimited reviewer seats",
      "Custom facility-level reporting",
      "Dedicated implementation support",
      "Volume-based pricing across facilities",
    ],
    highlighted: false,
  },
];

const faqs = [
  {
    q: "Why isn't pricing per review or per click?",
    a: "Charging per review creates an incentive to skip the tool on borderline cases — the opposite of what a UM workflow needs. Flat subscription pricing means your team can run every chart through MedReview24 without a usage disincentive.",
  },
  {
    q: "How is carrier / payer UM pricing determined?",
    a: "Carrier UM departments typically process a much higher review volume than a single hospital's UR team. We scope carrier contracts individually based on expected review volume, number of reviewer seats, and integration needs — reach out for a quote.",
  },
  {
    q: "Is a BAA available?",
    a: "Yes. A Business Associate Agreement is included with Health System and Enterprise tiers, and available on request for Community.",
  },
  {
    q: "Do you offer a pilot?",
    a: "Yes — we typically run a 30–60 day pilot with a single case management or UM team before a full facility rollout. Contact us to scope one.",
  },
];

export default function PricingPage() {
  return (
    <>
      <section className="bg-gradient-to-br from-slate-900 to-blue-950 py-20 text-white text-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold mb-5 leading-tight">Simple, Facility-Based Pricing</h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            One flat subscription per facility — unlimited reviews, no per-click charges. Carrier and payer UM
            departments are scoped separately based on review volume.
          </p>
        </div>
      </section>

      {/* Hospital tiers */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <Building2 className="text-blue-600" size={20} />
            <h2 className="text-2xl font-bold text-slate-800">For Hospitals</h2>
          </div>
          <p className="text-center text-slate-500 mb-12 max-w-xl mx-auto">
            Priced by facility size. Every tier includes unlimited inpatient, SNF, and LTAC reviews.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {tiers.map((t) => (
              <div
                key={t.name}
                className={`rounded-2xl border p-6 flex flex-col ${
                  t.highlighted
                    ? "border-blue-600 shadow-lg ring-1 ring-blue-600 relative"
                    : "border-slate-200 shadow-sm"
                }`}
              >
                {t.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most Common
                  </span>
                )}
                <h3 className="font-bold text-slate-800 text-lg mb-1">{t.name}</h3>
                <p className="text-xs text-slate-400 mb-4">{t.audience}</p>
                <div className="mb-4">
                  <span className="text-3xl font-black text-slate-800">{t.price}</span>
                  {t.price !== "Custom" && <span className="text-slate-400 text-sm">/month</span>}
                </div>
                <p className="text-sm text-slate-500 leading-relaxed mb-6">{t.description}</p>
                <ul className="space-y-2.5 mb-8 flex-1">
                  {t.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-slate-600">
                      <CheckCircle size={14} className="text-green-500 mt-0.5 flex-shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link
                  href="/contact"
                  className={`inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-semibold text-sm transition-colors ${
                    t.highlighted
                      ? "bg-blue-600 hover:bg-blue-500 text-white"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-800"
                  }`}
                >
                  {t.price === "Custom" ? "Contact Sales" : "Request Access"} <ArrowRight size={14} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Carrier pricing */}
      <section className="py-16 bg-slate-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 flex flex-col md:flex-row gap-8 items-start">
            <div className="p-3 bg-slate-900 rounded-xl flex-shrink-0">
              <ShieldCheck className="text-blue-400" size={28} />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">For Carriers & Payer UM Departments</h2>
              <p className="text-sm text-slate-500 leading-relaxed mb-4">
                Carrier UM departments process authorization requests at a volume and scale that varies widely by
                book of business. We scope these contracts individually — typically starting around $8,000/month —
                based on expected review volume, reviewer seat count, and any integration requirements. A BAA is
                included with every carrier contract.
              </p>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold rounded-lg text-sm transition-colors"
              >
                Get a Carrier Quote <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 mb-10">
            <HelpCircle className="text-blue-600" size={20} />
            <h2 className="text-2xl font-bold text-slate-800">Pricing Questions</h2>
          </div>
          <div className="space-y-5">
            {faqs.map((f) => (
              <div key={f.q} className="border-b border-slate-100 pb-5">
                <h3 className="font-semibold text-slate-800 mb-1.5 text-sm">{f.q}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-700 py-14 text-white text-center">
        <h2 className="text-2xl font-bold mb-3">Not sure which tier fits your team?</h2>
        <p className="text-blue-100 mb-6 max-w-md mx-auto text-sm">
          Tell us your facility size and review volume and we'll recommend a tier — or scope a pilot.
        </p>
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-700 font-bold rounded-lg hover:bg-blue-50 transition-colors"
        >
          Talk to Us <ArrowRight size={16} />
        </Link>
      </section>
    </>
  );
}
