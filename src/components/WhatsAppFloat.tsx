import { MessageCircle } from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

export default function WhatsAppFloat() {
  const { contact } = siteConfig;
  const href = `https://wa.me/${
    contact.whatsappNumber
  }?text=${encodeURIComponent(contact.whatsappDefaultMessage)}`;
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition hover:scale-105"
    >
      <MessageCircle size={28} />
    </a>
  );
}
