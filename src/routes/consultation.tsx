import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { toast } from "sonner";
import { ClipboardList, Lock } from "lucide-react";
import { submitConsultation } from "@/lib/consultation.functions";
import { useServerFn } from "@tanstack/react-start";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Free Consultation — BuildYourHome" },
      {
        name: "description",
        content:
          "Free consultation for your dream home — share your requirements and our team reaches out.",
      },
    ],
  }),
  component: ConsultationPage,
});

type Requirements = {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  project_type: string;
  budget: string;
  timeline: string;
  description: string;
  notes: string;
};

function ConsultationPage() {
  const { user, loading: authLoading } = useAuth();
  const submit = useServerFn(submitConsultation);
  const [loading, setLoading] = useState(false);
  const formTopRef = useRef<HTMLDivElement>(null);

  const meta = (user?.user_metadata ?? {}) as { full_name?: string; name?: string };
  const [form, setForm] = useState<Requirements>({
    name: meta.full_name || meta.name || "",
    email: user?.email || "",
    phone: "",
    company: "",
    service: "",
    project_type: "",
    budget: "",
    timeline: "",
    description: "",
    notes: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      toast.error("Please sign in to submit a consultation.");
      return;
    }
    if (!form.name.trim() || !form.email.trim() || !form.service || !form.description.trim()) {
      toast.error("Please fill in your name, email, service, and project description.");
      return;
    }
    setLoading(true);
    try {
      await submit({
        data: {
          name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone || null,
          company: form.company || null,
          service: form.service || null,
          project_type: form.project_type || null,
          budget: form.budget || null,
          timeline: form.timeline || null,
          description: form.description || null,
          notes: form.notes || null,
          user_agent:
            typeof navigator !== "undefined" ? navigator.userAgent.slice(0, 500) : null,
        },
      });
      toast.success("Consultation submitted! We'll reach out shortly.");
      setForm((f) => ({
        ...f,
        phone: "",
        company: "",
        service: "",
        project_type: "",
        budget: "",
        timeline: "",
        description: "",
        notes: "",
      }));
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Something went wrong";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const scrollToForm = () =>
    formTopRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="bg-[#f4f8fc] dark:bg-[#1a1a1a] text-foreground">
      <section
        className="flex flex-col md:flex-row items-center justify-between gap-10 px-6 md:px-16 py-16 text-white"
        style={{ background: "linear-gradient(90deg, #0a183d 70%, #2196f3 100%)" }}
      >
        <div className="max-w-xl">
          <h1 className="text-3xl md:text-5xl font-bold leading-tight mb-5">
            Free Consultation for Your Dream Home
          </h1>
          <p className="text-lg text-slate-200 mb-7">
            Share your requirements and our team will reach out to transform
            your vision into a tailored proposal.
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

      <section className="max-w-6xl mx-auto px-6 py-12">
        <div ref={formTopRef} className="bg-card rounded-2xl shadow p-7">
          <div className="flex items-center gap-4 border-b pb-4 mb-6">
            <ClipboardList className="h-7 w-7 text-[#2196f3]" />
            <h2 className="text-xl md:text-2xl font-semibold">
              Tell Us About Your Project
            </h2>
          </div>

          {!authLoading && !user ? (
            <div className="rounded-xl border border-dashed border-muted-foreground/30 p-8 text-center">
              <Lock className="h-8 w-8 mx-auto text-[#2196f3] mb-3" />
              <h3 className="text-lg font-semibold mb-2">Sign in to request a consultation</h3>
              <p className="text-sm text-muted-foreground mb-5">
                We link every request to your account so you can track it in your dashboard.
              </p>
              <Link
                to="/auth"
                className="inline-block rounded-lg bg-[#2196f3] px-6 py-3 font-semibold text-white hover:bg-[#0d8bf2] transition"
              >
                Sign in / Create account
              </Link>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormGroup title="Your Name *">
                <TextInput
                  value={form.name}
                  onChange={(v) => setForm({ ...form, name: v })}
                  placeholder="Full name"
                />
              </FormGroup>
              <FormGroup title="Email *">
                <TextInput
                  type="email"
                  value={form.email}
                  onChange={(v) => setForm({ ...form, email: v })}
                  placeholder="you@example.com"
                />
              </FormGroup>
              <FormGroup title="Phone Number">
                <TextInput
                  value={form.phone}
                  onChange={(v) => setForm({ ...form, phone: v })}
                  placeholder="+20 ..."
                />
              </FormGroup>
              <FormGroup title="Company (optional)">
                <TextInput
                  value={form.company}
                  onChange={(v) => setForm({ ...form, company: v })}
                  placeholder="Company name"
                />
              </FormGroup>

              <FormGroup title="Service *">
                <Select
                  value={form.service}
                  onChange={(v) => setForm({ ...form, service: v })}
                  options={[
                    ["", "Select a service"],
                    ["architectural-design", "Architectural Design"],
                    ["interior-design", "Interior Design"],
                    ["property-purchase", "Property Purchase Advisory"],
                    ["investment-analysis", "Investment Analysis"],
                    ["construction", "Construction Management"],
                    ["other", "Other"],
                  ]}
                />
              </FormGroup>

              <FormGroup title="Property Type">
                <Select
                  value={form.project_type}
                  onChange={(v) => setForm({ ...form, project_type: v })}
                  options={[
                    ["", "Select property type"],
                    ["villa", "Villa"],
                    ["apartment", "Apartment"],
                    ["duplex", "Duplex"],
                    ["single-floor", "Single Floor House"],
                    ["two-floor", "Two Floor House"],
                  ]}
                />
              </FormGroup>

              <FormGroup title="Budget">
                <Select
                  value={form.budget}
                  onChange={(v) => setForm({ ...form, budget: v })}
                  options={[
                    ["", "Select budget"],
                    ["<500k", "Under 500k EGP"],
                    ["500k-1m", "500k – 1M EGP"],
                    ["1m-3m", "1M – 3M EGP"],
                    ["3m-10m", "3M – 10M EGP"],
                    ["10m+", "Over 10M EGP"],
                  ]}
                />
              </FormGroup>

              <FormGroup title="Timeline">
                <Select
                  value={form.timeline}
                  onChange={(v) => setForm({ ...form, timeline: v })}
                  options={[
                    ["", "Select timeline"],
                    ["asap", "As soon as possible"],
                    ["1-3-months", "1 – 3 months"],
                    ["3-6-months", "3 – 6 months"],
                    ["6-12-months", "6 – 12 months"],
                    ["flexible", "Flexible"],
                  ]}
                />
              </FormGroup>

              <FormGroup title="Project Description *" full>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  placeholder="Describe your project, land, preferences, priorities…"
                  rows={5}
                  className="w-full rounded-lg border bg-background px-3 py-3 text-sm"
                />
              </FormGroup>

              <FormGroup title="Additional Notes" full>
                <textarea
                  value={form.notes}
                  onChange={(e) => setForm({ ...form, notes: e.target.value })}
                  placeholder="Anything else we should know?"
                  rows={3}
                  className="w-full rounded-lg border bg-background px-3 py-3 text-sm"
                />
              </FormGroup>

              <button
                type="submit"
                disabled={loading}
                className="md:col-span-2 mt-2 rounded-lg bg-[#2196f3] px-7 py-3.5 font-bold text-white hover:bg-[#0d8bf2] transition disabled:opacity-60"
              >
                {loading ? "Submitting..." : "Submit Consultation Request"}
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

function FormGroup({
  title,
  children,
  full,
}: {
  title: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <div className={`space-y-2 ${full ? "md:col-span-2" : ""}`}>
      <h3 className="text-sm font-semibold">{title}</h3>
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

function TextInput({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border bg-background px-3 py-3 text-sm"
    />
  );
}
