import { DEMO_USERS, SESSION_TIMEOUT_MS, signToken } from "./_auth.mjs";

export const handler = async (event) => {
  if (event.httpMethod === "OPTIONS") {
    return {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
      body: "",
    };
  }

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    return { statusCode: 500, body: JSON.stringify({ error: "Session secret not configured" }) };
  }

  let email, password;
  try {
    const body = JSON.parse(event.body || "{}");
    email = (body.email || "").toLowerCase();
    password = body.password;
  } catch {
    return { statusCode: 400, body: JSON.stringify({ error: "Invalid request body" }) };
  }

  const match = DEMO_USERS[email];
  if (!match || match.password !== password) {
    return { statusCode: 401, body: JSON.stringify({ error: "Invalid email or password. Please try again." }) };
  }

  const expiresAt = Date.now() + SESSION_TIMEOUT_MS;
  const token = signToken({ email: match.user.email, role: match.user.role, exp: expiresAt }, secret);

  return {
    statusCode: 200,
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user: match.user, token, expiresAt }),
  };
};
