import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import ProcessingStatus from '../components/ProcessingStatus';
import { createZipFile } from '../utils/fileUtils';
// Removed duplicate/old pdfjsLib import
import { GlobalWorkerOptions, getDocument } from 'pdfjs-dist';

// Import the worker file via Vite's ?url loader so it is served from the same origin as the app.
// This avoids dynamic cross-origin module import failures (fake worker setup errors).
// A TypeScript declaration for '*?url' is added in src/vite-env.d.ts.
import pdfWorkerUrl from 'pdfjs-dist/build/pdf.worker.min?url';
GlobalWorkerOptions.workerSrc = typeof window !== 'undefined' ? (window as any).pdfWorkerSrc || pdfWorkerUrl : '';
import { saveAs } from 'file-saver';

const PDFToImage: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setStatus('idle');
    setProgress(0);
  };

  const [imageFiles, setImageFiles] = useState<{ name: string; content: Uint8Array }[]>([]);

  const handleConvert = async () => {
    try {
      if (files.length === 0) return;
      setStatus('processing');
      setProgress(10);
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
    const loadingTask = getDocument({ data: arrayBuffer });
      const pdf = await loadingTask.promise;
      const numPages = pdf.numPages;
      const images: { name: string; content: Uint8Array }[] = [];
      for (let i = 1; i <= numPages; i++) {
        try {
          const page = await pdf.getPage(i);

          // Use a slightly higher scale for clearer images; devicePixelRatio may be considered.
          const scale = 1.5;
          const viewport = page.getViewport({ scale });

          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          if (!context) throw new Error('Canvas 2D context not available');

          // Set integer pixel dimensions on the canvas to avoid rendering issues
          canvas.width = Math.max(1, Math.floor(viewport.width));
          canvas.height = Math.max(1, Math.floor(viewport.height));

          // Ensure CSS size matches logical size (helps some browsers/scaling)
          canvas.style.width = `${Math.floor(viewport.width)}px`;
          canvas.style.height = `${Math.floor(viewport.height)}px`;

          const renderContext = { canvasContext: context, viewport } as any;
          await page.render(renderContext).promise;

          const blob: Blob | null = await new Promise(resolve => canvas.toBlob(resolve, 'image/jpeg', 0.92));
          if (blob) {
            const arrayBuffer = await blob.arrayBuffer();
            images.push({ name: `page-${i}.jpg`, content: new Uint8Array(arrayBuffer) });
          }

          setProgress(10 + Math.round((i / numPages) * 80));
        } catch (pageErr) {
          console.error('Error rendering page', i, pageErr);
        }
      }
      setImageFiles(images);
      setProgress(100);
      setStatus('success');
    } catch (err) {
      console.error('PDF to Image conversion error:', err);
      setStatus('error');
    }
  };

  const handleDownload = async () => {
    if (imageFiles.length > 0 && files.length > 0) {
      // imageFiles is now { name: string; content: Uint8Array }[]
      const zipBlob = await createZipFile(imageFiles);
      saveAs(zipBlob, `${files[0].name.replace('.pdf', '')}-images.zip`);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors duration-200"
        >
          <ArrowLeft className="w-5 h-5 text-slate-600 dark:text-slate-400" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            PDF to Image Converter
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Extract pages from PDF as high-quality JPG or PNG images
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <FileUpload
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes={['application/pdf']}
            maxFiles={3}
            title="Upload PDF Files"
            description="Select PDF files to convert pages to images"
          />

          {files.length > 0 && status === 'idle' && (
            <button
              onClick={handleConvert}
              className="w-full bg-gradient-to-r from-pink-600 to-pink-700 text-white py-4 rounded-xl font-semibold hover:from-pink-700 hover:to-pink-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Convert to Images
            </button>
          )}

          <ProcessingStatus
            status={status}
            progress={progress}
            onDownload={status === 'success' ? handleDownload : undefined}
            downloadFileName="pdf-images.zip"
            message={
              status === 'processing'
                ? 'Converting PDF pages to images...'
                : status === 'success'
                ? 'PDF pages have been converted to images and packaged in a ZIP file!'
                : status === 'error'
                ? 'Conversion failed. Please try again.'
                : undefined
            }
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Image Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Output Format
                </label>
                <select className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-3 py-2">
                  <option>JPG</option>
                  <option>PNG</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Resolution (DPI)
                </label>
                <select className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-3 py-2">
                  <option>150</option>
                  <option>300</option>
                  <option>600</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Page Range
                </label>
                <input
                  type="text"
                  placeholder="e.g., 1-5, 8, 10-12"
                  className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-3 py-2"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFToImage;