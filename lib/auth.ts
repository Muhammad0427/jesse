// Simple in-memory auth context — replace with real auth in production
export type UserRole = "hospital" | "carrier";

export interface AuthUser {
  email: string;
  name: string;
  role: UserRole;
  organization: string;
}

export const DEMO_USERS: Record<string, { password: string; user: AuthUser }> = {
  "hospital@demo.com": {
    password: "demo1234",
    user: {
      email: "hospital@demo.com",
      name: "Sarah Chen, RN CCM",
      role: "hospital",
      organization: "Metro General Hospital",
    },
  },
  "carrier@demo.com": {
    password: "demo1234",
    user: {
      email: "carrier@demo.com",
      name: "James Park, MD",
      role: "carrier",
      organization: "BlueCross UM Division",
    },
  },
};

export const SESSION_KEY = "um_platform_user";
export const SESSION_TIMEOUT_MS = 30 * 60 * 1000; // 30 minutes

export function saveSession(user: AuthUser) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(SESSION_KEY, JSON.stringify({ user, expiresAt: Date.now() + SESSION_TIMEOUT_MS }));
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
