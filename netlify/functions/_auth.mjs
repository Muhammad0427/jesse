import crypto from "crypto";

const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

const DEMO_USERS = {
  "hospital@demo.com": {
    password: "demo1234",
    user: { email: "hospital@demo.com", name: "Sarah Chen, RN CCM", role: "hospital", organization: "Metro General Hospital" },
  },
  "carrier@demo.com": {
    password: "demo1234",
    user: { email: "carrier@demo.com", name: "James Park, MD", role: "carrier", organization: "BlueCross UM Division" },
  },
};

function signToken(payload, secret) {
  const payloadStr = Buffer.from(JSON.stringify(payload)).toString("base64url");
  const sig = crypto.createHmac("sha256", secret).update(payloadStr).digest("base64url");
  return payloadStr + "." + sig;
}

function verifyToken(token, secret) {
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [payloadStr, sig] = parts;
  const expected = crypto.createHmac("sha256", secret).update(payloadStr).digest("base64url");
  const sigBuf = Buffer.from(sig);
  const expBuf = Buffer.from(expected);
  if (sigBuf.length !== expBuf.length || !crypto.timingSafeEqual(sigBuf, expBuf)) return null;

  let payload;
  try {
    payload = JSON.parse(Buffer.from(payloadStr, "base64url").toString());
  } catch {
    return null;
  }
  if (!payload.exp || Date.now() > payload.exp) return null;
  return payload;
}

export { DEMO_USERS, SESSION_TIMEOUT_MS, signToken, verifyToken };
