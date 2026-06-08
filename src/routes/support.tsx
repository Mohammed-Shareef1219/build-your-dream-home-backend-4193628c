import { createFileRoute, Link } from "@tanstack/react-router";
import { UserPlus, Search, CalendarCheck, Handshake } from "lucide-react";

export const Route = createFileRoute("/support")({
  head: () => ({
    meta: [
      { title: "Help Center & Support — BuildYourHome" },
      { name: "description", content: "Learn how to use BuildYourHome — from creating your account to closing a deal." },
      { property: "og:title", content: "Help Center & Support — BuildYourHome" },
      { property: "og:description", content: "Step-by-step guide to finding your dream property." },
    ],
  }),
  component: SupportPage,
});

const steps = [
  { icon: UserPlus, title: "Create Account", text: "Sign up in seconds with email or Google." },
  { icon: Search, title: "Browse Listings", text: "Filter villas, apartments, and commercial spaces." },
  { icon: CalendarCheck, title: "Schedule a Tour", text: "Book a real or virtual tour with a verified broker." },
  { icon: Handshake, title: "Close the Deal", text: "Finalize with transparent pricing and full support." },
];

function SupportPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Help Center</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">How to use our simple interface</h1>
        <p className="mt-4 text-muted-foreground">Follow these simple steps to find your dream property.</p>
      </header>

      <ol className="mt-14 relative space-y-8 before:absolute before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-border md:before:left-1/2">
        {steps.map((s, i) => (
          <li key={s.title} className={`relative md:grid md:grid-cols-2 md:gap-12 items-center ${i % 2 ? "md:[&>*:first-child]:order-2" : ""}`}>
            <div className="pl-16 md:pl-0 md:text-right md:pr-12">
              <div className="text-sm font-semibold text-secondary">Step {i + 1}</div>
              <h2 className="mt-1 text-2xl font-bold">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
            <div className="hidden md:block" />
            <div className="absolute left-6 md:left-1/2 -translate-x-1/2 top-0 h-12 w-12 rounded-full bg-brand-gradient text-white flex items-center justify-center shadow-elegant">
              <s.icon className="h-5 w-5" />
            </div>
          </li>
        ))}
      </ol>

      {/* Quick contact channels */}
      <section className="mt-16 grid gap-4 md:grid-cols-3">
        <a href="https://wa.me/20111639205" target="_blank" rel="noopener noreferrer" className="rounded-2xl border bg-card p-5 hover:shadow-elegant transition-shadow">
          <div className="text-xs font-semibold text-secondary uppercase tracking-wider">WhatsApp</div>
          <div className="mt-1 font-semibold">+20 111 639 205</div>
          <p className="mt-1 text-sm text-muted-foreground">Tap to chat instantly.</p>
        </a>
        <a href="https://t.me/+20111639205" target="_blank" rel="noopener noreferrer" className="rounded-2xl border bg-card p-5 hover:shadow-elegant transition-shadow">
          <div className="text-xs font-semibold text-secondary uppercase tracking-wider">Telegram</div>
          <div className="mt-1 font-semibold">+20 111 639 205</div>
          <p className="mt-1 text-sm text-muted-foreground">Send us a Telegram message.</p>
        </a>
        <a href="mailto:buildyourhom@gmail.com" className="rounded-2xl border bg-card p-5 hover:shadow-elegant transition-shadow">
          <div className="text-xs font-semibold text-secondary uppercase tracking-wider">Email</div>
          <div className="mt-1 font-semibold">buildyourhom@gmail.com</div>
          <p className="mt-1 text-sm text-muted-foreground">Reply within 24 hours.</p>
        </a>
      </section>

      <div className="mt-12 text-center">
        <Link to="/consultation" className="inline-flex rounded-full bg-secondary text-secondary-foreground px-8 py-3 font-semibold hover:opacity-90 transition">
          Book Free Consultation
        </Link>
      </div>
    </div>
  );
}

