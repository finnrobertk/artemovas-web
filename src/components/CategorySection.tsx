'use client';

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Behandling {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  bookingId?: string; // Optional booking system ID for the treatment
}

interface Category {
  _id: string;
  title: string;
  behandlinger: Behandling[];
}

export function CategorySection({ category }: { category: Category }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [bookingInProgress, setBookingInProgress] = useState<string | null>(null);

  const handleBooking = async (behandling: Behandling) => {
    setBookingInProgress(behandling._id);
    
    // If you want to track bookings
    try {
      // You could add analytics tracking here
      window.open(`https://artemovas.onlinebooq.dk/behandling/${behandling.bookingId || ''}`, '_blank');
    } catch (error) {
      console.error('Booking error:', error);
    } finally {
      setBookingInProgress(null);
    }
  };

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
              className="bg-background border border-gold/30 hover:border-gold rounded-lg p-4 transition-all duration-300 flex items-center justify-between"
            >
              <div className="flex-grow">
                <h3 className="text-lg font-sans text-white">
                  {behandling.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-text-soft mt-1">
                  <span>{behandling.duration} min</span>
                  <span className="text-gold font-semibold">{behandling.price} kr</span>
                </div>
              </div>
              
              <button
                onClick={() => handleBooking(behandling)}
                disabled={bookingInProgress === behandling._id}
                className={`
                  flex items-center gap-2 
                  ${bookingInProgress === behandling._id 
                    ? 'bg-gold/50' 
                    : 'bg-gold hover:bg-secondary'
                  }
                  text-background font-semibold px-6 py-2 rounded-lg 
                  transition-colors duration-300
                `}
              >
                {bookingInProgress === behandling._id ? (
                  <svg className="animate-spin h-5 w-5 text-background" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                ) : (
                  <svg 
                    className="w-5 h-5" 
                    fill="none" 
                    viewBox="0 0 24 24" 
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                )}
                {bookingInProgress === behandling._id ? 'Åpner...' : 'Book Time'}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 