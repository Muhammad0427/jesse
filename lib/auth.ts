export type UserRole = "hospital" | "carrier";

export interface AuthUser {
  id?: string;
  email: string;
  name: string;
  role: UserRole;
  organization: string;
}

export const SESSION_KEY = "um_platform_user";
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

interface StoredSession {
  user: AuthUser;
  token: string;
  expiresAt: number;
}

export async function loginWithApi(email: string, password: string): Promise<AuthUser> {
  const res = await fetch("/.netlify/functions/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.error || "Login failed. Please try again.");
  }
  saveSession(data.user, data.token, data.expiresAt);
  return data.user;
}

export function saveSession(user: AuthUser, token: string, expiresAt: number) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user, token, expiresAt }));
}

function loadStoredSession(): StoredSession | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredSession;
    if (Date.now() > parsed.expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

export function loadSession(): AuthUser | null {
  return loadStoredSession()?.user ?? null;
}

export function getToken(): string | null {
  return loadStoredSession()?.token ?? null;
}

export function clearSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}

export function getRemainingMs(): number {
  const session = loadStoredSession();
  if (!session) return 0;
  return Math.max(0, session.expiresAt - Date.now());
}
