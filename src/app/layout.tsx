import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NetworkLine from '@/components/NetworkLine';
import CursorEffect from '@/components/CursorEffect';

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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <div className="max-w-[100vw] overflow-x-hidden">
          <NetworkLine />
          <CursorEffect />
          {children}
        </div>
      </body>
    </html>
  );
}
