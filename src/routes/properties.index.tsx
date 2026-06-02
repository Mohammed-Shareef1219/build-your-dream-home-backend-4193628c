import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import {
  Search,
  Eye,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  Phone,
  Heart,
  Headphones,
  Sparkles,
  Home,
  ChefHat,
  Sofa,
  ShowerHead,
  Trees,
  TrendingUp,
  Glasses,
  Building2,
  BadgePercent,
  CalendarClock,
  Compass,
  PlayCircle,
  ArrowRight,
} from "lucide-react";
import { toast } from "sonner";
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
      { title: "Properties — IBN BEITAK 2026" },
      {
        name: "description",
        content:
          "Live property listings with smart-home unit specs, mood boards, owner contact and engagement counters.",
      },
    ],
  }),
  component: ListingsPage,
});

const TYPES = [
  { value: "all", label: "All Types" },
  { value: "villa", label: "Villa" },
  { value: "apartment", label: "Apartment" },
  { value: "duplex", label: "Duplex" },
  { value: "country_house", label: "Country House" },
  { value: "studio", label: "Studio" },
  { value: "smart_home", label: "Smart Home" },
];

const BEDS = [
  { value: "any", label: "Any Beds" },
  { value: "1", label: "1+" },
  { value: "2", label: "2+" },
  { value: "3", label: "3+" },
  { value: "4", label: "4+" },
];

const SORTS = [
  { value: "featured", label: "Featured first" },
  { value: "price_asc", label: "Price ↑" },
  { value: "price_desc", label: "Price ↓" },
  { value: "newest", label: "Newest" },
];

const TABS = [
  { id: "properties", label: "PROPERTIES" },
  { id: "invest", label: "INVEST" },
  { id: "vr", label: "VR TOURS" },
];

const MOOD_ICONS = [
  { Icon: ChefHat, label: "Kitchen" },
  { Icon: Sofa, label: "Living" },
  { Icon: ShowerHead, label: "Bath" },
  { Icon: BedDouble, label: "Beds" },
  { Icon: Trees, label: "Garden" },
];

function ListingsPage() {
  const { type, q, beds, sort } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [items, setItems] = useState<Property[]>([]);
  const [favIds, setFavIds] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState("properties");
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

  const toggleFav = async (e: React.MouseEvent, propertyId: string) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return toast.error("Please sign in to save favorites");
    const isFav = favIds.has(propertyId);
    if (isFav) {
      const { error } = await supabase.from("favorites").delete()
        .eq("user_id", user.id).eq("property_id", propertyId);
      if (error) return toast.error(error.message);
      setFavIds((prev) => { const n = new Set(prev); n.delete(propertyId); return n; });
    } else {
      const { error } = await supabase.from("favorites")
        .insert({ user_id: user.id, property_id: propertyId });
      if (error) return toast.error(error.message);
      setFavIds((prev) => new Set(prev).add(propertyId));
    }
  };

  return (
    <div
      className="min-h-screen text-slate-100"
      style={{
        background:
          "radial-gradient(1200px 600px at 20% 0%, rgba(14,165,233,0.18), transparent 60%), radial-gradient(900px 500px at 90% 10%, rgba(99,102,241,0.15), transparent 60%), linear-gradient(180deg,#060b1a 0%,#0a1230 50%,#060b1a 100%)",
      }}
    >
      {/* TOP BAR */}
      <header className="sticky top-0 z-30 border-b border-white/10 backdrop-blur-xl bg-[#060b1a]/70">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="text-lg font-bold tracking-wide">
            IBN BEITAK <span className="text-cyan-400">2026</span>
          </Link>
          <nav className="hidden md:flex items-center gap-10 text-[13px] tracking-[0.18em]">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`relative py-5 transition ${
                  activeTab === t.id ? "text-white" : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {t.label}
                {activeTab === t.id && (
                  <span className="absolute left-0 right-0 -bottom-px h-0.5 bg-cyan-400 rounded-full" />
                )}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <span className="hidden sm:block text-[13px] tracking-[0.18em] text-slate-300">
              DETAILS <span className="text-slate-500 mx-1">|</span>{" "}
              <span className="text-cyan-300">العقار</span>
            </span>
            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-cyan-400 to-indigo-500 ring-2 ring-white/20" />
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10">
        {/* Intro */}
        <section className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-2">Property Listings</h1>
          <p className="text-slate-300 max-w-3xl">
            The live real-estate market — every unit shows price, location,
            rooms and real condition with a direct line to the owner or agent.
          </p>
        </section>

        {/* FILTER GLASS */}
        <section className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl p-3 md:p-4 mb-8 shadow-[0_8px_40px_-12px_rgba(8,145,178,0.35)]">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
            <div className="relative md:col-span-5">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-cyan-300" />
              <input
                value={q}
                onChange={(e) => setSearch({ q: e.target.value })}
                placeholder="Search by title or location..."
                className="w-full h-11 pl-9 pr-3 rounded-xl bg-white/5 border border-white/10 text-sm placeholder:text-slate-400 focus:outline-none focus:border-cyan-400/60"
              />
            </div>
            <GlassSelect className="md:col-span-3" value={type} onChange={(v) => setSearch({ type: v })} options={TYPES} />
            <GlassSelect className="md:col-span-2" value={beds} onChange={(v) => setSearch({ beds: v })} options={BEDS} />
            <GlassSelect className="md:col-span-2" value={sort} onChange={(v) => setSearch({ sort: v })} options={SORTS} />
          </div>
          <div className="mt-3 flex items-center justify-between text-xs text-slate-400 px-1">
            <span>{filtered.length} matching listings</span>
            <button
              onClick={() => setSearch({ type: "all", q: "", beds: "any", sort: "featured" })}
              className="text-cyan-300 hover:text-cyan-200"
            >
              Reset filters
            </button>
          </div>
        </section>

        {/* GRID */}
        {filtered.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/15 bg-white/[0.02] p-16 text-center text-slate-400">
            No properties match your filters.
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p, i) => (
              <GlassPropertyCard
                key={p.id}
                property={p}
                index={i}
                isFavorite={favIds.has(p.id)}
                onToggleFav={(e) => toggleFav(e, p.id)}
              />
            ))}
          </div>
        )}

        {/* DEVELOPER STRIP */}
        <section className="mt-14 rounded-2xl border border-white/10 bg-gradient-to-br from-cyan-500/10 via-white/5 to-indigo-500/10 backdrop-blur-xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-2xl bg-cyan-500/20 border border-cyan-300/30 flex items-center justify-center">
              <Home className="h-7 w-7 text-cyan-300" />
            </div>
            <div>
              <div className="text-xs tracking-[0.2em] text-cyan-300">IBN BEITAK</div>
              <div className="text-xl font-bold">DEVELOPMENTS</div>
              <div className="text-sm text-slate-300">
                Verified developer · Direct owner contact on every listing
              </div>
            </div>
          </div>
          <a
            href="tel:+201000000000"
            className="inline-flex items-center gap-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-900 font-semibold px-6 h-12 shadow-[0_8px_30px_-8px_rgba(34,211,238,0.7)] transition"
          >
            <Phone className="h-4 w-4" /> CALL NOW
          </a>
        </section>
      </main>

      {/* AI ASSISTANT BUBBLE */}
      <div className="fixed bottom-5 right-5 z-40 flex items-center gap-3">
        <div className="hidden sm:flex items-center gap-2 rounded-full border border-white/15 bg-[#0a1230]/90 backdrop-blur px-4 py-2 text-xs text-slate-200 shadow-xl">
          <Headphones className="h-4 w-4 text-cyan-300" />
          <span className="font-semibold">AI ASSISTANT (ZEYAD):</span>
          <span className="text-slate-400">"Ask about financing!"</span>
        </div>
        <button className="h-12 w-12 rounded-full bg-cyan-500 hover:bg-cyan-400 text-slate-900 flex items-center justify-center shadow-[0_10px_30px_-6px_rgba(34,211,238,0.7)]">
          <Sparkles className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function GlassSelect({
  value,
  onChange,
  options,
  className,
}: {
  value: string;
  onChange: (v: string) => void;
  options: { value: string; label: string }[];
  className?: string;
}) {
  return (
    <div className={className}>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full h-11 px-3 rounded-xl bg-white/5 border border-white/10 text-sm text-slate-100 focus:outline-none focus:border-cyan-400/60 [&>option]:bg-[#0a1230] [&>option]:text-slate-100"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>
    </div>
  );
}

function GlassPropertyCard({
  property,
  index,
  isFavorite,
  onToggleFav,
}: {
  property: Property;
  index: number;
  isFavorite: boolean;
  onToggleFav: (e: React.MouseEvent) => void;
}) {
  const img =
    property.image_urls?.[0] ??
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&auto=format&fit=crop";

  const code = `EBK-${String(2024 + (index % 3)).padStart(4, "0")}`;
  const views = 1250 + index * 137;
  const arabicLabel =
    property.type === "villa" ? "فيلا العقار"
    : property.type === "apartment" ? "شقة العقار"
    : property.type === "duplex" ? "دوبلكس العقار"
    : property.type === "studio" ? "ستوديو العقار"
    : property.type === "country_house" ? "ريفي العقار"
    : "العقار";

  return (
    <Link
      to="/properties/$id"
      params={{ id: property.id }}
      className="group relative block rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-xl overflow-hidden shadow-[0_10px_40px_-15px_rgba(0,0,0,0.7)] hover:border-cyan-400/40 hover:shadow-[0_15px_60px_-15px_rgba(34,211,238,0.45)] hover:-translate-y-1 transition-all duration-300"
    >
      {/* Hero */}
      <div className="relative aspect-[16/11] overflow-hidden">
        <img
          src={img}
          alt={property.title}
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#060b1a]/95 via-[#060b1a]/30 to-transparent" />

        {/* Top-left: code + views */}
        <div className="absolute top-3 left-3 rounded-xl border border-amber-300/40 bg-[#060b1a]/70 backdrop-blur px-3 py-1.5 text-[11px]">
          <div className="text-amber-300 font-semibold">[كود العقار: {code}]</div>
          <div className="flex items-center gap-1 text-slate-200 mt-0.5">
            <Eye className="h-3 w-3" /> {views.toLocaleString()} مشاهدة
          </div>
        </div>

        {/* Top-right: Arabic label */}
        <div className="absolute top-3 right-3 rounded-xl border border-white/15 bg-white/10 backdrop-blur px-3 py-1.5 text-sm font-semibold">
          {arabicLabel}
        </div>

        {/* Favorite */}
        <button
          onClick={onToggleFav}
          aria-label="Toggle favorite"
          className="absolute top-16 right-3 h-9 w-9 rounded-full bg-[#060b1a]/70 backdrop-blur border border-white/15 flex items-center justify-center hover:scale-110 transition"
        >
          <Heart className={`h-4 w-4 ${isFavorite ? "fill-rose-400 text-rose-400" : "text-slate-200"}`} />
        </button>

        {/* Mood-board strip */}
        <div className="absolute left-3 right-3 bottom-3 rounded-2xl border border-white/15 bg-[#060b1a]/75 backdrop-blur px-3 py-2.5 flex items-center justify-between">
          {MOOD_ICONS.map(({ Icon, label }) => (
            <div key={label} className="flex flex-col items-center gap-1">
              <span className="h-9 w-9 rounded-full bg-cyan-500/20 border border-cyan-300/40 flex items-center justify-center">
                <Icon className="h-4 w-4 text-cyan-300" />
              </span>
              <span className="text-[9px] text-slate-300">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Body */}
      <div className="p-5">
        <h3 className="font-semibold text-lg leading-tight line-clamp-1 mb-1">
          {property.title}
        </h3>
        {property.location && (
          <p className="flex items-center gap-1 text-xs text-slate-400 mb-3">
            <MapPin className="h-3 w-3" /> {property.location}
          </p>
        )}
        <div className="flex items-center gap-4 text-xs text-slate-300 mb-4">
          {property.bedrooms != null && (
            <span className="flex items-center gap-1"><BedDouble className="h-3.5 w-3.5 text-cyan-300" /> {property.bedrooms}</span>
          )}
          {property.bathrooms != null && (
            <span className="flex items-center gap-1"><Bath className="h-3.5 w-3.5 text-cyan-300" /> {property.bathrooms}</span>
          )}
          {property.area_sqm != null && (
            <span className="flex items-center gap-1"><Maximize className="h-3.5 w-3.5 text-cyan-300" /> {property.area_sqm}m²</span>
          )}
        </div>
        <div className="flex items-end justify-between pt-3 border-t border-white/10">
          <div>
            <div className="text-[10px] uppercase tracking-wider text-slate-500">Starting from</div>
            <div className="text-xl font-bold text-cyan-300">
              {new Intl.NumberFormat("en-US").format(Number(property.price))}{" "}
              <span className="text-xs text-slate-400">{property.currency}</span>
            </div>
          </div>
          <span className="inline-flex items-center gap-1.5 rounded-lg bg-cyan-500/90 hover:bg-cyan-400 text-slate-900 text-xs font-semibold px-3 py-2 transition">
            <Phone className="h-3.5 w-3.5" /> Details
          </span>
        </div>
      </div>
    </Link>
  );
}
