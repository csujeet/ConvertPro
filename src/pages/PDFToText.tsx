import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import ProcessingStatus from '../components/ProcessingStatus';
import { extractTextFromPDF } from '../utils/fileUtils';
import { saveAs } from 'file-saver';

const PDFToText: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setStatus('idle');
    setProgress(0);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setStatus('processing');
    setProgress(25);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 85) {
          clearInterval(progressInterval);
          return 85;
        }
        return prev + 20;
      });
    }, 400);

    setTimeout(() => {
      clearInterval(progressInterval);
      setProgress(100);
      setStatus('success');
    }, 2200);
  };

  const handleDownload = () => {
    if (files.length > 0) {
      const extractedText = extractTextFromPDF(files[0].name);
      const blob = new Blob([extractedText], { type: 'text/plain' });
      saveAs(blob, `${files[0].name.replace('.pdf', '')}-extracted-text.txt`);
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
            PDF to Text Converter
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Extract text content from PDF documents for editing and analysis
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <FileUpload
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes={['application/pdf']}
            maxFiles={5}
            title="Upload PDF Files"
            description="Select PDF files to extract text content"
          />

          {files.length > 0 && status === 'idle' && (
            <button
              onClick={handleConvert}
              className="w-full bg-gradient-to-r from-green-600 to-green-700 text-white py-4 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Extract Text
            </button>
          )}

          <ProcessingStatus
            status={status}
            progress={progress}
            onDownload={status === 'success' ? handleDownload : undefined}
            downloadFileName="extracted-text.txt"
            message={
              status === 'processing'
                ? 'Extracting text from PDF...'
                : status === 'success'
                ? 'Text has been successfully extracted from your PDF!'
                : status === 'error'
                ? 'Text extraction failed. The PDF may be image-based or corrupted.'
                : undefined
            }
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Output Options
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="radio" name="format" defaultChecked className="text-green-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Plain Text (.txt)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="format" className="text-green-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Rich Text (.rtf)</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="radio" name="format" className="text-green-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">HTML (.html)</span>
              </label>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-2xl p-6 border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              📝 Text Extraction
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Works best with text-based PDFs. For scanned documents, consider using our OCR feature for accurate text recognition.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFToText;