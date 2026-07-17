exports.handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  let note, reviewType;
  try {
    const body = JSON.parse(event.body || "{}");
    note = body.note;
    reviewType = body.reviewType;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  if (!note || !reviewType) {
    return { statusCode: 400, body: JSON.stringify({ error: "Missing note or reviewType" }) };
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return { statusCode: 500, body: JSON.stringify({ error: "API key not configured" }) };
  }

  const typeFields = {
    inpatient: '"Day-One Reasoning": "...", "Day-Two Reasoning": "...", "Admitting Diagnosis": "...", "Criteria Framework": "..."',
    snf: '"Functional Status at Discharge": "...", "Skilled Need Identified": "...", "Prior Level of Function": "...", "Rehab Potential": "..."',
    ltac: '"Intensity of Service": "...", "Expected LOS": "...", "Medical Complexity": "...", "Ventilator Dependency": "..."',
  };

  const prompt = "You are a clinical utilization management review assistant. Analyze the following clinical documentation for a " + reviewType.toUpperCase() + " review.\n\nCLINICAL DOCUMENTATION:\n" + note + "\n\nReturn ONLY valid JSON (no markdown, no code fences, no explanation) in exactly this structure:\n{\n  \"clinicalSummary\": \"2-3 sentence objective clinical summary\",\n  \"phi\": {\n    \"name\": \"patient name or Unknown\",\n    \"dob\": \"date of birth or Unknown\",\n    \"mrn\": \"MRN or Unknown\",\n    \"admittingDx\": \"primary admitting diagnosis with ICD-10 if available\",\n    \"attendingProvider\": \"attending physician name or Unknown\",\n    \"dosStart\": \"date of service start or Unknown\",\n    \"dosEnd\": \"date of service end or Ongoing\"\n  },\n  \"supportsAdmission\": [\n    {\n      \"category\": \"clinical category\",\n      \"finding\": \"specific finding supporting " + reviewType + " level of care\",\n      \"clinicalFact\": \"verbatim or close paraphrase from the note\",\n      \"criteriaRef\": \"MCG or Milliman criteria framework reference\"\n    }\n  ],\n  \"doesNotMeetCriteria\": [\n    {\n      \"category\": \"clinical category\",\n      \"finding\": \"condition NOT met or NOT documented\",\n      \"clinicalFact\": \"clinical fact from the note\",\n      \"criteriaRef\": \"MCG or Milliman criteria reference\"\n    }\n  ],\n  \"typeSpecificFindings\": {\n    " + (typeFields[reviewType] || typeFields.inpatient) + "\n  },\n  \"criteriaChecklist\": [\n    \"checklist item 1 specific to this patient\",\n    \"checklist item 2\",\n    \"checklist item 3\",\n    \"checklist item 4\",\n    \"checklist item 5\"\n  ]\n}\n\nRules:\n- Base ALL findings on the actual documentation provided\n- supportsAdmission: 2-5 items with real clinical facts from the note\n- doesNotMeetCriteria: 1-3 items for conditions not documented or not present\n- criteriaChecklist: specific to this patient and diagnosis\n- Never reproduce actual MCG or Milliman criteria text, reference by name only\n- Replace all ... placeholders with real content from the note";

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 2048,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("Anthropic API error:", errText);
      return { statusCode: 502, body: JSON.stringify({ error: "AI service error: " + errText }) };
    }

    const data = await res.json();
    const text = data.content[0].text.trim();

    const cleaned = text.replace(/^```(?:json)?\n?/, "").replace(/\n?```$/, "").trim();
    const result = JSON.parse(cleaned);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(result),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Analysis failed: " + (err.message || "Unknown error") }),
    };
  }
};
