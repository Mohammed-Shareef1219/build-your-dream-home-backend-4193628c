import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  ArrowRight,
  HardHat,
  Sparkles,
  Shield,
  Zap,
  Building2,
  Home as HomeIcon,
  Warehouse,
  MapPin,
  Wallet,
  Hammer,
  Brain,
  Users,
  Clock,
  PiggyBank,
  Smile,
  UserPlus,
  LayoutGrid,
  Settings2,
  FileCheck2,
  Target,
  Eye,
  Rocket,
} from "lucide-react";
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
      { title: "BuildYourHome — Smart Real Estate Marketing" },
      {
        name: "description",
        content:
          "Find your dream property smartly. Villas, apartments, and commercial spaces from 80m² to 300m² — AI-powered search, free consultation, and transparent pricing.",
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
              <Sparkles className="h-4 w-4 text-accent" /> Smart real estate marketing
            </span>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance leading-tight">
              Find Your Dream Property Smartly.{" "}
              <span className="font-display text-accent">Know the market value in a minute.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/80 mb-8 max-w-2xl">
              From 80m² to 300m² — villa, apartment, or commercial space. Make it yours in a few simple steps.
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
            { icon: Sparkles, title: "Curated Listings", desc: "Hand-picked properties across every style and budget." },
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

      {/* Who We Are */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="inline-flex items-center gap-2 text-secondary font-semibold mb-3">
              <Zap className="h-4 w-4" /> Who We Are
            </span>
            <h2 className="text-3xl md:text-4xl font-bold mb-5">
              Brokers + programmers, powered by <span className="text-secondary">Technology</span>.
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed">
              We are a team of real estate experts and programmers specializing in transforming your
              property search into a fast and smart experience, using the latest <em>artificial intelligence technologies</em>.
            </p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { icon: Target, title: "Our Goal", desc: "Make buying, selling, or renting your property easier, faster, and clearer than ever before." },
              { icon: Eye, title: "Our Vision", desc: "A future where everyone can find their perfect property effortlessly." },
              { icon: Rocket, title: "Vision for the Future", desc: "Integrity of brokers, speed of technology — for everyone." },
              { icon: Sparkles, title: "Our Aspiration", desc: "The leading Arab platform for smart real estate marketing in minutes." },
            ].map((c) => (
              <div key={c.title} className="rounded-2xl bg-card p-6 shadow-soft hover:shadow-elegant transition-all">
                <c.icon className="h-7 w-7 text-secondary mb-3" />
                <h3 className="font-semibold mb-1.5">{c.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Property Types */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Property Types</h2>
            <p className="text-muted-foreground text-lg">Choose from a variety of verified properties and styles.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Building2, title: "Villas", desc: "Luxurious and modern villas with spacious areas in prime locations." },
              { icon: HomeIcon, title: "Apartments", desc: "Practical and beautiful apartments of every size for families and individuals." },
              { icon: Warehouse, title: "Commercial Properties", desc: "Innovative spaces for shops, offices, and businesses." },
            ].map((t) => (
              <Link
                key={t.title}
                to="/property-types"
                className="group rounded-2xl bg-card p-8 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1"
              >
                <div className="h-14 w-14 rounded-2xl bg-brand-gradient flex items-center justify-center mb-5 shadow-glow group-hover:scale-110 transition-transform">
                  <t.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="font-semibold text-xl mb-2">{t.title}</h3>
                <p className="text-muted-foreground">{t.desc}</p>
                <span className="inline-flex items-center gap-1 mt-4 text-secondary font-medium text-sm">
                  Explore <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Property Gallery teaser */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Property Gallery</h2>
            <p className="text-muted-foreground mt-2">Get inspired by high-quality virtual tours of our properties.</p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/gallery">Open gallery <ArrowRight /></Link>
          </Button>
        </div>
      </section>

      {/* Real Estate Tips */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Real Estate Tips</h2>
            <p className="text-muted-foreground text-lg">Learn from our experts the best practices in buying and investing in real estate.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: MapPin, title: "Choosing Property Location", desc: "The right location maximizes investment value. Study the neighborhood and future growth carefully." },
              { icon: Wallet, title: "Market Valuation", desc: "Set a realistic budget and check market prices to get the best deal without overpaying." },
              { icon: Hammer, title: "Legal Verification", desc: "Ensure all property documents and ownership titles are clear and legally sound." },
            ].map((t) => (
              <div key={t.title} className="rounded-2xl bg-card p-8 shadow-soft hover:shadow-elegant transition-all">
                <div className="h-12 w-12 rounded-xl bg-accent/15 text-accent flex items-center justify-center mb-4">
                  <t.icon className="h-6 w-6" />
                </div>
                <h3 className="font-semibold text-lg mb-2">{t.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured properties */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold">Featured Properties</h2>
            <p className="text-muted-foreground mt-2">Hand-picked homes ready to view.</p>
          </div>
          <Button variant="outline" asChild className="hidden sm:flex">
            <Link to="/properties">View all <ArrowRight /></Link>
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

      {/* Start Searching — steps */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Start Searching</h2>
            <p className="text-muted-foreground text-lg">Follow these simple steps to find your dream property.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { n: 1, icon: UserPlus, title: "Create Account", desc: "Create your personal account on our platform." },
              { n: 2, icon: LayoutGrid, title: "Browse Listings", desc: "Explore the property gallery and use smart filters." },
              { n: 3, icon: Settings2, title: "Schedule a Tour", desc: "Book a physical or virtual tour with our experts." },
              { n: 4, icon: FileCheck2, title: "Close the Deal", desc: "Get full legal support to complete your purchase safely." },
            ].map((s) => (
              <div key={s.n} className="relative rounded-2xl bg-card p-7 shadow-soft hover:shadow-elegant transition-all">
                <div className="absolute -top-4 left-7 h-9 w-9 rounded-full bg-brand-gradient text-white font-bold flex items-center justify-center shadow-glow">
                  {s.n}
                </div>
                <s.icon className="h-7 w-7 text-secondary mt-4 mb-3" />
                <h3 className="font-semibold mb-1.5">{s.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client Consultation */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-3">Client Consultation</h2>
          <p className="text-muted-foreground text-lg">
            Our team combines artificial intelligence with real human support to guide you through every step
            of your real estate journey.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Users, title: "Personalized Support", desc: "Real brokers ready to help you at every step — completely free of charge." },
            { icon: Brain, title: "Smart Valuation", desc: "Answer simple questions and receive property recommendations that speak to your style and budget." },
            { icon: Shield, title: "Price Transparency", desc: "No hidden fees. Real-time market prices for all properties." },
          ].map((c) => (
            <div key={c.title} className="rounded-2xl bg-card p-8 shadow-soft hover:shadow-elegant transition-all">
              <div className="h-12 w-12 rounded-xl bg-brand-gradient flex items-center justify-center mb-4 shadow-glow">
                <c.icon className="h-6 w-6 text-white" />
              </div>
              <h3 className="font-semibold text-lg mb-2">{c.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{c.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-muted/30 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-3">Why Choose Us?</h2>
            <p className="text-muted-foreground text-lg">
              Because we're truly different. We combine Technology with human expertise for your perfect real estate experience.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {[
              { icon: Brain, title: "Technology-Powered", desc: "Latest artificial intelligence for accurate property matching." },
              { icon: Users, title: "Human Support", desc: "Real certified experts to guide you personally." },
              { icon: Clock, title: "Save Time", desc: "Find your perfect property in minutes, not weeks." },
              { icon: PiggyBank, title: "Save Money", desc: "Best market deals with zero hidden commissions." },
              { icon: Smile, title: "Unique Experience", desc: "Simple interface anyone can use." },
              { icon: Sparkles, title: "Verified Listings", desc: "Properties of all sizes with full price transparency and free consultation." },
            ].map((f) => (
              <div key={f.title} className="rounded-2xl bg-card p-6 shadow-soft hover:shadow-elegant transition-all hover:-translate-y-1">
                <f.icon className="h-7 w-7 text-secondary mb-3" />
                <h3 className="font-semibold mb-1.5">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          <blockquote className="max-w-3xl mx-auto text-center text-lg md:text-xl italic text-foreground/80 border-l-4 border-secondary pl-6 py-2">
            "You won't find all of this anywhere else, because we work to achieve one goal: for you to invest
            or buy your dream property with confidence, without wasting time or money."
          </blockquote>
        </div>
      </section>

      {/* Free Consultation CTA */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
        <div className="rounded-3xl bg-brand-gradient p-12 md:p-16 text-center shadow-elegant">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Free Consultation</h2>
          <p className="text-white/85 text-lg mb-8 max-w-2xl mx-auto">
            Get a free consultation from our experts to help you find your dream property.
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
