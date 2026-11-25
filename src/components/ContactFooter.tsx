import {
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Youtube,
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';
import LeadForm from './LeadForm';

export default function ContactFooter() {
  const { contact, brand, social } = siteConfig;
  const map = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    contact.headquarters
  )}`;
  const socials = [
    { label: 'Instagram', href: social.instagram, Icon: Instagram },
    { label: 'YouTube', href: social.youtube, Icon: Youtube },
    // LinkedIn stays hidden until a real company page URL is added
    {
      label: 'LinkedIn',
      href: social.linkedin.replace(/^https:\/\/www\.linkedin\.com\/?$/, ''),
      Icon: Linkedin,
    },
  ].filter((s) => s.href);

  return (
    <>
      <section
        id="contact"
        className="bg-charcoal px-5 py-20 text-white lg:px-8 lg:py-28"
      >
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-4xl lg:text-5xl">Contact</h2>
            <p className="mt-3 max-w-md font-light text-white/70">
              Tell us about your space. We usually reply with a plan and
              estimate outline.
            </p>
            <ul className="mt-10 space-y-5">
              <li>
                <a
                  href={`tel:${contact.phone.replace(/\s/g, '')}`}
                  className="flex items-center gap-3 hover:text-bronze"
                >
                  <Phone size={20} className="text-bronze" /> {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${contact.email}`}
                  className="flex items-center gap-3 hover:text-bronze"
                >
                  <Mail size={20} className="text-bronze" /> {contact.email}
                </a>
              </li>
              <li>
                <a
                  href={map}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 hover:text-bronze"
                >
                  <MapPin size={20} className="text-bronze" />{' '}
                  {contact.headquarters}
                </a>
              </li>
            </ul>
          </div>
          <div className="border border-white/15 p-6 sm:p-9">
            <LeadForm idPrefix="contact" dark />
          </div>
        </div>
      </section>

      <footer className="bg-black px-5 py-12 text-white/80 lg:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-3">
          <div>
            <img
              src={brand.logo}
              alt={`${brand.name} logo`}
              className="h-16 w-auto object-contain"
            />
            <p className="mt-4 max-w-xs text-sm font-light">{brand.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <p className="mb-3 text-sm text-white">Quick links</p>
            <ul className="space-y-2 text-sm font-light">
              <li>
                <a className="hover:text-bronze" href="#offerings">
                  Offerings
                </a>
              </li>
              <li>
                <a className="hover:text-bronze" href="#design">
                  Design Ideas
                </a>
              </li>
              <li>
                <a className="hover:text-bronze" href="#projects">
                  Projects
                </a>
              </li>
              <li>
                <a className="hover:text-bronze" href="#contact">
                  Contact
                </a>
              </li>
            </ul>
          </nav>
          <div>
            <p className="mb-3 text-sm text-white">Follow us</p>
            <ul className="flex gap-3">
              {socials.map(({ label, href, Icon }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="flex h-11 w-11 items-center justify-center border border-white/25 hover:border-bronze hover:text-bronze"
                  >
                    <Icon size={20} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <p className="mx-auto mt-10 max-w-7xl border-t border-white/10 pt-6 text-xs font-light">
          © {new Date().getFullYear()} {brand.name}. Founded by {brand.founder}.
        </p>
      </footer>
    </>
  );
}
