import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import VerticalLine from '@/components/VerticalLine';
import { useEffect } from 'react';

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Your Portfolio",
  description: "A showcase of my work and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  useEffect(() => {
    if (!sessionStorage.getItem('hasLoaded')) {
      window.scrollTo(0, 0);
      sessionStorage.setItem('hasLoaded', 'true');
    }
  }, []);

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <VerticalLine />
        {children}
      </body>
    </html>
  );
}