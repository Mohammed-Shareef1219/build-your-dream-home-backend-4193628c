import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { PropertyCard } from "@/components/PropertyCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Property = Database["public"]["Tables"]["properties"]["Row"];

export const Route = createFileRoute("/properties/")({
  validateSearch: (s: Record<string, unknown>) => ({
    type: (s.type as string) || "all",
    q: (s.q as string) || "",
  }),
  head: () => ({
    meta: [
      { title: "Listings — BuildYourHome" },
      { name: "description", content: "Browse all available properties." },
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

function ListingsPage() {
  const { type, q } = Route.useSearch();
  const navigate = Route.useNavigate();
  const [items, setItems] = useState<Property[]>([]);
  const [favIds, setFavIds] = useState<Set<string>>(new Set());
  const { user } = useAuth();

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
    supabase.from("favorites").select("property_id").eq("user_id", user.id)
      .then(({ data }) => setFavIds(new Set(data?.map((f) => f.property_id) ?? [])));
  }, [user]);

  const filtered = useMemo(() => {
    const qLower = q.toLowerCase().trim();
    return items.filter((p) => {
      if (type !== "all" && p.type !== type) return false;
      if (qLower && !`${p.title} ${p.location ?? ""}`.toLowerCase().includes(qLower)) return false;
      return true;
    });
  }, [items, type, q]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-2">All Properties</h1>
        <p className="text-muted-foreground">{filtered.length} {filtered.length === 1 ? "listing" : "listings"}</p>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or location..."
            value={q}
            onChange={(e) => navigate({ search: (prev) => ({ ...prev, q: e.target.value }) })}
            className="pl-9"
          />
        </div>
        <Select value={type} onValueChange={(v) => navigate({ search: (prev) => ({ ...prev, type: v }) })}>
          <SelectTrigger className="w-full sm:w-52">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {TYPES.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border-2 border-dashed border-border p-16 text-center">
          <p className="text-muted-foreground">No properties match your filters.</p>
        </div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => (
            <PropertyCard
              key={p.id}
              property={p}
              isFavorite={favIds.has(p.id)}
              onFavoriteChange={(v) => setFavIds((prev) => {
                const n = new Set(prev);
                v ? n.add(p.id) : n.delete(p.id);
                return n;
              })}
            />
          ))}
        </div>
      )}
    </div>
  );
}
