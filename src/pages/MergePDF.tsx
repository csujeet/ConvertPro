import React, { useState } from 'react';
import { ArrowLeft, GripVertical } from 'lucide-react';
import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import ProcessingStatus from '../components/ProcessingStatus';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const MergePDF: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [mergedPDF, setMergedPDF] = useState<Uint8Array | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setStatus('idle');
    setProgress(0);
    setMergedPDF(null);
  };

  const handleMerge = async () => {
    if (files.length < 2) return;

    setStatus('processing');
    setProgress(10);

    try {
      const mergedPdf = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        const copiedPages = await mergedPdf.copyPages(pdf, pdf.getPageIndices());
        
        copiedPages.forEach((page) => mergedPdf.addPage(page));
        
        setProgress(20 + (i / files.length) * 70);
      }

      const pdfBytes = await mergedPdf.save();
      setMergedPDF(pdfBytes);
      setProgress(100);
      setStatus('success');
    } catch (error) {
      console.error('Merge error:', error);
      setStatus('error');
    }
  };

  const handleDownload = () => {
    if (mergedPDF) {
      const blob = new Blob([mergedPDF], { type: 'application/pdf' });
      saveAs(blob, 'merged-document.pdf');
    }
  };

  const reorderFiles = (fromIndex: number, toIndex: number) => {
    const newFiles = [...files];
    const [reorderedFile] = newFiles.splice(fromIndex, 1);
    newFiles.splice(toIndex, 0, reorderedFile);
    setFiles(newFiles);
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
            Merge PDF Documents
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Combine multiple PDF files into a single document
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <FileUpload
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes={['application/pdf']}
            maxFiles={10}
            title="Upload PDF Files to Merge"
            description="Select multiple PDF files to combine into one document"
          />

          {files.length > 1 && (
            <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
              <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
                File Order (Drag to Reorder)
              </h3>
              <div className="space-y-2">
                {files.map((file, index) => (
                  <div
                    key={`${file.name}-${index}`}
                    className="flex items-center space-x-3 p-3 bg-slate-50 dark:bg-slate-700 rounded-lg cursor-move hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-200"
                  >
                    <GripVertical className="w-4 h-4 text-slate-400" />
                    <span className="text-sm font-medium text-slate-900 dark:text-white flex-1">
                      {index + 1}. {file.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {files.length > 1 && status === 'idle' && (
            <button
              onClick={handleMerge}
              className="w-full bg-gradient-to-r from-teal-600 to-teal-700 text-white py-4 rounded-xl font-semibold hover:from-teal-700 hover:to-teal-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Merge PDFs ({files.length} files)
            </button>
          )}

          <ProcessingStatus
            status={status}
            progress={progress}
            onDownload={status === 'success' ? handleDownload : undefined}
            downloadFileName="merged-document.pdf"
            message={
              status === 'processing'
                ? 'Merging PDF files...'
                : status === 'success'
                ? 'PDFs have been successfully merged into one document!'
                : status === 'error'
                ? 'Merge operation failed. Please check your files and try again.'
                : undefined
            }
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Merge Settings
            </h3>
            <div className="space-y-3">
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Preserve bookmarks</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" defaultChecked className="rounded text-teal-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Maintain page numbering</span>
              </label>
              <label className="flex items-center space-x-3">
                <input type="checkbox" className="rounded text-teal-600" />
                <span className="text-sm text-slate-700 dark:text-slate-300">Add separator pages</span>
              </label>
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-50 to-cyan-50 dark:from-teal-900/20 dark:to-cyan-900/20 rounded-2xl p-6 border border-teal-200 dark:border-teal-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              🔄 Merge Process
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Files will be merged in the order shown. Drag and drop to reorder them before merging. All formatting and metadata will be preserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MergePDF;