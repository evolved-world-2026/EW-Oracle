import React from 'react';

const OracleResponseDisplay: React.FC<{ response: string }> = ({ response }) => {
  return (
    <div className="w-full p-6 sm:p-8 bg-dark-card rounded-2xl shadow-lg border border-gray-700 animate-fade-in">
      <div
        className="prose prose-invert max-w-none 
                   prose-p:text-dark-text 
                   prose-h2:text-brand-secondary 
                   prose-strong:text-dark-text
                   prose-ul:list-disc prose-ul:pl-5
                   prose-li:text-dark-text"
        dangerouslySetInnerHTML={{ __html: response }}
      />
    </div>
  );
};

export default OracleResponseDisplay;