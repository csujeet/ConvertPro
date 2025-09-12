import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, Image, Scissors, Merge, Download, Upload, Zap, Shield, Clock, Star } from 'lucide-react';
import AdSenseAd from '../components/AdSenseAd';
import CookieConsent from '../components/CookieConsent';

const Home: React.FC = () => {
  const conversionTools = [
    {
      title: 'Image to PDF',
      description: 'Convert JPG, PNG images to PDF documents',
      icon: Image,
      path: '/image-to-pdf',
      color: 'from-purple-600 to-purple-700',
      popularity: 88
    },
    {
      title: 'PDF to Image',
      description: 'Extract images from PDF or convert pages to JPG/PNG',
      icon: Image,
      path: '/pdf-to-image',
      color: 'from-pink-600 to-pink-700',
      popularity: 85
    },
    {
      title: 'PDF to Text',
      description: 'Extract text content from PDF documents',
      icon: FileText,
      path: '/pdf-to-text',
      color: 'from-green-600 to-green-700',
      popularity: 78
    }
  ];

  const manipulationTools = [
    {
      title: 'Split PDF',
      description: 'Divide PDF into separate pages or ranges',
      icon: Scissors,
      path: '/split-pdf',
      color: 'from-orange-600 to-orange-700',
      popularity: 82
    },
    {
      title: 'Merge PDFs',
      description: 'Combine multiple PDF files into one document',
      icon: Merge,
      path: '/merge-pdf',
      color: 'from-teal-600 to-teal-700',
      popularity: 90
    },
    // Compress PDF removed
  ];

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      description: 'Process documents in seconds with our optimized algorithms'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Files are processed locally and automatically deleted'
    },
    {
      icon: Clock,
      title: 'No Registration',
      description: 'Start converting immediately without any signup required'
    }
  ];

  const ToolCard: React.FC<{
    tool: typeof conversionTools[0];
    index: number;
  }> = ({ tool, index }) => {
    const IconComponent = tool.icon;
    
    return (
      <Link
        to={tool.path}
        className="group relative overflow-hidden bg-white dark:bg-slate-800 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border border-slate-200 dark:border-slate-700"
        style={{ animationDelay: `${index * 100}ms` }}
      >
        <div className="relative z-10">
          <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${tool.color} mb-4 group-hover:scale-110 transition-transform duration-200`}>
            <IconComponent className="w-6 h-6 text-white" />
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-200">
              {tool.title}
            </h3>
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4 text-amber-400 fill-current" />
              <span className="text-sm text-slate-500 dark:text-slate-400">{tool.popularity}%</span>
            </div>
          </div>
          
          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed">
            {tool.description}
          </p>
        </div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-blue-50 to-teal-50 dark:from-blue-900/10 dark:to-teal-900/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </Link>
    );
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-slate-900 dark:text-white mb-6 leading-tight">
            Professional
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent block">
              Document Conversion
            </span>
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8 leading-relaxed max-w-2xl mx-auto">
            Transform, manipulate, and optimize your documents with lightning-fast, secure processing. 
            No software installation required.
          </p>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="flex items-center space-x-2 bg-white dark:bg-slate-800 px-4 py-2 rounded-full shadow-md border border-slate-200 dark:border-slate-700"
                  style={{ animationDelay: `${index * 200}ms` }}
                >
                  <IconComponent className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                    {feature.title}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Conversion Tools */}
      <section>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            Document Conversion Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {conversionTools.map((tool, index) => (
              <ToolCard key={tool.title} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* PDF Manipulation Tools */}
      <section>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-8 text-center">
            PDF Manipulation Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {manipulationTools.map((tool, index) => (
              <ToolCard key={tool.title} tool={tool} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-12 text-center">
            Why Choose ConvertPro?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div
                  key={feature.title}
                  className="text-center p-8 bg-white dark:bg-slate-800 rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 hover:shadow-xl transition-all duration-300"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="inline-flex p-4 rounded-full bg-gradient-to-r from-blue-100 to-teal-100 dark:from-blue-900/30 dark:to-teal-900/30 mb-4">
                    <IconComponent className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 text-center">
        <div className="max-w-4xl mx-auto bg-gradient-to-r from-blue-600 to-teal-600 rounded-3xl p-12 text-white shadow-2xl">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Documents?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of professionals who trust ConvertPro for their document processing needs.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/image-to-pdf"
              className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-3 rounded-xl font-semibold hover:bg-blue-50 transition-colors duration-200 shadow-lg"
            >
              <Upload className="w-5 h-5" />
              <span>Start Converting</span>
            </Link>
            <Link
              to="/merge-pdf"
              className="inline-flex items-center space-x-2 bg-transparent border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-all duration-200"
            >
              <Download className="w-5 h-5" />
              <span>Merge PDFs</span>
            </Link>
          </div>
          {/* AdSense placeholder (will only load after consent) */}
          <div className="mt-8">
            <AdSenseAd className="mx-auto max-w-full" />
          </div>
          <div className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
            <Link to="/privacy" className="underline mr-4">Privacy Policy</Link>
            <Link to="/terms" className="underline mr-4">Terms of Service</Link>
            <Link to="/contact" className="underline">Contact</Link>
          </div>
          <CookieConsent />
        </div>
      </section>
    </div>
  );
};

export default Home;