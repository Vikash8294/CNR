// import { useCallback, useEffect, useRef, useState } from 'react';
// import { siteConfig } from './config/siteConfig';
// import type { CalcType } from './config/estimatorConfig';
// import type { LeadPrefill, OpenLead } from './types/config';
// import OfferBanner from './components/OfferBanner';
// import Navbar from './components/Navbar';
// import BudgetHomes from './components/BudgetHomes';
// import Hero from './components/Hero';
// import Statement from './components/Statement';
// import Offerings from './components/Offerings';
// import EstimateSection from './components/EstimateSection';
// import EstimateWizard from './components/EstimateWizard';
// import DesignCategories from './components/DesignCategories';
// import ProjectGallery from './components/ProjectGallery';
// import Locations from './components/Locations';
// import ShopPreview from './components/ShopPreview';
// import LeadModal from './components/LeadModal';
// import WhatsAppFloat from './components/WhatsAppFloat';
// import ContactFooter from './components/ContactFooter';
// import SideDots from './components/SideDots';

// const SEEN_KEY = 'cnr_lead_modal_seen';

// const wasSeen = () => {
//   try {
//     return localStorage.getItem(SEEN_KEY) === '1';
//   } catch {
//     return false;
//   }
// };
// const markSeen = () => {
//   try {
//     localStorage.setItem(SEEN_KEY, '1');
//   } catch {
//     /* storage unavailable */
//   }
// };

// export default function App() {
//   const { leadModal } = siteConfig;
//   const [lead, setLead] = useState<{ open: boolean; prefill: LeadPrefill }>({
//     open: false,
//     prefill: {},
//   });
//   const [estimate, setEstimate] = useState<{ open: boolean; type: CalcType }>({
//     open: false,
//     type: 'home',
//   });
//   const [category, setCategory] = useState<string | null>(null);
//   const autoFired = useRef(false);
//   const estimateOpen = useRef(false);
//   estimateOpen.current = estimate.open;

//   const openLead: OpenLead = useCallback(
//     (prefill = {}) => setLead({ open: true, prefill }),
//     []
//   );
//   const closeLead = useCallback(() => {
//     markSeen();
//     setLead((l) => ({ ...l, open: false }));
//   }, []);
//   const openEstimate = useCallback(
//     (type: CalcType) => setEstimate({ open: true, type }),
//     []
//   );
//   const closeEstimate = useCallback(
//     () => setEstimate((e) => ({ ...e, open: false })),
//     []
//   );

//   // Auto popup: after the delay or at the scroll depth, once per visitor.
//   useEffect(() => {
//     if (!leadModal.enabled || wasSeen()) return;
//     const fire = () => {
//       if (autoFired.current || wasSeen() || estimateOpen.current) return;
//       autoFired.current = true;
//       setLead({ open: true, prefill: {} });
//     };
//     const timer = window.setTimeout(fire, leadModal.delaySeconds * 1000);
//     const onScroll = () => {
//       const max = document.documentElement.scrollHeight - window.innerHeight;
//       if (
//         max > 0 &&
//         (window.scrollY / max) * 100 >= leadModal.scrollTriggerPercent
//       )
//         fire();
//     };
//     window.addEventListener('scroll', onScroll, { passive: true });
//     return () => {
//       window.clearTimeout(timer);
//       window.removeEventListener('scroll', onScroll);
//     };
//   }, [
//     leadModal.enabled,
//     leadModal.delaySeconds,
//     leadModal.scrollTriggerPercent,
//   ]);

//   const selectCategory = (id: string) => {
//     setCategory(id);
//     requestAnimationFrame(() =>
//       document
//         .getElementById('projects')
//         ?.scrollIntoView({ behavior: 'smooth' })
//     );
//   };

//   return (
//     <>
//       <OfferBanner onOpenLead={openLead} />
//       <Navbar onOpenLead={openLead} />
//       <main>
//         <Hero onOpenLead={openLead} />
//         <Statement />
//         <BudgetHomes onOpenLead={openLead} onOpenEstimate={openEstimate} />
//         <Offerings onOpenLead={openLead} onOpenEstimate={openEstimate} />
//         <EstimateSection onOpenEstimate={openEstimate} />
//         <DesignCategories onSelectCategory={selectCategory} />
//         <ProjectGallery
//           category={category}
//           onClearCategory={() => setCategory(null)}
//         />
//         <Locations onOpenLead={openLead} />
//         <ShopPreview onOpenLead={openLead} />
//       </main>
//       <ContactFooter />
//       <SideDots />
//       <WhatsAppFloat />
//       <LeadModal
//         open={lead.open}
//         prefill={lead.prefill}
//         onClose={closeLead}
//         onSubmitted={markSeen}
//       />
//       {estimate.open && (
//         <EstimateWizard
//           type={estimate.type}
//           onClose={closeEstimate}
//           onSubmitted={markSeen}
//         />
//       )}
//     </>
//   );
// }

import { useCallback, useEffect, useRef, useState } from 'react';
import { siteConfig } from './config/siteConfig';
import type { CalcType, EstimatePreset } from './config/estimatorConfig';
import type { LeadPrefill, OpenLead } from './types/config';
import OfferBanner from './components/OfferBanner';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Statement from './components/Statement';
import BudgetHomes from './components/BudgetHomes';
import Offerings from './components/Offerings';
import EstimateSection from './components/EstimateSection';
import EstimateWizard from './components/EstimateWizard';
import DesignCategories from './components/DesignCategories';
import ProjectGallery from './components/ProjectGallery';
import Locations from './components/Locations';
import ShopPreview from './components/ShopPreview';
import LeadModal from './components/LeadModal';
import WhatsAppFloat from './components/WhatsAppFloat';
import ContactFooter from './components/ContactFooter';
import SideDots from './components/SideDots';

const SEEN_KEY = 'cnr_lead_modal_seen';

const wasSeen = () => {
  try {
    return localStorage.getItem(SEEN_KEY) === '1';
  } catch {
    return false;
  }
};
const markSeen = () => {
  try {
    localStorage.setItem(SEEN_KEY, '1');
  } catch {
    /* storage unavailable */
  }
};

export default function App() {
  const { leadModal } = siteConfig;
  const [lead, setLead] = useState<{ open: boolean; prefill: LeadPrefill }>({
    open: false,
    prefill: {},
  });
  const [estimate, setEstimate] = useState<{
    open: boolean;
    type: CalcType;
    preset?: EstimatePreset;
  }>({
    open: false,
    type: 'home',
  });
  const [category, setCategory] = useState<string | null>(null);
  const autoFired = useRef(false);
  const estimateOpen = useRef(false);
  estimateOpen.current = estimate.open;

  const openLead: OpenLead = useCallback(
    (prefill = {}) => setLead({ open: true, prefill }),
    []
  );
  const closeLead = useCallback(() => {
    markSeen();
    setLead((l) => ({ ...l, open: false }));
  }, []);
  const openEstimate = useCallback(
    (type: CalcType, preset?: EstimatePreset) =>
      setEstimate({ open: true, type, preset }),
    []
  );
  const closeEstimate = useCallback(
    () => setEstimate((e) => ({ ...e, open: false })),
    []
  );

  // Auto popup: after the delay or at the scroll depth, once per visitor.
  useEffect(() => {
    if (!leadModal.enabled || wasSeen()) return;
    const fire = () => {
      if (autoFired.current || wasSeen() || estimateOpen.current) return;
      autoFired.current = true;
      setLead({ open: true, prefill: {} });
    };
    const timer = window.setTimeout(fire, leadModal.delaySeconds * 1000);
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (
        max > 0 &&
        (window.scrollY / max) * 100 >= leadModal.scrollTriggerPercent
      )
        fire();
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('scroll', onScroll);
    };
  }, [
    leadModal.enabled,
    leadModal.delaySeconds,
    leadModal.scrollTriggerPercent,
  ]);

  const selectCategory = (id: string) => {
    setCategory(id);
    requestAnimationFrame(() =>
      document
        .getElementById('projects')
        ?.scrollIntoView({ behavior: 'smooth' })
    );
  };

  return (
    <>
      <OfferBanner onOpenLead={openLead} />
      <Navbar onOpenLead={openLead} />
      <main>
        <Hero onOpenLead={openLead} />
        <Statement />
        <BudgetHomes onOpenLead={openLead} onOpenEstimate={openEstimate} />
        <Offerings onOpenLead={openLead} onOpenEstimate={openEstimate} />
        <EstimateSection onOpenEstimate={openEstimate} />
        <DesignCategories onSelectCategory={selectCategory} />
        <ProjectGallery
          category={category}
          onClearCategory={() => setCategory(null)}
        />
        <Locations onOpenLead={openLead} />
        <ShopPreview onOpenLead={openLead} />
      </main>
      <ContactFooter />
      <SideDots />
      <WhatsAppFloat />
      <LeadModal
        open={lead.open}
        prefill={lead.prefill}
        onClose={closeLead}
        onSubmitted={markSeen}
      />
      {estimate.open && (
        <EstimateWizard
          type={estimate.type}
          preset={estimate.preset}
          onClose={closeEstimate}
          onSubmitted={markSeen}
        />
      )}
    </>
  );
}
