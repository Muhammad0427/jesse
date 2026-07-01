"use client";
import { useState } from "react";
import { Mail, Phone, Building2, ShieldCheck, Send, CheckCircle } from "lucide-react";

type InquiryType = "hospital-demo" | "carrier-demo" | "access-request" | "support" | "other";

const inquiryLabels: Record<InquiryType, string> = {
  "hospital-demo": "Hospital / UR Team Demo",
  "carrier-demo": "Carrier / UM Department Demo",
  "access-request": "Platform Access Request",
  support: "Technical Support",
  other: "General Inquiry",
};

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    organization: "",
    role: "",
    inquiryType: "hospital-demo" as InquiryType,
    message: "",
  });

  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((prev) => ({ ...prev, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-slate-800 py-16 text-white text-center">
        <div className="max-w-2xl mx-auto px-4">
          <h1 className="text-3xl font-bold mb-3">Contact ClearPath UM</h1>
          <p className="text-slate-300">
            Request a demo, ask about platform access, or reach out with questions about our clinical UM review platform.
          </p>
        </div>
      </section>

      <section className="py-16 bg-slate-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <div className="space-y-6">
            <div>
              <h2 className="font-bold text-slate-800 mb-4">Get in Touch</h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Mail className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <div className="font-medium text-slate-800">Email</div>
                    <div>info@clearpathum.com</div>
                    <div>support@clearpathum.com</div>
                  </div>
                </div>
                <div className="flex items-start gap-3 text-sm text-slate-600">
                  <Phone className="text-blue-600 mt-0.5 flex-shrink-0" size={16} />
                  <div>
                    <div className="font-medium text-slate-800">Phone</div>
                    <div>(800) 555-0190</div>
                    <div className="text-xs text-slate-400">M–F, 8am–6pm ET</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-5">
              <Building2 className="text-blue-600 mb-3" size={20} />
              <h3 className="font-semibold text-slate-800 mb-1 text-sm">Hospital / UR Teams</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We offer 30-minute workflow demos tailored for case management directors and UR nurses. We can configure a pilot around your concurrent review process.
              </p>
            </div>

            <div className="bg-slate-100 border border-slate-200 rounded-xl p-5">
              <ShieldCheck className="text-slate-600 mb-3" size={20} />
              <h3 className="font-semibold text-slate-800 mb-1 text-sm">Carrier / UM Departments</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                We work with UM medical directors and UM ops teams to configure the platform for your review volume and criteria framework. BAA available.
              </p>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-2">
            {submitted ? (
              <div className="bg-white rounded-2xl border border-green-200 shadow p-12 text-center">
                <CheckCircle className="mx-auto text-green-500 mb-4" size={48} />
                <h2 className="text-xl font-bold text-slate-800 mb-2">Message Received</h2>
                <p className="text-slate-500 text-sm">
                  Thank you for reaching out. A member of our clinical operations team will be in touch within one business day.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="bg-white rounded-2xl border border-slate-200 shadow p-8 space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                    <input
                      required
                      type="text"
                      value={form.name}
                      onChange={set("name")}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Jane Smith, RN CCM"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Work Email *</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={set("email")}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="you@hospital.org"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Organization *</label>
                    <input
                      required
                      type="text"
                      value={form.organization}
                      onChange={set("organization")}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Metro General Hospital"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Role / Title</label>
                    <input
                      type="text"
                      value={form.role}
                      onChange={set("role")}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Case Management Director"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Inquiry Type *</label>
                  <select
                    required
                    value={form.inquiryType}
                    onChange={set("inquiryType")}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  >
                    {(Object.entries(inquiryLabels) as [InquiryType, string][]).map(([v, l]) => (
                      <option key={v} value={v}>{l}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message</label>
                  <textarea
                    rows={5}
                    value={form.message}
                    onChange={set("message")}
                    className="w-full px-4 py-2.5 border border-slate-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                    placeholder="Tell us about your UM review volume, current workflow, or specific questions…"
                  />
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 bg-blue-700 hover:bg-blue-800 disabled:opacity-70 text-white font-semibold rounded-lg flex items-center justify-center gap-2 text-sm transition-colors"
                >
                  {loading ? (
                    <span className="inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                  {loading ? "Sending…" : "Send Message"}
                </button>
                <p className="text-xs text-slate-400 text-center">
                  We typically respond within one business day. For urgent support, email support@clearpathum.com directly.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
