import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

const LAST_UPDATED = "May 15, 2026";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-white">
        <section className="bg-surface-alt border-b border-gray-100 py-16 sm:py-20">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-gray-600">Last updated: {LAST_UPDATED}</p>
          </div>
        </section>

        <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12 sm:py-16 text-gray-700 leading-relaxed">
          <p className="mb-10">
            Brendat (&quot;Company,&quot; &quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is
            committed to protecting your personal information. This Privacy Policy explains how we
            collect, use, and protect your information when you visit Brendat.com or use our
            services.
          </p>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">1. Information We Collect</h2>
            <p className="mb-4">We may collect the following information:</p>

            <h3 className="font-semibold text-primary mb-2">Personal Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Billing address</li>
              <li>Government identification information (when required for filings)</li>
            </ul>

            <h3 className="font-semibold text-primary mb-2">Business Information</h3>
            <ul className="list-disc pl-6 space-y-2 mb-6">
              <li>Business name</li>
              <li>Ownership information</li>
              <li>Formation details</li>
              <li>Tax identification details</li>
            </ul>

            <h3 className="font-semibold text-primary mb-2">Technical Information</h3>
            <ul className="list-disc pl-6 space-y-2">
              <li>IP address</li>
              <li>Device type</li>
              <li>Browser type</li>
              <li>Website usage data</li>
              <li>Cookies and tracking technologies</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">2. How We Use Your Information</h2>
            <p className="mb-4">We use the information we collect to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Provide LLC formation and business services</li>
              <li>Process payments and transactions</li>
              <li>File documents with government agencies</li>
              <li>Communicate with customers</li>
              <li>Improve our website and services</li>
              <li>Prevent fraud and ensure compliance with laws</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">3. Sharing Your Information</h2>
            <p className="mb-4">We may share your information with:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Government agencies for business filings</li>
              <li>Payment processors</li>
              <li>Identity verification providers</li>
              <li>Service partners necessary to deliver services</li>
              <li>Legal authorities when required by law</li>
            </ul>
            <p>We do not sell personal data to third parties.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">4. Cookies and Tracking</h2>
            <p className="mb-4">We use cookies and analytics tools to:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Improve website performance</li>
              <li>Understand user behavior</li>
              <li>Provide personalized experiences</li>
            </ul>
            <p>You can disable cookies through your browser settings.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">5. Data Security</h2>
            <p className="mb-4">We implement industry-standard security measures including:</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li>Encrypted data transmission</li>
              <li>Secure servers</li>
              <li>Restricted access to sensitive data</li>
            </ul>
            <p>However, no system can guarantee 100% security.</p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">6. Your Rights</h2>
            <p className="mb-4">Depending on your location, you may have the right to:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Access your personal data</li>
              <li>Request corrections</li>
              <li>Request deletion</li>
              <li>Opt out of marketing communications</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">7. Third-Party Links</h2>
            <p>
              Our website may contain links to third-party websites. We are not responsible for
              their privacy practices.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">8. Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. Updates will be posted on this
              page.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-xl font-bold text-primary mb-4">9. Contact Us</h2>
            <p className="mb-4">If you have questions about this policy, contact:</p>
            <p className="font-semibold text-primary mb-2">Brendat</p>
            <p className="mb-1">
              <strong className="text-primary">Email:</strong>{" "}
              <a
                href="mailto:support@brendat.com"
                className="text-accent hover:text-accent-dark transition-colors"
              >
                support@brendat.com
              </a>
            </p>
            <p>
              <strong className="text-primary">Website:</strong>{" "}
              <a
                href="https://brendat.com"
                className="text-accent hover:text-accent-dark transition-colors"
              >
                https://brendat.com
              </a>
            </p>
          </section>

          <p className="text-sm text-gray-500 border-t border-gray-100 pt-8">
            See also our{" "}
            <Link href="/refund-policy" className="text-accent hover:text-accent-dark transition-colors">
              Refund Policy
            </Link>
            .
          </p>
        </article>
      </main>
      <Footer />
    </>
  );
}
