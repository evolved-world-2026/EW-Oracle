import React from 'react';
import { ProductRecommendation } from '../types';

interface ProductRecommendationsProps {
  recommendations: ProductRecommendation[];
}

const ProductRecommendations: React.FC<ProductRecommendationsProps> = ({ recommendations }) => {
  if (recommendations.length === 0) {
    return null;
  }

  return (
    <div className="w-full p-6 sm:p-8 bg-dark-card rounded-2xl shadow-lg border border-gray-700 animate-fade-in mt-8">
      <h2 className="text-xl font-bold text-brand-secondary mb-4">For a more... hands-on approach:</h2>
      <ul className="space-y-2">
        {recommendations.map((rec, index) => (
          <li key={index}>
            <a
              href={rec.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-brand-primary hover:underline hover:text-brand-blue transition-colors"
            >
              {rec.name} &rarr;
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductRecommendations;
