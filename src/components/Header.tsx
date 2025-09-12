import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FileText, Moon, Sun, Home, Scissors } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  const location = useLocation();

  return (
    <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-lg border-b border-slate-200 dark:border-slate-700 sticky top-0 z-50 transition-colors duration-300">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="bg-gradient-to-br from-blue-600 to-teal-600 p-2 rounded-xl group-hover:scale-105 transition-transform duration-200">
              <FileText className="w-6 h-6 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text text-transparent">
              ConvertPro
            </span>
          </Link>

          <nav className="hidden md:flex items-center space-x-4">
            <Link
              to="/"
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                location.pathname === '/'
                  ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </Link>

            {/* Document Conversion dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <FileText className="w-4 h-4" />
                <span>Document Conversion</span>
              </button>
              <div className="absolute left-0 top-full mt-0 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto z-50 origin-top-left">
                <div className="py-2">
                  <Link to="/image-to-pdf" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Image → PDF</Link>
                  <Link to="/pdf-to-image" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">PDF → Image</Link>
                  <Link to="/pdf-to-text" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">PDF → Text</Link>
                </div>
              </div>
            </div>

            {/* PDF Manipulation dropdown */}
            <div className="relative group">
              <button className="flex items-center space-x-2 px-3 py-2 rounded-lg text-sm text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                <Scissors className="w-4 h-4" />
                <span>PDF Manipulation</span>
              </button>
              <div className="absolute left-0 top-full mt-0 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-slate-200 dark:border-slate-700 opacity-0 group-hover:opacity-100 transform scale-95 group-hover:scale-100 transition-all duration-150 pointer-events-none group-hover:pointer-events-auto z-50 origin-top-left">
                <div className="py-2">
                  <Link to="/split-pdf" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Split PDF</Link>
                  <Link to="/merge-pdf" className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700">Merge PDFs</Link>
                </div>
              </div>
            </div>
          </nav>

          <div className="flex items-center space-x-3">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-500" />
              ) : (
                <Moon className="w-5 h-5 text-slate-600" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;