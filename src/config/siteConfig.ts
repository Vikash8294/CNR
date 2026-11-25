import type { SiteConfig } from '../types/config';

/**
 * IMAGES: the links below are free Unsplash stock photos so the site looks
 * finished while you develop. Replace each one with your own real project
 * photos, e.g. "/assets/images/project-1.webp" (put files in public/assets/images).
 */
const u = (id: string, w = 1400) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${w}&q=80`;

export const siteConfig: SiteConfig = {
  brand: {
    name: 'Clever Nooks Realty',
    shortName: 'CNR Interio',
    tagline: 'Turnkey Interior Design, Space Optimization & Bespoke Living',
    domain: 'cnrinterio.com',
    url: 'https://www.cnrinterio.com',
    logo: '/assets/images/logo.png',
    founder: 'Pratik Singh Rajput',
    stats: [
      { label: 'Projects Delivered', value: '50+' },
      { label: 'States Served', value: '7+' },
      { label: 'Turnkey Execution', value: 'End-to-End' },
    ],
  },
  offers: {
    enabled: true,
    bannerText:
      'Limited Period Offer: Book a Free 3D Interior Consultation & Get Modular Kitchen Accessories Worth ₹25,000*',
    badgeText: 'Festive Interior Offer',
    ctaText: 'Claim Offer',
  },
  leadModal: {
    enabled: true,
    delaySeconds: 8,
    scrollTriggerPercent: 40,
    title: 'Get Your Free Interior Estimate',
    subtitle:
      'Share your space details and our design team will connect with a tailored plan.',
    endpoint: 'https://api.web3forms.com/submit', // Replace with your Web3Forms key or Cloudflare /api/lead endpoint
    accessKey: 'd2a4d979-ded9-4b3e-96e7-cf6b5903ecf1', // Add your public Web3Forms key here when ready
  },
  hero: {
    headline: 'Transforming Empty Structures Into Timeless Living Spaces',
    subheadline:
      'End-to-end residential, commercial, and office interiors crafted with marine-grade BWP plywood, custom quartz, and architectural lighting.',
    backgroundImage: u('photo-1600585154340-be6161a56a0c', 2000),
    slides: [
      u('photo-1600585154340-be6161a56a0c', 2000),
      u('photo-1618221195710-dd6b41faaea6', 2000),
      u('photo-1600607687939-ce8a6c25118c', 2000),
    ],
    primaryCta: 'Book Free Consultation',
    secondaryCta: 'View Completed Projects',
  },
  statement: {
    text: 'Good Design Begins With Space, Light And The Way You Live',
    featuredProjectIds: ['proj-1', 'proj-2', 'proj-3'],
  },
  budgetHomes: {
    enabled: true,
    title: 'Homes for every budget',
    subtitle: 'Our designers work with your requirements and your budget.',
    note: '*Starting prices are indicative. The final quote depends on your space, materials and a site visit.',
    // SAMPLE prices: replace startingAt with CNR Interio's real starting prices.
    items: [
      {
        title: '2BHK',
        image: u('photo-1618221195710-dd6b41faaea6', 900),
        startingAt: '₹6 Lakh*',
        action: 'home',
        bhk: '2',
      },
      {
        title: '3BHK',
        image: u('photo-1600607687939-ce8a6c25118c', 900),
        startingAt: '₹8 Lakh*',
        action: 'home',
        bhk: '3',
      },
      {
        title: '4BHK',
        image: u('photo-1616594039964-ae9021a400a0', 900),
        startingAt: '₹10 Lakh*',
        action: 'home',
        bhk: '4',
      },
      {
        title: 'Modular kitchens',
        image: u('photo-1556911220-bff31c812dba', 900),
        startingAt: '₹1.5 Lakh*',
        action: 'kitchen',
      },
    ],
  },
  offerings: [
    {
      title: 'Full Home Turnkey Interiors',
      description:
        'Complete design-to-handover execution for 2BHK, 3BHK, villas, and independent homes.',
      highlights: [
        '3D Design Visualization',
        'Marine-Grade BWP Plywood',
        'Dedicated Site Supervision',
      ],
    },
    {
      title: 'Modular Kitchens & Wardrobes',
      description:
        'Ergonomic, space-optimized modular kitchens with custom quartz countertops and soft-close hardware.',
      highlights: [
        'Custom Quartz Countertops',
        'Anti-Scratch Finishes',
        '10-Year Hardware Warranty',
      ],
    },
    {
      title: 'Commercial & Office Spaces',
      description:
        'Modern workspaces, retail showrooms, and studios engineered for productivity and brand impact.',
      highlights: [
        'Acoustic & Lighting Planning',
        'Fast-Track Execution',
        'Turnkey MEP & Furniture',
      ],
    },
    {
      title: 'Construction & Space Optimization',
      description:
        'Structural layout planning, renovation, false ceilings, and smart space utilization.',
      highlights: [
        'Structural Layouts',
        'Architectural Lighting',
        'Civil & Renovation Works',
      ],
    },
  ],
  designCategories: [
    {
      id: 'kitchen',
      title: 'Modular Kitchen',
      image: u('photo-1556911220-bff31c812dba', 900),
    },
    {
      id: 'living',
      title: 'Living Room',
      image: u('photo-1618221195710-dd6b41faaea6', 900),
    },
    {
      id: 'bedroom',
      title: 'Master Bedroom',
      image: u('photo-1616594039964-ae9021a400a0', 900),
    },
    {
      id: 'wardrobe',
      title: 'Wardrobes & Storage',
      image: u('photo-1595428774223-ef52624120d2', 900),
    },
    {
      id: 'ceiling',
      title: 'False Ceiling & Lighting',
      image: u('photo-1600566753190-17f0baa2a6c3', 900),
    },
    {
      id: 'commercial',
      title: 'Office & Commercial',
      image: u('photo-1497366216548-37526070297c', 900),
    },
  ],
  projects: [
    {
      id: 'proj-1',
      title: 'Modern 3BHK Turnkey Residence',
      category: 'living',
      type: 'Completed Site',
      city: 'Ranchi',
      materials: 'BWP Plywood, Italian Quartz, Warm Cove Lighting',
      image: u('photo-1600607687939-ce8a6c25118c', 1000),
      youtubeId: '', // Optional: YouTube video ID for a walkthrough
    },
    {
      id: 'proj-2',
      title: 'Contemporary Modular Kitchen & Dining',
      category: 'kitchen',
      type: 'Completed Site',
      city: 'Delhi NCR',
      materials: 'Acrylic Finish, Custom Quartz Countertop',
      image: u('photo-1556911220-bff31c812dba', 1000),
      youtubeId: '',
    },
    // The entries below are sample 3D concept visuals using stock photos. Replace or delete them.
    {
      id: 'proj-3',
      title: 'Executive Office Concept',
      category: 'commercial',
      type: '3D Visualization',
      city: 'Ranchi',
      materials: 'Veneer Panels, Acoustic Ceiling, Task Lighting',
      image: u('photo-1497366216548-37526070297c', 1000),
    },
    {
      id: 'proj-4',
      title: 'Master Suite Concept',
      category: 'bedroom',
      type: '3D Visualization',
      city: 'Delhi NCR',
      materials: 'Fluted Panelling, Warm Cove Lighting',
      image: u('photo-1616594039964-ae9021a400a0', 1000),
    },
    {
      id: 'proj-5',
      title: 'Double-Height Living Concept',
      category: 'living',
      type: '3D Visualization',
      city: 'Ranchi',
      materials: 'Marble Flooring, Architectural Lighting',
      image: u('photo-1618221195710-dd6b41faaea6', 1000),
    },
    {
      id: 'proj-6',
      title: 'Ceiling & Lighting Concept',
      category: 'ceiling',
      type: '3D Visualization',
      city: 'Delhi NCR',
      materials: 'Gypsum False Ceiling, Linear Lighting',
      image: u('photo-1600566753190-17f0baa2a6c3', 1000),
    },
  ],
  videos: [
    // Add real YouTube walkthrough / testimonial IDs, e.g.
    // { id: 'vid-1', title: '3BHK Home Walkthrough — Ranchi', youtubeId: 'YOUR_YOUTUBE_ID', city: 'Ranchi' },
  ],
  locations: {
    enabled: true,
    headline: 'Locations We Serve',
    subheadline:
      'Headquartered in Ranchi with turnkey execution across 7+ states in India.',
    cities: [
      {
        name: 'Ranchi (Headquarters)',
        state: 'Jharkhand',
        status: 'Design Studio & Turnkey Execution',
        details:
          'Full residential, commercial, and construction projects across Ranchi and nearby cities.',
      },
      {
        name: 'Delhi NCR',
        state: 'Delhi / UP / Haryana',
        status: 'Turnkey Interiors & Consultation',
        details:
          'Apartment interiors, modular kitchens, and office fit-outs across Noida, Gurugram, and Delhi.',
      },
      {
        name: 'Pan-India Multi-State Projects',
        state: '7+ States',
        status: 'On-Site Execution & 3D Design',
        details:
          'Available for turnkey residential and commercial assignments across neighboring states.',
      },
    ],
  },
  shopPreview: {
    enabled: true,
    badge: 'Launching Soon',
    title: 'Curated Furniture & Decor Studio',
    subtitle:
      'Handcrafted sofas, dining tables, and modular accent units direct from our workshop.',
    items: [
      {
        name: 'Bespoke Solid Wood Dining Set',
        category: 'Dining',
        image: u('photo-1617806118233-18e1de247200', 900),
        tag: 'Custom Order',
      },
      {
        name: 'Minimalist Lounger Sofa',
        category: 'Living',
        image: u('photo-1555041469-a586c61ea9bc', 900),
        tag: 'Made to Order',
      },
      {
        name: 'Architectural Console & TV Unit',
        category: 'Storage',
        image: u('photo-1594620302200-9a762244a156', 900),
        tag: 'Workshop Direct',
      },
    ],
  },
  contact: {
    phone: '+91 9334381189',
    whatsappNumber: '919334381189',
    whatsappDefaultMessage:
      'Hi Clever Nooks Realty, I would like to discuss an interior design project.',
    email: 'contact@cnrinterio.com',
    headquarters: 'Ranchi, Jharkhand, India',
  },
  social: {
    instagram: 'https://www.instagram.com/clever_nooks_realty/',
    youtube: 'https://www.youtube.com/@CleverNooksRealty', // Verify exact handle before launch
    linkedin: '', // Add exact company page URL; hidden while empty
  },
};
