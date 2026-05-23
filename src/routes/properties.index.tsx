import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { PropertyCard } from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Handshake, ShieldCheck, Phone } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"];
type SearchState = { type?: string; q?: string; beds?: string; sort?: string };

export const Route = createFileRoute("/properties/")({
  validateSearch: (s: Record<string, unknown>): SearchState => ({
    type: (s.type as string) || "all",
    q: (s.q as string) || "",
    beds: (s.beds as string) || "any",
    sort: (s.sort as string) || "featured",
  }),
  head: () => ({
    meta: [
      { title: "Property Listings — BuildYourHome" },
      {
        name: "description",
        content:
          "Active real-estate listings for sale and rent — price, location, rooms and condition, with a direct line to the owner or agent.",
      },
    ],
  }),
  component: ListingsPage,
});

const TYPES = [
  { value: "all", label: "All types" },
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Apartment" },
  { value: "duplex", label: "Duplex" },
  { value: "country_house", label: "Country House" },
  { value: "studio", label: "Studio" },
  { value: "smart_home", label: "Smart Home" },
];

const BEDS = [
  { value: "any", label: "Any beds" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const SORTS = [
  { value: "featured", label: "Featured first" },
  { value: "price_asc", label: "Price: low to high" },
  { value: "price_desc", label: "Price: high to low" },
  { value: "newest", label: "Newest" },
];

function ListingsPage() {
  const { type, q, beds, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [items, setItems] = useState<Property[]>([]);
  const [favIds, setFavIds] = useState<Set<string>>(new Set());
  const { user } = useAuth();

  const setSearch = (patch: Partial<SearchState>) =>
    navigate({ search: (prev: SearchState) => ({ ...prev, ...patch }) });

  useEffect(() => {
    supabase
      .from("properties")
      .select("*")
      .order("featured", { ascending: false })
      .order("created_at", { ascending: false })
      .then(({ data }) => setItems(data ?? []));
  }, []);

  useEffect(() => {
    if (!user) return setFavIds(new Set());
    supabase
      .from("favorites")
      .select("property_id")
      .eq("user_id", user.id)
      .then(({ data }) => setFavIds(new Set(data?.map((f) => f.property_id) ?? [])));
  }, [user]);

  const filtered = useMemo(() => {
    const qLower = (q ?? "").toLowerCase().trim();
    const minBeds = beds && beds !== "any" ? Number(beds) : 0;
    const list = items.filter((p) => {
      if (type && type !== "all" && p.type !== type) return false;
      if (minBeds && (p.bedrooms ?? 0) < minBeds) return false;
      if (qLower && !`${p.title} ${p.location ?? ""}`.toLowerCase().includes(qLower)) return false;
      return true;
    });
    const sorted = [...list];
    if (sort === "price_asc") sorted.sort((a, b) => Number(a.price) - Number(b.price));
    else if (sort === "price_desc") sorted.sort((a, b) => Number(b.price) - Number(a.price));
    else if (sort === "newest")
      sorted.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    return sorted;
  }, [items, type, q, beds, sort]);

  const available = items.filter((p) => p.status === "available").length;

  return (
    <div className="bg-background">
      {/* Intro / objective */}
      <section className="border-b bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <span className="inline-flex items-center gap-2 rounded-full bg-primary/10 text-primary px-3 py-1 text-xs font-semibold mb-4">
            <Handshake className="h-3.5 w-3.5" /> Live Market — Sale &amp; Rent
          </span>
          <h1 className="text-3xl md:text-4xl font-bold mb-3">Property Listings</h1>
          <p className="text-muted-foreground max-w-3xl text-base md:text-lg">
            The active real-estate market for commercial transactions. Each
            listing shows the asking price, exact location, room count and the
            property's real condition — your primary destination if you're
            actively looking to buy or rent and want a genuine line to the
            owner or agent.
          </p>

          <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-3xl">
            <Stat label="Total listings" value={items.length} />
            <Stat label="Available now" value={available} />
            <Stat label="Matching filters" value={filtered.length} />
            <Stat label="Verified owners" value="100%" />
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Filter bar */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 mb-8">
          <div className="relative md:col-span-5">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title or location..."
              value={q}
              onChange={(e) => setSearch({ q: e.target.value })}
              className="pl-9"
            />
          </div>
          <div className="md:col-span-3">
            <Select value={type} onValueChange={(v) => setSearch({ type: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={beds} onValueChange={(v) => setSearch({ beds: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {BEDS.map((b) => <SelectItem key={b.value} value={b.value}>{b.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2">
            <Select value={sort} onValueChange={(v) => setSearch({ sort: v })}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                {SORTS.map((s) => <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>)}
              </SelectContent>
            </Select>
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="rounded-2xl border-2 border-dashed border-border p-16 text-center">
            <p className="text-muted-foreground mb-4">No properties match your filters.</p>
            <Button
              variant="outline"
              onClick={() => setSearch({ type: "all", q: "", beds: "any", sort: "featured" })}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filtered.map((p) => (
              <PropertyCard
                key={p.id}
                property={p}
                isFavorite={favIds.has(p.id)}
                onFavoriteChange={(v) =>
                  setFavIds((prev) => {
                    const n = new Set(prev);
                    v ? n.add(p.id) : n.delete(p.id);
                    return n;
                  })
                }
              />
            ))}
          </div>
        )}

        {/* Connect strip */}
        <section className="mt-16 rounded-2xl bg-primary text-primary-foreground p-8 md:p-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold opacity-90 mb-2">
              <ShieldCheck className="h-4 w-4" /> Direct &amp; verified
            </div>
            <h2 className="text-2xl font-bold mb-2">
              Found something? Talk to the owner or agent directly.
            </h2>
            <p className="opacity-90">
              Every listing is published with a real point of contact. No
              middlemen, no recycled ads — just genuine opportunities.
            </p>
          </div>
          <div className="flex gap-3">
            <Button asChild variant="accent" size="lg">
              <Link to="/consultation">
                <Phone className="h-4 w-4" /> Request a callback
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number | string }) {
  return (
    <div className="rounded-xl border bg-card p-3">
      <div className="text-2xl font-bold text-primary">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}
