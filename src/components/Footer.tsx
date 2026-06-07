import { Link } from "@tanstack/react-router";
import { Mail, Phone, Facebook, Instagram, Twitter, Target, Eye, Rocket, Sparkles, UserPlus, Search, CalendarCheck, Handshake, ShieldCheck, BadgeCheck, Wallet } from "lucide-react";
import logo from "@/assets/logo.png";

// 50 professional portrait photo IDs from Unsplash
const BROKER_PHOTOS = [
  "1573496359142-b8d87734a5a2", "1494790108377-be9c29b29330", "1560250097-0b93528c311a",
  "1573497019940-1c28c88b4f3e", "1580489944761-15a19d654956", "1519085360753-af0119f7cbe7",
  "1507003211169-0a1dd7228f2d", "1438761681033-6461ffad8d80", "1472099645785-5658abf4ff4e",
  "1544005313-94ddf0286df2", "1500648767791-00dcc994a43e", "1534528741775-53994a69daeb",
  "1506794778202-cad84cf45f1d", "1517841905240-472988babdf9", "1539571696357-5a69c17a67c6",
  "1531123897727-8f129e1688ce", "1564564321837-a57b7070ac4f", "1545167622-3a6ac756afa4",
  "1521119989659-a83eee488004", "1492562080023-ab3db95bfbce", "1607746882042-944635dfe10e",
  "1573497620053-ea5300f94f21", "1488161628813-04466f872be2", "1502685104226-ee32379fefbe",
  "1525134479668-1bee5c7c6845", "1542909168-82c3e7fdca5c", "1505740420928-5e560c06d30e",
  "1517365830460-955ce3ccd263", "1551836022-deb4988cc6c0", "1546961342-1eaa5b4f0a37",
  "1463453091185-61582044d556", "1551836022-d5d88e9218df", "1531746020798-e6953c6e8e04",
  "1487412720507-e7ab37603c6f", "1519345182560-3f2917c472ef", "1557862921-37829c790f19",
  "1542178243-bc20204b769f", "1568602471122-7832951cc4c5", "1577880216142-8549e9488dad",
  "1601412436009-d964bd02edbc", "1530268729831-4b0b9e170218", "1607990281513-2c110a25bd8c",
  "1551836022-4c4c79ecde51", "1605462863863-10d9e47e15ee", "1610216705422-caa3fcb6d158",
  "1573497019414-49d5c4d3e7a3", "1556157382-97eda2d62296", "1564564295391-7f24f26f568b",
  "1559586129-1bf07be3e3df", "1622253692010-333f2da6031d",
];

const BROKER_NAMES = [
  "Ahmed Mansour","Sara Khalil","Omar Adel","Layla Hassan","Youssef Nabil",
  "Mariam Fouad","Karim Salah","Nour Tarek","Hassan Mostafa","Dina Ramy",
  "Tamer Galal","Heba Sami","Mahmoud Wael","Rana Hany","Ziad Sherif",
  "Aya Magdy","Khaled Anwar","Farah Selim","Mostafa Hany","Yara Adel",
  "Bassel Nader","Salma Atef","Marwan Said","Hana Yasser","Amr Reda",
  "Lina Maged","Tarek Sameh","Mai Hossam","Sherif Lotfy","Engy Kamal",
  "Hady Adel","Rasha Hatem","Karim Adel","Maha Yousri","Adam Sherif",
  "Nada Ehab","Hesham Aly","Joud Khaled","Fady Magdy","Nourhan Sami",
  "Wael Adel","Reem Tarek","Mazen Hisham","Aisha Naguib","Mido Khaled",
  "Habiba Adel","Selim Adel","Doaa Mahmoud","Bishoy Samir","Nada Ashraf",
];

const AGENCIES = ["Ibn Beitak", "Z Realty", "Al-Nujoom"];
const LOCATIONS = ["New Cairo", "Sheikh Zayed", "Maadi", "Zamalek", "6th October", "North Coast", "El Gouna", "Heliopolis"];

const TICKER_ITEMS = [
  "Cairo Market: +4.2% ↑","New Cairo Villas: +6.1% ↑","Sheikh Zayed Apartments: +3.4% ↑",
  "Agent Ahmed Mansour: 12 Deals Closed this week","AI Valuation Tool Launched",
  "North Coast Chalets: +8.7% ↑","Maadi Duplex Avg: 9.2M EGP","Agent Sara Khalil: Top Performer",
  "Mortgage Rates: 18.25% →","Zamalek Listings: +12 new this week","Commercial Space Demand: +5.3% ↑",
  "El Gouna Beach Villas: +11.4% ↑","Agent Omar Adel: 9 Deals Closed","Smart Tour Bookings: +22% ↑",
  "6th October Townhouses: +2.8% ↑","Heliopolis Apartments: Stable →","AI Match Accuracy: 94.6%",
  "Free Consultations Booked: 1,247 today","Featured Partner: Z Realty","Cairo Luxury Segment: +7.9% ↑",
];

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground mt-20">
      {/* Ticker */}
      <div className="bg-secondary/95 text-secondary-foreground border-y border-secondary/40 overflow-hidden">
        <div className="flex gap-12 py-3 whitespace-nowrap animate-[ticker_60s_linear_infinite] hover:[animation-play-state:paused]">
          {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
            <span key={i} className="text-sm font-medium inline-flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" />
              {item}
            </span>
          ))}
        </div>
        <style>{`@keyframes ticker { from { transform: translateX(0) } to { transform: translateX(-50%) } }`}</style>
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* Brand + About */}
        <section className="grid gap-10 lg:grid-cols-3">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <img src={logo} alt="BuildYourHome logo" width={36} height={36} className="h-9 w-9 object-contain" loading="lazy" />
              <span className="font-display text-2xl font-bold tracking-tight">BuildYourHome</span>
            </div>
            <p className="text-sm text-primary-foreground/70 leading-relaxed">
              Your digital broker for modern real estate. Design, discover, and own smarter.
            </p>
          </div>

          <div className="lg:col-span-2">
            <h3 className="text-xl font-bold mb-2">Who We Are</h3>
            <p className="text-sm text-primary-foreground/75 leading-relaxed mb-5">
              Brokers + programmers, powered by Technology. We are a team of real estate experts and programmers
              specializing in transforming your property search into a fast and smart experience, using the latest
              artificial intelligence technologies.
            </p>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { icon: Target, title: "Our Goal", text: "Make buying, selling, or renting your property easier, faster, and clearer than ever before." },
                { icon: Eye, title: "Our Vision", text: "A future where everyone can find their perfect property effortlessly." },
                { icon: Rocket, title: "Vision for the Future", text: "Integrity of brokers, speed of technology — for everyone." },
                { icon: Sparkles, title: "Our Aspiration", text: "The leading Arab platform for smart real estate marketing in minutes." },
              ].map(({ icon: Icon, title, text }) => (
                <div key={title} className="rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 p-4 hover:bg-primary-foreground/10 transition-colors">
                  <div className="flex items-center gap-2 mb-1.5">
                    <Icon className="h-4 w-4 text-secondary" />
                    <h4 className="font-semibold text-sm">{title}</h4>
                  </div>
                  <p className="text-xs text-primary-foreground/70 leading-relaxed">{text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Careers */}
        <section>
          <h3 className="text-xl font-bold mb-4">Careers</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="rounded-lg border-l-4 border-secondary bg-secondary/10 p-4 shadow-soft">
              <p className="text-sm font-medium">📌 Join our team of brokers and programmers.</p>
            </div>
            <div className="rounded-lg border-l-4 border-accent bg-accent/10 p-4 shadow-soft">
              <p className="text-sm font-medium">✨ Build the future of AI-powered real estate marketing.</p>
            </div>
          </div>

          <h4 className="font-semibold text-sm mb-4 text-primary-foreground/80">Broker & Sales Team</h4>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {BROKER_PHOTOS.map((id, i) => {
              const name = BROKER_NAMES[i] ?? `Agent ${i + 1}`;
              const agency = AGENCIES[i % AGENCIES.length];
              const location = LOCATIONS[i % LOCATIONS.length];
              const phone = `+201${(10000000 + i * 137).toString().slice(0, 8)}`;
              return (
                <div key={i} className="group relative rounded-lg overflow-hidden bg-primary-foreground/5 border border-primary-foreground/10 hover:border-secondary/60 transition-all">
                  <div className="aspect-square overflow-hidden">
                    <img
                      src={`https://images.unsplash.com/photo-${id}?w=240&h=240&fit=crop&crop=faces`}
                      alt={`${name}, real estate broker at ${agency}`}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="p-2.5">
                    <p className="text-xs font-semibold truncate">{name}</p>
                    <p className="text-[10px] text-secondary truncate">{agency}</p>
                    <p className="text-[10px] text-primary-foreground/60 truncate">{location}</p>
                    <p className="text-[10px] text-primary-foreground/60 truncate">{phone}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Blog & News */}
        <section>
          <h3 className="text-xl font-bold mb-4">Blog & News</h3>
          <div className="rounded-lg border-l-4 border-accent bg-accent/10 p-4 shadow-soft mb-4">
            <p className="text-sm font-medium">📰 Latest real estate updates and platform news.</p>
          </div>
          <p className="text-xs text-primary-foreground/60">Live market ticker streams at the top of this footer — pause on hover.</p>
        </section>

        {/* Support / Steps */}
        <section>
          <h3 className="text-xl font-bold mb-2">Help Center & Support</h3>
          <p className="text-sm text-primary-foreground/70 mb-6">
            How to use our simple interface. Follow these simple steps to find your dream property:
          </p>
          <ol className="grid gap-4 sm:grid-cols-4 relative">
            {[
              { icon: UserPlus, label: "Create Account" },
              { icon: Search, label: "Browse Listings" },
              { icon: CalendarCheck, label: "Schedule a Tour" },
              { icon: Handshake, label: "Close the Deal" },
            ].map((s, i) => (
              <li key={i} className="relative rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 p-4 hover:bg-primary-foreground/10 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="h-9 w-9 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </span>
                  <s.icon className="h-5 w-5 text-secondary" />
                </div>
                <p className="mt-3 font-semibold text-sm">{s.label}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Contact + Trust */}
        <section className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 rounded-xl bg-brand-gradient p-6 shadow-elegant">
            <h3 className="text-xl font-bold mb-1">Contact Us</h3>
            <p className="text-sm text-primary-foreground/85 mb-4">
              Our team combines artificial intelligence with real human support to guide you.
            </p>
            <Link
              to="/consultation"
              className="inline-flex items-center gap-2 rounded-full bg-accent text-accent-foreground px-5 py-2.5 text-sm font-semibold hover:-translate-y-0.5 transition-transform shadow-soft"
            >
              Book Free Consultation — within 24h
            </Link>
            <div className="mt-5 grid sm:grid-cols-2 gap-3 text-sm text-primary-foreground/85">
              <div className="flex items-center gap-2"><Mail className="h-4 w-4" /> buildyourhom@gmail.com</div>
              <div className="flex items-center gap-2"><Phone className="h-4 w-4" /> +20111639205</div>
            </div>
          </div>

          <div className="space-y-3">
            <div className="rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 p-4 flex gap-3">
              <ShieldCheck className="h-5 w-5 text-secondary shrink-0" />
              <p className="text-xs leading-relaxed">Verified listings with transparent pricing and no hidden fees.</p>
            </div>
            <div className="rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 p-4 flex gap-3">
              <Wallet className="h-5 w-5 text-secondary shrink-0" />
              <p className="text-xs leading-relaxed">Best market deals with zero hidden commissions.</p>
            </div>
            <div className="rounded-lg bg-primary-foreground/5 border border-primary-foreground/10 p-4 flex gap-3">
              <BadgeCheck className="h-5 w-5 text-secondary shrink-0" />
              <p className="text-xs leading-relaxed">Trusted by thousands across the Arab world.</p>
            </div>
          </div>
        </section>

        {/* Explore + Social */}
        <section className="grid gap-8 md:grid-cols-2 pt-4 border-t border-primary-foreground/10">
          <div>
            <h4 className="font-semibold mb-3">Explore</h4>
            <ul className="grid grid-cols-2 gap-2 text-sm text-primary-foreground/70">
              <li><Link to="/property-types" className="hover:text-secondary transition-colors">Property Types</Link></li>
              <li><Link to="/gallery" className="hover:text-secondary transition-colors">Design Gallery</Link></li>
              <li><Link to="/properties" className="hover:text-secondary transition-colors">Listings</Link></li>
              <li><Link to="/consultation" className="hover:text-secondary transition-colors">Free Consultation</Link></li>
            </ul>
          </div>
          <div className="md:text-right">
            <h4 className="font-semibold mb-3">Follow</h4>
            <div className="flex gap-3 md:justify-end">
              {[Facebook, Instagram, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="h-9 w-9 rounded-full bg-primary-foreground/10 hover:bg-secondary flex items-center justify-center transition-colors">
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </div>

      {/* Bottom Bar */}
      <div className="bg-black/30 border-t border-primary-foreground/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-primary-foreground/70">
          <p>© 2026 BuildYourHome. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="hover:text-secondary transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-secondary transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-secondary transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
