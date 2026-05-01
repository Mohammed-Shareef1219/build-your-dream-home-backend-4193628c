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

const schema = z.object({
  email: z.string().trim().email("Invalid email").max(255),
  password: z.string().min(6, "Min 6 characters").max(72),
  displayName: z.string().trim().min(1).max(100).optional(),
});

function AuthPage() {
  const { mode } = Route.useSearch();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "", displayName: "" });

  useEffect(() => {
    if (user) navigate({ to: "/" });
  }, [user, navigate]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);

    if (mode === "signup") {
      const { error } = await supabase.auth.signUp({
        email: parsed.data.email,
        password: parsed.data.password,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: { display_name: parsed.data.displayName || "" },
        },
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Account created! You're signed in.");
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email: parsed.data.email,
        password: parsed.data.password,
      });
      setLoading(false);
      if (error) return toast.error(error.message);
      toast.success("Welcome back!");
    }
  };

  return (
    <div className="flex min-h-[80vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-gradient shadow-glow mb-4">
            <Home className="h-7 w-7 text-white" />
          </div>
          <h1 className="text-3xl font-bold">{mode === "signup" ? "Create account" : "Welcome back"}</h1>
          <p className="text-muted-foreground mt-2">
            {mode === "signup" ? "Save your favorite properties and submit inquiries." : "Sign in to continue."}
          </p>
        </div>

        <form onSubmit={onSubmit} className="bg-card rounded-2xl shadow-elegant p-8 space-y-4">
          {mode === "signup" && (
            <div>
              <Label htmlFor="displayName">Display name</Label>
              <Input id="displayName" value={form.displayName} onChange={(e) => setForm({ ...form, displayName: e.target.value })} />
            </div>
          )}
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
          </div>
          <Button type="submit" variant="brand" size="lg" className="w-full" disabled={loading}>
            {loading ? "Please wait..." : mode === "signup" ? "Sign up" : "Sign in"}
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            {mode === "signup" ? (
              <>Already have an account?{" "}
                <button type="button" className="text-secondary font-medium hover:underline"
                  onClick={() => navigate({ to: "/auth", search: { mode: "login" } })}>
                  Sign in
                </button>
              </>
            ) : (
              <>No account?{" "}
                <button type="button" className="text-secondary font-medium hover:underline"
                  onClick={() => navigate({ to: "/auth", search: { mode: "signup" } })}>
                  Create one
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
