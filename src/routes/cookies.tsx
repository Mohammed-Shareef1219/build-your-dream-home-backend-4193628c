import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cookies")({
  head: () => ({
    meta: [
      { title: "Cookie Policy — BuildYourHome" },
      { name: "description", content: "How BuildYourHome uses cookies and similar technologies." },
    ],
  }),
  component: CookiesPage,
});

function CookiesPage() {
  return (
    <article className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <h1 className="text-4xl font-bold tracking-tight">Cookie Policy</h1>
      <p className="text-muted-foreground mt-2">Last updated: June 2026</p>

      <section className="mt-8 space-y-4 text-muted-foreground leading-relaxed">
        <p>We use cookies to keep you signed in, remember your preferences, and analyze platform performance.</p>
        <h2 className="text-xl font-semibold text-foreground">Types of cookies</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li><strong className="text-foreground">Essential</strong> — required for login and core platform features.</li>
          <li><strong className="text-foreground">Analytics</strong> — help us understand how visitors use the site.</li>
          <li><strong className="text-foreground">Preferences</strong> — remember language, theme, and saved properties.</li>
        </ul>
        <h2 className="text-xl font-semibold text-foreground">Your choices</h2>
        <p>You can disable non-essential cookies through your browser settings at any time.</p>
      </section>
    </article>
  );
}
