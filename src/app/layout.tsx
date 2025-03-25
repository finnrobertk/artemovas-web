import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Artemova&apos;s Beauty - Profesjonell skjønnhetssalong",
  description: "Velkommen til Artemova&apos;s Beauty - Din profesjonelle skjønnhetssalong for øyevipper, ansiktsbehandling og permanent makeup.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="nb">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
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
