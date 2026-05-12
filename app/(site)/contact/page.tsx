"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  CheckCircle2,
} from "lucide-react";

const SUBJECT_OPTIONS = [
  "Business Formation",
  "Pricing & Packages",
  "Compliance & Management",
  "Technical Support",
  "General Inquiry",
] as const;

const NAME_REGEX = /^[A-Za-z][A-Za-z' -]*[A-Za-z]$/;
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_ALLOWED_CHARS_REGEX = /^[+()\d\s-]+$/;
const SUSPICIOUS_MESSAGE_PATTERNS = [
  /<\s*script\b/i,
  /<\s*\/\s*script\s*>/i,
  /javascript\s*:/i,
  /on\w+\s*=/i,
  /<\s*iframe\b/i,
  /document\./i,
  /window\./i,
  /eval\s*\(/i,
  /data\s*:\s*text\/html/i,
];

const normalizePhone = (value: string) => value.replace(/[^\d]/g, "");

type ContactForm = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

const validateForm = (rawForm: ContactForm): { error: string | null; sanitizedForm: ContactForm } => {
  const sanitizedForm: ContactForm = {
    name: rawForm.name.trim(),
    email: rawForm.email.trim().toLowerCase(),
    phone: rawForm.phone.trim(),
    subject: rawForm.subject.trim(),
    message: rawForm.message.trim(),
  };

  if (sanitizedForm.name.length < 2 || sanitizedForm.name.length > 80) {
    return { error: "Name must be between 2 and 80 characters.", sanitizedForm };
  }
  if (!NAME_REGEX.test(sanitizedForm.name)) {
    return { error: "Name can only include letters, spaces, apostrophes, and hyphens.", sanitizedForm };
  }
  if (/^\d+$/.test(sanitizedForm.name)) {
    return { error: "Name cannot be only numbers.", sanitizedForm };
  }

  if (sanitizedForm.email.length > 254 || !EMAIL_REGEX.test(sanitizedForm.email)) {
    return { error: "Please provide a valid email address.", sanitizedForm };
  }

  if (sanitizedForm.phone) {
    if (!PHONE_ALLOWED_CHARS_REGEX.test(sanitizedForm.phone)) {
      return {
        error: "Phone number can only include digits, spaces, +, parentheses, and hyphens.",
        sanitizedForm,
      };
    }
    const digitsOnly = normalizePhone(sanitizedForm.phone);
    if (digitsOnly.length < 7 || digitsOnly.length > 15) {
      return { error: "Phone number must contain 7 to 15 digits.", sanitizedForm };
    }
  }

  if (!SUBJECT_OPTIONS.includes(sanitizedForm.subject as (typeof SUBJECT_OPTIONS)[number])) {
    return { error: "Please select a valid subject.", sanitizedForm };
  }

  if (sanitizedForm.message.length < 20 || sanitizedForm.message.length > 5000) {
    return { error: "Message must be between 20 and 5000 characters.", sanitizedForm };
  }
  if (SUSPICIOUS_MESSAGE_PATTERNS.some((pattern) => pattern.test(sanitizedForm.message))) {
    return { error: "Message contains unsupported content. Please remove code or script-like text.", sanitizedForm };
  }

  return { error: null, sanitizedForm };
};

export default function ContactPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const { error: validationError, sanitizedForm } = validateForm(form);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSending(true);

    try {
      const res = await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: "contact",
          data: sanitizedForm,
        }),
      });

      const data = await res.json();

      if (data.ok) {
        router.push("/thank-you");
      } else {
        setError(data.message || "Failed to send message. Please try again.");
      }
    } catch (err) {
      console.error("Contact form error:", err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero */}
      <section className="relative bg-primary py-20 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06] pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(#FF4A00_1px,transparent_1px)] [background-size:32px_32px]" />
        </div>
        <div className="absolute top-10 right-1/4 w-[400px] h-[400px] bg-accent/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/10 rounded-full px-4 py-1.5 mb-6 text-sm font-medium text-orange-200">
            <MessageCircle className="w-4 h-4" /> We&apos;d love to hear from you
          </div>
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-black text-white leading-tight mb-4">
            Get In <span className="text-accent">Touch</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Have questions about business formation? Our team is ready to help you every step of the way.
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-20 px-4">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            {/* Left — Contact Info */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-black text-primary mb-6">Contact Information</h2>
              <p className="text-gray-500 leading-relaxed mb-10">
                Reach out through any of these channels and our team will get back to you promptly.
              </p>

              <div className="space-y-6">
                {[
                  {
                    icon: Phone,
                    title: "Phone",
                    detail: "+1 303 246-8693",
                    href: "tel:+13032468693",
                    sub: "Mon–Sat, 8AM–8PM CT",
                  },
                  {
                    icon: Mail,
                    title: "Email",
                    detail: "contact@brendat.com",
                    sub: "Average response: under 1 hour",
                  },
                  {
                    icon: MapPin,
                    title: "Office",
                    detail: "Georgia, USA",
                    sub: "Serving all 50 states",
                  },
                  {
                    icon: Clock,
                    title: "Business Hours",
                    detail: "Mon–Sat: 8AM–8PM CT",
                    sub: "Sunday: Closed",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <h4 className="font-bold text-primary text-sm">{item.title}</h4>
                      {item.href ? (
                        <a href={item.href} className="text-primary font-medium hover:text-accent transition-colors">
                          {item.detail}
                        </a>
                      ) : (
                        <p className="text-primary font-medium">{item.detail}</p>
                      )}
                      <p className="text-gray-500 text-xs mt-0.5">{item.sub}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick facts */}
              <div className="mt-12 bg-primary rounded-2xl p-6">
                <h4 className="text-white font-bold mb-4">Why reach out?</h4>
                <ul className="space-y-3">
                  {[
                    "Free consultation on entity types",
                    "Get a quote for your formation",
                    "Ask about ongoing compliance",
                    "Technical support & account help",
                  ].map((item, i) => (
                    <li key={i} className="flex items-center gap-2.5 text-gray-300 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-accent shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right — Contact Form */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl border border-gray-200 shadow-xl p-8 md:p-10">
                <h2 className="text-2xl font-black text-primary mb-2">Send Us a Message</h2>
                <p className="text-gray-500 text-sm mb-8">
                  Fill out the form below and we&apos;ll get back to you within one business day.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        minLength={2}
                        maxLength={80}
                        placeholder="John Doe"
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        maxLength={254}
                        placeholder="john@example.com"
                        value={form.email}
                        onChange={(e) => setForm({ ...form, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="(555) 000-0000"
                        value={form.phone}
                        maxLength={25}
                        pattern="[+()\d\s-]*"
                        inputMode="tel"
                        onChange={(e) => {
                          const value = e.target.value;
                          if (value === "" || PHONE_ALLOWED_CHARS_REGEX.test(value)) {
                            setForm({ ...form, phone: value });
                          }
                        }}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                        Subject *
                      </label>
                      <select
                        required
                        value={form.subject}
                        onChange={(e) => setForm({ ...form, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all appearance-none cursor-pointer"
                      >
                        <option value="">Select a topic</option>
                        {SUBJECT_OPTIONS.map((subject) => (
                          <option key={subject} value={subject}>
                            {subject}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1.5 uppercase tracking-wider">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      minLength={20}
                      maxLength={5000}
                      placeholder="Tell us how we can help you..."
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm font-medium text-primary focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all resize-none"
                    />
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl text-sm text-red-600">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={sending}
                    className="w-full bg-accent hover:bg-accent-dark text-white font-bold py-4 rounded-xl shadow-lg shadow-accent/25 transition-all flex items-center justify-center gap-2 text-base disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" /> Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-gray-400">
                    By submitting, you agree to our{" "}
                    <span className="text-accent cursor-pointer hover:underline">Privacy Policy</span>.
                    We&apos;ll never share your information.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
