// React import removed (JSX runtime handles React in this project)
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import ImageToPDF from './pages/ImageToPDF';
import PDFToImage from './pages/PDFToImage';
import PDFToText from './pages/PDFToText';
import SplitPDF from './pages/SplitPDF';
import MergePDF from './pages/MergePDF';
import Privacy from './pages/Privacy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import { ThemeProvider } from './context/ThemeContext';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 dark:from-slate-900 dark:to-slate-800 transition-colors duration-300">
          <Header />
          <main className="container mx-auto px-4 py-8">
            <Routes>
              <Route path="/" element={<Home />} />
              {/* PDF <-> Word converters removed */}
              <Route path="/image-to-pdf" element={<ImageToPDF />} />
              <Route path="/pdf-to-image" element={<PDFToImage />} />
              <Route path="/pdf-to-text" element={<PDFToText />} />
              <Route path="/split-pdf" element={<SplitPDF />} />
              <Route path="/merge-pdf" element={<MergePDF />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/contact" element={<Contact />} />
              {/* Compress PDF page removed */}
            </Routes>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;