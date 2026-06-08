import { createFileRoute } from "@tanstack/react-router";
import { BadgeCheck, Shield } from "lucide-react";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy & Terms — BuildYourHome" },
      { name: "description", content: "Verified properties with transparent prices and no hidden fees. Read our full 50-clause privacy and terms policy." },
    ],
  }),
  component: PrivacyPage,
});

const clauses = [
  "BuildYourHome respects the privacy of every user and treats personal data as a trust.",
  "We collect only the data needed to deliver our services: name, email, phone number, and property preferences.",
  "We never sell, rent, or trade personal data to third parties.",
  "All listings published on the platform are verified against official title deeds before going live.",
  "Property prices displayed are final and transparent — no hidden commissions are added at any stage.",
  "Brokers and agents on the platform are vetted, licensed where required, and bound by our code of conduct.",
  "Users may create one account per person; duplicate or impersonating accounts will be suspended.",
  "You retain full ownership of any content you upload (photos, descriptions, documents).",
  "By uploading content you grant BuildYourHome a non-exclusive license to display it within the platform.",
  "We use cookies only to keep you signed in, remember preferences, and measure performance.",
  "Marketing cookies are off by default and require your explicit opt-in.",
  "You may request a copy of all data we hold about you at any time by emailing buildyourhom@gmail.com.",
  "You may request full deletion of your account and data; we will complete deletion within 30 days.",
  "Payment information is processed by certified payment providers; we never store card numbers on our servers.",
  "Booking a tour creates a temporary record shared only with the responsible broker.",
  "Free consultations are delivered within 24 hours by a licensed advisor.",
  "Property valuations powered by AI are estimates, not legal appraisals, and should not replace formal appraisal.",
  "We disclose AI usage clearly wherever automated recommendations affect what you see.",
  "Users must be 18 or older to transact on the platform.",
  "Underage users may browse public listings only and cannot book tours or sign contracts.",
  "We comply with Egyptian Personal Data Protection Law No. 151 of 2020.",
  "Cross-border data transfers, if any, follow contractual safeguards with the receiving party.",
  "Sensitive data (national ID, passport) is encrypted at rest and in transit.",
  "We notify affected users within 72 hours of any confirmed data breach.",
  "Account passwords are hashed using industry-standard algorithms; we never store them in plain text.",
  "Two-factor authentication is available for all users and recommended for brokers and agents.",
  "Suspicious login attempts trigger automatic email alerts.",
  "We reserve the right to remove any listing that violates law, accuracy, or ethical standards.",
  "Brokers must disclose any conflict of interest before representing a client.",
  "Misrepresentation of property details (size, location, ownership) is grounds for permanent removal.",
  "Reviews and ratings must be based on real interactions; fake reviews are prohibited.",
  "Disputes between buyers, sellers, and brokers are first mediated by BuildYourHome's support team.",
  "If mediation fails, disputes are governed by the laws of the Arab Republic of Egypt.",
  "Refunds for paid services follow the policy stated at the time of purchase.",
  "Free consultations are non-refundable as no payment is collected.",
  "We may update these terms; material changes are communicated by email at least 14 days in advance.",
  "Continued use of the platform after notice constitutes acceptance of updated terms.",
  "Users may export their saved searches and favorites at any time.",
  "Direct WhatsApp and Telegram contact with brokers is opt-in per listing.",
  "Email communications include an unsubscribe link in every marketing message.",
  "Transactional emails (account, security, bookings) cannot be unsubscribed for safety reasons.",
  "Analytics data is aggregated and never tied back to individual identities for reporting.",
  "Third-party integrations (maps, payments, identity) follow their own privacy notices, which we link to.",
  "We maintain commercial liability insurance covering platform-mediated transactions.",
  "Force majeure events (natural disasters, government action) suspend obligations without penalty.",
  "Intellectual property of BuildYourHome — logo, brand, code, designs — is protected and may not be copied.",
  "Users may not scrape, reverse-engineer, or resell platform data without written permission.",
  "Violation of these terms may result in suspension, account deletion, or legal action.",
  "All notices to BuildYourHome should be sent to buildyourhom@gmail.com.",
  "By clicking I Agree on registration, you confirm you have read, understood, and accept all 50 clauses above.",
];

function PrivacyPage() {
  return (
    <article className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-16">
      <header className="text-center max-w-2xl mx-auto">
        <p className="text-sm font-semibold text-secondary uppercase tracking-wider">Privacy Policy & Terms</p>
        <h1 className="mt-3 text-4xl md:text-5xl font-bold tracking-tight">Privacy, trust & transparency</h1>
        <p className="mt-2 text-sm text-muted-foreground">Last updated: June 2026</p>
      </header>

      {/* Marketing trust boards */}
      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border-l-4 border-secondary bg-secondary/10 p-6 shadow-soft flex items-start gap-3">
          <BadgeCheck className="h-6 w-6 text-secondary mt-0.5" />
          <p className="font-medium">Verified properties with transparent prices and no hidden fees.</p>
        </div>
        <div className="rounded-2xl border-l-4 border-accent bg-accent/10 p-6 shadow-soft flex items-start gap-3">
          <Shield className="h-6 w-6 text-accent-foreground mt-0.5" />
          <p className="font-medium">The best market deals with no hidden commissions.</p>
        </div>
      </div>

      {/* 50 clauses */}
      <ol className="mt-12 space-y-4 list-decimal list-inside text-muted-foreground leading-relaxed">
        {clauses.map((c, i) => (
          <li key={i} className="pl-2">
            <span className="text-foreground">{c}</span>
          </li>
        ))}
      </ol>

      <div className="mt-12 rounded-2xl border bg-card p-6 text-center">
        <p className="text-sm text-muted-foreground">By using BuildYourHome you agree to all 50 clauses above.</p>
        <button className="mt-4 rounded-full bg-secondary text-secondary-foreground px-8 py-2.5 font-semibold hover:opacity-90 transition">
          I Agree
        </button>
      </div>
    </article>
  );
}
