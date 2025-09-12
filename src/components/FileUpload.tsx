import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, X, File, AlertCircle } from 'lucide-react';

interface FileUploadProps {
  onFilesSelected: (files: File[]) => void;
  acceptedFileTypes: string[];
  maxFiles?: number;
  title: string;
  description: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
  onFilesSelected,
  acceptedFileTypes,
  maxFiles = 10,
  title,
  description
}) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [error, setError] = useState<string>('');

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    setError('');
    
    if (rejectedFiles.length > 0) {
      const reasons = rejectedFiles.map(f => f.errors[0]?.message).join(', ');
      setError(`Some files were rejected: ${reasons}`);
    }

    if (acceptedFiles.length > 0) {
      const newFiles = [...selectedFiles, ...acceptedFiles].slice(0, maxFiles);
      setSelectedFiles(newFiles);
      onFilesSelected(newFiles);
    }
  }, [selectedFiles, maxFiles, onFilesSelected]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  const removeFile = (index: number) => {
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    onFilesSelected(newFiles);
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
          isDragActive && !isDragReject
            ? 'border-blue-400 bg-blue-50 dark:bg-blue-900/20 scale-105'
            : isDragReject
            ? 'border-red-400 bg-red-50 dark:bg-red-900/20'
            : 'border-slate-300 dark:border-slate-600 hover:border-blue-400 dark:hover:border-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800/50'
        }`}
      >
        <input {...getInputProps()} />
        
        <div className="space-y-4">
          <div className={`inline-flex p-4 rounded-full transition-all duration-300 ${
            isDragActive
              ? 'bg-blue-100 dark:bg-blue-900/30 scale-110'
              : 'bg-slate-100 dark:bg-slate-800'
          }`}>
            <Upload className={`w-8 h-8 transition-colors duration-300 ${
              isDragActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-600 dark:text-slate-400'
            }`} />
          </div>
          
          <div>
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              {title}
            </h3>
            <p className="text-slate-600 dark:text-slate-300 mb-4">
              {description}
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {isDragActive
                ? 'Drop files here...'
                : 'Drag & drop files here, or click to browse'
              }
            </p>
            <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">
              Max file size: 50MB • Max files: {maxFiles}
            </p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
          <AlertCircle className="w-5 h-5 text-red-600 dark:text-red-400" />
          <span className="text-red-700 dark:text-red-300 text-sm">{error}</span>
        </div>
      )}

      {selectedFiles.length > 0 && (
        <div className="space-y-3">
          <h4 className="font-semibold text-slate-900 dark:text-white">
            Selected Files ({selectedFiles.length})
          </h4>
          <div className="space-y-2">
            {selectedFiles.map((file, index) => (
              <div
                key={`${file.name}-${index}`}
                className="flex items-center justify-between p-4 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm"
              >
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                    <File className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-slate-900 dark:text-white text-sm">
                      {file.name}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      {formatFileSize(file.size)}
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => removeFile(index)}
                  className="p-1 text-slate-400 hover:text-red-500 transition-colors duration-200"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;