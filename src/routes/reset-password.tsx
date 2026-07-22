import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — BuildYourHome" },
      { name: "description", content: "Set a new password for your BuildYourHome account." },
      { property: "og:title", content: "Reset Password — BuildYourHome" },
      { property: "og:description", content: "Set a new password for your BuildYourHome account." },
    ],
  }),
  component: ResetPasswordPage,
});

const schema = z
  .object({
    password: z.string().min(8, "Password must be at least 8 characters").max(72),
    confirm: z.string(),
  })
  .refine((d) => d.password === d.confirm, {
    message: "Passwords do not match",
    path: ["confirm"],
  });

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ password: "", confirm: "" });

  useEffect(() => {
    // Supabase drops a recovery session via the URL hash; wait for it.
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) setReady(true);
    });
    return () => sub.subscription.unsubscribe();
  }, []);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = schema.safeParse(form);
    if (!parsed.success) return toast.error(parsed.error.issues[0].message);
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password: parsed.data.password });
    setLoading(false);
    if (error) return toast.error(error.message);
    toast.success("Password updated. You're signed in.");
    navigate({ to: "/dashboard" });
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center px-4 py-12 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1600&q=80')" }}>
      <div className="w-[420px] max-w-[92%] rounded-xl bg-white/95 backdrop-blur-md border border-white/30 shadow-[0_4px_30px_rgba(0,0,0,0.15)] p-8">
        <h1 className="mb-2 text-[26px] font-semibold text-[#2d3748] text-center">Set a new password</h1>
        <p className="mb-6 text-sm text-[#4a5568] text-center">
          Choose a strong password you haven't used before.
        </p>

        {!ready ? (
          <p className="text-center text-sm text-[#4a5568]">
            Waiting for the secure reset link… If you landed here directly, please open the link from your email.
          </p>
        ) : (
          <form onSubmit={onSubmit} className="space-y-5">
            <div>
              <label className="mb-2 block text-sm font-medium text-[#4a5568]">New password</label>
              <input
                type="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                required
                className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[15px] focus:border-[#4299e1] focus:outline-none focus:ring-[3px] focus:ring-[#4299e1]/20"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-[#4a5568]">Confirm password</label>
              <input
                type="password"
                value={form.confirm}
                onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                required
                className="w-full rounded-lg border border-[#e2e8f0] bg-[#f8fafc] px-4 py-3 text-[15px] focus:border-[#4299e1] focus:outline-none focus:ring-[3px] focus:ring-[#4299e1]/20"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#4299e1] px-4 py-3.5 text-base font-medium text-white shadow hover:bg-[#3182ce] disabled:opacity-50"
            >
              {loading ? "Updating..." : "Update password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
