import { Link, useLocation } from "@tanstack/react-router";
import { Menu, X, User, LogOut, LayoutDashboard, Heart } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/property-types", label: "Property Types" },
  { to: "/gallery", label: "Design Gallery" },
  { to: "/properties", label: "Listings" },
  { to: "/consultation", label: "Free Consultation" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isAdmin, signOut } = useAuth();
  const location = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-lg">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" className="flex items-center gap-2 group">
          <span className="font-display text-2xl font-bold bg-brand-gradient bg-clip-text text-transparent">
            BuildYourHome
          </span>
        </Link>

        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map((l) => {
            const active = location.pathname === l.to;
            return (
              <Link
                key={l.to}
                to={l.to}
                className={`text-sm font-medium transition-colors hover:text-secondary relative ${
                  active ? "text-secondary" : "text-foreground/80"
                }`}
              >
                {l.label}
                {active && (
                  <span className="absolute -bottom-1 left-0 h-0.5 w-full rounded-full bg-secondary" />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5 text-sm">
                  <div className="font-medium">{user.email}</div>
                  {isAdmin && (
                    <div className="text-xs text-secondary font-semibold mt-0.5">Administrator</div>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to="/favorites">
                    <Heart className="mr-2 h-4 w-4" /> Favorites
                  </Link>
                </DropdownMenuItem>
                {isAdmin && (
                  <DropdownMenuItem asChild>
                    <Link to="/admin">
                      <LayoutDashboard className="mr-2 h-4 w-4" /> Admin Dashboard
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => signOut()}>
                  <LogOut className="mr-2 h-4 w-4" /> Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <Button variant="ghost" size="sm" asChild>
                <Link to="/auth">Login</Link>
              </Button>
              <Button variant="brand" size="sm" asChild>
                <Link to="/auth" search={{ mode: "signup" }}>
                  Sign up
                </Link>
              </Button>
            </div>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border/40 bg-background">
          <nav className="flex flex-col p-4 gap-1">
            {navLinks.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-muted"
              >
                {l.label}
              </Link>
            ))}
            {!user && (
              <div className="flex gap-2 pt-3 border-t border-border/40 mt-2">
                <Button variant="outline" size="sm" className="flex-1" asChild>
                  <Link to="/auth">Login</Link>
                </Button>
                <Button variant="brand" size="sm" className="flex-1" asChild>
                  <Link to="/auth" search={{ mode: "signup" }}>
                    Sign up
                  </Link>
                </Button>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}
