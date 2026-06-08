import { createFileRoute, Link } from "@tanstack/react-router";
import { FileCheck2, Home, Car, Trees, TrendingUp, Shield } from "lucide-react";

export const Route = createFileRoute("/investment")({
  head: () => ({
    meta: [
      { title: "Real Estate Investment — BuildYourHome" },
      { name: "description", content: "Generate income through rental properties, garages, and palm groves. Plus legal verification for every deal." },
      { property: "og:title", content: "Real Estate Investment — BuildYourHome" },
      { property: "og:description", content: "Earn from rentals, garages, and palm groves across Egypt." },
    ],
  }),
  component: InvestmentPage,
});

const strategies = [
  {
    icon: Home,
    title: "Residential Rentals",
    location: "New Cairo, Maadi, Sheikh Zayed, 6 October",
    text: "Buy a furnished apartment or villa and rent it to expats, executives, or short-term tourists. Average gross yield: 6–9% annually.",
  },
  {
    icon: Car,
    title: "Garage & Parking Income",
    location: "Downtown Cairo, Mohandessin, Heliopolis, Zamalek",
    text: "Purchase a covered parking unit or small lot in dense areas. Monthly rentals to residents and offices generate steady cash flow with near-zero maintenance.",
  },
  {
    icon: Trees,
    title: "Palm Groves & Agricultural Land",
    location: "Siwa, Fayoum, Wadi El Natrun, North Coast hinterland",
    text: "Buy producing palm groves or plant new ones. Annual date harvests plus rising land value give a long-term inflation hedge.",
  },
  {
    icon: TrendingUp,
    title: "Commercial Spaces",
    location: "5th Settlement, Sheikh Zayed, New Capital",
    text: "Lease retail units, clinics, or co-working spaces to businesses on multi-year contracts — higher yields than residential.",
  },
];

function InvestmentPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Real Estate Investment</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Earn income from your property</h1>
        <p className="mt-4 text-muted-foreground">Rentals, garages, palm groves — discover how every property can pay you back.</p>
      </header>

      {/* Legal verification board */}
      <div className="mt-10 rounded-2xl border-l-4 border-accent bg-accent/10 p-6 shadow-soft flex items-start gap-3">
        <FileCheck2 className="h-6 w-6 text-accent-foreground mt-0.5" />
        <div>
          <h2 className="text-lg font-semibold">Legal Verification</h2>
          <p className="mt-1 text-muted-foreground">
            Ensure all property documents and title deeds are clear and legally valid. Our in-house legal team reviews every contract before signing — registered with the Egyptian Real Estate Publicity Department.
          </p>
        </div>
      </div>

      {/* Strategies */}
      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {strategies.map((s) => (
          <div key={s.title} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="h-11 w-11 rounded-xl bg-brand-gradient text-white flex items-center justify-center">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="mt-4 text-xl font-semibold">{s.title}</h3>
            <p className="mt-1 text-xs text-secondary font-medium uppercase tracking-wider">{s.location}</p>
            <p className="mt-2 text-muted-foreground leading-relaxed">{s.text}</p>
          </div>
        ))}
      </div>

      <div className="mt-12 rounded-2xl border bg-card p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <Shield className="h-6 w-6 text-secondary mt-0.5" />
          <div>
            <h3 className="font-semibold text-lg">Talk to an investment advisor</h3>
            <p className="text-muted-foreground text-sm">Free 24-hour consultation — we'll match the right strategy to your budget.</p>
          </div>
        </div>
        <Link to="/consultation" className="rounded-full bg-secondary text-secondary-foreground px-6 py-2.5 font-semibold hover:opacity-90 transition">
          Book Now
        </Link>
      </div>
    </div>
  );
}
