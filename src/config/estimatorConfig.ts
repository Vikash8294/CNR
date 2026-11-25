// export type CalcType = 'home' | 'kitchen' | 'wardrobe';
// export type PackageId = 'essentials' | 'premium' | 'luxe';
// export type OpenEstimate = (type: CalcType) => void;

// type Rates = Record<PackageId, number>;

// export interface PackageInfo {
//   id: PackageId;
//   label: string;
//   description: string;
//   points: string[];
// }

// export interface EstimatorConfig {
//   showPrice: boolean;
//   rangePercent: number;
//   disclaimer: string;
//   packages: PackageInfo[];
//   home: {
//     bhk: { id: string; label: string; rooms: Record<string, number> }[];
//     rooms: { id: string; label: string; max: number }[];
//     roomRates: Record<string, Rates>;
//   };
//   kitchen: {
//     layouts: {
//       id: string;
//       label: string;
//       sides: string[];
//       defaults: number[];
//     }[];
//     minFt: number;
//     maxFt: number;
//     ratePerFoot: Rates;
//   };
//   wardrobe: {
//     types: { id: string; label: string; multiplier: number }[];
//     widthFt: { min: number; max: number; default: number };
//     heightFt: { min: number; max: number; default: number };
//     ratePerSqft: Rates;
//   };
// }

// /**
//  * IMPORTANT: every rate and package description below is SAMPLE data.
//  * Replace with CNR Interio's real rates before launch.
//  * Set showPrice to false to collect the customer's choices without showing a price.
//  */
// export const estimator: EstimatorConfig = {
//   showPrice: true,
//   rangePercent: 10,
//   disclaimer:
//     'This is an approximate range based on the details you selected. The final quote is confirmed after a site visit and design discussion.',
//   packages: [
//     {
//       id: 'essentials',
//       label: 'Essential',
//       description:
//         'Practical, well-planned interiors that keep the budget in check.',
//       points: [
//         'Marine-grade BWP plywood',
//         'Practical finishes and layouts',
//         'Standard hardware',
//       ],
//     },
//     {
//       id: 'premium',
//       label: 'Signature',
//       description:
//         'A wider choice of finishes with upgraded hardware and detailing.',
//       points: [
//         'Wider choice of finishes',
//         'Upgraded hardware and accessories',
//         'Detailed 3D design',
//       ],
//     },
//     {
//       id: 'luxe',
//       label: 'Luxury',
//       description:
//         'Bespoke detailing and premium materials for a high-end result.',
//       points: [
//         'Premium finishes and custom detailing',
//         'Architectural lighting plan',
//         'Custom quartz and bespoke elements',
//       ],
//     },
//   ],
//   home: {
//     bhk: [
//       {
//         id: '1',
//         label: '1 BHK',
//         rooms: { living: 1, kitchen: 1, bedroom: 1, bathroom: 1, dining: 0 },
//       },
//       {
//         id: '2',
//         label: '2 BHK',
//         rooms: { living: 1, kitchen: 1, bedroom: 2, bathroom: 2, dining: 1 },
//       },
//       {
//         id: '3',
//         label: '3 BHK',
//         rooms: { living: 1, kitchen: 1, bedroom: 3, bathroom: 3, dining: 1 },
//       },
//       {
//         id: '4',
//         label: '4 BHK',
//         rooms: { living: 1, kitchen: 1, bedroom: 4, bathroom: 4, dining: 1 },
//       },
//       {
//         id: '5',
//         label: '5 BHK or more',
//         rooms: { living: 1, kitchen: 1, bedroom: 5, bathroom: 5, dining: 1 },
//       },
//     ],
//     rooms: [
//       { id: 'living', label: 'Living Room', max: 3 },
//       { id: 'kitchen', label: 'Kitchen', max: 2 },
//       { id: 'bedroom', label: 'Bedroom', max: 8 },
//       { id: 'bathroom', label: 'Bathroom', max: 8 },
//       { id: 'dining', label: 'Dining', max: 2 },
//     ],
//     // SAMPLE rupee rates per room
//     roomRates: {
//       living: { essentials: 90000, premium: 140000, luxe: 220000 },
//       kitchen: { essentials: 120000, premium: 180000, luxe: 280000 },
//       bedroom: { essentials: 100000, premium: 160000, luxe: 250000 },
//       bathroom: { essentials: 40000, premium: 60000, luxe: 90000 },
//       dining: { essentials: 50000, premium: 80000, luxe: 130000 },
//     },
//   },
//   kitchen: {
//     layouts: [
//       { id: 'l', label: 'L-shaped', sides: ['A', 'B'], defaults: [8, 10] },
//       { id: 'straight', label: 'Straight', sides: ['A'], defaults: [10] },
//       {
//         id: 'u',
//         label: 'U-shaped',
//         sides: ['A', 'B', 'C'],
//         defaults: [8, 10, 8],
//       },
//       {
//         id: 'parallel',
//         label: 'Parallel',
//         sides: ['A', 'B'],
//         defaults: [10, 10],
//       },
//     ],
//     minFt: 3,
//     maxFt: 20,
//     // SAMPLE rupee rate per running foot
//     ratePerFoot: { essentials: 6000, premium: 9000, luxe: 14000 },
//   },
//   wardrobe: {
//     types: [
//       { id: 'hinged', label: 'Hinged doors', multiplier: 1 },
//       { id: 'sliding', label: 'Sliding doors', multiplier: 1.15 },
//       { id: 'walkin', label: 'Walk-in wardrobe', multiplier: 1.3 },
//     ],
//     widthFt: { min: 3, max: 16, default: 6 },
//     heightFt: { min: 7, max: 10, default: 8 },
//     // SAMPLE rupee rate per square foot
//     ratePerSqft: { essentials: 1100, premium: 1600, luxe: 2400 },
//   },
// };

export type CalcType = 'home' | 'kitchen' | 'wardrobe';
export type PackageId = 'essentials' | 'premium' | 'luxe';

export interface EstimatePreset {
  bhk?: string;
}
export type OpenEstimate = (type: CalcType, preset?: EstimatePreset) => void;

type Rates = Record<PackageId, number>;

export interface PackageInfo {
  id: PackageId;
  label: string;
  description: string;
  image: string;
  points: string[];
}

export interface EstimatorConfig {
  showPrice: boolean;
  rangePercent: number;
  disclaimer: string;
  packages: PackageInfo[];
  home: {
    bhk: { id: string; label: string; rooms: Record<string, number> }[];
    rooms: { id: string; label: string; max: number }[];
    roomRates: Record<string, Rates>;
  };
  kitchen: {
    layouts: {
      id: string;
      label: string;
      sides: string[];
      defaults: number[];
    }[];
    minFt: number;
    maxFt: number;
    ratePerFoot: Rates;
  };
  wardrobe: {
    types: { id: string; label: string; multiplier: number }[];
    widthFt: { min: number; max: number; default: number };
    heightFt: { min: number; max: number; default: number };
    ratePerSqft: Rates;
  };
}

const img = (id: string) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=1000&q=80`;

/**
 * IMPORTANT: every rate, package description and package image below is SAMPLE data.
 * Replace with CNR Interio's real rates and your own project photos before launch.
 * Set showPrice to false to collect the customer's choices without showing a price.
 */
export const estimator: EstimatorConfig = {
  showPrice: true,
  rangePercent: 10,
  disclaimer:
    'This is an approximate range based on the details you selected. The final quote is confirmed after a site visit and design discussion.',
  packages: [
    {
      id: 'essentials',
      label: 'Essential',
      description:
        'Practical, well-planned interiors that keep the budget in check.',
      image: img('photo-1618221195710-dd6b41faaea6'),
      points: [
        'Marine-grade BWP plywood',
        'Practical finishes and layouts',
        'Standard hardware',
      ],
    },
    {
      id: 'premium',
      label: 'Signature',
      description:
        'A wider choice of finishes with upgraded hardware and detailing.',
      image: img('photo-1600607687939-ce8a6c25118c'),
      points: [
        'Wider choice of finishes',
        'Upgraded hardware and accessories',
        'Detailed 3D design',
      ],
    },
    {
      id: 'luxe',
      label: 'Luxury',
      description:
        'Bespoke detailing and premium materials for a high-end result.',
      image: img('photo-1600585154340-be6161a56a0c'),
      points: [
        'Premium finishes and custom detailing',
        'Architectural lighting plan',
        'Custom quartz and bespoke elements',
      ],
    },
  ],
  home: {
    bhk: [
      {
        id: '1',
        label: '1 BHK',
        rooms: { living: 1, kitchen: 1, bedroom: 1, bathroom: 1, dining: 0 },
      },
      {
        id: '2',
        label: '2 BHK',
        rooms: { living: 1, kitchen: 1, bedroom: 2, bathroom: 2, dining: 1 },
      },
      {
        id: '3',
        label: '3 BHK',
        rooms: { living: 1, kitchen: 1, bedroom: 3, bathroom: 3, dining: 1 },
      },
      {
        id: '4',
        label: '4 BHK',
        rooms: { living: 1, kitchen: 1, bedroom: 4, bathroom: 4, dining: 1 },
      },
      {
        id: '5',
        label: '5 BHK or more',
        rooms: { living: 1, kitchen: 1, bedroom: 5, bathroom: 5, dining: 1 },
      },
    ],
    rooms: [
      { id: 'living', label: 'Living Room', max: 3 },
      { id: 'kitchen', label: 'Kitchen', max: 2 },
      { id: 'bedroom', label: 'Bedroom', max: 8 },
      { id: 'bathroom', label: 'Bathroom', max: 8 },
      { id: 'dining', label: 'Dining', max: 2 },
    ],
    // SAMPLE rupee rates per room
    roomRates: {
      living: { essentials: 90000, premium: 140000, luxe: 220000 },
      kitchen: { essentials: 120000, premium: 180000, luxe: 280000 },
      bedroom: { essentials: 100000, premium: 160000, luxe: 250000 },
      bathroom: { essentials: 40000, premium: 60000, luxe: 90000 },
      dining: { essentials: 50000, premium: 80000, luxe: 130000 },
    },
  },
  kitchen: {
    layouts: [
      { id: 'l', label: 'L-shaped', sides: ['A', 'B'], defaults: [8, 10] },
      { id: 'straight', label: 'Straight', sides: ['A'], defaults: [10] },
      {
        id: 'u',
        label: 'U-shaped',
        sides: ['A', 'B', 'C'],
        defaults: [8, 10, 8],
      },
      {
        id: 'parallel',
        label: 'Parallel',
        sides: ['A', 'B'],
        defaults: [10, 10],
      },
    ],
    minFt: 3,
    maxFt: 20,
    // SAMPLE rupee rate per running foot
    ratePerFoot: { essentials: 6000, premium: 9000, luxe: 14000 },
  },
  wardrobe: {
    types: [
      { id: 'hinged', label: 'Hinged doors', multiplier: 1 },
      { id: 'sliding', label: 'Sliding doors', multiplier: 1.15 },
      { id: 'walkin', label: 'Walk-in wardrobe', multiplier: 1.3 },
    ],
    widthFt: { min: 3, max: 16, default: 6 },
    heightFt: { min: 7, max: 10, default: 8 },
    // SAMPLE rupee rate per square foot
    ratePerSqft: { essentials: 1100, premium: 1600, luxe: 2400 },
  },
};
