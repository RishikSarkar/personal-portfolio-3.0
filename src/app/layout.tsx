import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NetworkLine from '@/components/NetworkLine';
import CursorEffect from '@/components/CursorEffect';
import CursorCat from '@/components/CursorCat';

const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rishik Sarkar | Portfolio",
  description: "A showcase of my work and skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link 
          rel="preload" 
          href="/fonts/GeistVF.woff" 
          as="font" 
          type="font/woff" 
          crossOrigin="anonymous" 
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <div className="max-w-[100vw] overflow-x-hidden">
          <NetworkLine />
          <CursorEffect />
          <CursorCat />
          {children}
        </div>
      </body>
    </html>
  );
}
