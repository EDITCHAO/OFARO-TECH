import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "arial"],
});

export const metadata: Metadata = {
  title: "OFARO TECH - Votre partenaire de confiance pour la transformation digitale",
  description: "OFARO TECH est une entreprise spécialisée dans les technologies de l'information offrant des services de développement web et mobile, réseaux informatiques, cybersécurité, maintenance et conseil IT.",
  keywords: [
    "OFARO TECH",
    "développement web",
    "développement mobile",
    "transformation digitale",
    "cybersécurité",
    "réseaux informatiques",
    "conseil IT",
    "Togo",
    "Lomé"
  ],
  authors: [{ name: "OFARO TECH" }],
  openGraph: {
    type: "website",
    locale: "fr_FR",
    url: "https://ofarotech.com",
    siteName: "OFARO TECH",
    title: "OFARO TECH - Transformation Digitale",
    description: "Votre partenaire de confiance pour la transformation digitale",
  },
  twitter: {
    card: "summary_large_image",
    title: "OFARO TECH - Transformation Digitale",
    description: "Votre partenaire de confiance pour la transformation digitale",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={inter.variable}>
      <head>
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="anonymous" />
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
