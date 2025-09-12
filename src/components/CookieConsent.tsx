import React, { useEffect, useState } from 'react';

export const CONSENT_KEY = 'ad_consent_given_v1';

const CookieConsent: React.FC<{ onConsent?: (given: boolean) => void }> = ({ onConsent }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const existing = localStorage.getItem(CONSENT_KEY);
    if (!existing) setVisible(true);
  }, []);

  const giveConsent = () => {
    localStorage.setItem(CONSENT_KEY, 'yes');
    setVisible(false);
    onConsent && onConsent(true);
  };

  const decline = () => {
    localStorage.setItem(CONSENT_KEY, 'no');
    setVisible(false);
    onConsent && onConsent(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-6 right-6 md:left-auto md:right-6 md:bottom-6 z-50">
      <div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 flex flex-col md:flex-row items-start md:items-center space-y-3 md:space-y-0 md:space-x-4">
        <div className="flex-1 text-sm text-slate-700 dark:text-slate-300">
          This site uses cookies and third-party scripts (Google AdSense) to provide personalized ads. By clicking "Accept" you consent to loading ads. You can decline to remain ad-free.
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={decline} className="px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700">Decline</button>
          <button onClick={giveConsent} className="px-3 py-2 rounded-lg bg-blue-600 text-white">Accept</button>
        </div>
      </div>
    </div>
  );
};

export default CookieConsent;
