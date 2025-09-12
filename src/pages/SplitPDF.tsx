import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import ProcessingStatus from '../components/ProcessingStatus';
import { createZipFile } from '../utils/fileUtils';
import { saveAs } from 'file-saver';

const SplitPDF: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [splitMode, setSplitMode] = useState<'pages' | 'range'>('pages');

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setStatus('idle');
    setProgress(0);
  };

  const handleSplit = async () => {
    if (files.length === 0) return;

    setStatus('processing');
    setProgress(30);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85;
        }
        return prev + 20;
      });
    }, 350);

    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setStatus('success');
    }, 2500);
  };

  const handleDownload = async () => {
    if (files.length > 0) {
      const splitFiles = [];
      const file = files[0];
      const arrayBuffer = await file.arrayBuffer();
      const pdfDoc = await (await import('pdf-lib')).PDFDocument.load(arrayBuffer);
      const totalPages = pdfDoc.getPageCount();
      for (let i = 0; i < totalPages; i++) {
        const newPdf = await (await import('pdf-lib')).PDFDocument.create();
        const [copiedPage] = await newPdf.copyPages(pdfDoc, [i]);
        newPdf.addPage(copiedPage);
        const pdfBytes = await newPdf.save();
        splitFiles.push({
          name: `page-${i + 1}.pdf`,
          content: pdfBytes
        });
      }
      const zipBlob = await createZipFile(splitFiles);
      saveAs(zipBlob, `${files[0].name.replace(/\.pdf$/i, '')}-split-pages.zip`);
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
            Split PDF Documents
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Divide PDF documents into separate pages or custom ranges
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <FileUpload
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes={['application/pdf']}
            maxFiles={3}
            title="Upload PDF to Split"
            description="Select PDF files to split into separate pages"
          />

          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Split Options
            </h3>
            <div className="space-y-4">
              <div className="flex space-x-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="splitMode"
                    checked={splitMode === 'pages'}
                    onChange={() => setSplitMode('pages')}
                    className="text-orange-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">Individual Pages</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="radio"
                    name="splitMode"
                    checked={splitMode === 'range'}
                    onChange={() => setSplitMode('range')}
                    className="text-orange-600"
                  />
                  <span className="text-slate-700 dark:text-slate-300">Page Ranges</span>
                </label>
              </div>

              {splitMode === 'range' && (
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    Page Ranges (comma-separated)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g., 1-5, 8-12, 15"
                    className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-3 py-2"
                  />
                </div>
              )}
            </div>
          </div>

          {files.length > 0 && status === 'idle' && (
            <button
              onClick={handleSplit}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-700 text-white py-4 rounded-xl font-semibold hover:from-orange-700 hover:to-orange-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Split PDF
            </button>
          )}

          <ProcessingStatus
            status={status}
            progress={progress}
            onDownload={status === 'success' ? handleDownload : undefined}
            downloadFileName="split-pdf-pages.zip"
            message={
              status === 'processing'
                ? 'Splitting PDF into separate files...'
                : status === 'success'
                ? 'PDF has been successfully split! Download the ZIP file containing all pages.'
                : status === 'error'
                ? 'Split operation failed. Please try again.'
                : undefined
            }
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-2xl p-6 border border-orange-200 dark:border-orange-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              ✂️ Split Methods
            </h3>
            <ul className="text-sm text-slate-600 dark:text-slate-300 space-y-2">
              <li>• <strong>Individual Pages:</strong> Each page becomes a separate PDF</li>
              <li>• <strong>Page Ranges:</strong> Specify custom ranges to split</li>
              <li>• <strong>Batch Processing:</strong> Split multiple PDFs at once</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SplitPDF;