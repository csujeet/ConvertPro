import React from 'react';
import { Link } from 'react-router-dom';

const Privacy: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 text-white">
      <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>

      <p className="mb-4">
        This Privacy Policy describes how ConvertPro ("we", "us", "our") collects, uses, and
        discloses information when you use our website and services. By using the site, you agree to the
        practices described in this policy.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Information We Collect</h2>
      <p className="mb-4">
        We collect information you provide directly (for example, when you contact us). We may also
        collect non-identifying usage data (analytics) and technical data such as browser type and
        device information.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Information</h2>
      <p className="mb-4">
        We use the information to operate and improve the service, to respond to support requests, and
        to comply with legal obligations. We also use analytics to understand usage patterns and to
        improve performance.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Third-Party Advertising</h2>
      <p className="mb-4">
        We use Google AdSense to serve ads. Google may use cookies and other technologies to display
        personalized ads based on your previous visits to this site and other sites. You can opt out of
        personalized advertising via Google’s Ad Settings: https://adssettings.google.com.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Cookies & Consent</h2>
      <p className="mb-4">
        We use cookies to provide and personalize the service. For users in the European Economic Area
        (EEA), we will not load advertising scripts until consent is given via the cookie consent banner.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Data Retention & Deletion</h2>
      <p className="mb-4">
        We retain data only as long as necessary to provide the service. If you wish to request deletion
        of your data, contact us at the address below and we will respond within a commercially
        reasonable timeframe.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Security</h2>
      <p className="mb-4">
        We take reasonable steps to protect information; however, no online service is completely
        secure. Do not share passwords or sensitive personal data through the site.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Children</h2>
      <p className="mb-4">
        The service is not directed to children under 13. We do not knowingly collect personal
        information from children under 13.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">Contact</h2>
      <p className="mb-4">
        For privacy requests, please contact us at <a href="mailto:lightingdesign581@gmail.com" className="text-blue-400 underline">lightingdesign581@gmail.com</a>.
      </p>

      <div className="mt-8">
        <Link to="/contact" className="text-sm text-blue-400 underline mr-4">Contact</Link>
        <Link to="/terms" className="text-sm text-blue-400 underline">Terms</Link>
      </div>
    </div>
  );
};

export default Privacy;
