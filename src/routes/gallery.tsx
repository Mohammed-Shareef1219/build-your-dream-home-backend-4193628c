import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Design Gallery — BuildYourHome" },
      { name: "description", content: "Inspiring home design ideas across every style." },
    ],
  }),
  component: GalleryPage,
});

const SECTIONS = [
  {
    title: "Villas — Luxurious and Modern",
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800",
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
    ],
  },
  {
    title: "Duplex Homes — Two Levels of Comfort",
    images: [
      "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800",
      "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800",
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800",
      "https://images.unsplash.com/photo-1600210491366-e465dfb15b38?w=800",
    ],
  },
  {
    title: "Country Houses — Nature & Tranquility",
    images: [
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800",
      "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800",
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800",
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800",
    ],
  },
];

function GalleryPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Design Gallery</h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Inspiration across every style — from minimalist apartments to luxurious countryside estates.
        </p>
      </div>

      {SECTIONS.map((s) => (
        <section key={s.title} className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-6 pl-4 border-l-4 border-secondary">
            {s.title}
          </h2>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            {s.images.map((img, i) => (
              <div
                key={i}
                className="group relative aspect-square overflow-hidden rounded-xl shadow-soft hover:shadow-elegant transition-all"
              >
                <img
                  src={img}
                  alt={`${s.title} ${i + 1}`}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/40 transition-colors" />
              </div>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
