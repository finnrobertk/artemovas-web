import { useState, useEffect } from 'react';

// Definer props-typen
interface BookingButtonProps {
    serviceId: string;
}

const BookingButton: React.FC<BookingButtonProps> = ({ serviceId }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    useEffect(() => {
        // Dynamisk laste inn SimplyBook widget-skriptet kun én gang per komponent
        const script = document.createElement('script');
        script.src = "//widget.simplybook.it/v2/widget/widget.js";
        script.type = "text/javascript";
        script.async = true;
        document.body.appendChild(script);

        script.onload = () => {
            // Når scriptet er lastet, initialiser widgeten for den spesifikke tjenesten
            new SimplybookWidget({
                "widget_type": "iframe",
                "url": `https://artemovasbeauty.simplybook.it/?service=${serviceId}`,
                "theme": "concise",
                "theme_settings": {
                    "timeline_hide_unavailable": "1",
                    "hide_past_days": "0",
                    "timeline_show_end_time": "0",
                    "timeline_modern_display": "as_slots",
                    "light_font_color": "#ffffff",
                    "sb_secondary_base": "#050405",
                    "sb_base_color": "#cf1259",
                    "display_item_mode": "block",
                    "booking_nav_bg_color": "#ffffff",
                    "sb_review_image": "",
                    "dark_font_color": "#050405",
                    "btn_color_1": "#bd0b5c",
                    "sb_company_label_color": "#cd0c64",
                    "hide_img_mode": "0",
                    "show_sidebar": "1",
                    "sb_busy": "#c7b3b3",
                    "sb_available": "#d6ebff"
                },
                "timeline": "modern",
                "datepicker": "top_calendar",
                "is_rtl": false,
                "app_config": {
                    "clear_session": 0,
                    "allow_switch_to_ada": 0,
                    "predefined": {
                        "service": serviceId
                    }
                }
            });
        };

        return () => {
            // Rydd opp etter at komponenten blir fjernet (fjerne scriptet hvis nødvendig)
            document.body.removeChild(script);
        };
    }, [serviceId]);

    return (
        <div>
            {/* Book Time Button */}
            <button
                onClick={openModal}
                className="bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600"
            >
                Book time
            </button>

            {/* Modal Popup */}
            {isModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-4 rounded-lg shadow-lg w-96 relative">
                        <button
                            onClick={closeModal}
                            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                        >
                            &times;
                        </button>
                        <div id="sb-widget-container">
                            {/* Just here for the widget to be loaded */}
                            <iframe
                                title={`SimplyBook.me booking widget for service ${serviceId}`}
                                src={`https://artemovasbeauty.simplybook.it/?service=${serviceId}`}
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
};

export default BookingButton;