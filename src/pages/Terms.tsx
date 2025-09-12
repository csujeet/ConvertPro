import React from 'react';
import { Link } from 'react-router-dom';

const Terms: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 text-white">
      <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
      <p className="mb-4">
        This is a sample Terms of Service placeholder. Replace this with your actual terms before going live.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Use of Service</h2>
      <p className="mb-4">
        By using this service you agree to our terms, including that you will not upload content that you
        do not have permission to process.
      </p>
      <h2 className="text-xl font-semibold mt-6 mb-2">Liability</h2>
      <p className="mb-4">
        We are not responsible for loss of data. Use the service at your own risk.
      </p>

      <div className="mt-8">
        <Link to="/" className="text-sm text-blue-400 underline">Back to Home</Link>
      </div>
    </div>
  );
};

export default Terms;
