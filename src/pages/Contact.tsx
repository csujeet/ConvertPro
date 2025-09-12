import React from 'react';
import { Link } from 'react-router-dom';

const Contact: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 text-white">
      <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
      <p className="mb-4">If you have questions or need support, email us at <a href="mailto:lightingdesign581@gmail.com" className="text-blue-400 underline">lightingdesign581@gmail.com</a>.</p>
      <p className="mb-4">If you'd like, include a simple contact form here that posts to your backend or directly opens the user's mail client.</p>
      <div className="mt-8">
        <Link to="/" className="text-sm text-blue-400 underline">Back to Home</Link>
      </div>
    </div>
  );
};

export default Contact;
