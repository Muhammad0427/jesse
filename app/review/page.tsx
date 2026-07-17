"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loadSession, clearSession, getRemainingMs } from "@/lib/auth";
import { PhiField } from "@/app/components/PhiField";
import {
  Upload, Sparkles, AlertTriangle, CheckCircle, XCircle, ChevronDown, ChevronUp, Info, Loader2, Download
} from "lucide-react";

type ReviewType = "inpatient" | "snf" | "ltac";

interface ExtractedPhi {
  name: string;
  dob: string;
  mrn: string;
  admittingDx: string;
  attendingProvider: string;
  dosStart: string;
  dosEnd: string;
}

interface Finding {
  category: string;
  finding: string;
  clinicalFact: string;
  criteriaRef: string;
}

interface ReviewResult {
  clinicalSummary: string;
  phi: ExtractedPhi;
  supportsAdmission: Finding[];
  doesNotMeetCriteria: Finding[];
  typeSpecificFindings: Record<string, string>;
  criteriaChecklist: string[];
}

const SAMPLE_NOTE = `ADMISSION NOTE — Metro General Hospital
Patient: Jane Smith, DOB: 03/15/1952, MRN: 789456
Date of Service: 07/01/2026
Attending Physician: Dr. Robert Patel, MD

CHIEF COMPLAINT: Chest pain, shortness of breath

HISTORY OF PRESENT ILLNESS:
72-year-old female with PMH of CHF (EF 25%), HTN, DM2 presenting with 3-day worsening dyspnea on exertion and orthopnea requiring 3-pillow positioning. Patient reports 8 lb weight gain over past 5 days, worsening bilateral lower extremity edema. Denies fever, chest pain at rest.

VITAL SIGNS on admission:
BP 168/94 | HR 102 | RR 24 | SpO2 88% on room air | Temp 98.6°F
Weight: 184 lbs (baseline 176 lbs)

PHYSICAL EXAM:
General: Mildly distressed, dyspneic with mild exertion
Cardiovascular: Tachycardic, S3 gallop present, JVD at 45 degrees
Respiratory: Bibasilar rales, decreased breath sounds bilateral bases
Extremities: 3+ pitting edema bilateral lower extremities to knees

LABS:
BNP: 1,840 pg/mL (ref <100)
Creatinine: 1.8 mg/dL (baseline 1.1)
Na: 132 mEq/L
Troponin: 0.04 (x2 negative)
CBC: WBC 8.2, Hgb 11.2, Plt 210

ASSESSMENT/PLAN:
1. Acute decompensated heart failure — IV Lasix 80mg bolus, cardiac monitoring, strict I&Os, fluid restriction 1.5L/day
2. Acute kidney injury — IVF cautiously given CHF, BMP q8h
3. HTN — holding home ACEI given AKI, IV antihypertensives PRN
4. Telemetry monitoring for arrhythmia given elevated HR

LEVEL OF CARE: Inpatient admission warranted given severity of decompensation, need for IV diuresis, hemodynamic monitoring.`;

// Simulated AI extraction and analysis
function analyzeNote(noteText: string, reviewType: ReviewType): ReviewResult {
  const isSnf = reviewType === "snf";
  const isLtac = reviewType === "ltac";

  return {
    clinicalSummary:
      "72-year-old female with known systolic CHF (EF 25%) presenting with acute decompensation manifested by progressive dyspnea, 8 lb weight gain over 5 days, severe orthopnea, hypoxemia (SpO2 88% RA), markedly elevated BNP (1,840 pg/mL), and hemodynamic instability (tachycardia 102, BP 168/94). Exam notable for S3 gallop, JVD, bibasilar rales, and 3+ bilateral LE edema. Concurrent AKI (Cr 1.8 from baseline 1.1) and hyponatremia (Na 132) complicate management. Patient initiated on IV diuresis with continuous telemetry monitoring.",
    phi: {
      name: "Jane Smith",
      dob: "03/15/1952",
      mrn: "789456",
      admittingDx: "Acute Decompensated Heart Failure (I50.9)",
      attendingProvider: "Dr. Robert Patel, MD",
      dosStart: "07/01/2026",
      dosEnd: "Ongoing",
    },
    supportsAdmission: isSnf
      ? [
          {
            category: "Functional Status",
            finding: "Impaired mobility and self-care",
            clinicalFact: "3+ bilateral lower extremity edema limiting ambulation; requires assistance with ADLs per nursing assessment.",
            criteriaRef: "MCG SNF — Skilled Need: PT/OT assessment and rehabilitation following acute decompensation",
          },
          {
            category: "Skilled Nursing Need",
            finding: "IV-to-oral diuretic transition requires monitoring",
            clinicalFact: "Daily weights, I&Os, BMP monitoring required during transition from IV Lasix to oral regimen.",
            criteriaRef: "MCG SNF — Skilled Observation: complex medication management with daily lab monitoring",
          },
        ]
      : isLtac
      ? [
          {
            category: "Intensity of Service",
            finding: "Prolonged IV therapy and daily monitoring",
            clinicalFact: "IV diuresis ongoing >7 days projected; daily BMP, BNP trending; telemetry monitoring.",
            criteriaRef: "Milliman LTAC — Complex medical care with IV therapy and monitoring needs >25 days LOS",
          },
          {
            category: "Expected LOS",
            finding: "LOS projection exceeds acute care threshold",
            clinicalFact: "Concurrent AKI, hyponatremia, and diuretic resistance suggest LOS likely >14 days.",
            criteriaRef: "MCG LTAC — Anticipated LOS criteria met with documented medical complexity",
          },
        ]
      : [
          {
            category: "Severity / Intensity",
            finding: "Acute hypoxemia requiring supplemental oxygen",
            clinicalFact: "SpO2 88% on room air at presentation; BNP 1,840 pg/mL indicating severe cardiac strain.",
            criteriaRef: "MCG Inpatient — Cardiology: acute decompensated CHF with hypoxemia",
          },
          {
            category: "IV Therapy Requirement",
            finding: "IV diuresis initiated — cannot be safely administered outpatient",
            clinicalFact: "IV Lasix 80mg bolus ordered; requires hemodynamic monitoring and strict fluid/electrolyte tracking.",
            criteriaRef: "Milliman Care Guidelines: IV diuretic therapy with hemodynamic monitoring supports inpatient level",
          },
          {
            category: "Monitoring / Safety",
            finding: "Telemetry monitoring required",
            clinicalFact: "Sinus tachycardia 102 bpm, S3 gallop, concurrent AKI requiring continuous cardiac monitoring.",
            criteriaRef: "MCG Inpatient — Telemetry criteria: new tachyarrhythmia with hemodynamic significance",
          },
          {
            category: "AKI Complication",
            finding: "Acute kidney injury complicates management",
            clinicalFact: "Creatinine 1.8 from baseline 1.1; requires Q8h BMP monitoring and careful fluid management.",
            criteriaRef: "MCG Inpatient — Multi-system involvement: AKI concurrent with cardiac decompensation",
          },
        ],
    doesNotMeetCriteria: [
      {
        category: "Troponin / ACS",
        finding: "No acute coronary syndrome identified",
        clinicalFact: "Serial troponins x2 negative. No ischemic ECG changes documented in note.",
        criteriaRef: "MCG Inpatient Cardiology — ACS criteria not met based on available documentation",
      },
      {
        category: "Infection / Sepsis",
        finding: "No infectious etiology documented",
        clinicalFact: "WBC 8.2 (normal), temperature 98.6°F. No cultures ordered or infectious source identified in note.",
        criteriaRef: "Does not trigger sepsis pathway criteria; CHF exacerbation is primary driver",
      },
    ],
    typeSpecificFindings: isSnf
      ? {
          "Functional Status at Discharge": "Requires assistance with ambulation and ADLs; 3+ bilateral LE edema",
          "Skilled Need Identified": "Nursing: IV-to-oral diuretic transition, daily weights, electrolyte monitoring; PT: gait and functional mobility",
          "Prior Level of Function": "Independent with ADLs per history; ambulated without assist at baseline",
          "Rehab Potential": "Good — acute decompensation superimposed on chronic disease; expected to return to prior level with skilled care",
        }
      : isLtac
      ? {
          "Intensity of Service": "IV diuresis, daily BMP/BNP, telemetry monitoring — exceeds typical acute care threshold",
          "Expected LOS": "14+ days projected based on diuretic resistance and concurrent AKI",
          "Medical Complexity": "CHF (EF 25%) + AKI + Hyponatremia — multi-system management required",
          "Ventilator Dependency": "Not documented — does not meet ventilator weaning LTAC criteria",
        }
      : {
          "Day-One Reasoning": "Acute hypoxemia (SpO2 88%), IV therapy, and telemetry need established at presentation",
          "Day-Two Reasoning": "Ongoing IV diuresis, AKI trending, hemodynamic monitoring — continued inpatient level appropriate if criteria maintained",
          "Admitting Diagnosis": "Acute Decompensated Heart Failure with Hypoxemia (ICD-10: I50.9, R09.02)",
          "Criteria Framework": "MCG Inpatient Cardiology criteria; Milliman Care Guidelines — CHF admission pathway",
        },
    criteriaChecklist: isSnf
      ? [
          "Confirm skilled nursing need is documented and cannot be met in lower care setting",
          "Verify prior level of function and rehab potential are assessed",
          "Ensure discharge summary documents skilled need trigger",
          "Review against MCG SNF — Skilled Service criteria before finalizing",
          "Confirm Milliman SNF placement criteria reviewed by licensed clinical reviewer",
        ]
      : isLtac
      ? [
          "Confirm projected LOS >25 days with documented medical complexity",
          "Verify IV therapy / wound care / ventilator need documented",
          "Review MCG LTAC criteria — Complex Medical Need pathway",
          "Confirm Milliman Care Guidelines LTAC criteria reviewed by licensed clinical reviewer",
          "Ensure attending documents expected level of care and intensity in transfer note",
        ]
      : [
          "Confirm SpO2 and oxygen requirement are documented in nursing notes",
          "Verify IV therapy orders and monitoring plan are present in physician orders",
          "Review MCG Inpatient Cardiology criteria before finalizing determination",
          "Confirm Milliman Care Guidelines reviewed by licensed clinical reviewer",
          "Ensure telemetry order and indication are documented in physician notes",
          "Verify AKI management plan and BMP frequency ordered",
        ],
  };
}

export default function ReviewPage() {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [reviewType, setReviewType] = useState<ReviewType>("inpatient");
  const [note, setNote] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<ReviewResult | null>(null);
  const [checklistDone, setChecklistDone] = useState<Record<number, boolean>>({});
  const [showChecklist, setShowChecklist] = useState(true);

  useEffect(() => {
    if (!loadSession()) { router.push("/login"); return; }
    setAuthorized(true);
    const remaining = getRemainingMs();
    const t = setTimeout(() => { clearSession(); router.push("/login"); }, remaining);
    return () => clearTimeout(t);
  }, [router]);

  if (!authorized) return null;

  const [error, setError] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!note.trim()) return;
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const res = await fetch("/.netlify/functions/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ note, reviewType }),
      });
      if (!res.ok) throw new Error("Analysis failed. Please try again.");
      const data = await res.json();
      setResult(data);
      setChecklistDone({});
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const loadSample = () => setNote(SAMPLE_NOTE);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800">New Utilization Management Review</h1>
        <p className="text-slate-500 text-sm mt-1">
          Paste or upload clinical documentation below, select review type, and generate your determination support output.
        </p>
      </div>

      {/* PHI Notice */}
      <div className="bg-amber-50 border border-amber-300 rounded-lg px-4 py-3 mb-6 flex items-start gap-3">
        <AlertTriangle size={15} className="text-amber-600 mt-0.5 flex-shrink-0" />
        <p className="text-xs text-amber-800">
          <strong>PHI Warning:</strong> Documentation entered here may contain Protected Health Information. Do not share session URLs. All data is processed in-session and not permanently stored. Session expires after 30 minutes of inactivity.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Input panel */}
        <div className="space-y-4">
          {/* Review type selector */}
          <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm">
            <label className="block text-sm font-semibold text-slate-700 mb-3">Review Type</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: "inpatient", label: "Inpatient Admission" },
                { value: "snf", label: "SNF Placement" },
                { value: "ltac", label: "LTAC" },
              ] as { value: ReviewType; label: string }[]).map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setReviewType(opt.value); setResult(null); }}
                  className={`py-2.5 px-3 rounded-lg border text-xs font-semibold transition-all ${
                    reviewType === opt.value
                      ? "bg-blue-700 text-white border-blue-700 shadow"
                      : "bg-white text-slate-600 border-slate-300 hover:border-blue-400"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* Note input */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between">
              <span className="text-sm font-semibold text-slate-700">Clinical Documentation</span>
              <button
                onClick={loadSample}
                className="text-xs text-blue-600 hover:underline flex items-center gap-1"
              >
                <FileText size={11} /> Load sample note
              </button>
            </div>
            <textarea
              className="w-full h-80 px-4 py-3 text-xs font-mono text-slate-700 resize-none focus:outline-none"
              placeholder="Paste admission note, progress note, or clinical documentation here…"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs text-slate-400">
                {note.length.toLocaleString()} characters
              </span>
              <label className="flex items-center gap-1.5 text-xs text-slate-500 cursor-pointer hover:text-blue-600">
                <Upload size={13} />
                Upload file
                <input type="file" className="hidden" accept=".txt,.pdf,.docx" />
              </label>
            </div>
          </div>

          <button
            onClick={handleAnalyze}
            disabled={!note.trim() || loading}
            className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white font-semibold rounded-lg flex items-center justify-center gap-2 transition-colors shadow"
          >
            {loading ? (
              <><Loader2 size={16} className="animate-spin" /> Analyzing documentation…</>
            ) : (
              <><Sparkles size={16} /> Generate UM Review Output</>
            )}
          </button>
        </div>

        {/* Results panel */}
        <div className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-5 flex items-start gap-3">
              <XCircle size={16} className="text-red-500 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-red-700">{error}</p>
            </div>
          )}

          {!result && !loading && !error && (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl h-full flex items-center justify-center min-h-80">
              <div className="text-center text-slate-400">
                <Sparkles size={32} className="mx-auto mb-3 opacity-40" />
                <p className="text-sm font-medium">Determination support output will appear here</p>
                <p className="text-xs mt-1">Paste a clinical note and click Generate</p>
              </div>
            </div>
          )}

          {loading && (
            <div className="bg-white border border-slate-200 rounded-xl p-10 text-center shadow-sm">
              <Loader2 size={32} className="mx-auto mb-3 text-blue-600 animate-spin" />
              <p className="text-sm font-medium text-slate-700">Processing clinical documentation…</p>
              <p className="text-xs text-slate-400 mt-1">Extracting PHI · Summarizing · Analyzing against criteria frameworks</p>
            </div>
          )}

          {result && (
            <>
              {/* Download button */}
              <button
                onClick={() => {
                  const lines = [
                    "MEDREVIEW24 — UM DETERMINATION SUPPORT OUTPUT",
                    "=".repeat(60),
                    `Review Type: ${reviewType.toUpperCase()}`,
                    `Generated: ${new Date().toLocaleString()}`,
                    "",
                    "PATIENT IDENTIFICATION (PHI)",
                    "-".repeat(40),
                    `Name: ${result.phi.name}`,
                    `DOB: ${result.phi.dob}`,
                    `MRN: ${result.phi.mrn}`,
                    `Admitting Dx: ${result.phi.admittingDx}`,
                    `Attending: ${result.phi.attendingProvider}`,
                    `DOS: ${result.phi.dosStart} – ${result.phi.dosEnd}`,
                    "",
                    "CLINICAL SUMMARY",
                    "-".repeat(40),
                    result.clinicalSummary,
                    "",
                    "FINDINGS SUPPORTING ADMISSION/PLACEMENT",
                    "-".repeat(40),
                    ...result.supportsAdmission.map(f => `[${f.category}] ${f.finding}\n  ${f.clinicalFact}\n  → ${f.criteriaRef}`),
                    "",
                    "FINDINGS NOT MEETING CRITERIA",
                    "-".repeat(40),
                    ...result.doesNotMeetCriteria.map(f => `[${f.category}] ${f.finding}\n  ${f.clinicalFact}\n  → ${f.criteriaRef}`),
                    "",
                    "CRITERIA-SPECIFIC FIELDS",
                    "-".repeat(40),
                    ...Object.entries(result.typeSpecificFindings).map(([k, v]) => `${k}: ${v}`),
                    "",
                    "REVIEWER CHECKLIST",
                    "-".repeat(40),
                    ...result.criteriaChecklist.map((item, i) => `[ ] ${item}`),
                    "",
                    "=".repeat(60),
                    "CLINICAL DECISION SUPPORT ONLY — All findings must be independently confirmed by a licensed clinical reviewer. MedReview24 does not issue final coverage determinations.",
                  ];
                  const blob = new Blob([lines.join("\n")], { type: "text/plain" });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `MedReview24_${reviewType}_${result.phi.mrn}_${new Date().toISOString().slice(0,10)}.txt`;
                  a.click();
                  URL.revokeObjectURL(url);
                }}
                className="w-full py-2.5 border border-blue-300 text-blue-700 hover:bg-blue-50 font-semibold rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
              >
                <Download size={15} /> Download Review Output (.txt)
              </button>
              {/* PHI fields */}
              <div className="bg-white rounded-xl border border-amber-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-amber-50 border-b border-amber-200 flex items-center gap-2">
                  <AlertTriangle size={13} className="text-amber-600" />
                  <span className="text-xs font-semibold text-amber-800 uppercase tracking-wide">Member / Patient Identification — PHI</span>
                </div>
                <div className="p-5 grid grid-cols-2 gap-4">
                  <PhiField label="Patient Name" value={result.phi.name} />
                  <PhiField label="Date of Birth" value={result.phi.dob} />
                  <PhiField label="MRN" value={result.phi.mrn} />
                  <PhiField label="Admitting Diagnosis" value={result.phi.admittingDx} />
                  <PhiField label="Attending Provider" value={result.phi.attendingProvider} />
                  <div className="space-y-1">
                    <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Dates of Service</dt>
                    <dd className="text-sm text-slate-700 font-mono">{result.phi.dosStart} – {result.phi.dosEnd}</dd>
                  </div>
                </div>
              </div>

              {/* Clinical summary */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                <h3 className="text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
                  <Info size={14} className="text-blue-500" /> Clinical Summary
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">{result.clinicalSummary}</p>
              </div>

              {/* Supports admission */}
              <div className="bg-white rounded-xl border border-green-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-green-50 border-b border-green-200 flex items-center gap-2">
                  <CheckCircle size={14} className="text-green-600" />
                  <span className="text-sm font-semibold text-green-800">Findings Supporting {reviewType === "inpatient" ? "Inpatient Admission" : reviewType === "snf" ? "SNF Placement" : "LTAC"}</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {result.supportsAdmission.map((f, i) => (
                    <div key={i} className="p-4 space-y-1">
                      <span className="text-xs font-semibold text-green-700 bg-green-100 px-2 py-0.5 rounded-full">{f.category}</span>
                      <p className="text-sm font-medium text-slate-800">{f.finding}</p>
                      <p className="text-xs text-slate-600">{f.clinicalFact}</p>
                      <p className="text-xs text-blue-600 italic">↗ {f.criteriaRef}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Does not meet criteria */}
              <div className="bg-white rounded-xl border border-red-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 bg-red-50 border-b border-red-200 flex items-center gap-2">
                  <XCircle size={14} className="text-red-600" />
                  <span className="text-sm font-semibold text-red-800">Findings That Do Not Meet Additional Criteria</span>
                </div>
                <div className="divide-y divide-slate-100">
                  {result.doesNotMeetCriteria.map((f, i) => (
                    <div key={i} className="p-4 space-y-1">
                      <span className="text-xs font-semibold text-red-700 bg-red-100 px-2 py-0.5 rounded-full">{f.category}</span>
                      <p className="text-sm font-medium text-slate-800">{f.finding}</p>
                      <p className="text-xs text-slate-600">{f.clinicalFact}</p>
                      <p className="text-xs text-blue-600 italic">↗ {f.criteriaRef}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Type-specific fields */}
              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-5 py-3 border-b border-slate-100">
                  <span className="text-sm font-semibold text-slate-700 capitalize">{reviewType}-Specific Criteria Fields</span>
                </div>
                <dl className="p-5 space-y-3">
                  {Object.entries(result.typeSpecificFindings).map(([k, v]) => (
                    <div key={k}>
                      <dt className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{k}</dt>
                      <dd className="text-sm text-slate-700 mt-0.5">{v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              {/* Criteria checklist */}
              <div className="bg-white rounded-xl border border-blue-200 shadow-sm overflow-hidden">
                <button
                  onClick={() => setShowChecklist(!showChecklist)}
                  className="w-full px-5 py-3 flex items-center justify-between border-b border-blue-100 bg-blue-50 hover:bg-blue-100 transition-colors"
                >
                  <span className="text-sm font-semibold text-blue-800">Reviewer Criteria Checklist</span>
                  {showChecklist ? <ChevronUp size={15} className="text-blue-600" /> : <ChevronDown size={15} className="text-blue-600" />}
                </button>
                {showChecklist && (
                  <div className="p-5 space-y-3">
                    <p className="text-xs text-slate-500 mb-3">
                      Confirm each item against licensed MCG or Milliman criteria before finalizing determination. This checklist does not constitute a coverage decision.
                    </p>
                    {result.criteriaChecklist.map((item, i) => (
                      <label key={i} className="flex items-start gap-3 cursor-pointer group">
                        <input
                          type="checkbox"
                          checked={!!checklistDone[i]}
                          onChange={() => setChecklistDone((prev) => ({ ...prev, [i]: !prev[i] }))}
                          className="mt-0.5 w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
                        />
                        <span className={`text-xs leading-relaxed ${checklistDone[i] ? "line-through text-slate-400" : "text-slate-700"}`}>{item}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>

              {/* Final disclaimer */}
              <div className="bg-slate-800 rounded-xl p-4 text-xs text-slate-300 leading-relaxed">
                <strong className="text-amber-400">Clinical Decision Support Only:</strong> This output is generated by MedReview24 to assist in the review process. All findings must be independently confirmed by a licensed clinical reviewer against the applicable MCG™ or Milliman Care Guidelines® criteria before a determination, denial, or appeal response is issued. MedReview24 does not issue final coverage determinations.
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

// Needed for FileText import referenced above
function FileText({ size, className }: { size: number; className?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}
