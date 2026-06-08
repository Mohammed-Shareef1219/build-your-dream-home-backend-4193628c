import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import {
  User as UserIcon, Mail, Phone, Camera, Loader2, Clock, CheckCircle2, UserCheck,
  Calendar, Video, MapPin, Heart, Sparkles, Settings2,
} from "lucide-react";

export const Route = createFileRoute("/profile")({ component: ProfilePage });

const profileSchema = z.object({
  full_name: z.string().trim().min(2, "Min 2 chars").max(100),
  phone: z.string().trim().min(6, "Phone required").max(30),
  preferred_property_type: z.string().max(50).optional(),
  budget_min: z.number().min(0).optional().nullable(),
  budget_max: z.number().min(0).optional().nullable(),
});

type ProfileRow = {
  id: string;
  full_name: string | null;
  display_name: string | null;
  phone: string | null;
  avatar_url: string | null;
  preferred_property_type: string | null;
  budget_min: number | null;
  budget_max: number | null;
};

function ProfilePage() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const [form, setForm] = useState({
    full_name: "",
    phone: "",
    preferred_property_type: "",
    budget_min: "",
    budget_max: "",
  });

  useEffect(() => {
    if (!loading && !user) navigate({ to: "/auth" });
  }, [user, loading, navigate]);

  useEffect(() => {
    if (!user) return;
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => {
      const p = data as ProfileRow | null;
      setProfile(p);
      const meta = (user.user_metadata ?? {}) as Record<string, unknown>;
      setForm({
        full_name: (p?.full_name as string) || (p?.display_name as string) || (meta.full_name as string) || (meta.name as string) || "",
        phone: p?.phone ?? "",
        preferred_property_type: p?.preferred_property_type ?? "",
        budget_min: p?.budget_min != null ? String(p.budget_min) : "",
        budget_max: p?.budget_max != null ? String(p.budget_max) : "",
      });
    });
  }, [user]);

  const onSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const parsed = profileSchema.safeParse({
      full_name: form.full_name,
      phone: form.phone,
      preferred_property_type: form.preferred_property_type || undefined,
      budget_min: form.budget_min ? Number(form.budget_min) : null,
      budget_max: form.budget_max ? Number(form.budget_max) : null,
    });
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setSaving(true);
    const { error } = await (supabase.from("profiles") as any)
      .update({
        full_name: parsed.data.full_name,
        display_name: parsed.data.full_name,
        phone: parsed.data.phone,
        preferred_property_type: parsed.data.preferred_property_type ?? null,
        budget_min: parsed.data.budget_min ?? null,
        budget_max: parsed.data.budget_max ?? null,
      })
      .eq("id", user.id);
    setSaving(false);
    if (error) return toast.error(error.message);
    toast.success("Profile saved");
    setProfile((p) => p ? { ...p, ...parsed.data, display_name: parsed.data.full_name } as ProfileRow : p);
  };

  const onAvatar = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 4 * 1024 * 1024) return toast.error("Max 4MB");
    setUploading(true);
    const ext = file.name.split(".").pop() || "jpg";
    const path = `${user.id}/avatar-${Date.now()}.${ext}`;
    const { error: upErr } = await supabase.storage.from("avatars").upload(path, file, { upsert: true });
    if (upErr) { setUploading(false); return toast.error(upErr.message); }
    const { data: pub } = supabase.storage.from("avatars").getPublicUrl(path);
    const url = pub.publicUrl;
    await supabase.from("profiles").update({ avatar_url: url }).eq("id", user.id);
    setProfile((p) => p ? { ...p, avatar_url: url } : p);
    setUploading(false);
    toast.success("Photo updated");
  };

  if (loading || !user) return <div className="mx-auto max-w-7xl px-4 py-16">Loading…</div>;

  const initials = (form.full_name || user.email || "U")
    .split(/[\s@]+/).filter(Boolean).slice(0, 2).map((s) => s[0]?.toUpperCase()).join("");
  const googleAvatar = (user.user_metadata as any)?.avatar_url || (user.user_metadata as any)?.picture;
  const avatarSrc = profile?.avatar_url || googleAvatar;

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <header className="space-y-2">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">My Profile</h1>
        <p className="text-muted-foreground">Manage your account, tours, saved listings and preferences.</p>
      </header>

      {/* Profile Settings */}
      <Card className="overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Settings2 className="h-5 w-5" /> Profile Settings</CardTitle>
          <CardDescription>Information used to contact you about tours, alerts and consultations.</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={onSave} className="grid gap-8 md:grid-cols-[200px_1fr]">
            <div className="flex flex-col items-center gap-3">
              <Avatar className="h-32 w-32 ring-2 ring-border">
                {avatarSrc && <AvatarImage src={avatarSrc} alt={form.full_name} />}
                <AvatarFallback className="text-2xl bg-brand-gradient text-white">{initials || "U"}</AvatarFallback>
              </Avatar>
              <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={onAvatar} />
              <Button type="button" variant="outline" size="sm" onClick={() => fileRef.current?.click()} disabled={uploading}>
                {uploading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Camera className="h-4 w-4" />}
                Change Photo
              </Button>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <Label htmlFor="full_name"><UserIcon className="inline h-3.5 w-3.5 mr-1" /> Full Name</Label>
                <Input id="full_name" value={form.full_name} onChange={(e) => setForm({ ...form, full_name: e.target.value })} placeholder="Your full name" />
              </div>
              <div>
                <Label htmlFor="email"><Mail className="inline h-3.5 w-3.5 mr-1" /> Email <span className="text-xs text-muted-foreground">(locked)</span></Label>
                <Input id="email" value={user.email ?? ""} disabled />
              </div>
              <div>
                <Label htmlFor="phone"><Phone className="inline h-3.5 w-3.5 mr-1" /> Phone <span className="text-xs text-secondary">required</span></Label>
                <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+20 111 639 205" />
              </div>
              <div>
                <Label htmlFor="ptype">Preferred Property Type</Label>
                <select id="ptype" className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
                  value={form.preferred_property_type}
                  onChange={(e) => setForm({ ...form, preferred_property_type: e.target.value })}>
                  <option value="">Any</option>
                  <option value="villa">Villa</option>
                  <option value="apartment">Apartment</option>
                  <option value="duplex">Duplex</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label htmlFor="bmin">Budget Min</Label>
                  <Input id="bmin" type="number" min="0" value={form.budget_min} onChange={(e) => setForm({ ...form, budget_min: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="bmax">Budget Max</Label>
                  <Input id="bmax" type="number" min="0" value={form.budget_max} onChange={(e) => setForm({ ...form, budget_max: e.target.value })} />
                </div>
              </div>
              <div className="sm:col-span-2 flex justify-end">
                <Button type="submit" variant="brand" disabled={saving}>
                  {saving && <Loader2 className="h-4 w-4 animate-spin" />} Save Changes
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Client Dashboard */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ConsultationTracker userId={user.id} userEmail={user.email ?? ""} />
        <AIMatchingFeed
          budgetMin={profile?.budget_min ?? null}
          budgetMax={profile?.budget_max ?? null}
          type={profile?.preferred_property_type ?? null}
        />
        <ScheduledTours userId={user.id} />
        <SavedListings userId={user.id} />
      </div>
    </div>
  );
}

/* -------- Consultation Tracker -------- */
function ConsultationTracker({ userId, userEmail }: { userId: string; userEmail: string }) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("consultations").select("*").or(`user_id.eq.${userId},email.eq.${userEmail}`)
      .order("created_at", { ascending: false }).limit(5)
      .then(({ data }) => setItems(data ?? []));
  }, [userId, userEmail]);

  const statusBadge = (s: string) => {
    if (s === "assigned" || s === "expert_assigned")
      return <Badge className="bg-secondary text-secondary-foreground"><UserCheck className="h-3 w-3 mr-1" /> Expert Assigned</Badge>;
    if (s === "in_progress" || s === "processing")
      return <Badge className="bg-accent text-accent-foreground"><Settings2 className="h-3 w-3 mr-1" /> Processing</Badge>;
    return <Badge variant="secondary"><Clock className="h-3 w-3 mr-1" /> Pending</Badge>;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-secondary" /> Fast Consultation Tracker</CardTitle>
        <CardDescription>Expert advice guaranteed within 24 hours.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 && (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No requests yet. <Link to="/consultation" className="text-secondary font-medium">Book a free consultation →</Link>
          </div>
        )}
        {items.map((c) => {
          const created = new Date(c.created_at).getTime();
          const remainingMs = Math.max(0, created + 24 * 60 * 60 * 1000 - Date.now());
          const hh = Math.floor(remainingMs / 3_600_000);
          const mm = Math.floor((remainingMs % 3_600_000) / 60_000);
          return (
            <div key={c.id} className="rounded-lg border p-3 flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="font-medium truncate">{c.project_type || "General consultation"}</div>
                <div className="text-xs text-muted-foreground truncate">{c.message}</div>
              </div>
              <div className="flex flex-col items-end gap-1.5 shrink-0">
                {statusBadge(c.status)}
                <span className="text-xs font-mono text-muted-foreground">
                  {remainingMs > 0 ? `${String(hh).padStart(2,"0")}:${String(mm).padStart(2,"0")} left` : "Due"}
                </span>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

/* -------- AI Matching Feed -------- */
function AIMatchingFeed({ budgetMin, budgetMax, type }: { budgetMin: number | null; budgetMax: number | null; type: string | null }) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    let q = supabase.from("properties").select("*").eq("status", "available").limit(4);
    if (type) q = q.eq("type", type as any);
    if (budgetMin) q = q.gte("price", budgetMin);
    if (budgetMax) q = q.lte("price", budgetMax);
    q.then(({ data }) => setItems(data ?? []));
  }, [budgetMin, budgetMax, type]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Sparkles className="h-5 w-5 text-accent" /> AI Matching Feed</CardTitle>
        <CardDescription>Smart valuation based on your style & budget.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 && (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            Set your preferences above to see matched listings.
          </div>
        )}
        {items.map((p) => (
          <Link key={p.id} to="/properties/$id" params={{ id: p.id }} className="block rounded-lg border p-3 hover:bg-muted/50 transition-colors">
            <div className="flex items-center gap-3">
              {p.image_urls?.[0] && <img src={p.image_urls[0]} alt={p.title} className="h-14 w-14 rounded-md object-cover" />}
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{p.title}</div>
                <div className="text-xs text-muted-foreground flex items-center gap-1"><MapPin className="h-3 w-3" />{p.location}</div>
                <Badge variant="outline" className="mt-1 text-[10px] border-secondary text-secondary">
                  <CheckCircle2 className="h-3 w-3 mr-1" /> 100% Match for Your Style & Budget
                </Badge>
              </div>
              <div className="text-sm font-semibold shrink-0">{p.currency} {Number(p.price).toLocaleString()}</div>
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  );
}

/* -------- Scheduled Tours -------- */
function ScheduledTours({ userId }: { userId: string }) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    ((supabase as any).from("property_tours")).select("*").eq("user_id", userId)
      .order("scheduled_at", { ascending: true })
      .then(({ data }: any) => setItems(data ?? []));
  }, [userId]);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5 text-secondary" /> Scheduled Tours</CardTitle>
        <CardDescription>Upcoming virtual and in-person property visits.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {items.length === 0 && (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No tours scheduled. <Link to="/properties" className="text-secondary font-medium">Browse listings →</Link>
          </div>
        )}
        {items.map((t) => {
          const d = new Date(t.scheduled_at);
          return (
            <div key={t.id} className="rounded-lg border p-3 flex items-center gap-3">
              <div className="rounded-md bg-muted p-2">
                {t.tour_type === "virtual" ? <Video className="h-5 w-5 text-secondary" /> : <MapPin className="h-5 w-5 text-accent" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="font-medium truncate">{t.property_name}</div>
                <div className="text-xs text-muted-foreground">
                  {d.toLocaleDateString()} • {d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </div>
              </div>
              <Badge variant="outline">{t.tour_type === "virtual" ? "Virtual 360°" : "Physical"}</Badge>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}

/* -------- Saved Listings -------- */
function SavedListings({ userId }: { userId: string }) {
  const [items, setItems] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("favorites").select("property_id, properties(*)").eq("user_id", userId).limit(6)
      .then(({ data }) => setItems((data ?? []).map((f: any) => f.properties).filter(Boolean)));
  }, [userId]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="flex items-center gap-2"><Heart className="h-5 w-5 text-destructive" /> Saved Listings</CardTitle>
          <CardDescription>Your shortlisted verified properties.</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild><Link to="/favorites">View all</Link></Button>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <div className="rounded-lg border border-dashed p-6 text-center text-sm text-muted-foreground">
            No saved properties yet.
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((p) => (
              <Link key={p.id} to="/properties/$id" params={{ id: p.id }} className="group rounded-lg border overflow-hidden hover:shadow-soft transition">
                {p.image_urls?.[0] && <img src={p.image_urls[0]} alt={p.title} className="h-24 w-full object-cover group-hover:scale-105 transition" />}
                <div className="p-2">
                  <div className="text-sm font-medium truncate">{p.title}</div>
                  <div className="text-xs text-muted-foreground">{p.currency} {Number(p.price).toLocaleString()}</div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
