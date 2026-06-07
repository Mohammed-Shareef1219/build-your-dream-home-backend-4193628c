import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service — BuildYourHome" },
      { name: "description", content: "The terms and conditions governing your use of BuildYourHome." },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
      <p className="text-muted-foreground mt-2">Last updated: June 2026</p>

      <section className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
        <p>By using BuildYourHome you agree to these terms. Our platform connects buyers, sellers, and renters with verified brokers using AI-powered tools.</p>
        <h2 className="text-xl font-semibold text-foreground">Use of the service</h2>
        <p>You agree to provide accurate information and not to misuse listings, brokers, or other users of the platform.</p>
        <h2 className="text-xl font-semibold text-foreground">Listings & transactions</h2>
        <p>All listings are verified by our team. Final transactions occur between buyer/renter and seller/broker — BuildYourHome is the facilitator.</p>
        <h2 className="text-xl font-semibold text-foreground">Liability</h2>
        <p>BuildYourHome is provided "as is" without warranties. We strive for accuracy but cannot guarantee market outcomes.</p>
      </section>
    </article>
  );
}
