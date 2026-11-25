// export interface Stat {
//   label: string;
//   value: string;
// }

// export interface ProjectItem {
//   id: string;
//   title: string;
//   category: string;
//   type: 'Completed Site' | '3D Visualization';
//   city: string;
//   materials?: string;
//   image: string;
//   youtubeId?: string;
// }

// export interface VideoItem {
//   id: string;
//   title: string;
//   youtubeId: string;
//   city?: string;
//   image?: string;
// }

// export interface Offering {
//   title: string;
//   description: string;
//   highlights: string[];
// }
// export interface DesignCategory {
//   id: string;
//   title: string;
//   image: string;
// }
// export interface CityInfo {
//   name: string;
//   state: string;
//   status: string;
//   details: string;
// }
// export interface ShopItem {
//   name: string;
//   category: string;
//   image: string;
//   tag: string;
// }

// export interface BudgetHomeItem {
//   title: string;
//   image: string;
//   startingAt: string;
//   action: 'home' | 'kitchen' | 'wardrobe' | 'lead';
//   requirement?: string;
// }

// export interface SiteConfig {
//   brand: {
//     name: string;
//     shortName: string;
//     tagline: string;
//     domain: string;
//     url: string;
//     logo: string;
//     founder: string;
//     stats: Stat[];
//   };
//   offers: {
//     enabled: boolean;
//     bannerText: string;
//     badgeText: string;
//     ctaText: string;
//   };
//   leadModal: {
//     enabled: boolean;
//     delaySeconds: number;
//     scrollTriggerPercent: number;
//     title: string;
//     subtitle: string;
//     endpoint: string;
//     accessKey: string;
//   };
//   hero: {
//     headline: string;
//     subheadline: string;
//     backgroundImage: string;
//     slides?: string[];
//     primaryCta: string;
//     secondaryCta: string;
//   };
//   statement: { text: string; featuredProjectIds: string[] };
//   offerings: Offering[];
//   designCategories: DesignCategory[];
//   projects: ProjectItem[];
//   videos: VideoItem[];
//   locations: {
//     enabled: boolean;
//     headline: string;
//     subheadline: string;
//     cities: CityInfo[];
//   };
//   shopPreview: {
//     enabled: boolean;
//     badge: string;
//     title: string;
//     subtitle: string;
//     items: ShopItem[];
//   };
//   contact: {
//     phone: string;
//     whatsappNumber: string;
//     whatsappDefaultMessage: string;
//     email: string;
//     headquarters: string;
//   };
//   social: { instagram: string; youtube: string; linkedin: string };
// }

// export interface LeadPrefill {
//   offer?: string;
//   city?: string;
//   requirement?: string;
// }
// export type OpenLead = (prefill?: LeadPrefill) => void;

export interface Stat {
  label: string;
  value: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: string;
  type: 'Completed Site' | '3D Visualization';
  city: string;
  materials?: string;
  image: string;
  youtubeId?: string;
}

export interface VideoItem {
  id: string;
  title: string;
  youtubeId: string;
  city?: string;
  image?: string;
}

export interface Offering {
  title: string;
  description: string;
  highlights: string[];
}

export interface DesignCategory {
  id: string;
  title: string;
  image: string;
}

export interface CityInfo {
  name: string;
  state: string;
  status: string;
  details: string;
}

export interface ShopItem {
  name: string;
  category: string;
  image: string;
  tag: string;
}

export interface BudgetHomeItem {
  title: string;
  image: string;
  startingAt: string;
  action: 'home' | 'kitchen' | 'wardrobe' | 'lead';
  bhk?: string;
  requirement?: string;
}

export interface SiteConfig {
  brand: {
    name: string;
    shortName: string;
    tagline: string;
    domain: string;
    url: string;
    logo: string;
    founder: string;
    stats: Stat[];
  };
  offers: {
    enabled: boolean;
    bannerText: string;
    badgeText: string;
    ctaText: string;
  };
  leadModal: {
    enabled: boolean;
    delaySeconds: number;
    scrollTriggerPercent: number;
    title: string;
    subtitle: string;
    endpoint: string;
    accessKey: string;
  };
  hero: {
    headline: string;
    subheadline: string;
    backgroundImage: string;
    slides?: string[];
    primaryCta: string;
    secondaryCta: string;
  };
  statement: { text: string; featuredProjectIds: string[] };
  budgetHomes: {
    enabled: boolean;
    title: string;
    subtitle: string;
    note: string;
    items: BudgetHomeItem[];
  };
  offerings: Offering[];
  designCategories: DesignCategory[];
  projects: ProjectItem[];
  videos: VideoItem[];
  locations: {
    enabled: boolean;
    headline: string;
    subheadline: string;
    cities: CityInfo[];
  };
  shopPreview: {
    enabled: boolean;
    badge: string;
    title: string;
    subtitle: string;
    items: ShopItem[];
  };
  contact: {
    phone: string;
    whatsappNumber: string;
    whatsappDefaultMessage: string;
    email: string;
    headquarters: string;
  };
  social: { instagram: string; youtube: string; linkedin: string };
}

export interface LeadPrefill {
  offer?: string;
  city?: string;
  requirement?: string;
}

export type OpenLead = (prefill?: LeadPrefill) => void;
