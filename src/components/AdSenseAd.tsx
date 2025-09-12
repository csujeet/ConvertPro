import React, { useEffect, useState } from 'react';
import { CONSENT_KEY } from './CookieConsent';

interface AdSenseAdProps {
  client?: string; // e.g. ca-pub-XXXXXXXXXXXXXXXX
  slot?: string; // ad slot id
  style?: React.CSSProperties;
  className?: string;
  testMode?: boolean;
}

const AdSenseAd: React.FC<AdSenseAdProps> = ({ client = 'ca-pub-XXXXXXXXXXXXXXXX', slot = '0000000000', style, className, testMode = true }) => {
  const [consent, setConsent] = useState<boolean>(() => localStorage.getItem(CONSENT_KEY) === 'yes');

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === CONSENT_KEY) setConsent(e.newValue === 'yes');
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  useEffect(() => {
    if (!consent) return;
    // Only inject script if not already present
    if (!(window as any).adsbygoogleInjected) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js';
      s.setAttribute('data-ad-client', client);
      document.head.appendChild(s);
      (window as any).adsbygoogleInjected = true;
    }

    // @ts-ignore
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }, [client, consent]);

  return (
    <div style={style} className={className}>
      {/* AdSense ins element; replace data-ad-client and data-ad-slot with real values in production */}
      <ins className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={client}
        data-ad-slot={slot}
        data-ad-format="auto"
        data-full-width-responsive="true"
        {...(testMode ? { 'data-adtest': 'on' } : {})}
      />
    </div>
  );
};

export default AdSenseAd;
