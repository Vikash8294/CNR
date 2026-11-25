// import { useState } from 'react';
// import type { FormEvent } from 'react';
// import { Loader2, CheckCircle2, MessageCircle } from 'lucide-react';
// import { siteConfig } from '../config/siteConfig';
// import type { LeadPrefill } from '../types/config';

// const REQUIREMENTS = [
//   'Full Home Turnkey',
//   'Modular Kitchen',
//   'Commercial',
//   'Custom Furniture',
// ];
// type Status = 'idle' | 'loading' | 'success' | 'fallback';

// interface Props {
//   prefill?: LeadPrefill;
//   onDone?: () => void;
//   idPrefix?: string;
//   dark?: boolean;
// }

// export default function LeadForm({
//   prefill = {},
//   onDone,
//   idPrefix = 'lead',
//   dark = false,
// }: Props) {
//   const { leadModal, contact, brand } = siteConfig;
//   const [name, setName] = useState('');
//   const [phone, setPhone] = useState('');
//   const [city, setCity] = useState(prefill.city ?? '');
//   const [requirement, setRequirement] = useState(
//     prefill.requirement ?? REQUIREMENTS[0]
//   );
//   const [offer, setOffer] = useState(prefill.offer ?? '');
//   const [status, setStatus] = useState<Status>('idle');
//   const [error, setError] = useState('');
//   const [waLink, setWaLink] = useState('');

//   const field = `w-full border px-4 py-3 text-base outline-none focus:border-bronze ${
//     dark
//       ? 'border-white/25 bg-white/5 text-white placeholder:text-white/40'
//       : 'border-line bg-white text-charcoal'
//   }`;
//   const label = `mb-1 block text-sm ${
//     dark ? 'text-white/80' : 'text-charcoal/80'
//   }`;

//   async function submit(e: FormEvent) {
//     e.preventDefault();
//     setError('');
//     const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
//     if (name.trim().length < 2) return setError('Enter your full name.');
//     if (!/^\d{10}$/.test(digits))
//       return setError('Enter a 10-digit phone number.');
//     if (city.trim().length < 2) return setError('Enter your city.');

//     const message =
//       `Hi ${
//         brand.name
//       }, I'm ${name.trim()} from ${city.trim()}. Requirement: ${requirement}.` +
//       `${offer ? ` Offer: ${offer}.` : ''} Phone: ${digits}`;
//     const wa = `https://wa.me/${
//       contact.whatsappNumber
//     }?text=${encodeURIComponent(message)}`;
//     setWaLink(wa);

//     // No endpoint key yet: send the enquiry through WhatsApp instead.
//     if (!leadModal.endpoint || !leadModal.accessKey) {
//       window.open(wa, '_blank', 'noopener');
//       setStatus('fallback');
//       onDone?.();
//       return;
//     }

//     setStatus('loading');
//     try {
//       const res = await fetch(leadModal.endpoint, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Accept: 'application/json',
//         },
//         body: JSON.stringify({
//           access_key: leadModal.accessKey,
//           subject: `New enquiry: ${requirement}`,
//           from_name: brand.shortName,
//           name: name.trim(),
//           phone: digits,
//           city: city.trim(),
//           requirement,
//           offer,
//         }),
//       });
//       const data = await res.json().catch(() => ({}));
//       if (!res.ok || data.success === false) throw new Error('failed');
//       setStatus('success');
//       onDone?.();
//     } catch {
//       setStatus('fallback');
//       onDone?.();
//     }
//   }

//   if (status === 'success') {
//     return (
//       <div className="py-8 text-center" role="status">
//         <CheckCircle2 className="mx-auto text-bronze" size={44} />
//         <p
//           className={`mt-4 font-serif text-2xl ${
//             dark ? 'text-white' : 'text-charcoal'
//           }`}
//         >
//           Thank you, {name.split(' ')[0]}.
//         </p>
//         <p
//           className={`mt-2 font-light ${
//             dark ? 'text-white/70' : 'text-charcoal/70'
//           }`}
//         >
//           Our design team will contact you shortly.
//         </p>
//       </div>
//     );
//   }
//   if (status === 'fallback') {
//     return (
//       <div className="py-8 text-center" role="status">
//         <p
//           className={`font-serif text-2xl ${
//             dark ? 'text-white' : 'text-charcoal'
//           }`}
//         >
//           Send your enquiry on WhatsApp
//         </p>
//         <p
//           className={`mt-2 font-light ${
//             dark ? 'text-white/70' : 'text-charcoal/70'
//           }`}
//         >
//           We could not submit the form online. Tap below and your details are
//           already filled in.
//         </p>
//         <a
//           href={waLink}
//           target="_blank"
//           rel="noopener noreferrer"
//           className="mt-6 inline-flex min-h-[48px] items-center gap-2 bg-[#25D366] px-6 font-medium text-charcoal"
//         >
//           <MessageCircle size={18} /> Open WhatsApp
//         </a>
//       </div>
//     );
//   }

//   return (
//     <form onSubmit={submit} noValidate className="space-y-4">
//       <div>
//         <label htmlFor={`${idPrefix}-name`} className={label}>
//           Full name
//         </label>
//         <input
//           id={`${idPrefix}-name`}
//           className={field}
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           autoComplete="name"
//           required
//         />
//       </div>
//       <div>
//         <label htmlFor={`${idPrefix}-phone`} className={label}>
//           Phone / WhatsApp number
//         </label>
//         <input
//           id={`${idPrefix}-phone`}
//           className={field}
//           value={phone}
//           onChange={(e) => setPhone(e.target.value)}
//           inputMode="tel"
//           autoComplete="tel"
//           placeholder="10-digit mobile number"
//           required
//         />
//       </div>
//       <div className="grid gap-4 sm:grid-cols-2">
//         <div>
//           <label htmlFor={`${idPrefix}-city`} className={label}>
//             City
//           </label>
//           <input
//             id={`${idPrefix}-city`}
//             className={field}
//             value={city}
//             onChange={(e) => setCity(e.target.value)}
//             autoComplete="address-level2"
//             required
//           />
//         </div>
//         <div>
//           <label htmlFor={`${idPrefix}-req`} className={label}>
//             Requirement
//           </label>
//           <select
//             id={`${idPrefix}-req`}
//             className={field}
//             value={requirement}
//             onChange={(e) => setRequirement(e.target.value)}
//           >
//             {REQUIREMENTS.map((r) => (
//               <option key={r} value={r} className="text-charcoal">
//                 {r}
//               </option>
//             ))}
//           </select>
//         </div>
//       </div>
//       <div>
//         <label htmlFor={`${idPrefix}-offer`} className={label}>
//           Offer tag (optional)
//         </label>
//         <input
//           id={`${idPrefix}-offer`}
//           className={field}
//           value={offer}
//           onChange={(e) => setOffer(e.target.value)}
//         />
//       </div>
//       {error && (
//         <p role="alert" className="text-sm text-red-500">
//           {error}
//         </p>
//       )}
//       <button
//         type="submit"
//         disabled={status === 'loading'}
//         className="flex min-h-[50px] w-full items-center justify-center gap-2 bg-bronze text-sm font-medium uppercase tracking-[0.14em] text-charcoal transition hover:bg-charcoal hover:text-white disabled:opacity-60"
//       >
//         {status === 'loading' ? (
//           <>
//             <Loader2 className="animate-spin" size={18} /> Sending
//           </>
//         ) : (
//           'Get Free Estimate'
//         )}
//       </button>
//     </form>
//   );
// }

import { useState } from 'react';
import type { FormEvent } from 'react';
import { Loader2, CheckCircle2, MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import type { LeadPrefill } from '../types/config';

const REQUIREMENTS = [
  'Full Home Turnkey',
  'Modular Kitchen',
  'Commercial',
  'Custom Furniture',
];
type Status = 'idle' | 'loading' | 'success' | 'fallback';

interface Props {
  prefill?: LeadPrefill;
  onDone?: () => void;
  idPrefix?: string;
  dark?: boolean;
}

export default function LeadForm({
  prefill = {},
  onDone,
  idPrefix = 'lead',
  dark = false,
}: Props) {
  const { leadModal, contact, brand } = siteConfig;
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [city, setCity] = useState(prefill.city ?? '');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [requirement, setRequirement] = useState(
    prefill.requirement ?? REQUIREMENTS[0]
  );
  const offer = prefill.offer ?? ''; // sent with the lead, not shown on screen
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [waLink, setWaLink] = useState('');

  const field = `w-full border px-3 py-2.5 text-base outline-none focus:border-bronze ${
    dark
      ? 'border-white/25 bg-white/5 text-white placeholder:text-white/40'
      : 'border-line bg-white text-charcoal'
  }`;
  const label = `mb-1 block text-xs ${
    dark ? 'text-white/80' : 'text-charcoal/80'
  }`;

  async function submit(e: FormEvent) {
    e.preventDefault();
    setError('');
    const digits = phone.replace(/\D/g, '').replace(/^91(?=\d{10}$)/, '');
    const pin = pincode.replace(/\D/g, '');
    const mail = email.trim();

    if (name.trim().length < 2) return setError('Enter your full name.');
    if (!/^\d{10}$/.test(digits))
      return setError('Enter a 10-digit phone number.');
    if (mail && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(mail))
      return setError('Enter a valid email address.');
    if (city.trim().length < 2) return setError('Enter your city.');
    if (area.trim().length < 2) return setError('Enter your area or locality.');
    if (!/^\d{6}$/.test(pin)) return setError('Enter a 6-digit pincode.');

    const message =
      `Hi ${
        brand.name
      }, I'm ${name.trim()} from ${area.trim()}, ${city.trim()} - ${pin}. ` +
      `Requirement: ${requirement}.${offer ? ` Offer: ${offer}.` : ''} ` +
      `Phone: ${digits}${mail ? `, Email: ${mail}` : ''}`;
    const wa = `https://wa.me/${
      contact.whatsappNumber
    }?text=${encodeURIComponent(message)}`;
    setWaLink(wa);

    // No endpoint key yet: send the enquiry through WhatsApp instead.
    if (!leadModal.endpoint || !leadModal.accessKey) {
      window.open(wa, '_blank', 'noopener');
      setStatus('fallback');
      onDone?.();
      return;
    }

    setStatus('loading');
    try {
      const res = await fetch(leadModal.endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: leadModal.accessKey,
          subject: `New enquiry: ${requirement}`,
          from_name: brand.shortName,
          name: name.trim(),
          phone: digits,
          ...(mail ? { email: mail } : {}),
          city: city.trim(),
          area: area.trim(),
          pincode: pin,
          requirement,
          offer,
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok || data.success === false) throw new Error('failed');
      setStatus('success');
      onDone?.();
    } catch {
      setStatus('fallback');
      onDone?.();
    }
  }

  if (status === 'success') {
    return (
      <div className="py-6 text-center" role="status">
        <CheckCircle2 className="mx-auto text-bronze" size={40} />
        <p
          className={`mt-3 font-serif text-2xl ${
            dark ? 'text-white' : 'text-charcoal'
          }`}
        >
          Thank you, {name.trim().split(' ')[0]}.
        </p>
        <p
          className={`mt-2 font-light ${
            dark ? 'text-white/70' : 'text-charcoal/70'
          }`}
        >
          Our design team will contact you shortly.
        </p>
      </div>
    );
  }
  if (status === 'fallback') {
    return (
      <div className="py-6 text-center" role="status">
        <p
          className={`font-serif text-2xl ${
            dark ? 'text-white' : 'text-charcoal'
          }`}
        >
          Send your enquiry on WhatsApp
        </p>
        <p
          className={`mt-2 font-light ${
            dark ? 'text-white/70' : 'text-charcoal/70'
          }`}
        >
          We could not submit the form online. Tap below and your details are
          already filled in.
        </p>
        <a
          href={waLink}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex min-h-[48px] items-center gap-2 bg-[#25D366] px-6 font-medium text-charcoal"
        >
          <MessageCircle size={18} /> Open WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-name`} className={label}>
            Full name
          </label>
          <input
            id={`${idPrefix}-name`}
            className={field}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="name"
            required
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-phone`} className={label}>
            Phone / WhatsApp
          </label>
          <input
            id={`${idPrefix}-phone`}
            className={field}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            inputMode="tel"
            autoComplete="tel"
            placeholder="10-digit number"
            required
          />
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div>
          <label htmlFor={`${idPrefix}-email`} className={label}>
            Email
          </label>
          <input
            id={`${idPrefix}-email`}
            type="email"
            className={field}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="email"
            placeholder="you@example.com"
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-req`} className={label}>
            Requirement
          </label>
          <select
            id={`${idPrefix}-req`}
            className={field}
            value={requirement}
            onChange={(e) => setRequirement(e.target.value)}
          >
            {REQUIREMENTS.map((r) => (
              <option key={r} value={r} className="text-charcoal">
                {r}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
        <div>
          <label htmlFor={`${idPrefix}-city`} className={label}>
            City
          </label>
          <input
            id={`${idPrefix}-city`}
            className={field}
            value={city}
            onChange={(e) => setCity(e.target.value)}
            autoComplete="address-level2"
            required
          />
        </div>
        <div>
          <label htmlFor={`${idPrefix}-area`} className={label}>
            Area / locality
          </label>
          <input
            id={`${idPrefix}-area`}
            className={field}
            value={area}
            onChange={(e) => setArea(e.target.value)}
            autoComplete="address-level3"
            required
          />
        </div>
        <div className="col-span-2 sm:col-span-1">
          <label htmlFor={`${idPrefix}-pin`} className={label}>
            Pincode
          </label>
          <input
            id={`${idPrefix}-pin`}
            className={field}
            value={pincode}
            onChange={(e) =>
              setPincode(e.target.value.replace(/\D/g, '').slice(0, 6))
            }
            inputMode="numeric"
            autoComplete="postal-code"
            placeholder="6 digits"
            maxLength={6}
            required
          />
        </div>
      </div>

      {error && (
        <p role="alert" className="text-sm text-red-500">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={status === 'loading'}
        className="flex min-h-[48px] w-full items-center justify-center gap-2 bg-bronze text-sm font-medium uppercase tracking-[0.14em] text-charcoal transition hover:bg-charcoal hover:text-white disabled:opacity-60"
      >
        {status === 'loading' ? (
          <>
            <Loader2 className="animate-spin" size={16} /> Sending
          </>
        ) : (
          'Get Free Estimate'
        )}
      </button>
    </form>
  );
}
