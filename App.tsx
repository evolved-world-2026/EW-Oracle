
import React, { useState, useCallback } from 'react';
import { askOracle } from './services/geminiService';
import OracleInput from './components/OracleInput';
import OracleResponseDisplay from './components/OracleResponseDisplay';
import ErrorMessage from './components/ErrorMessage';
import LoadingSpinner from './components/LoadingSpinner';
import ProductRecommendations from './components/ProductRecommendations';
import { ProductRecommendation } from './types';

const App: React.FC = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<ProductRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!question.trim() || isLoading) return;

    setIsLoading(true);
    setError(null);
    setAnswer(null);
    setRecommendations([]);

    try {
      const response = await askOracle(question);
      setAnswer(response.answer_html);
      setRecommendations(response.product_recommendations);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
      setAnswer(null);
      setRecommendations([]);
    } finally {
      setIsLoading(false);
    }
  }, [question, isLoading]);

  return (
    <div className="min-h-screen bg-black text-dark-text flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <main className="w-full max-w-4xl flex flex-col items-center space-y-8">
        <header className="text-center flex flex-col items-center space-y-4">
          <img 
            src="https://cdn11.bigcommerce.com/s-68qpvi2pwl/images/stencil/200x90/ew_logo_full_500x_1720028968__45969.original.png" 
            alt="Evolved World Logo" 
            className="h-12"
          />
          <h1 className="text-4xl sm:text-5xl font-bold text-brand-primary">
            Sex Oracle
          </h1>
          <p className="mt-2 text-dark-text-secondary">
            Real information. Real understanding. Ask anything about sex.
          </p>
        </header>

        <div className="w-full p-6 sm:p-8 bg-dark-card rounded-2xl shadow-lg border border-gray-700">
          <OracleInput
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />
        </div>

        {isLoading && <LoadingSpinner />}
        {error && <ErrorMessage message={error} />}
        {answer && <OracleResponseDisplay response={answer} />}
        {recommendations.length > 0 && <ProductRecommendations recommendations={recommendations} />}

      </main>
      <footer className="w-full max-w-4xl text-center text-dark-text-secondary text-xs mt-8 pb-4 space-y-4">
        <p>This is an SI-powered (Sexual Intelligence) tool. The information provided is for educational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider with any questions you may have regarding a medical condition.</p>
        <p>&copy; 2025 Evolved World. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
