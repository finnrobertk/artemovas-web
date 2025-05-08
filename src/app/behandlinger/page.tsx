"use client";
import { useEffect } from "react";

export default function BehandlingerPage() {
  useEffect(() => {
    // Dynamically load the iframe resizer script
    const script = document.createElement("script");
    script.src =
        "https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/2.8.3/iframeResizer.min.js";
    script.async = true;
    script.onload = () => {
      (window as any).iFrameResize?.({ checkOrigin: false }, "#reservationIframe37051");
    };
    document.body.appendChild(script);

    // Cleanup function
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-background">
        <div className="w-full max-w-4xl p-4">
          <iframe
              width="100%"
              frameBorder="0"
              src="https://bestill.timma.no/reservation/artemovasbeauty"
              id="reservationIframe37051"
              style={{ minHeight: "100vh", background: "black" }}
          ></iframe>
        </div>
      </div>
  );
}