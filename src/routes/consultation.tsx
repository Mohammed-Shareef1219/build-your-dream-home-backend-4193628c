import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ClipboardList } from "lucide-react";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Free Consultation — BuildYourHome" },
      {
        name: "description",
        content:
          "Free consultation for your dream home design — share your requirements and our team will reach out.",
      },
    ],
  }),
  component: ConsultationPage,
});

type Requirements = {
  propertyType: string;
  landSize: string;
  landLocation: string;
  purpose: string;
  style: string;
  color1: string;
  color2: string;
  color3: string;
  familySize: string;
  needs: string[];
  minBudget: string;
  maxBudget: string;
};

function ConsultationPage() {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const formTopRef = useRef<HTMLDivElement>(null);
  const [form, setForm] = useState<Requirements>({
    propertyType: "",
    landSize: "",
    landLocation: "",
    purpose: "",
    style: "",
    color1: "#ffffff",
    color2: "#ffffff",
    color3: "#ffffff",
    familySize: "",
    needs: [],
    minBudget: "",
    maxBudget: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.propertyType || !form.landSize || !form.landLocation || !form.purpose || !form.style || !form.familySize || !form.minBudget || !form.maxBudget) {
      toast.error("Please fill in all required fields.");
      return;
    }
    setLoading(true);
    const message = [
      `Property Type: ${form.propertyType}`,
      `Land: ${form.landSize} m² (${form.landLocation})`,
      `Purpose: ${form.purpose}`,
      `Style: ${form.style}`,
      `Favorite Colors: ${form.color1}, ${form.color2}, ${form.color3}`,
      `Family Size: ${form.familySize}`,
      `Special Requirements: ${form.needs.join(", ") || "None"}`,
    ].join("\n");

    const meta = (user?.user_metadata ?? {}) as { full_name?: string; name?: string };
    const payload = {
      name: meta.full_name || meta.name || user?.email?.split("@")[0] || "Guest",
      email: user?.email || "guest@buildyourhome.local",
      phone: null,
      project_type: form.propertyType,
      budget: `${form.minBudget} - ${form.maxBudget}`,
      message,
    };

    const { error } = await supabase.from("consultations").insert(payload);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Consultation started! We'll reach out shortly.");
  };

  const toggleNeed = (v: string) => {
    setForm((f) => ({
      ...f,
      needs: f.needs.includes(v) ? f.needs.filter((n) => n !== v) : [...f.needs, v],
    }));
  };

  const scrollToForm = () => {
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-[#f4f8fc] dark:bg-[#1a1a1a] text-foreground">
      {/* HERO */}
      <section
        className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-16 text-white"
        style={{ background: "linear-gradient(90deg, #0a183d 70%, #2196f3 100%)" }}
      >
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            Free Consultation for Your Dream Home Design
          </h1>
          <p className="text-lg text-slate-200 mb-7">
            Share your requirements and our team will reach out to transform
            your vision into a tailored design proposal.
          </p>
          <button
            onClick={scrollToForm}
            className="rounded-lg bg-[#eab308] px-9 py-3.5 font-bold text-[#23242a] hover:bg-[#facc15] transition"
          >
            Start Consultation Now
          </button>
        </div>
        <img
          className="w-[340px] h-[220px] object-cover rounded-2xl shadow-2xl bg-white"
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80"
          alt="Your Dream Home"
        />
      </section>

      {/* REQUIREMENTS FORM */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div ref={formTopRef} className="bg-card rounded-2xl shadow p-7">
          <div className="flex items-center gap-4 border-b pb-4 mb-6">
            <ClipboardList className="h-7 w-7 text-[#2196f3]" />
            <h2 className="text-xl md:text-2xl font-semibold">
              Tell Us About Your Project
            </h2>
          </div>
          <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormGroup title="Property Type">
              <Select
                value={form.propertyType}
                onChange={(v) => setForm({ ...form, propertyType: v })}
                options={[
                  ["", "Select Property Type"],
                  ["single-floor", "Single Floor House"],
                  ["two-floor", "Two Floor House"],
                  ["villa", "Villa"],
                  ["apartment", "Apartment"],
                  ["duplex", "Duplex"],
                ]}
              />
            </FormGroup>

            <FormGroup title="Land Details">
              <NumberInput
                placeholder="Land Size (m²)"
                value={form.landSize}
                onChange={(v) => setForm({ ...form, landSize: v })}
              />
              <Select
                value={form.landLocation}
                onChange={(v) => setForm({ ...form, landLocation: v })}
                options={[
                  ["", "Land Location"],
                  ["corner", "Corner Plot"],
                  ["middle", "Middle Plot"],
                  ["end", "End Plot"],
                ]}
              />
            </FormGroup>

            <FormGroup title="Purpose">
              <Select
                value={form.purpose}
                onChange={(v) => setForm({ ...form, purpose: v })}
                options={[
                  ["", "Select Purpose"],
                  ["family", "Family Residence"],
                  ["investment", "Investment"],
                  ["vacation", "Vacation Home"],
                ]}
              />
            </FormGroup>

            <FormGroup title="Design Preferences">
              <Select
                value={form.style}
                onChange={(v) => setForm({ ...form, style: v })}
                options={[
                  ["", "Select Style"],
                  ["classic", "Classic"],
                  ["modern", "Modern"],
                  ["contemporary", "Contemporary"],
                  ["luxury", "Luxury"],
                  ["minimalist", "Minimalist"],
                ]}
              />
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">Favorite Colors</h4>
                <div className="flex gap-2">
                  {(["color1", "color2", "color3"] as const).map((k) => (
                    <input
                      key={k}
                      type="color"
                      value={form[k]}
                      onChange={(e) => setForm({ ...form, [k]: e.target.value })}
                      className="h-10 w-10 rounded-full border-2 border-white shadow cursor-pointer"
                    />
                  ))}
                </div>
              </div>
            </FormGroup>

            <FormGroup title="Family Details">
              <NumberInput
                placeholder="Number of Family Members"
                value={form.familySize}
                onChange={(v) => setForm({ ...form, familySize: v })}
              />
              <div className="mt-3">
                <h4 className="text-sm font-medium mb-2">Special Requirements</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  {[
                    ["homeOffice", "Home Office"],
                    ["gameRoom", "Game Room"],
                    ["pool", "Swimming Pool"],
                    ["elevator", "Elevator"],
                    ["garage", "Closed Parking"],
                  ].map(([val, label]) => (
                    <label key={val} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.needs.includes(val)}
                        onChange={() => toggleNeed(val)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </div>
            </FormGroup>

            <FormGroup title="Budget Range">
              <div className="grid grid-cols-2 gap-2">
                <NumberInput
                  placeholder="Minimum Budget"
                  value={form.minBudget}
                  onChange={(v) => setForm({ ...form, minBudget: v })}
                />
                <NumberInput
                  placeholder="Maximum Budget"
                  value={form.maxBudget}
                  onChange={(v) => setForm({ ...form, maxBudget: v })}
                />
              </div>
            </FormGroup>

            <button
              type="submit"
              disabled={loading}
              className="md:col-span-2 mt-2 rounded-lg bg-[#2196f3] px-7 py-3.5 font-bold text-white hover:bg-[#0d8bf2] transition disabled:opacity-60"
            >
              {loading ? "Submitting..." : "Start Consultation"}
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}

function FormGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-2">
      <h3 className="font-semibold">{title}</h3>
      {children}
    </div>
  );
}

function Select({
  value,
  onChange,
  options,
}: {
  value: string;
  onChange: (v: string) => void;
  options: [string, string][];
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-lg border bg-background px-3 py-3 text-sm"
    >
      {options.map(([v, l]) => (
        <option key={v} value={v}>
          {l}
        </option>
      ))}
    </select>
  );
}

function NumberInput({
  value,
  onChange,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <input
      type="number"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border bg-background px-3 py-3 text-sm"
    />
  );
}
