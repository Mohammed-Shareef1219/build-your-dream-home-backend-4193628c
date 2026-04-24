import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { HardHat } from "lucide-react";

export const Route = createFileRoute("/consultation")({
  head: () => ({
    meta: [
      { title: "Free Consultation — BuildYourHome" },
      { name: "description", content: "Book a free no-obligation consultation for your home project." },
    ],
  }),
  component: ConsultationPage,
});

const schema = z.object({
  name: z.string().trim().min(1, "Required").max(100),
  email: z.string().trim().email("Invalid email").max(255),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  project_type: z.string().max(100).optional().or(z.literal("")),
  budget: z.string().max(100).optional().or(z.literal("")),
  message: z.string().trim().min(1, "Required").max(2000),
});

function ConsultationPage() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    project_type: "",
    budget: "",
    message: "",
  });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0].message);
      return;
    }
    setLoading(true);
    const { error } = await supabase.from("consultations").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone || null,
      project_type: parsed.data.project_type || null,
      budget: parsed.data.budget || null,
      message: parsed.data.message,
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Thanks! We'll reach out within 24 hours.");
    setForm({ name: "", email: "", phone: "", project_type: "", budget: "", message: "" });
  };

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-10">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow mb-4">
          <HardHat className="h-7 w-7 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Free Consultation</h1>
        <p className="text-lg text-muted-foreground">
          Tell us about your project. We'll get back within 24 hours — no obligation.
        </p>
      </div>

      <form onSubmit={onSubmit} className="bg-card rounded-2xl shadow-elegant p-8 space-y-5">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <Label htmlFor="name">Full name *</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="email">Email *</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
          </div>
          <div>
            <Label htmlFor="project_type">Project type</Label>
            <Input id="project_type" placeholder="Villa, apartment, renovation..." value={form.project_type} onChange={(e) => setForm({ ...form, project_type: e.target.value })} />
          </div>
          <div className="md:col-span-2">
            <Label htmlFor="budget">Budget (approx.)</Label>
            <Input id="budget" placeholder="e.g. 500,000 AED" value={form.budget} onChange={(e) => setForm({ ...form, budget: e.target.value })} />
          </div>
        </div>
        <div>
          <Label htmlFor="message">Message *</Label>
          <Textarea id="message" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required />
        </div>
        <Button type="submit" variant="brand" size="lg" className="w-full" disabled={loading}>
          {loading ? "Sending..." : "Request Free Consultation"}
        </Button>
      </form>
    </div>
  );
}
