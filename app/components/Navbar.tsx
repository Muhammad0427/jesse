"use client";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { clearSession, loadSession, AuthUser } from "@/lib/auth";
import { Menu, X, Shield, LogOut } from "lucide-react";

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    setUser(loadSession());
  }, [pathname]);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  const links = user
    ? [
        { href: "/dashboard", label: "Dashboard" },
        { href: "/review", label: "New Review" },
        { href: "/hospitals", label: "Hospitals" },
        { href: "/carriers", label: "Carriers" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ]
    : [
        { href: "/hospitals", label: "Hospitals" },
        { href: "/carriers", label: "Carriers" },
        { href: "/about", label: "About" },
        { href: "/contact", label: "Contact" },
      ];

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={user ? "/dashboard" : "/"} className="flex items-center gap-2">
            <Shield className="text-blue-700" size={24} />
            <span className="font-bold text-slate-800 text-lg tracking-tight">MedReview24</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors ${
                  pathname === l.href ? "text-blue-700" : "text-slate-600 hover:text-blue-700"
                }`}
              >
                {l.label}
              </Link>
            ))}
            {user ? (
              <div className="flex items-center gap-3 ml-4 pl-4 border-l border-slate-200">
                <span className="text-xs text-slate-500">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  <LogOut size={14} />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="ml-4 px-4 py-2 bg-blue-700 text-white text-sm font-medium rounded-lg hover:bg-blue-800 transition-colors"
              >
                Sign In
              </Link>
            )}
          </div>

          <button className="md:hidden p-2" onClick={() => setOpen(!open)}>
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-3">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block text-sm font-medium text-slate-700 hover:text-blue-700"
              onClick={() => setOpen(false)}
            >
              {l.label}
            </Link>
          ))}
          {user ? (
            <button onClick={handleLogout} className="block text-sm text-red-600 font-medium">
              Sign Out
            </button>
          ) : (
            <Link href="/login" className="block text-sm font-medium text-blue-700">
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
