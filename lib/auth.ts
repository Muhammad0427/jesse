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

const DEMO_USERS: Record<string, { password: string; user: AuthUser }> = {
  "hospital@demo.com": {
    password: "demo1234",
    user: { email: "hospital@demo.com", name: "Sarah Chen, RN CCM", role: "hospital", organization: "Metro General Hospital" },
  },
  "carrier@demo.com": {
    password: "demo1234",
    user: { email: "carrier@demo.com", name: "James Park, MD", role: "carrier", organization: "BlueCross UM Division" },
  },
};

export async function loginWithApi(email: string, password: string): Promise<AuthUser> {
  await new Promise((r) => setTimeout(r, 600));
  const match = DEMO_USERS[email.toLowerCase()];
  if (!match || match.password !== password) {
    throw new Error("Invalid email or password. Please try again.");
  }
  saveSession(match.user);
  return match.user;
}

export function saveSession(user: AuthUser) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    SESSION_KEY,
    JSON.stringify({ user, expiresAt: Date.now() + SESSION_TIMEOUT_MS })
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

export function getRemainingMs(): number {
  if (typeof window === "undefined") return 0;
  const raw = sessionStorage.getItem(SESSION_KEY);
  if (!raw) return 0;
  try {
    const { expiresAt } = JSON.parse(raw);
    return Math.max(0, expiresAt - Date.now());
  } catch {
    return 0;
  }
}
