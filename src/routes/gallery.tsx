import { createFileRoute } from "@tanstack/react-router";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Design Gallery — BuildYourHome" },
      { name: "description", content: "Explore residential apartments, villas, duplexes, country houses, studios, and custom home designs." },
    ],
  }),
  component: GalleryPage,
});

type Card = { img: string; alt: string; short: string; title: string; features: string[] };
type Section = { slug: string; title: string; cards: Card[] };

const SECTIONS: Section[] = [
  {
    "title": "Residential Apartments - Where Elegance Meets Comfort",
    "cards": [
      {
        "img": "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&auto=format&fit=crop",
        "alt": "Modern apartment living room",
        "short": "Modern Living Room",
        "title": "Elegant Living Space",
        "features": [
          "Spacious open-concept design",
          "Premium quality furnishings",
          "Abundant natural light",
          "Modern aesthetic with warm touches",
          "Perfect for entertaining"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop",
        "alt": "Elegant apartment kitchen",
        "short": "Gourmet Kitchen",
        "title": "Chef's Dream Kitchen",
        "features": [
          "Stainless steel appliances",
          "Quartz countertops",
          "Ample cabinet space",
          "Breakfast bar seating",
          "Modern backsplash"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop",
        "alt": "Stylish apartment bedroom",
        "short": "Luxury Bedroom",
        "title": "Serene Sleeping Quarters",
        "features": [
          "Spacious master suite",
          "Walk-in closet",
          "Premium carpeting",
          "Large windows",
          "Ensuite bathroom"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop",
        "alt": "Contemporary apartment dining area",
        "short": "Formal Dining",
        "title": "Elegant Dining Space",
        "features": [
          "Seats 6-8 comfortably",
          "Modern chandelier",
          "Adjacent to kitchen",
          "Open to living room",
          "Perfect for hosting"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
        "alt": "Luxury apartment balcony",
        "short": "Private Balcony",
        "title": "Outdoor Oasis",
        "features": [
          "City skyline views",
          "Space for seating",
          "Morning coffee spot",
          "Evening relaxation",
          "Fresh air retreat"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
        "alt": "City view apartment",
        "short": "Panoramic Views",
        "title": "Stunning Cityscape",
        "features": [
          "Floor-to-ceiling windows",
          "Daytime and nighttime views",
          "Natural light",
          "Urban lifestyle",
          "High-rise living"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop",
        "alt": "Minimalist apartment design",
        "short": "Minimalist Design",
        "title": "Clean & Contemporary",
        "features": [
          "Streamlined aesthetic",
          "Neutral color palette",
          "Functional spaces",
          "Quality over quantity",
          "Calming atmosphere"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop",
        "alt": "Comfortable apartment lounge",
        "short": "Cozy Lounge",
        "title": "Relaxation Space",
        "features": [
          "Plush furnishings",
          "Reading nook",
          "Entertainment center",
          "Warm lighting",
          "Personal retreat"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format&fit=crop",
        "alt": "Modern apartment workspace",
        "short": "Home Office",
        "title": "Productive Workspace",
        "features": [
          "Ergonomic design",
          "Ample natural light",
          "Built-in storage",
          "Quiet environment",
          "Professional setup"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop",
        "alt": "Apartment with open floor plan",
        "short": "Open Concept",
        "title": "Spacious Layout",
        "features": [
          "Seamless flow",
          "Multi-functional areas",
          "Entertainer's dream",
          "Family-friendly",
          "Modern living"
        ]
      }
    ],
    "slug": "apartments"
  },
  {
    "title": "Luxury Villas - Spacious Living with Refined Luxury",
    "cards": [
      {
        "img": "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop",
        "alt": "Modern luxury villa exterior",
        "short": "Grand Entrance",
        "title": "Stunning Villa Exterior",
        "features": [
          "Contemporary architecture",
          "Lush landscaping",
          "Circular driveway",
          "Double-height entry",
          "Premium materials"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop",
        "alt": "Villa with infinity pool",
        "short": "Infinity Pool",
        "title": "Resort-Style Pool",
        "features": [
          "Edge-less design",
          "Panoramic views",
          "Sun deck",
          "Pool house",
          "Outdoor shower"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&auto=format&fit=crop",
        "alt": "Luxury villa living area",
        "short": "Great Room",
        "title": "Expansive Living Space",
        "features": [
          "Vaulted ceilings",
          "Floor-to-ceiling windows",
          "Designer furnishings",
          "Fireplace",
          "Indoor-outdoor flow"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
        "alt": "Villa master bedroom",
        "short": "Master Suite",
        "title": "Luxurious Retreat",
        "features": [
          "King-sized bedroom",
          "Sitting area",
          "Walk-in closets",
          "Private balcony",
          "Spa-like bathroom"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop",
        "alt": "Villa gourmet kitchen",
        "short": "Gourmet Kitchen",
        "title": "Chef's Paradise",
        "features": [
          "Professional-grade appliances",
          "Large island",
          "Custom cabinetry",
          "Walk-in pantry",
          "Butler's kitchen"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
        "alt": "Villa outdoor dining",
        "short": "Al Fresco Dining",
        "title": "Outdoor Entertaining",
        "features": [
          "Covered patio",
          "Seating for 12",
          "Outdoor kitchen",
          "Ambient lighting",
          "Garden views"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop",
        "alt": "Villa spa bathroom",
        "short": "Spa Bathroom",
        "title": "Luxury Wellness",
        "features": [
          "Freestanding tub",
          "Steam shower",
          "Heated floors",
          "Dual vanities",
          "Premium finishes"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566752229-250db9f8c2b9?w=800&auto=format&fit=crop",
        "alt": "Villa home theater",
        "short": "Home Theater",
        "title": "Cinema Experience",
        "features": [
          "Plush seating",
          "4K projection",
          "Surround sound",
          "Acoustic treatment",
          "Concession area"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566753475-d6b5c7dc4e33?w=800&auto=format&fit=crop",
        "alt": "Villa wine cellar",
        "short": "Wine Cellar",
        "title": "Connoisseur's Collection",
        "features": [
          "Climate-controlled",
          "Custom racking",
          "Tasting area",
          "Secure storage",
          "Display lighting"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566752371-8d8b7d572d51?w=800&auto=format&fit=crop",
        "alt": "Villa landscaped garden",
        "short": "Landscaped Gardens",
        "title": "Botanical Oasis",
        "features": [
          "Professional design",
          "Mature trees",
          "Water features",
          "Outdoor lighting",
          "Privacy hedging"
        ]
      }
    ],
    "slug": "villas"
  },
  {
    "title": "Duplex Homes - Two Levels of Comfort and Privacy",
    "cards": [
      {
        "img": "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop",
        "alt": "Modern duplex exterior",
        "short": "Contemporary Facade",
        "title": "Modern Duplex Design",
        "features": [
          "Clean architectural lines",
          "Mixed materials",
          "Private entrance",
          "Two-car garage",
          "Low-maintenance exterior"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop",
        "alt": "Duplex open living area",
        "short": "Open Living",
        "title": "Spacious Common Area",
        "features": [
          "Vaulted ceiling",
          "Natural light",
          "Modern fireplace",
          "Entertainment space",
          "Designer finishes"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&auto=format&fit=crop",
        "alt": "Duplex staircase design",
        "short": "Designer Staircase",
        "title": "Architectural Centerpiece",
        "features": [
          "Floating treads",
          "Glass railings",
          "Modern design",
          "Space-saving",
          "Premium materials"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210491366-e465dfb15b38?w=800&auto=format&fit=crop",
        "alt": "Duplex upper level bedroom",
        "short": "Private Bedroom",
        "title": "Upper Level Retreat",
        "features": [
          "Quiet location",
          "Walk-in closet",
          "Ensuite bathroom",
          "Balcony access",
          "Plush carpeting"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210491565-0526e2fc6a0d?w=800&auto=format&fit=crop",
        "alt": "Duplex kitchen and dining",
        "short": "Gourmet Space",
        "title": "Chef's Kitchen & Dining",
        "features": [
          "Stainless appliances",
          "Large island",
          "Breakfast bar",
          "Formal dining area",
          "Pantry storage"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210491646-9e6e0a1df31a?w=800&auto=format&fit=crop",
        "alt": "Duplex home office",
        "short": "Home Office",
        "title": "Professional Workspace",
        "features": [
          "Quiet location",
          "Built-in shelving",
          "Natural light",
          "Ergonomic design",
          "Tech ready"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210491726-7a8c9b6b5a5d?w=800&auto=format&fit=crop",
        "alt": "Duplex private balcony",
        "short": "Private Balcony",
        "title": "Outdoor Escape",
        "features": [
          "Upper level privacy",
          "City views",
          "Morning coffee spot",
          "Evening relaxation",
          "Small garden space"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210492220-9b5b6b7d1b0a?w=800&auto=format&fit=crop",
        "alt": "Duplex entertainment room",
        "short": "Entertainment Room",
        "title": "Media Lounge",
        "features": [
          "Home theater setup",
          "Comfortable seating",
          "Sound system",
          "Game area",
          "Wet bar"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop",
        "alt": "Duplex modern bathroom",
        "short": "Spa Bathroom",
        "title": "Luxurious Bath",
        "features": [
          "Soaking tub",
          "Separate shower",
          "Dual vanities",
          "Heated floors",
          "Premium fixtures"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210491366-e465dfb15b38?w=800&auto=format&fit=crop",
        "alt": "Duplex rooftop terrace",
        "short": "Rooftop Terrace",
        "title": "Skyline Views",
        "features": [
          "Panoramic cityscape",
          "Outdoor kitchen",
          "Lounge area",
          "Dining space",
          "Evening lighting"
        ]
      }
    ],
    "slug": "duplexes"
  },
  {
    "title": "Country Houses - Nature and Tranquility Combined",
    "cards": [
      {
        "img": "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop",
        "alt": "Rustic country house exterior",
        "short": "Rustic Charm",
        "title": "Classic Country Home",
        "features": [
          "Wood and stone exterior",
          "Wraparound porch",
          "Mature trees",
          "Private driveway",
          "Rural setting"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop",
        "alt": "Country house with porch",
        "short": "Front Porch",
        "title": "Relaxing Veranda",
        "features": [
          "Rocking chairs",
          "Swing bench",
          "Ceiling fans",
          "Evening lighting",
          "Country views"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600585152220-90363fe7e115?w=800&auto=format&fit=crop",
        "alt": "Country house fireplace",
        "short": "Stone Fireplace",
        "title": "Cozy Hearth",
        "features": [
          "Floor-to-ceiling stone",
          "Wood storage",
          "Mantel display",
          "Living room centerpiece",
          "Winter warmth"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&auto=format&fit=crop",
        "alt": "Country kitchen with island",
        "short": "Farmhouse Kitchen",
        "title": "Country Cooking",
        "features": [
          "Large island",
          "Farmhouse sink",
          "Open shelving",
          "Breakfast nook",
          "Pantry space"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop",
        "alt": "Country house dining room",
        "short": "Family Dining",
        "title": "Gathering Space",
        "features": [
          "Large farm table",
          "Bench seating",
          "China cabinet",
          "Family meals",
          "Holiday hosting"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566752229-250db9f8c2b9?w=800&auto=format&fit=crop",
        "alt": "Country house master suite",
        "short": "Master Retreat",
        "title": "Private Sanctuary",
        "features": [
          "Four-poster bed",
          "Sitting area",
          "Walk-in closet",
          "Ensuite bathroom",
          "Garden views"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566753475-d6b5c7dc4e33?w=800&auto=format&fit=crop",
        "alt": "Country house garden view",
        "short": "Garden Views",
        "title": "Natural Beauty",
        "features": [
          "Flowering plants",
          "Vegetable garden",
          "Stone pathways",
          "Water feature",
          "Seasonal colors"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566752371-8d8b7d572d51?w=800&auto=format&fit=crop",
        "alt": "Country house sunroom",
        "short": "Sunroom",
        "title": "Year-Round Enjoyment",
        "features": [
          "Three-season room",
          "Natural light",
          "Indoor plants",
          "Reading nook",
          "Garden views"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566752229-250db9f8c2b9?w=800&auto=format&fit=crop",
        "alt": "Country house library",
        "short": "Home Library",
        "title": "Book Lover's Retreat",
        "features": [
          "Floor-to-ceiling shelves",
          "Ladder access",
          "Reading chairs",
          "Study desk",
          "Quiet atmosphere"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566752371-8d8b7d572d51?w=800&auto=format&fit=crop",
        "alt": "Country house backyard",
        "short": "Backyard Oasis",
        "title": "Outdoor Living",
        "features": [
          "Patio seating",
          "Fire pit",
          "Outdoor kitchen",
          "Play area",
          "Natural landscaping"
        ]
      }
    ],
    "slug": "country-houses"
  },
  {
    "title": "Studios - Smart Solutions for Compact Living",
    "cards": [
      {
        "img": "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop",
        "alt": "Modern studio apartment",
        "short": "Efficient Layout",
        "title": "Smart Studio Design",
        "features": [
          "Space-saving solutions",
          "Multi-functional areas",
          "Built-in storage",
          "Modern finishes",
          "Natural light"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
        "alt": "Studio with convertible furniture",
        "short": "Convertible Furniture",
        "title": "Transformative Living",
        "features": [
          "Murphy bed",
          "Fold-down desk",
          "Nesting tables",
          "Storage ottoman",
          "Space optimization"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop",
        "alt": "Efficient studio kitchen",
        "short": "Compact Kitchen",
        "title": "Efficient Cooking Space",
        "features": [
          "Two-burner cooktop",
          "Under-counter fridge",
          "Pull-out pantry",
          "Stackable washer/dryer",
          "Vertical storage"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop",
        "alt": "Studio sleeping area",
        "short": "Sleeping Nook",
        "title": "Cozy Bed Area",
        "features": [
          "Loft bed",
          "Room divider",
          "Bedside storage",
          "Blackout curtains",
          "Reading lights"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800&auto=format&fit=crop",
        "alt": "Studio workspace",
        "short": "Workstation",
        "title": "Productive Corner",
        "features": [
          "Wall-mounted desk",
          "Task lighting",
          "Cable management",
          "Ergonomic chair",
          "Shelving above"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format&fit=crop",
        "alt": "Studio bathroom design",
        "short": "Compact Bath",
        "title": "Efficient Bathroom",
        "features": [
          "Space-saving fixtures",
          "Corner shower",
          "Floating vanity",
          "Medicine cabinet",
          "Stacked storage"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop",
        "alt": "Studio with smart storage",
        "short": "Smart Storage",
        "title": "Organized Living",
        "features": [
          "Under-bed drawers",
          "Wall-mounted shelves",
          "Multi-purpose furniture",
          "Vertical organization",
          "Hidden compartments"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600121848594-d8644e57abab?w=800&auto=format&fit=crop",
        "alt": "Studio living area",
        "short": "Living Space",
        "title": "Comfortable Lounge",
        "features": [
          "Convertible sofa",
          "Nesting tables",
          "Entertainment center",
          "Accent lighting",
          "Area rug"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210492493-0946911123ea?w=800&auto=format&fit=crop",
        "alt": "Studio dining nook",
        "short": "Dining Area",
        "title": "Compact Dining",
        "features": [
          "Drop-leaf table",
          "Foldable chairs",
          "Breakfast bar",
          "Wall-mounted options",
          "Multi-purpose space"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600210491366-e465dfb15b38?w=800&auto=format&fit=crop",
        "alt": "Studio balcony space",
        "short": "Balcony Retreat",
        "title": "Outdoor Extension",
        "features": [
          "Compact bistro set",
          "Vertical garden",
          "City views",
          "Privacy screens",
          "Fresh air access"
        ]
      }
    ],
    "slug": "studios"
  },
  {
    "title": "Custom Designs - Your Home, Your Style",
    "cards": [
      {
        "img": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop",
        "alt": "Luxury custom design bathroom",
        "short": "Luxury - Made to order.",
        "title": "Luxury Custom Design",
        "features": [
          "Luxury finishes",
          "Innovative architectural details",
          "Spaces according to your needs",
          "Integrated smart services",
          "Complete comfort and privacy"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=800&auto=format&fit=crop",
        "alt": "Modern custom design living room",
        "short": "Modern - Clear lines.",
        "title": "Modern Custom Design",
        "features": [
          "Neutral colors and modern lines",
          "Ample natural lighting",
          "Custom furniture",
          "Smart space division",
          "Comfort and flexibility"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop",
        "alt": "Family custom design bedroom",
        "short": "Family - Multiple rooms.",
        "title": "Family Custom Design",
        "features": [
          "Bedrooms and living rooms to order",
          "Play areas for children",
          "Spacious modern kitchen",
          "Back garden",
          "Warm atmosphere for family"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop",
        "alt": "Bohemian custom design living space",
        "short": "Bohemian - Warm colors.",
        "title": "Bohemian Custom Design",
        "features": [
          "Warm colors and handmade decorations",
          "Comfortable outdoor seating",
          "Natural plants in every corner",
          "Soft lighting",
          "Relaxation spaces"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600607688969-a5bfcd646154?w=800&auto=format&fit=crop",
        "alt": "Scandinavian custom design interior",
        "short": "Scandinavian - Simplicity and elegance.",
        "title": "Scandinavian Custom Design",
        "features": [
          "Light colors and simple lines",
          "Ample natural lighting",
          "Practical and comfortable furniture",
          "Wooden details",
          "Spacious balconies"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop",
        "alt": "Luxury custom design with pool",
        "short": "Luxury - Private pool.",
        "title": "Luxury Custom Design with Pool",
        "features": [
          "Private pool and garden",
          "High-quality finishes",
          "Home cinema room",
          "Integrated security system",
          "Panoramic view"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=800&auto=format&fit=crop",
        "alt": "Smart custom design home",
        "short": "Smart - Advanced control systems.",
        "title": "Smart Custom Design",
        "features": [
          "Remote control for lighting and AC",
          "Security systems and cameras",
          "Voice assistant",
          "Futuristic design",
          "High comfort and luxury"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop",
        "alt": "Beach custom design villa",
        "short": "Beach - Sea view.",
        "title": "Beach Custom Design",
        "features": [
          "Balconies overlooking the sea",
          "Outdoor seating on the sand",
          "Panoramic windows",
          "Humidity-resistant furniture",
          "Unique relaxation atmosphere"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1600566752371-8d8b7d572d51?w=800&auto=format&fit=crop",
        "alt": "Exceptional custom design architecture",
        "short": "Exceptional - Unique design.",
        "title": "Exceptional Custom Design",
        "features": [
          "Innovative architecture",
          "Open spaces and natural lighting",
          "Luxury finishes",
          "Integrated entertainment facilities",
          "Unparalleled living experience"
        ]
      },
      {
        "img": "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800&auto=format&fit=crop",
        "alt": "Practical custom design space",
        "short": "Practical - Smart space utilization.",
        "title": "Practical Custom Design",
        "features": [
          "Smart space division",
          "Multi-purpose rooms",
          "Durable and practical finishes",
          "Open modern kitchen",
          "Comfort and usage flexibility"
        ]
      }
    ],
    "slug": "custom-designs"
  }
];

function GalleryPage() {
  return (
    <div className="bg-background">
      {/* Hero */}
      <section className="relative bg-hero-gradient text-primary-foreground py-20 md:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%)]" />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Explore Our Design Gallery</h1>
          <p className="text-lg md:text-xl opacity-90 max-w-2xl mx-auto mb-8">
            Discover inspiring home designs across every style — from compact studios to luxurious villas.
          </p>
          <a href="#apartments" className="inline-block bg-accent text-accent-foreground px-6 py-3 rounded-lg font-bold hover:-translate-y-0.5 transition shadow-soft">
            View Gallery
          </a>
        </div>
      </section>

      {/* Sticky category nav */}
      <nav className="sticky top-0 z-40 bg-primary text-primary-foreground shadow-soft">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 md:gap-4 overflow-x-auto py-3 no-scrollbar">
            {SECTIONS.map((s) => (
              <a
                key={s.slug}
                href={`#${s.slug}`}
                className="whitespace-nowrap px-4 py-2 rounded-full text-sm font-medium bg-white/10 hover:bg-secondary transition"
              >
                {s.title.split(" - ")[0]}
              </a>
            ))}
          </div>
        </div>
      </nav>

      {/* Sections */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16 space-y-20">
        {SECTIONS.map((section) => (
          <GallerySection key={section.slug} section={section} />
        ))}
      </div>
    </div>
  );
}

function GallerySection({ section }: { section: Section }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: number) => {
    trackRef.current?.scrollBy({ left: dir * 320, behavior: "smooth" });
  };
  const [main, sub] = section.title.split(" - ");
  return (
    <section id={section.slug} className="scroll-mt-24">
      <div className="mb-6 pl-4 border-l-4 border-secondary">
        <h2 className="text-2xl md:text-3xl font-bold text-primary">{main}</h2>
        {sub && <p className="text-muted-foreground mt-1">{sub}</p>}
      </div>

      <div className="relative group">
        <button
          aria-label="Scroll left"
          onClick={() => scroll(-1)}
          className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant hover:bg-secondary transition"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>

        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory no-scrollbar scroll-smooth"
        >
          {section.cards.map((card, i) => (
            <GalleryCard key={i} card={card} />
          ))}
        </div>

        <button
          aria-label="Scroll right"
          onClick={() => scroll(1)}
          className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-elegant hover:bg-secondary transition"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </section>
  );
}

function GalleryCard({ card }: { card: Card }) {
  return (
    <article className="group relative w-[260px] flex-shrink-0 snap-start rounded-2xl overflow-hidden bg-card shadow-soft hover:shadow-elegant transition-all duration-300 hover:-translate-y-1">
      <div className="relative h-[180px] overflow-hidden">
        <img
          src={card.img}
          alt={card.alt}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute bottom-0 left-0 right-0 bg-primary/85 text-primary-foreground px-4 py-2 text-sm font-medium">
          {card.short}
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-primary/95 text-primary-foreground p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col">
          <button className="self-end bg-accent text-accent-foreground rounded-full px-3 py-1 text-xs font-bold mb-2 hover:scale-105 transition">
            More...
          </button>
          <h3 className="text-base font-bold mb-2">{card.title}</h3>
          <ul className="text-xs space-y-1 list-disc list-inside opacity-95">
            {card.features.map((f, i) => (
              <li key={i}>{f}</li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}
