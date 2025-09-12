import React from 'react';
import { CheckCircle, AlertCircle, Loader, Download } from 'lucide-react';

interface ProcessingStatusProps {
  status: 'idle' | 'processing' | 'success' | 'error';
  message?: string;
  progress?: number;
  onDownload?: () => void;
  downloadFileName?: string;
}

const ProcessingStatus: React.FC<ProcessingStatusProps> = ({
  status,
  message,
  progress = 0,
  onDownload,
  downloadFileName
}) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'processing':
        return <Loader className="w-6 h-6 text-blue-600 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'error':
        return <AlertCircle className="w-6 h-6 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'processing':
        return 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800';
      case 'success':
        return 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800';
      case 'error':
        return 'bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800';
      default:
        return 'bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700';
    }
  };

  if (status === 'idle') return null;

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${getStatusColor()}`}>
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          {getStatusIcon()}
        </div>
        
        <div className="flex-1 space-y-3">
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {status === 'processing' && 'Processing Your Files...'}
              {status === 'success' && 'Conversion Complete!'}
              {status === 'error' && 'Processing Failed'}
            </h3>
            {message && (
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {message}
              </p>
            )}
          </div>

          {status === 'processing' && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-slate-600 dark:text-slate-400">
                <span>Progress</span>
                <span>{Math.round(progress)}%</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                <div
                  className="bg-gradient-to-r from-blue-600 to-teal-600 h-2 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {status === 'success' && onDownload && (
            <button
              onClick={onDownload}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Download className="w-5 h-5" />
              <span>Download {downloadFileName || 'File'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;