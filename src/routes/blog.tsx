import { useT } from "@/lib/i18n";
import { createFileRoute } from "@tanstack/react-router";
import { Newspaper, TrendingUp } from "lucide-react";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog & News — BuildYourHome" },
      { name: "description", content: "Latest real estate updates, market insights, and platform news from BuildYourHome." },
      { property: "og:title", content: "Blog & News — BuildYourHome" },
      { property: "og:description", content: "Latest real estate updates and platform news." },
    ],
  }),
  component: BlogPage,
});

const news = [
  { tag: "Market", title: "Cairo property market up 4.2% this quarter", date: "June 2026" },
  { tag: "Product", title: "New AI Valuation Tool launched", date: "May 2026" },
  { tag: "Agent", title: "Agent Ahmed Mansour closes 12 deals this week", date: "May 2026" },
  { tag: "Partnership", title: "Ibn Beitak joins as featured partner agency", date: "Apr 2026" },
  { tag: "Market", title: "Sheikh Zayed commercial space demand +3.4%", date: "Apr 2026" },
  { tag: "Product", title: "Smart Tours: 320+ bookings this week", date: "Mar 2026" },
];

const ticker = [
  "Cairo Market: +4.2% ↑", "Agent Ahmed Mansour: 12 Deals Closed", "New AI Valuation Tool Launched",
  "New Cairo Villa prices +6.1% ↑", "6 October apartment demand +9% ↑", "Agent Sara Ali: 8 Deals Closed",
  "Sheikh Zayed Commercial +3.4% ↑", "Mortgage rates stable at 14.5%", "North Coast rentals +18% ↑",
  "AI matched 1,240 buyers this week",
];

function BlogPage() {
  const t = useT();
  return (
    <div>
      {/* Ticker */}
      <div className="bg-primary text-primary-foreground overflow-hidden">
        <div className="flex whitespace-nowrap py-3 animate-[ticker_50s_linear_infinite] text-sm font-medium">
          {[...ticker, ...ticker].map((t, i) => (
            <span key={i} className="px-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-secondary" />{t}
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
        <header className="text-center max-w-3xl mx-auto">
          <p className="text-sm font-semibold text-secondary uppercase tracking-wider">{t("Blog & News")}</p>
          <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">{t("Latest real estate updates")}</h1>
        </header>

        <div className="mt-10 rounded-2xl border-l-4 border-secondary bg-secondary/10 p-6 shadow-soft flex items-start gap-3">
          <Newspaper className="h-6 w-6 text-secondary mt-0.5" />
          <p className="text-lg font-medium">{t("Latest real estate updates and platform news.")}</p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {news.map((n) => (
            <article key={n.title} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow">
              <div className="flex items-center gap-2 text-xs text-secondary font-semibold uppercase tracking-wider">
                <TrendingUp className="h-3.5 w-3.5" /> {n.tag}
              </div>
              <h2 className="mt-3 text-lg font-semibold leading-snug">{n.title}</h2>
              <p className="mt-3 text-sm text-muted-foreground">{n.date}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
