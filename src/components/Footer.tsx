import { Link } from "@tanstack/react-router";
import { Mail, Phone, Facebook, Instagram, Twitter } from "lucide-react";
import logo from "@/assets/logo.png";

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="BuildYourHome logo" width={36} height={36} className="h-9 w-9 object-contain" loading="lazy" />
              <span className="font-display text-2xl font-bold tracking-tight">BuildYourHome</span>
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
                <Mail className="h-4 w-4" />
                <span>hello@buildyourhome.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>+971 000 0000</span>
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
