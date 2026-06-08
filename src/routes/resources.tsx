import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, GraduationCap, Calculator, Wallet, TrendingUp, LineChart } from "lucide-react";

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Real Estate Guides — BuildYourHome" },
      { name: "description", content: "Real estate guides, smart valuation tips, and an Egyptian market study program from BuildYourHome experts." },
      { property: "og:title", content: "Resources & Real Estate Guides — BuildYourHome" },
      { property: "og:description", content: "Learn best practices in buying and investing in real estate." },
    ],
  }),
  component: ResourcesPage,
});

const guides = [
  { icon: BookOpen, title: "Real Estate Guides", text: "Learn best practices in buying and investing in real estate from our experts — written by brokers who close deals every week." },
  { icon: GraduationCap, title: "Egyptian Market Study Program", text: "A complete curriculum analyzing the Egyptian real estate market: supply zones, price cycles, currency impact, and developer track records." },
  { icon: Calculator, title: "Smart Tips for Property Valuation", text: "Set a realistic budget and check market prices to get the best deal without overpaying. Learn the 7 indicators that signal a fair price." },
  { icon: Wallet, title: "Smart Budgeting", text: "Down payments, installments, mortgage rates, and total cost of ownership — clearly explained for first-time buyers." },
];

const curriculum = [
  { week: "Week 1", topic: "Market Fundamentals", detail: "Supply & demand zones across Greater Cairo, Alexandria, and the North Coast." },
  { week: "Week 2", topic: "Price Cycles & Currency", detail: "How EGP volatility, inflation, and interest rates shape property prices." },
  { week: "Week 3", topic: "Developer Track Records", detail: "Evaluating delivery history, finishing quality, and after-sales service." },
  { week: "Week 4", topic: "Investment Math", detail: "ROI, rental yields, capital gains, and exit strategies in the Egyptian market." },
];

function ResourcesPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Resources</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Real Estate Guides & Smart Tips</h1>
        <p className="mt-4 text-muted-foreground">Learn from people who actually close deals.</p>
      </header>

      {/* Featured board */}
      <div className="mt-10 rounded-2xl border-l-4 border-secondary bg-secondary/10 p-6 shadow-soft flex items-start gap-3">
        <LineChart className="h-6 w-6 text-secondary mt-0.5" />
        <p className="text-lg font-medium">Set a realistic budget and check market prices to get the best deal without overpaying.</p>
      </div>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {guides.map((g) => (
          <div key={g.title} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="h-11 w-11 rounded-xl bg-brand-gradient text-white flex items-center justify-center">
              <g.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">{g.title}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{g.text}</p>
          </div>
        ))}
      </div>

      {/* Curriculum */}
      <section className="mt-16">
        <div className="flex items-center gap-2 mb-6">
          <TrendingUp className="h-5 w-5 text-secondary" />
          <h2 className="text-2xl font-bold">Egyptian Market — 4-Week Study Program</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {curriculum.map((c) => (
            <div key={c.week} className="rounded-xl border bg-card p-5">
              <div className="text-xs font-semibold text-secondary uppercase tracking-wider">{c.week}</div>
              <h3 className="mt-1 font-semibold text-lg">{c.topic}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{c.detail}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
