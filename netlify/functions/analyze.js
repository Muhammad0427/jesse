exports.handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { note, reviewType } = JSON.parse(event.body || "{}");
  if (!note || !reviewType) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing note or reviewType" }) };
  }

  const prompt = `You are a clinical utilization management review assistant. Analyze the following clinical documentation for a ${reviewType.toUpperCase()} review and return a structured JSON response.

CLINICAL DOCUMENTATION:
${note}

Return ONLY valid JSON in exactly this structure (no markdown, no explanation, just JSON):
{
  "clinicalSummary": "2-3 sentence objective clinical summary of the patient's presentation",
  "phi": {
    "name": "patient name or Unknown if not found",
    "dob": "date of birth or Unknown",
    "mrn": "MRN or Unknown",
    "admittingDx": "primary admitting diagnosis with ICD-10 if available",
    "attendingProvider": "attending physician name or Unknown",
    "dosStart": "date of service start or Unknown",
    "dosEnd": "date of service end or Ongoing"
  },
  "supportsAdmission": [
    {
      "category": "clinical category (e.g. Severity, IV Therapy, Monitoring)",
      "finding": "specific clinical finding that supports ${reviewType} level of care",
      "clinicalFact": "verbatim or close paraphrase of the supporting clinical fact from the note",
      "criteriaRef": "reference to MCG or Milliman criteria framework relevant to this finding"
    }
  ],
  "doesNotMeetCriteria": [
    {
      "category": "clinical category",
      "finding": "condition or criteria that is NOT met or NOT documented",
      "clinicalFact": "specific clinical fact from the note supporting why this criteria is not met",
      "criteriaRef": "MCG or Milliman criteria reference"
    }
  ],
  "typeSpecificFindings": {
    ${reviewType === "inpatient"
      ? '"Day-One Reasoning": "...", "Day-Two Reasoning": "...", "Admitting Diagnosis": "...", "Criteria Framework": "..."'
      : reviewType === "snf"
      ? '"Functional Status at Discharge": "...", "Skilled Need Identified": "...", "Prior Level of Function": "...", "Rehab Potential": "..."'
      : '"Intensity of Service": "...", "Expected LOS": "...", "Medical Complexity": "...", "Ventilator Dependency": "..."'
    }
  },
  "criteriaChecklist": [
    "checklist item 1 specific to this patient and ${reviewType} review",
    "checklist item 2",
    "checklist item 3",
    "checklist item 4",
    "checklist item 5"
  ]
}

Rules:
- Base ALL findings on the actual documentation provided, not assumptions
- supportsAdmission should have 2-5 items with real clinical facts from the note
- doesNotMeetCriteria should have 1-3 items for conditions NOT documented or NOT present
- criteriaChecklist items should be specific to this patient's diagnosis and care setting
- Never reproduce actual MCG or Milliman criteria text — reference by name only
- If information is missing from the note, say so explicitly`;

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.ANTHROPIC_API_KEY,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error("Anthropic API error:", err);
      return { statusCode: 502, body: JSON.stringify({ error: "AI service error" }) };
    }

    const data = await res.json();
    const text = data.content[0].text.trim();
    const result = JSON.parse(text);

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: "Analysis failed. Please try again." }) };
  }
};
