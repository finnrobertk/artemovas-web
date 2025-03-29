import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

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
        <Navigation />
        <main>{children}</main>
        <footer className="bg-primary text-white py-8 mt-auto">
          <div className="container mx-auto px-4">
            <p className="text-center">&copy; {new Date().getFullYear()} Artemova&apos;s Beauty. Alle rettigheter forbeholdt.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
