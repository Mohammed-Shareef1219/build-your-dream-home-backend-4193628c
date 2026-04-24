import { Link } from "@tanstack/react-router";
import { Home, Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary shadow-glow">
                <Home className="h-5 w-5 text-white" />
              </div>
              <span className="font-display text-2xl font-bold">BuildYourHome</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Your digital broker for modern real estate. Design, discover, and own smarter.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Explore</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li>
                <Link to="/property-types" className="hover:text-secondary transition-colors">
                  Property Types
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="hover:text-secondary transition-colors">
                  Design Gallery
                </Link>
              </li>
              <li>
                <Link to="/properties" className="hover:text-secondary transition-colors">
                  Listings
                </Link>
              </li>
              <li>
                <Link to="/consultation" className="hover:text-secondary transition-colors">
                  Free Consultation
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" /> hello@buildyourhome.com
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> +971 000 0000
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Follow</h3>
            <div className="flex gap-3">
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/60">
          © {new Date().getFullYear()} BuildYourHome. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
