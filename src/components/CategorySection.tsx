'use client';

import {useState, useRef} from "react";
import BookingButton from "@/components/BookingButton";

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

export function CategorySection({category}: { category: Category }) {
    const [isExpanded, setIsExpanded] = useState(false);
    const [showBookingWidget, setShowBookingWidget] = useState(false);
    const widgetContainerRef = useRef<HTMLDivElement>(null);

    const handleBooking = (behandling: Behandling) => {
        console.log("handleBooking: ", behandling);
        console.log("Window.SimplybookWidget available:", typeof window !== 'undefined' && !!window.SimplybookWidget);

        if (!behandling.simplyBookService) {
            console.error('No SimplyBook service ID provided for treatment:', behandling.title);
            return;
        }

        if (typeof window === 'undefined') {
            console.error('Window object not available');
            return;
        }

        if (!window.SimplybookWidget) {
            console.error('SimplyBook widget not loaded. Check if the script is properly loaded.');
            return;
        }

        setShowBookingWidget(true);

        // Wait for the next tick to ensure the container is in the DOM
        setTimeout(() => {
            try {
                console.log('Initializing SimplyBook widget with service ID:', behandling.simplyBookService);
                new window.SimplybookWidget({
                    "widget_type": "iframe",
                    "url": "https://artemovasbeauty.simplybook.it",
                    "theme": "concise",
                    "theme_settings": {
                        "timeline_show_end_time": "1",
                        "timeline_modern_display": "1",
                        "sb_base_color": "#B4833E",
                        "display_item_mode": "block",
                        "booking_nav_bg_color": "#1A1A1A",
                        "body_bg_color": "#1A1A1A",
                        "sb_review_image": "",
                        "dark_font_color": "#ffffff",
                        "light_font_color": "#ffffff",
                        "btn_color_1": "#B4833E",
                        "sb_company_label_color": "#ffffff",
                        "hide_img_mode": "0",
                        "show_sidebar": "1",
                        "sb_busy": "#dad2ce",
                        "sb_available": "#B4833E"
                    },
                    "timeline": "modern",
                    "datepicker": "top_calendar",
                    "is_rtl": false,
                    "app_config": {
                        "predefined": {
                            "service": behandling.simplyBookService
                        },
                        "allow_switch_to_ada": 0,
                        "padding_days": 0,
                        "show_progress_bar": 1
                    },
                    "container": widgetContainerRef.current
                });
                console.log('SimplyBook widget initialized successfully');
            } catch (error) {
                console.error('Error initializing SimplyBook widget:', error);
            }
        }, 0);
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
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
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                                </svg>
                                Book Time
                            </button>
                            {/*<BookingButton serviceId={behandling.simplyBookService ?? ''} />*/}
                        </div>
                    ))}
                </div>
            )}

            {showBookingWidget && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    onClick={() => setShowBookingWidget(false)}
                >
                    <div
                        className="bg-background p-6 rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-semibold text-white">Book Time</h3>
                            <button
                                onClick={() => setShowBookingWidget(false)}
                                className="text-text-soft hover:text-white"
                            >
                                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                          d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                            </button>
                        </div>
                        <div
                            id="simplybook-widget-container"
                            ref={widgetContainerRef}
                            className="w-full h-[60vh] max-h-[60vh] min-w-[300px]" // Tilpass etter behov
                        >
                            {/* Just here for the widget to be loaded */}
                            <iframe
                                title="SimplyBook.me booking widget"
                                src="https://artemovasbeauty.simplybook.it"
                                width="100%"
                                height="400px"
                                frameBorder="0"
                            ></iframe>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}