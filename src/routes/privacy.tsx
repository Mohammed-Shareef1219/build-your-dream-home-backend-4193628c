import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — BuildYourHome" },
      { name: "description", content: "How BuildYourHome collects, uses, and protects your personal data." },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16 prose prose-slate">
      <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="text-muted-foreground mt-2">Last updated: June 2026</p>

      <section className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
        <p>BuildYourHome respects your privacy. We collect only the data needed to deliver our real-estate marketing services — listings, consultations, and personalized recommendations.</p>
        <h2 className="text-xl font-semibold text-foreground">What we collect</h2>
        <p>Account information (name, email, phone), property preferences, and usage analytics to improve the platform.</p>
        <h2 className="text-xl font-semibold text-foreground">How we use it</h2>
        <p>To match you with properties, contact verified brokers on your behalf, and improve our AI valuation models. We never sell personal data.</p>
        <h2 className="text-xl font-semibold text-foreground">Your rights</h2>
        <p>You can request a copy or deletion of your data at any time by emailing buildyourhom@gmail.com.</p>
      </section>
    </article>
  );
}
