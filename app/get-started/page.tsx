"use client";
import { useState } from "react";
import Link from "next/link";
import {
  Building2, ShieldCheck, ArrowRight, ArrowLeft, CheckCircle, Send, Loader2, Sparkles,
} from "lucide-react";

type OrgType = "hospital" | "carrier";
type BedCount = "under150" | "150to400" | "400plus";
type Volume = "under500" | "500to2000" | "2000plus";

const PAIN_POINTS = [
  "Charts reviewed hours or days after admission",
  "Inconsistent extraction of criteria-relevant findings across reviewers",
  "Denial rationale doesn't clearly tie to MCG or Milliman thresholds",
  "Manual, repetitive data entry pulling time from clinical judgment",
  "High volume of denials or appeals to manage",
];

interface FormData {
  orgType: OrgType | null;
  bedCount: BedCount | null;
  volume: Volume | null;
  painPoints: string[];
  name: string;
  email: string;
  organization: string;
  role: string;
}

const initialForm: FormData = {
  orgType: null,
  bedCount: null,
  volume: null,
  painPoints: [],
  name: "",
  email: "",
  organization: "",
  role: "",
};

function getRecommendation(form: FormData) {
  if (form.orgType === "carrier") {
    return {
      tier: "Carrier / Payer UM",
      price: "Custom — typically from $8,000/month",
      blurb: "Carrier contracts are scoped to your review volume and reviewer seat count, with a BAA included.",
    };
  }
  if (form.bedCount === "under150") {
    return {
      tier: "Community",
      price: "$2,500/month",
      blurb: "Unlimited inpatient, SNF, and LTAC reviews for a single UR team, up to 10 reviewer seats.",
    };
  }
  if (form.bedCount === "150to400") {
    return {
      tier: "Health System",
      price: "$5,000/month",
      blurb: "Up to 25 reviewer seats, multi-facility reporting, and a BAA included — our most common tier.",
    };
  }
  return {
    tier: "Enterprise",
    price: "Custom",
    blurb: "Volume-based pricing across facilities with unlimited seats and dedicated implementation support.",
  };
}

const TOTAL_STEPS = 4;

export default function GetStartedPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState<FormData>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = <K extends keyof FormData>(key: K, value: FormData[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const togglePainPoint = (point: string) => {
    setForm((prev) => ({
      ...prev,
      painPoints: prev.painPoints.includes(point)
        ? prev.painPoints.filter((p) => p !== point)
        : [...prev.painPoints, point],
    }));
  };

  const canAdvance = () => {
    if (step === 1) return !!form.orgType;
    if (step === 2) return form.orgType === "hospital" ? !!form.bedCount : !!form.volume;
    if (step === 3) return true;
    return true;
  };

  const next = () => setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep((s) => Math.max(s - 1, 1));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 900));
    setSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    const rec = getRecommendation(form);
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-slate-50 px-4 py-16">
        <div className="w-full max-w-xl bg-white rounded-2xl border border-slate-200 shadow-xl p-8 sm:p-10 text-center">
          <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
          <h1 className="text-2xl font-bold text-slate-800 mb-2">Thanks, {form.name.split(" ")[0] || "there"}.</h1>
          <p className="text-slate-500 text-sm mb-8">
            A member of our clinical operations team will follow up at {form.email || "the email you provided"} within one business day.
          </p>

          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 text-left mb-8">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="text-blue-600" size={16} />
              <span className="text-xs font-semibold text-blue-700 uppercase tracking-wide">Recommended for {form.organization || "your organization"}</span>
            </div>
            <h2 className="text-xl font-bold text-slate-800 mb-1">{rec.tier}</h2>
            <p className="text-blue-700 font-semibold text-sm mb-3">{rec.price}</p>
            <p className="text-sm text-slate-600 leading-relaxed">{rec.blurb}</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/pricing"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-lg text-sm transition-colors"
            >
              See Full Pricing
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg text-sm transition-colors"
            >
              Talk to a Specialist <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] bg-slate-50 px-4 py-16">
      <div className="max-w-xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2">Find Your MedReview24 Plan</h1>
          <p className="text-slate-500 text-sm">Answer a few questions and we&rsquo;ll recommend a tier and connect you with our team.</p>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-2 mb-8">
          {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map((n) => (
            <div key={n} className={`h-1.5 flex-1 rounded-full ${n <= step ? "bg-blue-600" : "bg-slate-200"}`} />
          ))}
        </div>

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8">
          {/* Step 1: Org type */}
          {step === 1 && (
            <div>
              <h2 className="font-semibold text-slate-800 text-lg mb-1">Which best describes you?</h2>
              <p className="text-sm text-slate-500 mb-6">This helps us tailor the review workflow and pricing to your team.</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => set("orgType", "hospital")}
                  className={`text-left p-5 rounded-xl border-2 transition-all ${
                    form.orgType === "hospital" ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <Building2 className="text-blue-600 mb-3" size={24} />
                  <div className="font-semibold text-slate-800 mb-1">Hospital / Health System</div>
                  <div className="text-xs text-slate-500">Case management or UR team</div>
                </button>
                <button
                  onClick={() => set("orgType", "carrier")}
                  className={`text-left p-5 rounded-xl border-2 transition-all ${
                    form.orgType === "carrier" ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                  }`}
                >
                  <ShieldCheck className="text-blue-600 mb-3" size={24} />
                  <div className="font-semibold text-slate-800 mb-1">Carrier / Payer</div>
                  <div className="text-xs text-slate-500">UM department</div>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Size / volume */}
          {step === 2 && form.orgType === "hospital" && (
            <div>
              <h2 className="font-semibold text-slate-800 text-lg mb-1">How large is your facility?</h2>
              <p className="text-sm text-slate-500 mb-6">Pricing scales with facility size.</p>
              <div className="space-y-3">
                {([
                  { value: "under150", label: "Under 150 beds", sub: "Community hospital" },
                  { value: "150to400", label: "150–400 beds", sub: "Mid-size health system" },
                  { value: "400plus", label: "400+ beds or multiple facilities", sub: "Large health system" },
                ] as { value: BedCount; label: string; sub: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => set("bedCount", opt.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      form.bedCount === opt.value ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <div>
                      <div className="font-semibold text-slate-800 text-sm">{opt.label}</div>
                      <div className="text-xs text-slate-500">{opt.sub}</div>
                    </div>
                    {form.bedCount === opt.value && <CheckCircle className="text-blue-600" size={18} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && form.orgType === "carrier" && (
            <div>
              <h2 className="font-semibold text-slate-800 text-lg mb-1">What&rsquo;s your monthly review volume?</h2>
              <p className="text-sm text-slate-500 mb-6">This helps us scope a carrier contract for your UM department.</p>
              <div className="space-y-3">
                {([
                  { value: "under500", label: "Under 500 reviews / month" },
                  { value: "500to2000", label: "500–2,000 reviews / month" },
                  { value: "2000plus", label: "2,000+ reviews / month" },
                ] as { value: Volume; label: string }[]).map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => set("volume", opt.value)}
                    className={`w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between ${
                      form.volume === opt.value ? "border-blue-600 bg-blue-50" : "border-slate-200 hover:border-blue-300"
                    }`}
                  >
                    <div className="font-semibold text-slate-800 text-sm">{opt.label}</div>
                    {form.volume === opt.value && <CheckCircle className="text-blue-600" size={18} />}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Step 3: Pain points */}
          {step === 3 && (
            <div>
              <h2 className="font-semibold text-slate-800 text-lg mb-1">What&rsquo;s slowing your team down today?</h2>
              <p className="text-sm text-slate-500 mb-6">Select all that apply — optional.</p>
              <div className="space-y-2.5">
                {PAIN_POINTS.map((point) => (
                  <label
                    key={point}
                    className={`flex items-start gap-3 p-3.5 rounded-lg border cursor-pointer transition-colors ${
                      form.painPoints.includes(point) ? "border-blue-400 bg-blue-50" : "border-slate-200 hover:border-slate-300"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={form.painPoints.includes(point)}
                      onChange={() => togglePainPoint(point)}
                      className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm text-slate-700">{point}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Contact info */}
          {step === 4 && (
            <form onSubmit={handleSubmit}>
              <h2 className="font-semibold text-slate-800 text-lg mb-1">Where should we send your recommendation?</h2>
              <p className="text-sm text-slate-500 mb-6">We&rsquo;ll follow up within one business day.</p>
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Work email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    type="text"
                    placeholder="Organization"
                    value={form.organization}
                    onChange={(e) => set("organization", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Role / title"
                    value={form.role}
                    onChange={(e) => set("role", e.target.value)}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={submitting}
                className="w-full mt-6 py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white font-semibold rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
              >
                {submitting ? <Loader2 size={15} className="animate-spin" /> : <Send size={15} />}
                {submitting ? "Submitting…" : "Get My Recommendation"}
              </button>
            </form>
          )}

          {/* Nav buttons (steps 1-3; step 4 has its own submit button) */}
          {step < 4 && (
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
              <button
                onClick={back}
                disabled={step === 1}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700 disabled:opacity-0 disabled:pointer-events-none"
              >
                <ArrowLeft size={14} /> Back
              </button>
              <button
                onClick={next}
                disabled={!canAdvance()}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold rounded-lg text-sm transition-colors"
              >
                Continue <ArrowRight size={14} />
              </button>
            </div>
          )}
          {step === 4 && (
            <div className="mt-4">
              <button
                onClick={back}
                className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-700"
              >
                <ArrowLeft size={14} /> Back
              </button>
            </div>
          )}
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Prefer to just reach out?{" "}
          <Link href="/contact" className="text-blue-600 hover:underline">Contact us directly</Link>.
        </p>
      </div>
    </div>
  );
}
