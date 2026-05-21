import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import {
  ClipboardList,
  Compass,
  PencilRuler,
  Bot,
  FileText,
  Send,
} from "lucide-react";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Free Consultation — BuildYourHome" },
      {
        name: "description",
        content:
          "Free consultation for your dream home design — 5 stages from requirements to final documentation.",
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

const STAGES = [
  { id: 1, icon: ClipboardList, label: "Requirements" },
  { id: 2, icon: Compass, label: "Analysis" },
  { id: 3, icon: PencilRuler, label: "Design" },
  { id: 4, icon: Bot, label: "AI Assistant" },
  { id: 5, icon: FileText, label: "Documentation" },
];

function ConsultationPage() {
  const { user } = useAuth();
  const [active, setActive] = useState(1);
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

  const [chat, setChat] = useState<{ role: "assistant" | "user"; text: string }[]>([
    {
      role: "assistant",
      text: "Hello! I'm your virtual assistant. How can I help you with your home design today?",
    },
  ]);
  const [chatInput, setChatInput] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const stages = ["stage1", "stage2", "stage3", "stage4", "stage5"];
      for (let i = stages.length - 1; i >= 0; i--) {
        const el = document.getElementById(stages[i]);
        if (el && el.getBoundingClientRect().top < 200) {
          setActive(i + 1);
          break;
        }
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleNeed = (v: string) => {
    setForm((f) => ({
      ...f,
      needs: f.needs.includes(v) ? f.needs.filter((n) => n !== v) : [...f.needs, v],
    }));
  };

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

  const sendChat = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput.trim();
    setChat((c) => [...c, { role: "user", text: userMsg }]);
    setChatInput("");
    setTimeout(() => {
      setChat((c) => [
        ...c,
        {
          role: "assistant",
          text: "Great input! Our team will incorporate this into your design recommendations.",
        },
      ]);
    }, 600);
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
            Let us transform your vision into reality through a comprehensive
            consultation process that starts with understanding your needs and
            ends with a complete design.
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

      {/* STAGES */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <h2 className="text-center text-3xl font-bold mb-8">Consultation Stages</h2>

        {/* Stage 1 */}
        <div ref={formTopRef} id="stage1" className="bg-card rounded-2xl shadow p-7 mb-6">
          <StageHeader icon={ClipboardList} title="Stage 1: Understanding Your Requirements" />
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

        {/* Stage 2 */}
        <div id="stage2" className="bg-card rounded-2xl shadow p-7 mb-6">
          <StageHeader icon={Compass} title="Stage 2: Land Analysis & Foundation" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <InfoCard title="Soil Analysis" items={["Soil Type Assessment", "Moisture Level Check", "Bearing Capacity"]} />
            <InfoCard title="Environmental Factors" items={["Sun Direction", "Wind Patterns", "Local Building Codes"]} />
            <InfoCard title="Foundation Planning" items={["Excavation Plan", "Foundation Type", "Waterproofing Strategy"]} />
          </div>
        </div>

        {/* Stage 3 */}
        <div id="stage3" className="bg-card rounded-2xl shadow p-7 mb-6">
          <StageHeader icon={PencilRuler} title="Stage 3: Design & Planning" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {["Architectural Design", "Structural Design", "MEP Design"].map((t) => (
              <div key={t} className="bg-muted/40 rounded-xl p-5">
                <h3 className="font-semibold border-b pb-2 mb-3">{t}</h3>
                <div className="h-44 rounded-lg bg-muted flex items-center justify-center text-muted-foreground text-sm mb-3">
                  {t} Preview
                </div>
                <button className="w-full rounded-md bg-[#4caf50] text-white py-2 text-sm font-medium hover:bg-[#3d8b40] transition">
                  View Design
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Stage 4 */}
        <div id="stage4" className="bg-card rounded-2xl shadow p-7 mb-6">
          <StageHeader icon={Bot} title="Stage 4: AI Design Assistant" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 bg-muted/40 rounded-xl p-4 flex flex-col h-[400px]">
              <div className="flex-1 overflow-y-auto space-y-2 mb-3 p-2">
                {chat.map((m, i) => (
                  <div
                    key={i}
                    className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                      m.role === "assistant"
                        ? "bg-card border self-start"
                        : "bg-[#2196f3] text-white self-end ml-auto"
                    }`}
                  >
                    {m.text}
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendChat()}
                  placeholder="Describe your dream home..."
                  className="flex-1 px-3 py-2.5 rounded-lg border bg-background"
                />
                <button
                  onClick={sendChat}
                  className="px-5 rounded-lg bg-[#2196f3] text-white hover:bg-[#0d8bf2] transition inline-flex items-center gap-2"
                >
                  <Send className="h-4 w-4" /> Send
                </button>
              </div>
            </div>
            <InfoCard
              title="AI Features"
              items={[
                "Smart Space Planning",
                "3D Visualization",
                "Material Suggestions",
                "Cost Estimation",
                "Style Recommendations",
              ]}
            />
          </div>
        </div>

        {/* Stage 5 */}
        <div id="stage5" className="bg-card rounded-2xl shadow p-7 mb-6">
          <StageHeader icon={FileText} title="Stage 5: Final Documentation" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Technical Drawings", items: ["Architectural Plans", "Structural Details", "MEP Layouts"] },
              { title: "Material Schedule", items: ["Construction Materials", "Finishing Materials", "Equipment List"] },
              { title: "Cost Breakdown", items: ["Construction Costs", "Material Costs", "Labor Costs"] },
            ].map((d) => (
              <div key={d.title} className="bg-muted/40 rounded-xl p-5">
                <h3 className="font-semibold border-b pb-2 mb-3">{d.title}</h3>
                <ul className="list-disc pl-5 text-sm mb-4 space-y-1">
                  {d.items.map((i) => (
                    <li key={i}>{i}</li>
                  ))}
                </ul>
                <button className="w-full rounded-md bg-[#4caf50] text-white py-2 text-sm font-medium hover:bg-[#3d8b40] transition">
                  Download PDF
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-center gap-6 md:gap-10 my-10 flex-wrap">
          {STAGES.map((s) => {
            const Icon = s.icon;
            const isActive = active === s.id;
            return (
              <a
                key={s.id}
                href={`#stage${s.id}`}
                className={`flex flex-col items-center gap-2 transition-colors ${
                  isActive ? "text-[#2196f3]" : "text-muted-foreground"
                }`}
              >
                <Icon className="h-6 w-6" />
                <span className="text-sm">{s.label}</span>
              </a>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function StageHeader({ icon: Icon, title }: { icon: typeof ClipboardList; title: string }) {
  return (
    <div className="flex items-center gap-4 border-b pb-4 mb-6">
      <Icon className="h-7 w-7 text-[#2196f3]" />
      <h2 className="text-xl md:text-2xl font-semibold">{title}</h2>
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

function InfoCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="bg-muted/40 rounded-xl p-5">
      <h3 className="font-semibold border-b pb-2 mb-3">{title}</h3>
      <ul className="list-disc pl-5 text-sm space-y-1">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
}
