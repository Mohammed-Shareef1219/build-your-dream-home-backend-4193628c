import { Link } from "@tanstack/react-router";
import { Mail, Phone, Facebook, Instagram, Twitter, Linkedin, Send, MessageCircle, Music2, Shield, BadgeCheck, ArrowRight, UserPlus, Search, CalendarCheck, Handshake } from "lucide-react";
import logo from "@/assets/logo.png";
import { useT } from "@/lib/i18n";

const tickerItems = [
  "Cairo Market: +4.2% ↑",
  "Agent Ahmed Mansour: 12 Deals Closed this week",
  "New AI Valuation Tool Launched",
  "New Cairo: Villa prices +6.1% ↑",
  "6 October: Apartment demand +9% ↑",
  "Sheikh Zayed: Commercial +3.4% ↑",
  "North Coast: Summer rentals +18% ↑",
  "Maadi: Duplex listings +5% ↑",
  "Mortgage rates stable at 14.5%",
  "AI matched 1,240 buyers this week",
  "5th Settlement: Townhouse +4.8% ↑",
  "Ibn Beitak joins as featured partner agency",
  "Smart Tours booked: +320 this week",
];

const steps = [
  { icon: UserPlus, label: "Create Account" },
  { icon: Search, label: "Browse Listings" },
  { icon: CalendarCheck, label: "Schedule a Tour" },
  { icon: Handshake, label: "Close the Deal" },
];

const socials = [
  { icon: Instagram, label: "Instagram", href: "https://instagram.com" },
  { icon: Twitter, label: "Twitter", href: "https://twitter.com" },
  { icon: Facebook, label: "Facebook", href: "https://facebook.com" },
  { icon: Send, label: "Telegram", href: "https://t.me/+20111639205" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { icon: Music2, label: "TikTok", href: "https://tiktok.com" },
  { icon: MessageCircle, label: "WhatsApp", href: "https://wa.me/20111639205" },
];

export function Footer() {
  const t = useT();
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
        {/* Brand + Explore + Contact + Follow */}
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="BuildYourHome logo" width={40} height={40} className="h-10 w-10 object-contain" loading="lazy" />
              <span className="font-display text-2xl font-bold tracking-tight">BuildYourHome</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              {t("Your digital broker for modern real estate. Design, discover, and own smarter.")}
            </p>
          </div>

          <FooterCol title={t("Explore")}>
            <FooterLink to="/property-types">{t("Property Types")}</FooterLink>
            <FooterLink to="/gallery">{t("Design Gallery")}</FooterLink>
            <FooterLink to="/properties">{t("Listings")}</FooterLink>
            <FooterLink to="/consultation">{t("Free Consultation")}</FooterLink>
          </FooterCol>

          <div>
            <h3 className="font-semibold mb-4">{t("Contact")}</h3>
            <ul className="space-y-2 text-sm text-primary-foreground/80">
              <li className="flex items-center gap-2"><Mail className="h-4 w-4" /><span>buildyourhom@gmail.com</span></li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4" /><span>+20111639205</span></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">{t("Follow")}</h3>
            <div className="flex flex-wrap gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors"
                >
                  <s.icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Main navigation sections */}
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-7 pt-10 border-t border-primary-foreground/10">
          <FooterCol title={t("About Us")}>
            <FooterLink to="/about">{t("Who We Are")}</FooterLink>
            <FooterLink to="/about">{t("Our Goal")}</FooterLink>
            <FooterLink to="/about">{t("Our Vision")}</FooterLink>
            <FooterLink to="/about">{t("Ambition")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("Careers")}>
            <FooterLink to="/careers">{t("Join Our Team")}</FooterLink>
            <FooterLink to="/careers">{t("Brokers")}</FooterLink>
            <FooterLink to="/careers">{t("Sales Team")}</FooterLink>
            <FooterLink to="/careers">{t("AI Engineers")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("Blog & News")}>
            <FooterLink to="/blog">{t("Market Updates")}</FooterLink>
            <FooterLink to="/blog">{t("Platform News")}</FooterLink>
            <FooterLink to="/blog">{t("Agent Listings")}</FooterLink>
            <FooterLink to="/blog">{t("Local Prices")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("Resources")}>
            <FooterLink to="/resources">{t("Real Estate Guides")}</FooterLink>
            <FooterLink to="/resources">{t("Egyptian Market")}</FooterLink>
            <FooterLink to="/resources">{t("Valuation Tips")}</FooterLink>
            <FooterLink to="/resources">{t("Smart Budgeting")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("Neighborhoods")}>
            <FooterLink to="/neighborhoods">{t("New Cairo")}</FooterLink>
            <FooterLink to="/neighborhoods">{t("6 October")}</FooterLink>
            <FooterLink to="/neighborhoods">{t("Sheikh Zayed")}</FooterLink>
            <FooterLink to="/neighborhoods">{t("North Coast")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("Investment")}>
            <FooterLink to="/investment">{t("Legal Verification")}</FooterLink>
            <FooterLink to="/investment">{t("Rental Income")}</FooterLink>
            <FooterLink to="/investment">{t("Garages & Land")}</FooterLink>
            <FooterLink to="/investment">{t("Palm Groves")}</FooterLink>
          </FooterCol>

          <FooterCol title={t("Support")}>
            <FooterLink to="/support">{t("Help Center")}</FooterLink>
            <FooterLink to="/support">{t("How It Works")}</FooterLink>
            <FooterLink to="/support">{t("FAQ")}</FooterLink>
            <FooterLink to="/contact">{t("Contact Us")}</FooterLink>
          </FooterCol>
        </div>

        {/* Onboarding steps */}
        <section className="rounded-2xl bg-primary-foreground/5 border border-primary-foreground/10 p-6">
          <h3 className="font-semibold text-lg mb-5">{t("How to find your dream property")}</h3>
          <ol className="grid gap-4 md:grid-cols-4">
            {steps.map((s, i) => (
              <li key={s.label} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shrink-0 shadow-soft">
                  <s.icon className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-xs text-primary-foreground/60">{t("Step")} {i + 1}</div>
                  <div className="font-medium">{t(s.label)}</div>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact CTA */}
        <section className="grid gap-6 md:grid-cols-2 items-center">
          <div className="rounded-2xl bg-accent/10 border border-accent/30 p-6">
            <h3 className="font-semibold text-lg">{t("Book Free Consultation")}</h3>
            <p className="text-sm text-primary-foreground/75 mt-1">
              {t("Get free expert advice within 24 hours. Our team combines AI with real human support to guide you.")}
            </p>
            <Link
              to="/consultation"
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold hover:opacity-90 transition"
            >
              {t("Book Now")} <ArrowRight className="h-4 w-4 rtl:rotate-180" />
            </Link>
          </div>
          <div className="grid gap-3">
            <div className="flex items-start gap-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-4">
              <BadgeCheck className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
              <p className="text-sm text-primary-foreground/80">{t("Verified listings with transparent pricing and no hidden fees.")}</p>
            </div>
            <div className="flex items-start gap-3 rounded-xl bg-primary-foreground/5 border border-primary-foreground/10 p-4">
              <Shield className="h-5 w-5 text-secondary shrink-0 mt-0.5" />
              <p className="text-sm text-primary-foreground/80">{t("Best market deals with zero hidden commissions.")}</p>
            </div>
          </div>
        </section>
      </div>

      {/* Bottom bar */}
      <div className="bg-black/30 border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-sm text-primary-foreground/70">
          <p>{t("© 2026 BuildYourHome. All rights reserved.")}</p>
          <div className="flex gap-5">
            <Link to="/privacy" className="hover:text-secondary transition-colors">{t("Privacy Policy")}</Link>
            <Link to="/terms" className="hover:text-secondary transition-colors">{t("Terms of Service")}</Link>
            <Link to="/cookies" className="hover:text-secondary transition-colors">{t("Cookie Policy")}</Link>
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
