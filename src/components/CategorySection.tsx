'use client';

import { useState } from "react";

interface Behandling {
  _id: string;
  title: string;
  description: string;
  price: number;
  duration: number;
  simplyBookService?: string; // Service ID from SimplyBook.me
}

interface Category {
  _id: string;
  title: string;
  behandlinger: Behandling[];
}

declare global {
  interface Window {
    SimplybookWidget: any;
  }
}

export function CategorySection({ category }: { category: Category }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleBooking = (behandling: Behandling) => {
    console.log("handleBooing: ", behandling);
    if (typeof window !== 'undefined' && window.SimplybookWidget) {
      try {
        new window.SimplybookWidget({
          'widget_type': 'button',
          'url': 'https://artemovasbeauty.simplybook.me', // Replace with your SimplyBook.me URL
          'theme': 'default',
          'theme_settings': {
            'timeline_show_end_time': '1',
            'timeline_modern_display': '1',
            'sb_base_color': '#B4833E', // Gold color from your theme
            'display_item_mode': 'block',
            'booking_nav_bg_color': '#1A1A1A', // Dark background from your theme
            'body_bg_color': '#1A1A1A',
            'sb_review_image': '',
            'dark_font_color': '#ffffff',
            'light_font_color': '#ffffff',
            'btn_color_1': '#B4833E',
            'sb_company_label_color': '#ffffff',
            'hide_img_mode': '0',
            'show_sidebar': '1',
            'sb_busy': '#dad2ce',
            'sb_available': '#B4833E'
          },
          'timeline': 'modern',
          'datepicker': 'top_calendar',
          'is_rtl': false,
          'app_config': {
            'predefined': {
              'service': behandling.simplyBookService // Use the service ID from SimplyBook.me
            },
            'allow_switch_to_ada': 0,
            'padding_days': 0,
            'show_progress_bar': 1
          }
        });
      } catch (error) {
        console.error('Error initializing SimplyBook widget:', error);
      }
    } else {
      console.error('SimplyBook widget not loaded');
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
                className="flex items-center gap-2 bg-gold hover:bg-secondary text-background font-semibold px-6 py-2 rounded-lg transition-colors duration-300"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Book Time
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
} 