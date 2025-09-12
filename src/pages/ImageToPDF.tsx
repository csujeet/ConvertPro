import React, { useState } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import FileUpload from '../components/FileUpload';
import ProcessingStatus from '../components/ProcessingStatus';
import { PDFDocument } from 'pdf-lib';
import { saveAs } from 'file-saver';

const ImageToPDF: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [status, setStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  const [convertedPDF, setConvertedPDF] = useState<Uint8Array | null>(null);

  const handleFilesSelected = (selectedFiles: File[]) => {
    setFiles(selectedFiles);
    setStatus('idle');
    setProgress(0);
    setConvertedPDF(null);
  };

  const handleConvert = async () => {
    if (files.length === 0) return;

    setStatus('processing');
    setProgress(10);

    try {
      const pdfDoc = await PDFDocument.create();
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const arrayBuffer = await file.arrayBuffer();
        
        let image;
        if (file.type === 'image/jpeg' || file.type === 'image/jpg') {
          image = await pdfDoc.embedJpg(arrayBuffer);
        } else if (file.type === 'image/png') {
          image = await pdfDoc.embedPng(arrayBuffer);
        } else {
          throw new Error('Unsupported image format');
        }

        const page = pdfDoc.addPage();
        const { width: imgWidth, height: imgHeight } = image.scale(1);
        const { width: pageWidth, height: pageHeight } = page.getSize();

        // Calculate scaling to fit image on page while maintaining aspect ratio
        const scale = Math.min(
          (pageWidth - 40) / imgWidth,
          (pageHeight - 40) / imgHeight
        );

        const scaledWidth = imgWidth * scale;
        const scaledHeight = imgHeight * scale;

        page.drawImage(image, {
          x: (pageWidth - scaledWidth) / 2,
          y: (pageHeight - scaledHeight) / 2,
          width: scaledWidth,
          height: scaledHeight,
        });

        setProgress(20 + (i / files.length) * 70);
      }

      const pdfBytes = await pdfDoc.save();
      setConvertedPDF(pdfBytes);
      setProgress(100);
      setStatus('success');
    } catch (error) {
      console.error('Conversion error:', error);
      setStatus('error');
    }
  };

  const handleDownload = () => {
    if (convertedPDF) {
      const blob = new Blob([convertedPDF], { type: 'application/pdf' });
      saveAs(blob, 'images-converted.pdf');
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
            Image to PDF Converter
          </h1>
          <p className="text-slate-600 dark:text-slate-300 mt-1">
            Convert JPG, PNG images into a single PDF document
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <FileUpload
            onFilesSelected={handleFilesSelected}
            acceptedFileTypes={['image/jpeg', 'image/jpg', 'image/png']}
            maxFiles={20}
            title="Upload Images"
            description="Select JPG or PNG images to combine into a PDF"
          />

          {files.length > 0 && status === 'idle' && (
            <button
              onClick={handleConvert}
              className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white py-4 rounded-xl font-semibold hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              Convert to PDF
            </button>
          )}

          <ProcessingStatus
            status={status}
            progress={progress}
            onDownload={status === 'success' ? handleDownload : undefined}
            downloadFileName="images-converted.pdf"
            message={
              status === 'processing'
                ? 'Converting images to PDF...'
                : status === 'success'
                ? 'Your images have been successfully converted to PDF!'
                : status === 'error'
                ? 'Conversion failed. Please check your images and try again.'
                : undefined
            }
          />
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-4">
              Conversion Settings
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Page Size
                </label>
                <select className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-3 py-2">
                  <option>A4</option>
                  <option>Letter</option>
                  <option>Legal</option>
                  <option>Custom</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Image Quality
                </label>
                <select className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white px-3 py-2">
                  <option>High</option>
                  <option>Medium</option>
                  <option>Low</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-2xl p-6 border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-slate-900 dark:text-white mb-3">
              🖼️ Image Tips
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              Upload images in the order you want them to appear. Higher resolution images will result in better PDF quality.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageToPDF;