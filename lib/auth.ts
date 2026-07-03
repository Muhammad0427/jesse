export type UserRole = "hospital" | "carrier";

export interface AuthUser {
  id?: string;
  email: string;
  name: string;
  role: UserRole;
  organization: string;
}

export const API_BASE = "https://jesse-production-bd77.up.railway.app";
export const SESSION_KEY = "um_platform_user";
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000;

export async function loginWithApi(email: string, password: string): Promise<AuthUser> {
  const res = await fetch(`${API_BASE}/api/auth/login/`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    throw new Error("Invalid email or password. Please try again.");
  }
  const data = await res.json();
  const user: AuthUser = data.user;
  saveSession(user, data.access, data.refresh);
  return user;
}

export function saveSession(user: AuthUser, access?: string, refresh?: string) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ user, access, refresh, expiresAt: Date.now() + SESSION_TIMEOUT_MS })
  );
}

export function loadSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return null;
  try {
    const { user, expiresAt } = JSON.parse(raw);
    if (Date.now() > expiresAt) {
      sessionStorage.removeItem(SESSION_KEY);
      return null;
    }
    return user as AuthUser;
  } catch {
    return null;
  }
}

export function clearSession() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(SESSION_KEY);
}
