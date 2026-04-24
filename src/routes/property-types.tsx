import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/property-types")({
  head: () => ({
    meta: [
      { title: "Property Types — BuildYourHome" },
      { name: "description", content: "Explore villas, apartments, duplexes, country houses, studios and smart homes." },
    ],
  }),
  component: PropertyTypesPage,
});

const TYPES = [
  { slug: "villa", name: "Luxury Villas", desc: "Elegant homes with innovative designs and spacious areas.", price: "From 1,200,000 AED", img: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800" },
  { slug: "apartment", name: "Smart Apartments", desc: "Innovative solutions for small spaces with integrated technology.", price: "From 250,000 AED", img: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800" },
  { slug: "duplex", name: "Duplex Designs", desc: "Practical family spaces with perfect privacy over two levels.", price: "From 450,000 AED", img: "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800" },
  { slug: "country_house", name: "Country Houses", desc: "Connection with nature and modern living luxury.", price: "From 350,000 AED", img: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800" },
  { slug: "studio", name: "Studios", desc: "Compact smart living, perfect for singles and couples.", price: "From 180,000 AED", img: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800" },
  { slug: "smart_home", name: "Smart Homes", desc: "Fully automated homes with AI-driven comfort and efficiency.", price: "From 650,000 AED", img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800" },
];

function PropertyTypesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover Property Types</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Choose from a variety of smart housing solutions designed to meet your needs and lifestyle.
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {TYPES.map((t) => (
          <div key={t.slug} className="group rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1">
            <div className="aspect-[4/3] overflow-hidden bg-muted">
              <img src={t.img} alt={t.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
            </div>
            <div className="p-6">
              <h3 className="font-semibold text-xl mb-2">{t.name}</h3>
              <p className="text-muted-foreground mb-4">{t.desc}</p>
              <div className="flex items-center justify-between">
                <span className="text-secondary font-semibold">{t.price}</span>
                <Button variant="secondary" size="sm" asChild>
                  <Link to="/properties" search={{ type: t.slug }}>
                    Explore <ArrowRight />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
