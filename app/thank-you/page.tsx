import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export default function ThankYouPage() {
  return (
    <main className="min-h-screen bg-white px-4 py-20">
      <section className="mx-auto w-full max-w-3xl rounded-3xl border border-gray-200 bg-white p-10 text-center shadow-xl sm:p-14">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-emerald-50">
          <CheckCircle2 className="h-10 w-10 text-emerald-500" />
        </div>

        <p className="mb-3 text-xs font-black uppercase tracking-[0.2em] text-accent">Submission Received</p>
        <h1 className="mb-4 text-3xl font-black text-primary sm:text-4xl">Thank You for Contacting Us</h1>
        <p className="mx-auto mb-10 max-w-xl text-base text-gray-600">
          Your message was sent successfully. Our team will review it and get back to you as soon as possible.
        </p>

        <div className="flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl bg-accent px-7 py-3 font-bold text-white shadow-lg shadow-accent/20 transition-all hover:bg-accent-dark"
          >
            Back to Home
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-300 px-7 py-3 font-semibold text-primary transition-all hover:bg-gray-50"
          >
            Submit another message <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </main>
  );
}
