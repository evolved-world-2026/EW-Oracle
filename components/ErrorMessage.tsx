
import React from 'react';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return (
    <div className="w-full p-4 bg-red-900/50 border border-red-700 text-red-300 rounded-lg" role="alert">
      <p><span className="font-bold">Error:</span> {message}</p>
    </div>
  );
};

export default ErrorMessage;
