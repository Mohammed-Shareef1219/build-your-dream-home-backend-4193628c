import { createFileRoute } from "@tanstack/react-router";
import { Target, Eye, Sparkles, Rocket } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us — BuildYourHome" },
      { name: "description", content: "Brokers + programmers, powered by technology. Learn about BuildYourHome's mission, vision, and aspiration." },
      { property: "og:title", content: "About Us — BuildYourHome" },
      { property: "og:description", content: "Brokers + programmers, powered by technology." },
    ],
  }),
  component: AboutPage,
});

const blocks = [
  { icon: Target, title: "Our Goal", text: "Make buying, selling, or renting your property easier, faster, and clearer than ever before." },
  { icon: Eye, title: "Our Vision", text: "A future where everyone can find their perfect property effortlessly." },
  { icon: Sparkles, title: "Vision for the Future", text: "Integrity of brokers, speed of technology — for everyone." },
  { icon: Rocket, title: "Our Aspiration", text: "The leading Arab platform for smart real estate marketing in minutes." },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold text-secondary uppercase tracking-wider">About Us</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Who We Are</h1>
        <p className="mt-5 text-lg text-muted-foreground leading-relaxed">
          Brokers + programmers, powered by technology. We are a team of real estate experts and programmers
          specializing in transforming your property search into a fast and smart experience, using the latest
          artificial intelligence technologies.
        </p>
      </header>

      <div className="mt-14 grid gap-6 md:grid-cols-2">
        {blocks.map((b) => (
          <div key={b.title} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="h-11 w-11 rounded-xl bg-brand-gradient text-white flex items-center justify-center">
              <b.icon className="h-5 w-5" />
            </div>
            <h2 className="mt-4 text-xl font-semibold">{b.title}</h2>
            <p className="mt-2 text-muted-foreground leading-relaxed">{b.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
