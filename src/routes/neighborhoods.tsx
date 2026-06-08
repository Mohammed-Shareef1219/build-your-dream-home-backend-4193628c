import { createFileRoute } from "@tanstack/react-router";
import { MapPin, Store, Car, Trees, Building2, Wrench } from "lucide-react";

export const Route = createFileRoute("/neighborhoods")({
  head: () => ({
    meta: [
      { title: "Neighborhood Directory — BuildYourHome" },
      { name: "description", content: "Explore Egypt's top neighborhoods: commercial spaces, garages, gardens, services, and infrastructure for every area." },
      { property: "og:title", content: "Neighborhood Directory — BuildYourHome" },
      { property: "og:description", content: "The right location increases the value of your investment." },
    ],
  }),
  component: NeighborhoodsPage,
});

const areas = [
  {
    name: "New Cairo",
    location: "East Cairo, near Ring Road & Suez Road",
    commercial: "Cairo Festival City, Point 90, Downtown Mall — premium retail & offices.",
    garages: "Underground parking in most compounds; surface lots at malls.",
    gardens: "Family Park, Al Andalus Park, large private compound gardens.",
    services: "International schools (AIS, CAC), hospitals (Dar Al Fouad), gyms, banks.",
    infrastructure: "Wide highways, fiber internet, reliable utilities, security gates.",
  },
  {
    name: "6 October City",
    location: "West Cairo, ~32 km from Tahrir",
    commercial: "Mall of Arabia, Mall of Egypt, Dandy Mega Mall — full retail mix.",
    garages: "Plentiful surface and basement parking; affordable rates.",
    gardens: "Hadayek October, central green spines in Dreamland and Beverly Hills.",
    services: "Universities (MSA, MUST, NU), hospitals, supermarkets, mosques & churches.",
    infrastructure: "26th of July Corridor access, metro line under construction, gas grid.",
  },
  {
    name: "Sheikh Zayed",
    location: "West Cairo, adjacent to 6 October",
    commercial: "Arkan Plaza, Galleria 40, Americana Plaza — upscale dining & shops.",
    garages: "Compound-based covered parking; valet at major plazas.",
    gardens: "Compound landscaping, Beverly Hills lakes, Allegria golf greens.",
    services: "Top international schools, Sheikh Zayed Hospital, premium clinics.",
    infrastructure: "New Cairo–Alex desert road, fiber, premium utilities.",
  },
  {
    name: "North Coast (Sahel)",
    location: "Mediterranean coast, Alexandria → Marsa Matrouh",
    commercial: "Marassi Marina, Hacienda White, Almaza Bay retail strips.",
    garages: "Open-air resort parking; villa private garages.",
    gardens: "Beachfront landscaping, lagoons, palm-lined promenades.",
    services: "Seasonal clinics, supermarkets, beach clubs, hotels.",
    infrastructure: "Fouka Road shortcut to Cairo (2h), new highways, gas stations.",
  },
  {
    name: "Maadi",
    location: "South Cairo, along the Nile",
    commercial: "Road 9, Maadi Grand Mall, CityStars Maadi — diverse retail.",
    garages: "Street parking and small underground garages in newer buildings.",
    gardens: "Tree-lined streets, Wadi Degla Protectorate, sporting club greens.",
    services: "CAC, embassies, Maadi Military Hospital, Cairo American College.",
    infrastructure: "Metro Line 1, Ring Road, expat-friendly utilities.",
  },
  {
    name: "Heliopolis & 5th Settlement",
    location: "East Cairo",
    commercial: "Heliopolis Korba, City Stars, Cairo Festival, Down Town Katameya.",
    garages: "Compound parking; underground at malls and offices.",
    gardens: "Merryland Park, Family Park, private compound gardens.",
    services: "Schools, hospitals (Cleopatra, Air Force), banks, embassies nearby.",
    infrastructure: "Monorail to New Capital, Ring Road, metro extensions.",
  },
];

function NeighborhoodsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center max-w-3xl mx-auto">
        <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Neighborhood Directory</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Choosing the Property Location</h1>
        <p className="mt-4 text-muted-foreground">The right location increases the value of your investment. Research the neighborhood carefully.</p>
      </header>

      <div className="mt-12 space-y-6">
        {areas.map((a) => (
          <article key={a.name} className="rounded-2xl border bg-card p-6 shadow-soft hover:shadow-elegant transition-shadow">
            <div className="flex items-start justify-between gap-4 flex-wrap">
              <div>
                <h2 className="text-2xl font-bold">{a.name}</h2>
                <div className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4 text-secondary" /> {a.location}
                </div>
              </div>
            </div>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 text-sm">
              <Spec icon={Store} label="Commercial Spaces" text={a.commercial} />
              <Spec icon={Car} label="Garages & Parking" text={a.garages} />
              <Spec icon={Trees} label="Gardens" text={a.gardens} />
              <Spec icon={Building2} label="Services" text={a.services} />
              <Spec icon={Wrench} label="Infrastructure" text={a.infrastructure} />
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function Spec({ icon: Icon, label, text }: { icon: typeof Store; label: string; text: string }) {
  return (
    <div className="flex gap-3">
      <Icon className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
      <div>
        <div className="font-semibold">{label}</div>
        <p className="text-muted-foreground leading-relaxed">{text}</p>
      </div>
    </div>
  );
}
