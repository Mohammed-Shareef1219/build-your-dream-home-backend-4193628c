import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ArrowRight, HardHat, Sparkles, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PropertyCard } from "@/components/PropertyCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import heroImg from "@/assets/hero-villa.jpg";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BuildYourHome — Design Your Dream Home" },
      {
        name: "description",
        content:
          "From 80m² to 300m² — villas, apartments, and smart homes. Browse listings and book a free consultation.",
      },
    ],
  }),
  component: IndexPage,
});

function IndexPage() {
  const [featured, setFeatured] = useState<Property[]>([]);
  const [favIds, setFavIds] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  useEffect(() => {
    supabase
      .from("properties")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .limit(6)
      .then(({ data }) => setFeatured(data ?? []));
  }, []);

  useEffect(() => {
    if (!user) return setFavIds(new Set());
    supabase
      .from("favorites")
      .select("property_id")
      .eq("user_id", user.id)
      .then(({ data }) => setFavIds(new Set(data?.map((f) => f.property_id) ?? [])));
  }, [user]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-hero-gradient text-white">
        <div className="absolute inset-0 opacity-30">
          <img src={heroImg} alt="" className="h-full w-full object-cover" width={1920} height={1280} />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-36">
          <div className="max-w-3xl">
            <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-6">
              <Sparkles className="h-4 w-4 text-accent" /> AI-powered home design
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              Design Your Home Smartly.{" "}
              <span className="font-display text-accent">Know the cost in a minute.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              From 80m² to 300m² — villa, apartment, or home of your dreams. Make it a reality in a few simple steps.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button variant="hero" size="xl" asChild>
                <Link to="/properties">
                  Browse Properties <ArrowRight className="ml-1" />
                </Link>
              </Button>
              <Button variant="outlineHero" size="xl" asChild>
                <Link to="/consultation">
                  <HardHat /> Free Consultation
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Value props */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            { icon: Sparkles, title: "Curated Designs", desc: "Hand-picked properties across every style and budget." },
            { icon: Shield, title: "Trusted Broker", desc: "Verified listings with transparent pricing." },
            { icon: Zap, title: "Fast Consultation", desc: "Free expert advice within 24 hours." },
          ].map((f) => (
            <div key={f.title} className="rounded-2xl bg-card p-8 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1">
              <div className="h-12 w-12 rounded-xl bg-brand-gradient flex items-center justify-center mb-4 shadow-glow">
                <f.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{f.title}</h3>
              <p className="text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured properties */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Properties</h2>
            <p className="text-muted-foreground mt-2">Hand-picked homes ready to view.</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link to="/properties">
              View all <ArrowRight />
            </Link>
          </Button>
        </div>

        {featured.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border p-12 text-center">
            <p className="text-muted-foreground mb-4">No properties listed yet.</p>
            <Button variant="brand" asChild>
              <Link to="/admin">Add your first property</Link>
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                isFavorite={favIds.has(p.id)}
                onFavoriteChange={(v) => {
                  setFavIds((prev) => {
                    const n = new Set(prev);
                    v ? n.add(p.id) : n.delete(p.id);
                    return n;
                  });
                }}
              />
            ))}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="rounded-3xl bg-brand-gradient p-12 md:p-16 text-center shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Ready to build your dream home?
          </h2>
          <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
            Tell us about your project and our team will reach out with a free, no-obligation consultation.
          </p>
          <Button variant="accent" size="xl" asChild>
            <Link to="/consultation">
              Book Free Consultation <ArrowRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}
