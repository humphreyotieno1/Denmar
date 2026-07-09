import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy | Denmar Tours & Travel",
  description: "Learn how Denmar Tours & Travel collects, uses, stores, and protects your personal information.",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl">Privacy Policy</h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: July 2026</p>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex rounded-full border border-brand-primary px-4 py-2 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
          >
            Back to Home
          </Link>
        </div>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">1. Who We Are</h2>
          <p>
            Denmar Tours &amp; Travel (&quot;Denmar&quot;, &quot;we&quot;, &quot;our&quot;, &quot;us&quot;) provides travel planning and booking services.
            This policy explains how we collect, use, disclose, and protect personal information when you use our
            website, contact us, or book our services.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">2. Information We Collect</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>Identity data (name, contact person details, passport/traveler details where applicable).</li>
            <li>Contact data (email address, phone number, address).</li>
            <li>Booking data (destinations, dates, preferences, traveler counts, budgets, requests).</li>
            <li>Communication data (messages sent through forms, email, WhatsApp, or calls).</li>
            <li>Technical/usage data (browser type, IP, pages viewed, analytics and cookie-related data).</li>
            <li>Marketing preferences (newsletter opt-ins and campaign interaction data).</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">3. How We Use Your Information</h2>
          <ul className="list-disc space-y-2 pl-5">
            <li>To respond to inquiries and provide travel quotations.</li>
            <li>To process, confirm, and manage bookings and related services.</li>
            <li>To communicate itinerary updates, payment details, and support information.</li>
            <li>To improve our website, services, and customer experience.</li>
            <li>To send newsletters and offers where you have consented or where legally permitted.</li>
            <li>To meet legal, regulatory, accounting, and fraud prevention obligations.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">4. Legal Basis</h2>
          <p>We process personal information based on one or more of the following:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>performance of a contract (booking and travel service delivery),</li>
            <li>compliance with legal obligations,</li>
            <li>our legitimate business interests,</li>
            <li>your consent (for specific communications and marketing).</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">5. Sharing of Information</h2>
          <p>
            We may share relevant information with trusted partners where necessary to deliver your trip, such as
            airlines, hotels, transport providers, insurers, visa processors, payment providers, and technology/analytics
            vendors. We may also disclose information where required by law or competent authorities.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">6. International Transfers</h2>
          <p>
            Because travel services are international, your information may be transferred to countries outside your home
            jurisdiction. Where this occurs, we take reasonable steps to ensure appropriate safeguards are in place.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">7. Data Retention</h2>
          <p>
            We retain personal data only as long as necessary for booking operations, customer service, legal compliance,
            and legitimate business purposes. Retention periods vary based on record type and legal obligations.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">8. Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies for essential site functionality, analytics, and marketing performance
            (including third-party tools). You can manage cookies through your browser settings.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">9. Security</h2>
          <p>
            We implement reasonable administrative, technical, and organizational safeguards to protect personal data.
            However, no digital system can guarantee absolute security.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">10. Your Rights</h2>
          <p>Subject to applicable law, you may request to:</p>
          <ul className="list-disc space-y-2 pl-5">
            <li>access your personal information,</li>
            <li>correct inaccurate or incomplete data,</li>
            <li>request deletion of data,</li>
            <li>object to or restrict certain processing,</li>
            <li>withdraw consent for marketing communications.</li>
          </ul>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">11. Contact</h2>
          <p>
            For privacy-related inquiries or requests, contact Denmar Tours &amp; Travel through our official contact channels
            listed on the website contact page.
          </p>
        </section>

        <section className="mt-8 space-y-3 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">12. Policy Updates</h2>
          <p>
            We may update this Privacy Policy from time to time. Any updates are effective upon publication on this page.
          </p>
        </section>
      </div>
    </main>
  )
}
