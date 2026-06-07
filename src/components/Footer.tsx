import { Link } from "@tanstack/react-router";
import { Mail, Phone, Facebook, Instagram, Twitter, Shield, BadgeCheck, ArrowRight, UserPlus, Search, CalendarCheck, Handshake } from "lucide-react";
import logo from "@/assets/logo.png";

const tickerItems = [
  "Cairo Market: +4.2% ↑",
  "Agent Ahmed Mansour: 12 Deals Closed this week",
  "New AI Valuation Tool Launched",
  "New Cairo: Villa prices +6.1% ↑",
  "6 October: Apartment demand +9% ↑",
  "Agent Sara Ali: 8 Deals Closed",
  "Sheikh Zayed: Commercial +3.4% ↑",
  "Agent Mahmoud Tarek: Top performer of the month",
  "North Coast: Summer rentals +18% ↑",
  "Maadi: Duplex listings +5% ↑",
  "Agent Nour Hassan: 15 verified listings",
  "Mortgage rates stable at 14.5%",
  "AI matched 1,240 buyers this week",
  "Heliopolis: Studio demand +7% ↓",
  "Agent Omar Khaled: 9 closings",
  "5th Settlement: Townhouse +4.8% ↑",
  "New partner agency: Ibn Beitak joins",
  "Z agency lists 80 new units",
  "Al-Nujoom expands to Alexandria",
  "Smart Tours booked: +320 this week",
];

const steps = [
  { icon: UserPlus, label: "Create Account" },
  { icon: Search, label: "Browse Listings" },
  { icon: CalendarCheck, label: "Schedule a Tour" },
  { icon: Handshake, label: "Close the Deal" },
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      {/* Live ticker */}
      <div className="bg-secondary/95 text-secondary-foreground overflow-hidden border-b border-primary-foreground/10">
        <div className="flex whitespace-nowrap animate-[ticker_60s_linear_infinite] py-2.5 text-sm font-medium">
          {[...tickerItems, ...tickerItems].map((item, i) => (
            <span key={i} className="px-6 flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              {item}
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }`}</style>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-14">
        {/* Top: 6 link sections */}
        <div className="grid gap-10 md:grid-cols-3 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="BuildYourHome logo" width={36} height={36} className="h-9 w-9 object-contain" loading="lazy" />
              <span className="font-display text-2xl font-bold tracking-tight">BuildYourHome</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Brokers + programmers, powered by technology. Find, sell, or rent your perfect property smarter.
            </p>
            <div className="flex gap-3 mt-5">
              <a href="#" aria-label="Facebook" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Facebook className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Instagram" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Instagram className="h-4 w-4" />
              </a>
              <a href="#" aria-label="Twitter" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                <Twitter className="h-4 w-4" />
              </a>
            </div>
          </div>

          <FooterCol title="About">
            <FooterLink to="/about">Who We Are</FooterLink>
            <FooterLink to="/about">Our Goal</FooterLink>
            <FooterLink to="/about">Our Vision</FooterLink>
            <FooterLink to="/about">Aspiration</FooterLink>
          </FooterCol>

          <FooterCol title="Careers">
            <FooterLink to="/careers">Join Our Team</FooterLink>
            <FooterLink to="/careers">Broker Gallery</FooterLink>
            <FooterLink to="/careers">Sales Team</FooterLink>
            <FooterLink to="/careers">AI Engineers</FooterLink>
          </FooterCol>

          <FooterCol title="Blog & News">
            <FooterLink to="/blog">Latest Updates</FooterLink>
            <FooterLink to="/blog">Market Insights</FooterLink>
            <FooterLink to="/blog">Platform News</FooterLink>
            <FooterLink to="/blog">Agent Spotlights</FooterLink>
          </FooterCol>

          <FooterCol title="Support">
            <FooterLink to="/support">Help Center</FooterLink>
            <FooterLink to="/support">How It Works</FooterLink>
            <FooterLink to="/support">FAQ</FooterLink>
            <FooterLink to="/contact">Contact Us</FooterLink>
          </FooterCol>
        </div>

        {/* Onboarding steps */}
        <section className="rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 p-6">
          <h3 className="font-semibold text-lg mb-5">How to find your dream property</h3>
          <ol className="grid gap-4 md:grid-cols-4 relative">
            {steps.map((s, i) => (
              <li key={s.label} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 shadow-soft">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-primary-foreground/60">Step {i + 1}</div>
                  <div className="font-medium">{s.label}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact CTA */}
        <section className="grid gap-6 md:grid-cols-2 items-center">
          <div className="rounded-2xl bg-accent/10 border border-accent/30 p-6">
            <h3 className="font-semibold text-lg">Book Free Consultation</h3>
            <p className="text-sm text-primary-foreground/75 mt-1">
              Get free expert advice within 24 hours. Our team combines AI with real human support to guide you.
            </p>
            <Link
              to="/consultation"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
            >
              Book Now <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Contact Us</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>buildyourhom@gmail.com</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+20111639205</span></li>
            </ul>
          </div>
        </section>

        {/* Trust badges */}
        <section className="grid gap-3 md:grid-cols-2">
          <div className="flex items-start gap-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-4">
            <BadgeCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <p className="text-sm text-primary-foreground/80">Verified listings with transparent pricing and no hidden fees.</p>
          </div>
          <div className="flex items-start gap-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-4">
            <Shield className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
            <p className="text-sm text-primary-foreground/80">Best market deals with zero hidden commissions.</p>
          </div>
        </section>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/30 border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-primary-foreground/70">
          <p>© {new Date().getFullYear()} BuildYourHome. All rights reserved.</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">Terms of Service</Link>
            <Link to="/cookies" className="hover:text-secondary transition-colors">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <h3 className="font-semibold mb-4">{title}</h3>
      <ul className="space-y-2 text-sm text-primary-foreground/70">{children}</ul>
    </div>
  );
}

function FooterLink({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <li>
      <Link to={to} className="hover:text-secondary transition-colors">{children}</Link>
    </li>
  );
}
