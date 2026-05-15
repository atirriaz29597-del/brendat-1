import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function RefundPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-surface-alt border-b border-gray-100 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Refund Policy
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              Our commitment to your satisfaction and how refunds are handled.
            </p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-gray-700 leading-relaxed">
          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">
              1. 60-Day Satisfaction Guarantee
            </h2>
            <p className="mb-4">
              Customers may request a refund within{" "}
              <strong className="text-primary">60 days of purchase</strong> if they are not
              satisfied with our services.
            </p>
            <p>
              Refunds may be issued for service fees paid to Brendat, subject to the conditions
              outlined below.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">2. Non-Refundable Fees</h2>
            <p className="mb-4">
              The following fees are <strong className="text-primary">non-refundable</strong>:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Government filing fees</li>
              <li>State registration fees</li>
              <li>Third-party service fees</li>
              <li>Payment processing fees</li>
            </ul>
            <p>
              These fees are paid directly to government agencies or third-party providers and
              cannot be refunded once submitted.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">3. Services Already Completed</h2>
            <p className="mb-4">Refunds may not be issued if:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Documents have already been{" "}
                <strong className="text-primary">prepared and delivered</strong>
              </li>
              <li>
                Business formation documents have been{" "}
                <strong className="text-primary">submitted to a state authority</strong>
              </li>
              <li>
                An EIN application has already been{" "}
                <strong className="text-primary">processed or submitted</strong>
              </li>
              <li>
                The service has already been <strong className="text-primary">completed</strong>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">4. Subscription Services</h2>
            <p className="mb-4">
              If Brendat offers subscription services (such as Registered Agent services or
              compliance tools):
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                Customers may request a refund within{" "}
                <strong className="text-primary">30 days of purchase</strong> if the service has not
                been used.
              </li>
              <li>
                Subscription renewals may be canceled at any time, but{" "}
                <strong className="text-primary">renewal payments may not be refundable</strong> once
                processed.
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">5. Cancellation Requests</h2>
            <p className="mb-4">
              Customers may cancel their order before work begins by contacting our support team.
            </p>
            <p>
              If the order has <strong className="text-primary">not yet been processed</strong>, a
              full refund may be issued excluding payment processing fees.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">6. How to Request a Refund</h2>
            <p className="mb-4">
              To request a refund, please contact us with the following details:
            </p>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Full name</li>
              <li>Order number</li>
              <li>Email used for purchase</li>
              <li>Reason for refund request</li>
            </ul>
            <p className="mb-2">Requests can be sent to:</p>
            <p className="mb-1">
              <strong className="text-primary">Email:</strong>{" "}
              <a
                href="mailto:support@brendat.com"
                className="text-accent hover:text-accent-dark transition-colors"
              >
                support@brendat.com
              </a>
            </p>
            <p className="mb-6">
              <strong className="text-primary">Website:</strong>{" "}
              <a
                href="https://brendat.com"
                className="text-accent hover:text-accent-dark transition-colors"
              >
                https://brendat.com
              </a>
            </p>
            <p>
              Our support team will review refund requests within{" "}
              <strong className="text-primary">5–10 business days</strong>.
            </p>
          </section>

          <p className="text-sm text-gray-500 border-t border-gray-100 pt-8">
            Questions about refunds?{" "}
            <Link href="/contact" className="text-accent hover:text-accent-dark transition-colors">
              Contact our support team
            </Link>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
