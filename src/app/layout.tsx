import { SpeedInsights } from "@vercel/speed-insights/next"
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { SimpleSeparator } from "@/components/Separator";

const inter = Inter({ subsets: ["latin"] });

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
    <html lang="nb" suppressHydrationWarning>
      <body className={inter.className} suppressHydrationWarning>
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
