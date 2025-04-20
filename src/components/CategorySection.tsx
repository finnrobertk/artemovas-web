'use client';

import { useState } from "react";

interface Behandling {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
}

interface Category {
  _id: string;
  title: string;
  behandlinger: Behandling[];
}

export function CategorySection({ category }: { category: Category }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="mb-8 last:mb-0">
      <button 
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full flex items-center justify-between bg-background p-6 rounded-lg border border-gold hover:border-secondary transition-colors duration-300"
      >
        <h2 className="text-2xl font-sans text-white">{category.title}</h2>
        <svg 
          className={`w-6 h-6 text-gold transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`}
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-4 space-y-3 pl-4">
          {category.behandlinger.map((behandling) => (
            <div
              key={behandling._id}
              className="bg-background border border-gold/30 hover:border-gold rounded-lg p-4 transition-all duration-300"
            >
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-sans text-white">
                  {behandling.title}
                </h3>
                <div className="flex items-center gap-4">
                  <span className="text-sm text-text-soft">
                    {behandling.duration} min
                  </span>
                  <span className="text-gold font-semibold">
                    {behandling.price} kr
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 