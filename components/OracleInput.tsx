import React, { useState, useEffect } from 'react';

interface OracleInputProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  isLoading: boolean;
}

const sampleQuestions = [
  "How can I reduce performance anxiety?",
  "What are some safe ways to explore anal play?",
  "How do I talk about kinks with my partner?",
  "What's the best lube for sensitive skin?",
  "How can we reignite passion in a long-term relationship?",
];


const OracleInput: React.FC<OracleInputProps> = ({ value, onChange, onSubmit, isLoading }) => {
  const [placeholder, setPlaceholder] = useState(sampleQuestions[0]);
  
  useEffect(() => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % sampleQuestions.length;
      setPlaceholder(sampleQuestions[currentIndex]);
    }, 3500); // Change every 3.5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <label htmlFor="question" className="block text-sm font-medium text-dark-text-secondary">
        Ask a question about sexual health, wellness, or relationships
      </label>
      <div className="relative">
        <textarea
          id="question"
          name="question"
          rows={3}
          className="block w-full px-4 py-3 pr-28 bg-dark-input border border-gray-600 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent transition"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading || !value.trim()}
          className="absolute right-2.5 bottom-2.5 bg-brand-primary text-white font-semibold py-2 px-4 rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-dark-input focus:ring-brand-secondary transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? 'Asking...' : 'Ask'}
        </button>
      </div>
    </form>
  );
};

export default OracleInput;