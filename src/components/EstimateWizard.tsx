// import { useEffect, useMemo, useState } from 'react';
// import type { FormEvent } from 'react';
// import {
//   Check,
//   CheckCircle2,
//   Loader2,
//   MessageCircle,
//   Minus,
//   Plus,
//   X,
// } from 'lucide-react';
// import { siteConfig } from '../config/siteConfig';
// import { estimator } from '../config/estimatorConfig';
// import type { CalcType, PackageId } from '../config/estimatorConfig';

// interface Props {
//   type: CalcType;
//   onClose: () => void;
//   onSubmitted: () => void;
// }

// const STEPS: Record<CalcType, string[]> = {
//   home: ['BHK type', 'Rooms', 'Package', 'Get quote'],
//   kitchen: ['Layout', 'Measurements', 'Package', 'Get quote'],
//   wardrobe: ['Type', 'Size', 'Package', 'Get quote'],
// };

// const TITLES: Record<CalcType, string[]> = {
//   home: [
//     'Select your BHK type',
//     'Select the rooms you want us to design',
//     'Pick your package',
//     'Your estimate is almost ready',
//   ],
//   kitchen: [
//     'Select the layout of your kitchen',
//     'Review the measurements',
//     'Pick your package',
//     'Your kitchen estimate is almost ready',
//   ],
//   wardrobe: [
//     'Select your wardrobe type',
//     'Enter the wardrobe size',
//     'Pick your package',
//     'Your wardrobe estimate is almost ready',
//   ],
// };

// const NAMES: Record<CalcType, string> = {
//   home: 'Full home interior estimate',
//   kitchen: 'Modular kitchen estimate',
//   wardrobe: 'Wardrobe estimate',
// };

// const inr = new Intl.NumberFormat('en-IN', {
//   style: 'currency',
//   currency: 'INR',
//   maximumFractionDigits: 0,
// });
// const range = (from: number, to: number) =>
//   Array.from({ length: to - from + 1 }, (_, i) => from + i);

// function LayoutIcon({ id }: { id: string }) {
//   const fill = '#E7DCCB';
//   const stroke = '#B08D57';
//   const common = { fill, stroke, strokeWidth: 1.5 };
//   return (
//     <svg
//       viewBox="0 0 120 80"
//       className="h-24 w-full"
//       role="img"
//       aria-label={`${id} kitchen layout`}
//     >
//       {id === 'l' && (
//         <>
//           <rect x="10" y="10" width="100" height="18" {...common} />
//           <rect x="10" y="10" width="18" height="60" {...common} />
//         </>
//       )}
//       {id === 'straight' && (
//         <rect x="10" y="31" width="100" height="18" {...common} />
//       )}
//       {id === 'u' && (
//         <>
//           <rect x="10" y="10" width="100" height="18" {...common} />
//           <rect x="10" y="10" width="18" height="60" {...common} />
//           <rect x="92" y="10" width="18" height="60" {...common} />
//         </>
//       )}
//       {id === 'parallel' && (
//         <>
//           <rect x="10" y="12" width="100" height="16" {...common} />
//           <rect x="10" y="52" width="100" height="16" {...common} />
//         </>
//       )}
//     </svg>
//   );
// }

// export default function EstimateWizard({ type, onClose, onSubmitted }: Props) {
//   const cfg = estimator;
//   const { brand, contact, leadModal } = siteConfig;
//   const labels = STEPS[type];

//   const [step, setStep] = useState(0);
//   const [pkg, setPkg] = useState<PackageId | null>(null);

//   // home
//   const defaultBhk = cfg.home.bhk[Math.min(1, cfg.home.bhk.length - 1)];
//   const [bhk, setBhk] = useState(defaultBhk.id);
//   const [rooms, setRooms] = useState<Record<string, number>>({
//     ...defaultBhk.rooms,
//   });
//   // kitchen
//   const [layoutId, setLayoutId] = useState<string | null>(null);
//   const [dims, setDims] = useState<number[]>([]);
//   // wardrobe
//   const [wType, setWType] = useState<string | null>(null);
//   const [width, setWidth] = useState(cfg.wardrobe.widthFt.default);
//   const [height, setHeight] = useState(cfg.wardrobe.heightFt.default);
//   // contact + result
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [city, setCity] = useState('');
//   const [error, setError] = useState('');
//   const [sending, setSending] = useState(false);
//   const [done, setDone] = useState(false);
//   const [sentOnline, setSentOnline] = useState(false);
//   const [waLink, setWaLink] = useState('');

//   useEffect(() => {
//     const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
//     document.addEventListener('keydown', onKey);
//     document.body.style.overflow = 'hidden';
//     return () => {
//       document.removeEventListener('keydown', onKey);
//       document.body.style.overflow = '';
//     };
//   }, [onClose]);

//   const layout = cfg.kitchen.layouts.find((l) => l.id === layoutId);
//   const wardrobeType = cfg.wardrobe.types.find((t) => t.id === wType);

//   const total = useMemo(() => {
//     if (!pkg) return 0;
//     if (type === 'home') {
//       return cfg.home.rooms.reduce(
//         (sum, r) =>
//           sum + (rooms[r.id] ?? 0) * (cfg.home.roomRates[r.id]?.[pkg] ?? 0),
//         0
//       );
//     }
//     if (type === 'kitchen') {
//       return dims.reduce((a, b) => a + b, 0) * cfg.kitchen.ratePerFoot[pkg];
//     }
//     return (
//       width *
//       height *
//       cfg.wardrobe.ratePerSqft[pkg] *
//       (wardrobeType?.multiplier ?? 1)
//     );
//   }, [pkg, type, rooms, dims, width, height, wardrobeType, cfg]);

//   const showPrice = cfg.showPrice && total > 0;
//   const low = Math.round((total * (1 - cfg.rangePercent / 100)) / 1000) * 1000;
//   const high = Math.round((total * (1 + cfg.rangePercent / 100)) / 1000) * 1000;
//   const pkgLabel = cfg.packages.find((p) => p.id === pkg)?.label ?? '';

//   function summary(): string {
//     if (type === 'home') {
//       const bhkLabel = cfg.home.bhk.find((b) => b.id === bhk)?.label ?? '';
//       const list = cfg.home.rooms
//         .filter((r) => (rooms[r.id] ?? 0) > 0)
//         .map((r) => `${r.label} x${rooms[r.id]}`)
//         .join(', ');
//       return `${NAMES.home}: ${bhkLabel}; ${list}; ${pkgLabel} package`;
//     }
//     if (type === 'kitchen') {
//       const sides = layout
//         ? layout.sides.map((s, i) => `${s}=${dims[i]}ft`).join(', ')
//         : '';
//       return `${NAMES.kitchen}: ${layout?.label} layout (${sides}); ${pkgLabel} package`;
//     }
//     return `${NAMES.wardrobe}: ${wardrobeType?.label}, ${width}ft wide x ${height}ft high; ${pkgLabel} package`;
//   }

//   function canNext(): boolean {
//     if (step === 0)
//       return type === 'home'
//         ? Boolean(bhk)
//         : type === 'kitchen'
//         ? Boolean(layoutId)
//         : Boolean(wType);
//     if (step === 1)
//       return type === 'home' ? Object.values(rooms).some((n) => n > 0) : true;
//     if (step === 2) return Boolean(pkg);
//     return true;
//   }

//   function chooseBhk(id: string) {
//     setBhk(id);
//     const preset = cfg.home.bhk.find((b) => b.id === id);
//     if (preset) setRooms({ ...preset.rooms });
//   }
//   function chooseLayout(id: string) {
//     setLayoutId(id);
//     const l = cfg.kitchen.layouts.find((x) => x.id === id);
//     if (l) setDims([...l.defaults]);
//   }
//   function bump(id: string, delta: number, max: number) {
//     setRooms((r) => ({
//       ...r,
//       [id]: Math.min(max, Math.max(0, (r[id] ?? 0) + delta)),
//     }));
//   }

//   async function submit(e: FormEvent) {
//     e.preventDefault();
//     setError('');
//     const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
//     if (name.trim().length < 2) return setError('Enter your full name.');
//     if (!/^\d{10}$/.test(digits))
//       return setError('Enter a 10-digit phone number.');
//     if (city.trim().length < 2) return setError('Enter your city.');

//     const details = summary();
//     const estimateText = showPrice
//       ? `${inr.format(low)} to ${inr.format(high)}`
//       : '';
//     const message =
//       `Hi ${brand.name}, I'm ${name.trim()} from ${city.trim()}. ${details}.` +
//       `${
//         estimateText ? ` Estimate shown: ${estimateText}.` : ''
//       } Phone: ${digits}`;
//     setWaLink(
//       `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
//         message
//       )}`
//     );

//     if (leadModal.endpoint && leadModal.accessKey) {
//       setSending(true);
//       try {
//         const res = await fetch(leadModal.endpoint, {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//           },
//           body: JSON.stringify({
//             access_key: leadModal.accessKey,
//             subject: `New estimate request: ${NAMES[type]}`,
//             from_name: brand.shortName,
//             name: name.trim(),
//             phone: digits,
//             city: city.trim(),
//             requirement: NAMES[type],
//             details,
//             estimate: estimateText,
//           }),
//         });
//         const data = await res.json().catch(() => ({}));
//         setSentOnline(res.ok && data.success !== false);
//       } catch {
//         setSentOnline(false);
//       } finally {
//         setSending(false);
//       }
//     }
//     setDone(true);
//     onSubmitted();
//   }

//   const card = (selected: boolean) =>
//     `w-full border p-4 text-left transition ${
//       selected
//         ? 'border-bronze bg-white shadow-sm'
//         : 'border-line bg-white hover:border-bronze/60'
//     }`;
//   const field =
//     'w-full border border-line bg-white px-4 py-3 text-base text-charcoal outline-none focus:border-bronze';

//   return (
//     <div
//       className="fixed inset-0 z-[85] flex flex-col bg-white"
//       role="dialog"
//       aria-modal="true"
//       aria-label={NAMES[type]}
//     >
//       {/* Header with progress */}
//       <header className="border-b border-line bg-alabaster">
//         <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
//           <img
//             src={brand.logo}
//             alt={brand.name}
//             className="h-12 w-12 shrink-0 rounded-sm object-cover"
//           />
//           <ol
//             className="flex flex-1 items-start justify-between gap-1"
//             aria-label="Progress"
//           >
//             {labels.map((l, i) => {
//               const complete = done || i < step;
//               const current = !done && i === step;
//               return (
//                 <li
//                   key={l}
//                   className="flex flex-1 flex-col items-center text-center"
//                   aria-current={current ? 'step' : undefined}
//                 >
//                   <span
//                     className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
//                       complete
//                         ? 'border-bronze bg-bronze text-white'
//                         : current
//                         ? 'border-bronze bg-white text-bronze'
//                         : 'border-line bg-white text-charcoal/40'
//                     }`}
//                   >
//                     {complete ? <Check size={14} /> : i + 1}
//                   </span>
//                   <span
//                     className={`mt-1 hidden text-xs sm:block ${
//                       current ? 'text-charcoal' : 'text-charcoal/50'
//                     }`}
//                   >
//                     {l}
//                   </span>
//                 </li>
//               );
//             })}
//           </ol>
//           <button
//             type="button"
//             onClick={onClose}
//             aria-label="Close estimate"
//             className="flex h-11 w-11 shrink-0 items-center justify-center text-charcoal hover:text-bronze"
//           >
//             <X size={24} />
//           </button>
//         </div>
//       </header>

//       {/* Body */}
//       <div className="flex-1 overflow-y-auto">
//         <div className="mx-auto my-6 max-w-2xl bg-alabaster p-6 sm:p-10">
//           {!done && (
//             <h2 className="text-center font-serif text-3xl text-charcoal">
//               {TITLES[type][step]}
//             </h2>
//           )}

//           {/* HOME */}
//           {!done && type === 'home' && step === 0 && (
//             <div
//               className="mt-8 space-y-3"
//               role="radiogroup"
//               aria-label="BHK type"
//             >
//               {cfg.home.bhk.map((b) => (
//                 <button
//                   key={b.id}
//                   type="button"
//                   role="radio"
//                   aria-checked={bhk === b.id}
//                   onClick={() => chooseBhk(b.id)}
//                   className={card(bhk === b.id)}
//                 >
//                   {b.label}
//                 </button>
//               ))}
//             </div>
//           )}
//           {!done && type === 'home' && step === 1 && (
//             <ul className="mt-8 space-y-3">
//               {cfg.home.rooms.map((r) => (
//                 <li
//                   key={r.id}
//                   className="flex items-center justify-between border border-line bg-white px-4 py-3"
//                 >
//                   <span>{r.label}</span>
//                   <span className="flex items-center gap-3">
//                     <button
//                       type="button"
//                       aria-label={`Fewer ${r.label}`}
//                       onClick={() => bump(r.id, -1, r.max)}
//                       className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal"
//                     >
//                       <Minus size={16} />
//                     </button>
//                     <span className="w-5 text-center" aria-live="polite">
//                       {rooms[r.id] ?? 0}
//                     </span>
//                     <button
//                       type="button"
//                       aria-label={`More ${r.label}`}
//                       onClick={() => bump(r.id, 1, r.max)}
//                       className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal"
//                     >
//                       <Plus size={16} />
//                     </button>
//                   </span>
//                 </li>
//               ))}
//             </ul>
//           )}

//           {/* KITCHEN */}
//           {!done && type === 'kitchen' && step === 0 && (
//             <div
//               className="mt-8 grid grid-cols-2 gap-3"
//               role="radiogroup"
//               aria-label="Kitchen layout"
//             >
//               {cfg.kitchen.layouts.map((l) => (
//                 <button
//                   key={l.id}
//                   type="button"
//                   role="radio"
//                   aria-checked={layoutId === l.id}
//                   onClick={() => chooseLayout(l.id)}
//                   className={card(layoutId === l.id)}
//                 >
//                   <LayoutIcon id={l.id} />
//                   <span className="mt-2 block text-center">{l.label}</span>
//                 </button>
//               ))}
//             </div>
//           )}
//           {!done && type === 'kitchen' && step === 1 && layout && (
//             <div className="mt-8">
//               <div className="bg-white p-3">
//                 <LayoutIcon id={layout.id} />
//               </div>
//               <p className="mt-4 border border-bronze/40 bg-white px-4 py-3 text-center text-sm text-charcoal/80">
//                 Standard sizes are filled in. Change them to match your kitchen.
//               </p>
//               <div className="mt-6 space-y-4">
//                 {layout.sides.map((s, i) => (
//                   <div key={s} className="flex items-center gap-3">
//                     <label htmlFor={`side-${s}`} className="w-6 font-medium">
//                       {s}
//                     </label>
//                     <select
//                       id={`side-${s}`}
//                       className={field}
//                       value={dims[i]}
//                       onChange={(e) =>
//                         setDims((d) =>
//                           d.map((v, idx) =>
//                             idx === i ? Number(e.target.value) : v
//                           )
//                         )
//                       }
//                     >
//                       {range(cfg.kitchen.minFt, cfg.kitchen.maxFt).map((n) => (
//                         <option key={n} value={n}>
//                           {n}
//                         </option>
//                       ))}
//                     </select>
//                     <span>ft</span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}

//           {/* WARDROBE */}
//           {!done && type === 'wardrobe' && step === 0 && (
//             <div
//               className="mt-8 space-y-3"
//               role="radiogroup"
//               aria-label="Wardrobe type"
//             >
//               {cfg.wardrobe.types.map((t) => (
//                 <button
//                   key={t.id}
//                   type="button"
//                   role="radio"
//                   aria-checked={wType === t.id}
//                   onClick={() => setWType(t.id)}
//                   className={card(wType === t.id)}
//                 >
//                   {t.label}
//                 </button>
//               ))}
//             </div>
//           )}
//           {!done && type === 'wardrobe' && step === 1 && (
//             <div className="mt-8 space-y-4">
//               <div className="flex items-center gap-3">
//                 <label htmlFor="w-width" className="w-20">
//                   Width
//                 </label>
//                 <select
//                   id="w-width"
//                   className={field}
//                   value={width}
//                   onChange={(e) => setWidth(Number(e.target.value))}
//                 >
//                   {range(
//                     cfg.wardrobe.widthFt.min,
//                     cfg.wardrobe.widthFt.max
//                   ).map((n) => (
//                     <option key={n} value={n}>
//                       {n}
//                     </option>
//                   ))}
//                 </select>
//                 <span>ft</span>
//               </div>
//               <div className="flex items-center gap-3">
//                 <label htmlFor="w-height" className="w-20">
//                   Height
//                 </label>
//                 <select
//                   id="w-height"
//                   className={field}
//                   value={height}
//                   onChange={(e) => setHeight(Number(e.target.value))}
//                 >
//                   {range(
//                     cfg.wardrobe.heightFt.min,
//                     cfg.wardrobe.heightFt.max
//                   ).map((n) => (
//                     <option key={n} value={n}>
//                       {n}
//                     </option>
//                   ))}
//                 </select>
//                 <span>ft</span>
//               </div>
//             </div>
//           )}

//           {/* PACKAGE (all calculators) */}
//           {!done && step === 2 && (
//             <div
//               className="mt-8 space-y-3"
//               role="radiogroup"
//               aria-label="Package"
//             >
//               {cfg.packages.map((p) => (
//                 <button
//                   key={p.id}
//                   type="button"
//                   role="radio"
//                   aria-checked={pkg === p.id}
//                   onClick={() => setPkg(p.id)}
//                   className={card(pkg === p.id)}
//                 >
//                   <span className="block font-medium">{p.label}</span>
//                   <span className="mt-1 block text-sm font-light text-charcoal/70">
//                     {p.description}
//                   </span>
//                   <ul className="mt-3 space-y-1">
//                     {p.points.map((pt) => (
//                       <li
//                         key={pt}
//                         className="flex items-center gap-2 text-sm text-charcoal/80"
//                       >
//                         <Check size={14} className="shrink-0 text-bronze" />{' '}
//                         {pt}
//                       </li>
//                     ))}
//                   </ul>
//                 </button>
//               ))}
//             </div>
//           )}

//           {/* CONTACT */}
//           {!done && step === 3 && (
//             <form
//               id="estimate-form"
//               onSubmit={submit}
//               noValidate
//               className="mx-auto mt-8 max-w-md space-y-4"
//             >
//               <div>
//                 <label
//                   htmlFor="est-name"
//                   className="mb-1 block text-sm text-charcoal/80"
//                 >
//                   Name
//                 </label>
//                 <input
//                   id="est-name"
//                   className={field}
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   autoComplete="name"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="est-phone"
//                   className="mb-1 block text-sm text-charcoal/80"
//                 >
//                   Phone / WhatsApp number
//                 </label>
//                 <input
//                   id="est-phone"
//                   className={field}
//                   value={phone}
//                   onChange={(e) => setPhone(e.target.value)}
//                   inputMode="tel"
//                   autoComplete="tel"
//                   placeholder="10-digit mobile number"
//                   required
//                 />
//               </div>
//               <div>
//                 <label
//                   htmlFor="est-city"
//                   className="mb-1 block text-sm text-charcoal/80"
//                 >
//                   City
//                 </label>
//                 <input
//                   id="est-city"
//                   className={field}
//                   value={city}
//                   onChange={(e) => setCity(e.target.value)}
//                   list="est-cities"
//                   autoComplete="address-level2"
//                   required
//                 />
//                 <datalist id="est-cities">
//                   <option value="Ranchi" />
//                   <option value="Delhi NCR" />
//                 </datalist>
//               </div>
//               {error && (
//                 <p role="alert" className="text-sm text-red-600">
//                   {error}
//                 </p>
//               )}
//             </form>
//           )}

//           {/* RESULT */}
//           {done && (
//             <div className="py-4 text-center" role="status">
//               <CheckCircle2 className="mx-auto text-bronze" size={44} />
//               <h2 className="mt-4 font-serif text-3xl text-charcoal">
//                 Thank you, {name.trim().split(' ')[0]}.
//               </h2>
//               {showPrice ? (
//                 <>
//                   <p className="mt-6 text-sm text-charcoal/70">
//                     Your approximate estimate
//                   </p>
//                   <p className="mt-1 font-serif text-4xl text-charcoal sm:text-5xl">
//                     {inr.format(low)} to {inr.format(high)}
//                   </p>
//                 </>
//               ) : (
//                 <p className="mt-4 font-light text-charcoal/70">
//                   Our design team will share your estimate shortly.
//                 </p>
//               )}
//               <p className="mx-auto mt-6 max-w-md border border-line bg-white p-4 text-left text-sm text-charcoal/80">
//                 {summary()}
//               </p>
//               {showPrice && (
//                 <p className="mx-auto mt-4 max-w-md text-xs font-light text-charcoal/60">
//                   {cfg.disclaimer}
//                 </p>
//               )}
//               {!sentOnline && (
//                 <p className="mx-auto mt-4 max-w-md text-sm text-charcoal/70">
//                   Send your details to our team on WhatsApp so we can follow up.
//                 </p>
//               )}
//               <a
//                 href={waLink}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="mt-6 inline-flex min-h-[48px] items-center gap-2 bg-[#25D366] px-6 font-medium text-charcoal"
//               >
//                 <MessageCircle size={18} />{' '}
//                 {sentOnline ? 'Discuss this on WhatsApp' : 'Send on WhatsApp'}
//               </a>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Footer */}
//       <footer className="border-t border-line bg-white">
//         <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
//           {done ? (
//             <button
//               type="button"
//               onClick={onClose}
//               className="ml-auto min-h-[48px] bg-charcoal px-10 text-sm font-medium uppercase tracking-[0.14em] text-white"
//             >
//               Close
//             </button>
//           ) : (
//             <>
//               <button
//                 type="button"
//                 onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
//                 className="min-h-[48px] px-4 text-sm font-medium uppercase tracking-[0.14em] text-bronze"
//               >
//                 {step === 0 ? 'Cancel' : 'Back'}
//               </button>
//               {step < 3 ? (
//                 <button
//                   type="button"
//                   disabled={!canNext()}
//                   onClick={() => setStep((s) => s + 1)}
//                   className="min-h-[48px] bg-charcoal px-10 text-sm font-medium uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:bg-charcoal/30"
//                 >
//                   Next
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   form="estimate-form"
//                   disabled={sending}
//                   className="flex min-h-[48px] items-center gap-2 bg-charcoal px-10 text-sm font-medium uppercase tracking-[0.14em] text-white disabled:opacity-60"
//                 >
//                   {sending ? (
//                     <>
//                       <Loader2 className="animate-spin" size={16} /> Sending
//                     </>
//                   ) : (
//                     'Submit'
//                   )}
//                 </button>
//               )}
//             </>
//           )}
//         </div>
//       </footer>
//     </div>
//   );
// }

import { useEffect, useMemo, useState } from 'react';
import type { FormEvent } from 'react';
import {
  Check,
  CheckCircle2,
  Loader2,
  MessageCircle,
  Minus,
  Plus,
  X,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import { estimator } from '../config/estimatorConfig';
import type {
  CalcType,
  EstimatePreset,
  PackageId,
} from '../config/estimatorConfig';
import SmartImg from './SmartImg';

interface Props {
  type: CalcType;
  preset?: EstimatePreset;
  onClose: () => void;
  onSubmitted: () => void;
}

const STEPS: Record<CalcType, string[]> = {
  home: ['BHK type', 'Rooms', 'Package', 'Get quote'],
  kitchen: ['Layout', 'Measurements', 'Package', 'Get quote'],
  wardrobe: ['Type', 'Size', 'Package', 'Get quote'],
};

const TITLES: Record<CalcType, string[]> = {
  home: [
    'Select your BHK type',
    'Select the rooms you want us to design',
    'Pick your package',
    'Your estimate is almost ready',
  ],
  kitchen: [
    'Select the layout of your kitchen',
    'Review the measurements',
    'Pick your package',
    'Your kitchen estimate is almost ready',
  ],
  wardrobe: [
    'Select your wardrobe type',
    'Enter the wardrobe size',
    'Pick your package',
    'Your wardrobe estimate is almost ready',
  ],
};

const NAMES: Record<CalcType, string> = {
  home: 'Full home interior estimate',
  kitchen: 'Modular kitchen estimate',
  wardrobe: 'Wardrobe estimate',
};

const inr = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
});
const range = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, i) => from + i);

function LayoutIcon({ id }: { id: string }) {
  const fill = '#E7DCCB';
  const stroke = '#B08D57';
  const common = { fill, stroke, strokeWidth: 1.5 };
  return (
    <svg
      viewBox="0 0 120 80"
      className="h-24 w-full"
      role="img"
      aria-label={`${id} kitchen layout`}
    >
      {id === 'l' && (
        <>
          <rect x="10" y="10" width="100" height="18" {...common} />
          <rect x="10" y="10" width="18" height="60" {...common} />
        </>
      )}
      {id === 'straight' && (
        <rect x="10" y="31" width="100" height="18" {...common} />
      )}
      {id === 'u' && (
        <>
          <rect x="10" y="10" width="100" height="18" {...common} />
          <rect x="10" y="10" width="18" height="60" {...common} />
          <rect x="92" y="10" width="18" height="60" {...common} />
        </>
      )}
      {id === 'parallel' && (
        <>
          <rect x="10" y="12" width="100" height="16" {...common} />
          <rect x="10" y="52" width="100" height="16" {...common} />
        </>
      )}
    </svg>
  );
}

export default function EstimateWizard({
  type,
  preset,
  onClose,
  onSubmitted,
}: Props) {
  const cfg = estimator;
  const { brand, contact, leadModal } = siteConfig;
  const labels = STEPS[type];

  // If the visitor clicked a "2BHK / 3BHK / 4BHK" card, start with that BHK already chosen.
  const presetBhk =
    type === 'home'
      ? cfg.home.bhk.find((b) => b.id === preset?.bhk)
      : undefined;
  const defaultBhk = cfg.home.bhk[Math.min(1, cfg.home.bhk.length - 1)];
  const startBhk = presetBhk ?? defaultBhk;

  const [step, setStep] = useState(presetBhk ? 1 : 0);
  const [pkg, setPkg] = useState<PackageId | null>(null);

  // home
  const [bhk, setBhk] = useState(startBhk.id);
  const [rooms, setRooms] = useState<Record<string, number>>({
    ...startBhk.rooms,
  });
  // kitchen
  const [layoutId, setLayoutId] = useState<string | null>(null);
  const [dims, setDims] = useState<number[]>([]);
  // wardrobe
  const [wType, setWType] = useState<string | null>(null);
  const [width, setWidth] = useState(cfg.wardrobe.widthFt.default);
  const [height, setHeight] = useState(cfg.wardrobe.heightFt.default);
  // contact + result
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [error, setError] = useState('');
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [sentOnline, setSentOnline] = useState(false);
  const [waLink, setWaLink] = useState('');

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  const layout = cfg.kitchen.layouts.find((l) => l.id === layoutId);
  const wardrobeType = cfg.wardrobe.types.find((t) => t.id === wType);

  const total = useMemo(() => {
    if (!pkg) return 0;
    if (type === 'home') {
      return cfg.home.rooms.reduce(
        (sum, r) =>
          sum + (rooms[r.id] ?? 0) * (cfg.home.roomRates[r.id]?.[pkg] ?? 0),
        0
      );
    }
    if (type === 'kitchen') {
      return dims.reduce((a, b) => a + b, 0) * cfg.kitchen.ratePerFoot[pkg];
    }
    return (
      width *
      height *
      cfg.wardrobe.ratePerSqft[pkg] *
      (wardrobeType?.multiplier ?? 1)
    );
  }, [pkg, type, rooms, dims, width, height, wardrobeType, cfg]);

  const showPrice = cfg.showPrice && total > 0;
  const low = Math.round((total * (1 - cfg.rangePercent / 100)) / 1000) * 1000;
  const high = Math.round((total * (1 + cfg.rangePercent / 100)) / 1000) * 1000;
  const pkgLabel = cfg.packages.find((p) => p.id === pkg)?.label ?? '';

  function summary(): string {
    if (type === 'home') {
      const bhkLabel = cfg.home.bhk.find((b) => b.id === bhk)?.label ?? '';
      const list = cfg.home.rooms
        .filter((r) => (rooms[r.id] ?? 0) > 0)
        .map((r) => `${r.label} x${rooms[r.id]}`)
        .join(', ');
      return `${NAMES.home}: ${bhkLabel}; ${list}; ${pkgLabel} package`;
    }
    if (type === 'kitchen') {
      const sides = layout
        ? layout.sides.map((s, i) => `${s}=${dims[i]}ft`).join(', ')
        : '';
      return `${NAMES.kitchen}: ${layout?.label} layout (${sides}); ${pkgLabel} package`;
    }
    return `${NAMES.wardrobe}: ${wardrobeType?.label}, ${width}ft wide x ${height}ft high; ${pkgLabel} package`;
  }

  function canNext(): boolean {
    if (step === 0)
      return type === 'home'
        ? Boolean(bhk)
        : type === 'kitchen'
        ? Boolean(layoutId)
        : Boolean(wType);
    if (step === 1)
      return type === 'home' ? Object.values(rooms).some((n) => n > 0) : true;
    if (step === 2) return Boolean(pkg);
    return true;
  }

  function chooseBhk(id: string) {
    setBhk(id);
    const p = cfg.home.bhk.find((b) => b.id === id);
    if (p) setRooms({ ...p.rooms });
  }
  function chooseLayout(id: string) {
    setLayoutId(id);
    const l = cfg.kitchen.layouts.find((x) => x.id === id);
    if (l) setDims([...l.defaults]);
  }
  function bump(id: string, delta: number, max: number) {
    setRooms((r) => ({
      ...r,
      [id]: Math.min(max, Math.max(0, (r[id] ?? 0) + delta)),
    }));
  }

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
    if (name.trim().length < 2) return setError('Enter your full name.');
    if (!/^\d{10}$/.test(digits))
      return setError('Enter a 10-digit phone number.');
    if (city.trim().length < 2) return setError('Enter your city.');

    const details = summary();
    const estimateText = showPrice
      ? `${inr.format(low)} to ${inr.format(high)}`
      : '';
    const message =
      `Hi ${brand.name}, I'm ${name.trim()} from ${city.trim()}. ${details}.` +
      `${
        estimateText ? ` Estimate shown: ${estimateText}.` : ''
      } Phone: ${digits}`;
    setWaLink(
      `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
        message
      )}`
    );

    if (leadModal.endpoint && leadModal.accessKey) {
      setSending(true);
      try {
        const res = await fetch(leadModal.endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            access_key: leadModal.accessKey,
            subject: `New estimate request: ${NAMES[type]}`,
            from_name: brand.shortName,
            name: name.trim(),
            phone: digits,
            city: city.trim(),
            requirement: NAMES[type],
            details,
            estimate: estimateText,
          }),
        });
        const data = await res.json().catch(() => ({}));
        setSentOnline(res.ok && data.success !== false);
      } catch {
        setSentOnline(false);
      } finally {
        setSending(false);
      }
    }
    setDone(true);
    onSubmitted();
  }

  const card = (selected: boolean, pad = 'p-4') =>
    `w-full border ${pad} text-left transition ${
      selected
        ? 'border-bronze bg-white shadow-sm'
        : 'border-line bg-white hover:border-bronze/60'
    }`;
  const field =
    'w-full border border-line bg-white px-4 py-3 text-base text-charcoal outline-none focus:border-bronze';

  return (
    <div
      className="fixed inset-0 z-[85] flex flex-col bg-white"
      role="dialog"
      aria-modal="true"
      aria-label={NAMES[type]}
    >
      {/* Header with progress */}
      <header className="border-b border-line bg-alabaster">
        <div className="mx-auto flex max-w-5xl items-center gap-4 px-4 py-3">
          <img
            src={brand.logo}
            alt={brand.name}
            className="h-12 w-auto shrink-0 object-contain"
          />
          <ol
            className="flex flex-1 items-start justify-between gap-1"
            aria-label="Progress"
          >
            {labels.map((l, i) => {
              const complete = done || i < step;
              const current = !done && i === step;
              return (
                <li
                  key={l}
                  className="flex flex-1 flex-col items-center text-center"
                  aria-current={current ? 'step' : undefined}
                >
                  <span
                    className={`flex h-6 w-6 items-center justify-center rounded-full border text-xs ${
                      complete
                        ? 'border-bronze bg-bronze text-white'
                        : current
                        ? 'border-bronze bg-white text-bronze'
                        : 'border-line bg-white text-charcoal/40'
                    }`}
                  >
                    {complete ? <Check size={14} /> : i + 1}
                  </span>
                  <span
                    className={`mt-1 hidden text-xs sm:block ${
                      current ? 'text-charcoal' : 'text-charcoal/50'
                    }`}
                  >
                    {l}
                  </span>
                </li>
              );
            })}
          </ol>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close estimate"
            className="flex h-11 w-11 shrink-0 items-center justify-center text-charcoal hover:text-bronze"
          >
            <X size={24} />
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto my-6 max-w-2xl bg-alabaster p-6 sm:p-10">
          {!done && (
            <h2 className="text-center font-serif text-3xl text-charcoal">
              {TITLES[type][step]}
            </h2>
          )}

          {/* HOME */}
          {!done && type === 'home' && step === 0 && (
            <div
              className="mt-8 space-y-3"
              role="radiogroup"
              aria-label="BHK type"
            >
              {cfg.home.bhk.map((b) => (
                <button
                  key={b.id}
                  type="button"
                  role="radio"
                  aria-checked={bhk === b.id}
                  onClick={() => chooseBhk(b.id)}
                  className={card(bhk === b.id)}
                >
                  {b.label}
                </button>
              ))}
            </div>
          )}
          {!done && type === 'home' && step === 1 && (
            <>
              <p className="mt-3 text-center text-sm font-light text-charcoal/70">
                Starting point: {cfg.home.bhk.find((b) => b.id === bhk)?.label}.
                Adjust the rooms to match your home.
              </p>
              <ul className="mt-6 space-y-3">
                {cfg.home.rooms.map((r) => (
                  <li
                    key={r.id}
                    className="flex items-center justify-between border border-line bg-white px-4 py-3"
                  >
                    <span>{r.label}</span>
                    <span className="flex items-center gap-3">
                      <button
                        type="button"
                        aria-label={`Fewer ${r.label}`}
                        onClick={() => bump(r.id, -1, r.max)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-5 text-center" aria-live="polite">
                        {rooms[r.id] ?? 0}
                      </span>
                      <button
                        type="button"
                        aria-label={`More ${r.label}`}
                        onClick={() => bump(r.id, 1, r.max)}
                        className="flex h-10 w-10 items-center justify-center rounded-full border border-charcoal"
                      >
                        <Plus size={16} />
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* KITCHEN */}
          {!done && type === 'kitchen' && step === 0 && (
            <div
              className="mt-8 grid grid-cols-2 gap-3"
              role="radiogroup"
              aria-label="Kitchen layout"
            >
              {cfg.kitchen.layouts.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  role="radio"
                  aria-checked={layoutId === l.id}
                  onClick={() => chooseLayout(l.id)}
                  className={card(layoutId === l.id)}
                >
                  <LayoutIcon id={l.id} />
                  <span className="mt-2 block text-center">{l.label}</span>
                </button>
              ))}
            </div>
          )}
          {!done && type === 'kitchen' && step === 1 && layout && (
            <div className="mt-8">
              <div className="bg-white p-3">
                <LayoutIcon id={layout.id} />
              </div>
              <p className="mt-4 border border-bronze/40 bg-white px-4 py-3 text-center text-sm text-charcoal/80">
                Standard sizes are filled in. Change them to match your kitchen.
              </p>
              <div className="mt-6 space-y-4">
                {layout.sides.map((s, i) => (
                  <div key={s} className="flex items-center gap-3">
                    <label htmlFor={`side-${s}`} className="w-6 font-medium">
                      {s}
                    </label>
                    <select
                      id={`side-${s}`}
                      className={field}
                      value={dims[i]}
                      onChange={(e) =>
                        setDims((d) =>
                          d.map((v, idx) =>
                            idx === i ? Number(e.target.value) : v
                          )
                        )
                      }
                    >
                      {range(cfg.kitchen.minFt, cfg.kitchen.maxFt).map((n) => (
                        <option key={n} value={n}>
                          {n}
                        </option>
                      ))}
                    </select>
                    <span>ft</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* WARDROBE */}
          {!done && type === 'wardrobe' && step === 0 && (
            <div
              className="mt-8 space-y-3"
              role="radiogroup"
              aria-label="Wardrobe type"
            >
              {cfg.wardrobe.types.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  role="radio"
                  aria-checked={wType === t.id}
                  onClick={() => setWType(t.id)}
                  className={card(wType === t.id)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          )}
          {!done && type === 'wardrobe' && step === 1 && (
            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <label htmlFor="w-width" className="w-20">
                  Width
                </label>
                <select
                  id="w-width"
                  className={field}
                  value={width}
                  onChange={(e) => setWidth(Number(e.target.value))}
                >
                  {range(
                    cfg.wardrobe.widthFt.min,
                    cfg.wardrobe.widthFt.max
                  ).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span>ft</span>
              </div>
              <div className="flex items-center gap-3">
                <label htmlFor="w-height" className="w-20">
                  Height
                </label>
                <select
                  id="w-height"
                  className={field}
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                >
                  {range(
                    cfg.wardrobe.heightFt.min,
                    cfg.wardrobe.heightFt.max
                  ).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
                <span>ft</span>
              </div>
            </div>
          )}

          {/* PACKAGE (all calculators) */}
          {!done && step === 2 && (
            <div
              className="mt-8 space-y-4"
              role="radiogroup"
              aria-label="Package"
            >
              {cfg.packages.map((p) => {
                const selected = pkg === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setPkg(p.id)}
                    className={card(selected, 'p-5')}
                  >
                    <span className="flex items-start gap-3">
                      <span
                        className={`mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${
                          selected ? 'border-bronze' : 'border-charcoal/30'
                        }`}
                      >
                        {selected && (
                          <span className="h-2.5 w-2.5 rounded-full bg-bronze" />
                        )}
                      </span>
                      <span>
                        <span className="block text-lg font-medium text-charcoal">
                          {p.label}
                        </span>
                        <span className="mt-1 block text-sm font-light text-charcoal/70">
                          {p.description}
                        </span>
                      </span>
                    </span>
                    <SmartImg
                      src={p.image}
                      alt={`${p.label} package example`}
                      className="mt-4 aspect-[16/9] w-full object-cover"
                    />
                    <ul className="mt-4 space-y-2">
                      {p.points.map((pt) => (
                        <li
                          key={pt}
                          className="flex items-center gap-2 text-sm text-charcoal/80"
                        >
                          <Check size={14} className="shrink-0 text-bronze" />{' '}
                          {pt}
                        </li>
                      ))}
                    </ul>
                  </button>
                );
              })}
            </div>
          )}

          {/* CONTACT */}
          {!done && step === 3 && (
            <form
              id="estimate-form"
              onSubmit={submit}
              noValidate
              className="mx-auto mt-8 max-w-md space-y-4"
            >
              <div>
                <label
                  htmlFor="est-name"
                  className="mb-1 block text-sm text-charcoal/80"
                >
                  Name
                </label>
                <input
                  id="est-name"
                  className={field}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="est-phone"
                  className="mb-1 block text-sm text-charcoal/80"
                >
                  Phone / WhatsApp number
                </label>
                <input
                  id="est-phone"
                  className={field}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="est-city"
                  className="mb-1 block text-sm text-charcoal/80"
                >
                  City
                </label>
                <input
                  id="est-city"
                  className={field}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  list="est-cities"
                  autoComplete="address-level2"
                  required
                />
                <datalist id="est-cities">
                  <option value="Ranchi" />
                  <option value="Delhi NCR" />
                </datalist>
              </div>
              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}
            </form>
          )}

          {/* RESULT */}
          {done && (
            <div className="py-4 text-center" role="status">
              <CheckCircle2 className="mx-auto text-bronze" size={44} />
              <h2 className="mt-4 font-serif text-3xl text-charcoal">
                Thank you, {name.trim().split(' ')[0]}.
              </h2>
              {showPrice ? (
                <>
                  <p className="mt-6 text-sm text-charcoal/70">
                    Your approximate estimate
                  </p>
                  <p className="mt-1 font-serif text-4xl text-charcoal sm:text-5xl">
                    {inr.format(low)} to {inr.format(high)}
                  </p>
                </>
              ) : (
                <p className="mt-4 font-light text-charcoal/70">
                  Our design team will share your estimate shortly.
                </p>
              )}
              <p className="mx-auto mt-6 max-w-md border border-line bg-white p-4 text-left text-sm text-charcoal/80">
                {summary()}
              </p>
              {showPrice && (
                <p className="mx-auto mt-4 max-w-md text-xs font-light text-charcoal/60">
                  {cfg.disclaimer}
                </p>
              )}
              {!sentOnline && (
                <p className="mx-auto mt-4 max-w-md text-sm text-charcoal/70">
                  Send your details to our team on WhatsApp so we can follow up.
                </p>
              )}
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex min-h-[48px] items-center gap-2 bg-[#25D366] px-6 font-medium text-charcoal"
              >
                <MessageCircle size={18} />{' '}
                {sentOnline ? 'Discuss this on WhatsApp' : 'Send on WhatsApp'}
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-line bg-white">
        <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-4">
          {done ? (
            <button
              type="button"
              onClick={onClose}
              className="ml-auto min-h-[48px] bg-charcoal px-10 text-sm font-medium uppercase tracking-[0.14em] text-white"
            >
              Close
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => (step === 0 ? onClose() : setStep((s) => s - 1))}
                className="min-h-[48px] px-4 text-sm font-medium uppercase tracking-[0.14em] text-bronze"
              >
                {step === 0 ? 'Cancel' : 'Back'}
              </button>
              {step < 3 ? (
                <button
                  type="button"
                  disabled={!canNext()}
                  onClick={() => setStep((s) => s + 1)}
                  className="min-h-[48px] bg-charcoal px-10 text-sm font-medium uppercase tracking-[0.14em] text-white disabled:cursor-not-allowed disabled:bg-charcoal/30"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  form="estimate-form"
                  disabled={sending}
                  className="flex min-h-[48px] items-center gap-2 bg-charcoal px-10 text-sm font-medium uppercase tracking-[0.14em] text-white disabled:opacity-60"
                >
                  {sending ? (
                    <>
                      <Loader2 className="animate-spin" size={16} /> Sending
                    </>
                  ) : (
                    'Submit'
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </footer>
    </div>
  );
}
