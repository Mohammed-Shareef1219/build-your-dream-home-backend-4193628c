import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Home } from "lucide-react";

export const Route = createFileRoute("/auth")({
  validateSearch: (s: Record<string, unknown>): { mode?: "login" | "signup" } => ({
    mode: (s.mode === "signup" ? "signup" : "login") as "login" | "signup",
  }),
  component: AuthPage,
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (user) navigate({ to: "/" });
  }, [user, navigate]);

  return mode === "signup" ? <SignupWizard /> : <LoginForm />;
}

/* -------------------------- LOGIN -------------------------- */

const loginSchema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(72),
});

function LoginForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = loginSchema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword(parsed.data);
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Welcome back!");
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow mb-4">
            <Home className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground mt-2">Sign in to continue.</p>
        </div>

        <form onSubmit={onSubmit} className="bg-card rounded-2xl shadow-elegant p-8 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <Button type="submit" variant="brand" size="lg" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : "Sign in"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            No account?{" "}
            <button type="button" className="text-secondary font-medium hover:underline"
              onClick={() => navigate({ to: "/auth", search: { mode: "signup" } })}>
              Create one
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

/* -------------------------- SIGNUP WIZARD -------------------------- */

const BG_SLIDES = [
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
  "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80",
];

type SignupData = {
  fullName: string;
  email: string;
  phone: string;
  username: string;
  password: string;
  confirmPassword: string;
  projectType: string;
  budget: string;
  timeline: string;
  receiveEmails: boolean;
  receiveSMS: boolean;
  serviceType: string;
  shareProjects: boolean;
  agreeTerms: boolean;
  agreeDataUsage: boolean;
};

const initialData: SignupData = {
  fullName: "",
  email: "",
  phone: "",
  username: "",
  password: "",
  confirmPassword: "",
  projectType: "",
  budget: "",
  timeline: "",
  receiveEmails: true,
  receiveSMS: false,
  serviceType: "investment",
  shareProjects: false,
  agreeTerms: false,
  agreeDataUsage: false,
};

function SignupWizard() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [slide, setSlide] = useState(0);
  const [loading, setLoading] = useState(false);
  const [fileName, setFileName] = useState("No file chosen");
  const [data, setData] = useState<SignupData>(initialData);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % BG_SLIDES.length), 6000);
    return () => clearInterval(t);
  }, []);

  const update = <K extends keyof SignupData>(k: K, v: SignupData[K]) =>
    setData((d) => ({ ...d, [k]: v }));

  const validateStep = (s: number): string | null => {
    if (s === 1) {
      if (!data.fullName.trim()) return "Full name is required";
      if (!/^\S+@\S+\.\S+$/.test(data.email)) return "Valid email is required";
      if (!data.phone.trim()) return "Phone is required";
    }
    if (s === 2) {
      if (!data.username.trim()) return "Username is required";
      if (data.password.length < 6) return "Password must be at least 6 characters";
      if (data.password !== data.confirmPassword) return "Passwords do not match";
    }
    if (s === 3) {
      if (!data.projectType) return "Select a project type";
    }
    return null;
  };

  const next = () => {
    const err = validateStep(step);
    if (err) return toast.error(err);
    setStep((s) => Math.min(4, s + 1));
  };
  const prev = () => setStep((s) => Math.max(1, s - 1));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!data.agreeTerms) return toast.error("You must agree to the Terms of Use");
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: data.email,
      password: data.password,
      options: {
        emailRedirectTo: `${window.location.origin}/`,
        data: {
          display_name: data.fullName,
          username: data.username,
          phone: data.phone,
          project_type: data.projectType,
          budget: data.budget,
          timeline: data.timeline,
          service_type: data.serviceType,
          receive_emails: data.receiveEmails,
          receive_sms: data.receiveSMS,
          share_projects: data.shareProjects,
          agree_data_usage: data.agreeDataUsage,
        },
      },
    });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Account created! Please check your email to verify.");
  };

  return (
    <div className="relative min-h-[calc(100vh-4rem)] overflow-hidden">
      {/* Background slider */}
      <div className="absolute inset-0 -z-10">
        {BG_SLIDES.map((src, i) => (
          <div
            key={src}
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-[1500ms]"
            style={{
              backgroundImage: `url(${src})`,
              opacity: i === slide ? 0.9 : 0,
            }}
          />
        ))}
        <div className="absolute inset-0 bg-black/40" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 grid lg:grid-cols-2 gap-10 items-start">
        {/* Welcome */}
        <div className="text-white pt-6 lg:pt-16">
          <h1
            className="font-bold leading-tight mb-4"
            style={{
              fontFamily: '"Playfair Display", serif',
              fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
              color: "#f49208",
            }}
          >
            Welcome BuildYourHome
          </h1>
          <p className="text-lg md:text-xl text-white/90 max-w-md leading-relaxed">
            We're here to help you build your dream home. Start your journey with us today.
          </p>
        </div>

        {/* Form card */}
        <div className="bg-white/97 backdrop-blur rounded-xl shadow-elegant border border-border p-6 md:p-8 lg:ml-auto w-full max-w-[650px]">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-[#2c3e50]">Create New Account</h2>
            <p className="text-muted-foreground mt-1">Fill out the form below to create your account</p>
          </div>

          {/* Progress bar */}
          <div className="relative flex justify-between mb-8">
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#ecf0f1] -translate-y-1/2 z-0" />
            {[1, 2, 3, 4].map((n) => {
              const completed = n < step;
              const active = n === step;
              return (
                <div
                  key={n}
                  className={`relative z-10 h-9 w-9 rounded-full flex items-center justify-center font-bold text-sm border-2 transition-all ${
                    completed
                      ? "bg-[#2ecc71] text-white border-[#2ecc71]"
                      : active
                      ? "bg-[#3498db] text-white border-[#3498db]"
                      : "bg-[#ecf0f1] text-[#7f8c8d] border-[#ddd]"
                  }`}
                >
                  {n}
                </div>
              );
            })}
          </div>

          <form onSubmit={onSubmit} className="space-y-5">
            {step === 1 && (
              <Section title="Personal Information">
                <Field label="Full Name">
                  <Input value={data.fullName} onChange={(e) => update("fullName", e.target.value)} placeholder="Enter your full name" />
                </Field>
                <Field label="Email Address">
                  <Input type="email" value={data.email} onChange={(e) => update("email", e.target.value)} placeholder="Enter your email" />
                </Field>
                <Field label="Phone Number">
                  <Input type="tel" value={data.phone} onChange={(e) => update("phone", e.target.value)} placeholder="Enter your phone number" />
                </Field>
                <div className="flex justify-end pt-2">
                  <NavBtn onClick={next}>Next</NavBtn>
                </div>
              </Section>
            )}

            {step === 2 && (
              <Section title="Account Details">
                <Field label="Username">
                  <Input value={data.username} onChange={(e) => update("username", e.target.value)} placeholder="Choose a username" />
                </Field>
                <Field label="Password">
                  <Input type="password" value={data.password} onChange={(e) => update("password", e.target.value)} placeholder="Create a password" />
                </Field>
                <Field label="Confirm Password">
                  <Input type="password" value={data.confirmPassword} onChange={(e) => update("confirmPassword", e.target.value)} placeholder="Confirm your password" />
                </Field>
                <div className="flex justify-between pt-2">
                  <PrevBtn onClick={prev}>Previous</PrevBtn>
                  <NavBtn onClick={next}>Next</NavBtn>
                </div>
              </Section>
            )}

            {step === 3 && (
              <Section title="Project Information">
                <Field label="Project Type">
                  <select
                    className="w-full h-11 rounded-md border-2 border-[#ddd] bg-white px-3 text-base focus:border-[#3498db] focus:outline-none focus:ring-2 focus:ring-[#3498db]/20"
                    value={data.projectType}
                    onChange={(e) => update("projectType", e.target.value)}
                  >
                    <option value="" disabled>Select project type</option>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="industrial">Industrial</option>
                  </select>
                </Field>
                <Field label="Estimated Budget ($)">
                  <Input value={data.budget} onChange={(e) => update("budget", e.target.value)} placeholder="Enter your budget" />
                </Field>
                <Field label="Project Timeline (months)">
                  <Input value={data.timeline} onChange={(e) => update("timeline", e.target.value)} placeholder="Enter your timeline" />
                </Field>
                <div className="flex justify-between pt-2">
                  <PrevBtn onClick={prev}>Previous</PrevBtn>
                  <NavBtn onClick={next}>Next</NavBtn>
                </div>
              </Section>
            )}

            {step === 4 && (
              <Section title="Preferences and Agreements">
                <div>
                  <Label className="block mb-2 text-[#2c3e50]">Communication Preferences</Label>
                  <Check id="receiveEmails" checked={data.receiveEmails} onChange={(v) => update("receiveEmails", v)} label="I agree to receive email messages" />
                  <Check id="receiveSMS" checked={data.receiveSMS} onChange={(v) => update("receiveSMS", v)} label="I agree to receive SMS messages" />
                </div>

                <Field label="Required Service Type">
                  <select
                    className="w-full h-11 rounded-md border-2 border-[#ddd] bg-white px-3 text-base focus:border-[#3498db] focus:outline-none focus:ring-2 focus:ring-[#3498db]/20"
                    value={data.serviceType}
                    onChange={(e) => update("serviceType", e.target.value)}
                  >
                    <option value="" disabled>Select service type</option>
                    <option value="design">Architectural Design</option>
                    <option value="construction">Construction</option>
                    <option value="consultation">Engineering Consultation</option>
                    <option value="investment">Investment</option>
                  </select>
                </Field>

                <Check id="shareProjects" checked={data.shareProjects} onChange={(v) => update("shareProjects", v)} label="I want to share my projects in the gallery" />

                <div>
                  <Label className="block mb-2 text-[#2c3e50]">Upload Official Document (Optional)</Label>
                  <label className="block cursor-pointer rounded-md border-2 border-dashed border-[#3498db] bg-[#f8f9fa] hover:bg-[#e9ecef] text-[#3498db] text-center py-3 font-medium transition-colors">
                    Choose File
                    <input
                      type="file"
                      accept=".pdf,.jpg,.png"
                      className="hidden"
                      onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "No file chosen")}
                    />
                  </label>
                  <div className="mt-2 text-sm text-muted-foreground">{fileName}</div>
                </div>

                <div>
                  <Label className="block mb-2 text-[#2c3e50]">Agreements</Label>
                  <Check id="agreeTerms" checked={data.agreeTerms} onChange={(v) => update("agreeTerms", v)} label="I agree to the Terms of Use and Privacy Policy" />
                  <Check id="agreeDataUsage" checked={data.agreeDataUsage} onChange={(v) => update("agreeDataUsage", v)} label="I agree to use my data to improve services" />
                </div>

                <div className="flex justify-between pt-2 gap-3">
                  <PrevBtn onClick={prev}>Previous</PrevBtn>
                  <button
                    type="submit"
                    disabled={loading}
                    className="flex-1 rounded-md bg-[#2ecc71] hover:bg-[#27ae60] text-white font-semibold py-3 px-6 transition-all hover:-translate-y-0.5 disabled:opacity-50 disabled:hover:transform-none"
                  >
                    {loading ? "Creating Account..." : "Create Account"}
                  </button>
                </div>
              </Section>
            )}
          </form>

          <div className="text-center text-sm text-muted-foreground mt-6">
            Already have an account?{" "}
            <button
              type="button"
              className="text-[#3498db] font-medium hover:underline"
              onClick={() => navigate({ to: "/auth", search: { mode: "login" } })}
            >
              Sign in
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* -------------------------- helpers -------------------------- */

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 animate-in fade-in slide-in-from-bottom-2 duration-500">
      <h3 className="text-xl font-semibold text-[#2c3e50]">{title}</h3>
      {children}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label className="block mb-2 font-semibold text-[#2c3e50]">{label}</Label>
      {children}
    </div>
  );
}

function Check({ id, checked, onChange, label }: { id: string; checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <div className="flex items-center gap-2.5 mb-2">
      <input
        id={id}
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        className="h-[18px] w-[18px] cursor-pointer accent-[#3498db]"
      />
      <label htmlFor={id} className="text-[15px] cursor-pointer">{label}</label>
    </div>
  );
}

function NavBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-[#3498db] hover:bg-[#2980b9] text-white font-semibold py-3 px-6 transition-all hover:-translate-y-0.5"
    >
      {children}
    </button>
  );
}

function PrevBtn({ onClick, children }: { onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="rounded-md bg-[#95a5a6] hover:bg-[#7f8c8d] text-white font-semibold py-3 px-6 transition-all hover:-translate-y-0.5"
    >
      {children}
    </button>
  );
}
