import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NetworkLine from '@/components/NetworkLine';
import CursorEffect from '@/components/CursorEffect';
import CursorCat from '@/components/CursorCat';

// Optimized font loading with better performance settings
const geistSans = localFont({
  src: "../../public/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

const geistMono = localFont({
  src: "../../public/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
  display: 'swap',
  preload: true,
});

// Enhanced metadata for better SEO and performance
export const metadata: Metadata = {
  title: "Rishik Sarkar | ML Engineer & Computer Science Graduate",
  description: "M.Eng. Computer Science at Cornell University specializing in NLP-driven mental healthcare solutions. Experience in ML, full-stack development, and AI research.",
  keywords: ["Rishik Sarkar", "Machine Learning Engineer", "Cornell University", "NLP", "Mental Healthcare", "AI Research", "Full Stack Developer"],
  authors: [{ name: "Rishik Sarkar" }],
  creator: "Rishik Sarkar",
  openGraph: {
    title: "Rishik Sarkar | ML Engineer & Computer Science Graduate",
    description: "M.Eng. Computer Science at Cornell University specializing in NLP-driven mental healthcare solutions.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Rishik Sarkar | ML Engineer & Computer Science Graduate",
    description: "M.Eng. Computer Science at Cornell University specializing in NLP-driven mental healthcare solutions.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'google-site-verification-code', // Replace with actual verification code
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* DNS prefetch for external domains */}
        <link rel="dns-prefetch" href="//github.com" />
        <link rel="dns-prefetch" href="//linkedin.com" />
        <link rel="dns-prefetch" href="//gmail.com" />
        
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://github.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://linkedin.com" crossOrigin="anonymous" />
        
        {/* Optimized font preloading */}
        <link 
          rel="preload" 
          href="/fonts/GeistVF.woff" 
          as="font" 
          type="font/woff" 
          crossOrigin="anonymous" 
        />
        <link 
          rel="preload" 
          href="/fonts/GeistMonoVF.woff" 
          as="font" 
          type="font/woff" 
          crossOrigin="anonymous" 
        />
        
        {/* Critical resource hints */}
        <link rel="preload" href="/cat/spritesheets/cat.png" as="image" />
        
        {/* Viewport and theme optimization */}
        <meta name="theme-color" content="#000000" />
        <meta name="color-scheme" content="dark" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <div className="w-full overflow-x-hidden md:max-w-[100vw]">
          <NetworkLine />
          <CursorEffect />
          <CursorCat />
          {children}
        </div>
      </body>
    </html>
  );
}
