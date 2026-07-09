import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Terms and Conditions | Denmar Tours & Travel",
  description: "Read Denmar Tours & Travel booking, payment, pricing, and cancellation terms and conditions.",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-10">
        <h1 className="font-heading text-3xl font-bold text-brand-primary sm:text-4xl">
          Denmar Tours and Travel Terms and Conditions
        </h1>
        <p className="mt-3 text-sm text-gray-500">Last updated: July 2026</p>
        <div className="mt-4">
          <Link
            href="/"
            className="inline-flex rounded-full border border-brand-primary px-4 py-2 text-sm font-medium text-brand-primary transition-colors hover:bg-brand-primary hover:text-white"
          >
            Back to Home
          </Link>
        </div>

        <section className="mt-8 space-y-4 text-gray-700">
          <h2 className="font-heading text-2xl font-semibold text-brand-primary">Terms and Conditions for Payments</h2>

          <h3 className="font-heading text-xl font-semibold text-brand-primary">Booking Your Trip</h3>
          <ol className="list-decimal space-y-3 pl-5">
            <li>All bookings must be made through an authorized representative of Denmar Tours and Travel (&quot;the Company&quot;).</li>
            <li>Your contract in respect of your holiday is made with Denmar Tours and Travel, registered in Kenya, and all bookings are subject to these terms and conditions.</li>
            <li>All communications by the Company in relation to your holiday will be sent through official company email addresses.</li>
            <li>At the time of booking, the Company booking form must be completed and submitted together with a deposit as stipulated by the authorized representative and within the provided cut-off dates.</li>
            <li>Receipt of a deposit and booking form does not guarantee or imply confirmation. A booking is only confirmed when the Company issues an official confirmation notice and hotel confirmation number.</li>
            <li>The Company reserves the right to refuse a booking without giving any reason. In such event, any deposit received will be returned.</li>
            <li>Your holiday must be paid in full at least 30 days before departure. If payment is not received by the due date, the Company reserves the right to cancel the booking and retain the deposit.</li>
            <li>The person/company signing the booking form guarantees payment of the total amount and is responsible for ensuring full payment is received by the due date. No reminders will be sent.</li>
            <li>If booking is made within 30 days of departure, full payment must be made at the time of booking.</li>
            <li>All special requests (including dietary requirements) should be indicated on the booking form.</li>
            <li>The Company will provide services as set out and confirmed in writing.</li>
          </ol>
        </section>

        <section className="mt-8 space-y-4 text-gray-700">
          <h3 className="font-heading text-xl font-semibold text-brand-primary">Price Policy</h3>
          <ol className="list-decimal space-y-3 pl-5">
            <li>The Company is under no obligation to provide a breakdown of holiday costs.</li>
            <li>The Company reserves the right to notify you of any price increase before accepting your booking.</li>
            <li>
              After a Confirmation Invoice has been issued, unless full payment is made at booking, prices may be subject to surcharges in limited circumstances, including:
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>transportation cost changes (including fuel),</li>
                <li>increases in normal published airfares,</li>
                <li>taxes/fees such as landing taxes,</li>
                <li>exchange rate changes,</li>
                <li>new or increased government/regulatory taxes.</li>
              </ul>
            </li>
            <li>The Company will absorb up to 2% of your holiday price (excluding insurance premiums and amendment charges) before passing on any surcharge.</li>
            <li>Surcharges will be communicated through a revised Confirmation Invoice.</li>
            <li>If a surcharge increases your original holiday price by 10% or more, you may cancel within 14 days of the revised invoice date and receive a refund of payments made less costs/charges already incurred.</li>
            <li>
              You may choose to pay in full at booking to fix the holiday price quoted at that time. To qualify, full payment must reach the Company within 7 days of the Confirmation Invoice date.
            </li>
            <li>Under these commitments, the Company is not able to reduce holiday prices if fluctuations are favorable.</li>
          </ol>
        </section>

        <section className="mt-8 space-y-4 text-gray-700">
          <h3 className="font-heading text-xl font-semibold text-brand-primary">Cancellation Policy</h3>
          <ol className="list-decimal space-y-3 pl-5">
            <li>
              The Company may make changes to your holiday if necessary. If a major change occurs (not caused by circumstances beyond the Company&apos;s control), you may:
              <ul className="mt-2 list-disc space-y-1 pl-5">
                <li>accept the change,</li>
                <li>purchase another holiday from the Company, or</li>
                <li>cancel your holiday.</li>
              </ul>
            </li>
            <li>No compensation is payable for minor changes.</li>
            <li>
              Minor changes include, without limitation, minimal departure/arrival time changes, aircraft type changes, and restaurant/accommodation changes to comparable or superior standards.
            </li>
            <li>
              Major changes include cancellation, airport changes, delays over 12 hours, and accommodation changes to an inferior standard.
            </li>
            <li>
              No compensation is payable for cancellations/changes caused by Force Majeure, including Acts of God, war/threat of war, riot, civil strike, industrial dispute, terrorist activity, natural or man-made disasters, fire, technical transport issues, airport closure/congestion, adverse weather, or any event beyond the Company&apos;s control.
            </li>
            <li>The Company reserves the right to cancel your holiday at any time before departure (including after confirmation). In such cases, amounts paid will be refunded in full and no compensation shall be payable.</li>
            <li>Transportation is subject to the carrier&apos;s conditions of carriage, which may limit or exclude liability.</li>
            <li>If the balance is not paid at least 30 days before departure, the booking will be treated as canceled and cancellation charges will apply.</li>
            <li>The Company may refuse any person as a member of a tour if, in its opinion, that person may endanger health, safety, or enjoyment of others.</li>
            <li>
              In such events, the Company&apos;s liability and the client&apos;s sole remedy are limited to refund of monies paid less value of utilized services and administrative fees.
            </li>
          </ol>
        </section>

        <section className="mt-8 rounded-xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900">
          <h4 className="font-heading text-lg font-semibold">Important Notes</h4>
          <ul className="mt-2 list-disc space-y-2 pl-5">
            <li>Written cancellations are accepted on all working days except Sunday. Any cancellation sent on Sunday is considered received the next working day (Monday).</li>
            <li>For the Christmas and New Year period (20 Dec to 05 Jan), payments are non-refundable.</li>
            <li>If you cancel after commencement of the trip, refund is limited and subject to recoveries from hotels/contractors.</li>
            <li>No refunds are guaranteed for unused accommodation, transport, missed meals, or other unused services.</li>
          </ul>
        </section>
      </div>
    </main>
  )
}
