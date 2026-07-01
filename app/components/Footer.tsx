import Link from "next/link";
import { Shield } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <Shield className="text-blue-400" size={20} />
              <span className="font-bold text-white text-lg">ClearPath UM</span>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              Clinical decision support for utilization management teams across hospital and payer organizations.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Platform</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/hospitals" className="hover:text-white transition-colors">For Hospitals</Link></li>
              <li><Link href="/carriers" className="hover:text-white transition-colors">For Carriers</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><span className="text-slate-500 cursor-default">Privacy Policy</span></li>
              <li><span className="text-slate-500 cursor-default">Terms of Service</span></li>
              <li><span className="text-slate-500 cursor-default">BAA Available</span></li>
              <li><span className="text-slate-500 cursor-default">HIPAA Compliance</span></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-6 space-y-3">
          <p className="text-xs text-amber-400 font-medium uppercase tracking-wide">
            Clinical Decision Support Disclaimer
          </p>
          <p className="text-xs text-slate-400 leading-relaxed">
            ClearPath UM is a clinical decision support tool only. All outputs — including admission support findings,
            denial rationale, and criteria references — require independent review and final determination by a licensed
            clinical reviewer. ClearPath UM does not make final coverage determinations, issue denials, or replace the
            judgment of a qualified healthcare professional. MCG™ and Milliman Care Guidelines® are proprietary
            evidence-based criteria products; ClearPath UM references these frameworks by name only and does not
            reproduce, incorporate, or substitute for their licensed content.
          </p>
          <p className="text-xs text-slate-500 mt-4">
            © {new Date().getFullYear()} ClearPath UM, Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
