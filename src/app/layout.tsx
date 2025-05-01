import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SimpleSeparator } from "@/components/Separator";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Artemova's Beauty",
  description: "Velkommen til Artemova's Beauty - Din ekspert innen øyevipper, ansiktsbehandling og skjønnhetskurs.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nb">
      <head>
        {/*<script*/}
        {/*    type="text/javascript"*/}
        {/*    src="https://simplybook.me/v2/widget.js"*/}
        {/*></script>*/}
        {/*<script src="https://widget.simplybook.me/v2/widget/widget.js"></script>*/}
        <Script
          src="https://widget.simplybook.it/v2/widget/widget.js"
          strategy="beforeInteractive"
        />
      </head>
      <body suppressHydrationWarning className="font-sans antialiased">
        <div className="flex flex-col">
          <Navigation />
          <SimpleSeparator className="-mt-[1px] mb-0" height={1} />
          <main>{children}</main>
        </div>
        <footer className="bg-primary text-white py-8 mt-auto">
          <div className="container mx-auto px-4">
            <p className="text-center">&copy; {new Date().getFullYear()} Artemova&apos;s Beauty. Alle rettigheter forbeholdt.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
