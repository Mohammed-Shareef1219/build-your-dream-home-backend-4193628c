import type { ReactNode } from "react";
import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "@/hooks/useAuth";

type Props = {
  children: ReactNode;
  requireAdmin?: boolean;
  fallback?: ReactNode;
};

/**
 * Client-side gate for routes/sections that require an authenticated user.
 * Redirects unauthenticated visitors to /auth (login mode).
 * Optionally requires the `admin` role.
 */
export function ProtectedRoute({ children, requireAdmin = false, fallback }: Props) {
  const { user, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate({ to: "/auth", search: { mode: "login" } });
    } else if (requireAdmin && !isAdmin) {
      navigate({ to: "/" });
    }
  }, [user, isAdmin, loading, requireAdmin, navigate]);

  if (loading || !user || (requireAdmin && !isAdmin)) {
    return (
      fallback ?? (
        <div className="flex min-h-[50vh] items-center justify-center text-sm text-muted-foreground">
          Checking your session…
        </div>
      )
    );
  }

  return <>{children}</>;
}
