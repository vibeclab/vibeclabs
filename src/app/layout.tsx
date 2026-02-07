import type { Metadata, Viewport } from "next";
import { Inter, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  subsets: ["latin"],
  weight: ["400", "700"],
});

export const metadata: Metadata = {
  title: "VIBECLABS - Creative Engineering & Digital Inheritance",
  description: "An elite digital laboratory specializing in high-security data inheritance systems (THE VAULT) and automated orchestration platforms (DELIVA).",
  keywords: ["VIBECLABS", "Creative Engineering", "Digital Inheritance", "THE VAULT", "DELIVA", "Three.js", "Next.js", "Avant-Garde UI", "Data Security Protocols"],
  authors: [{ name: "VIBECLABS" }],
  creator: "VIBECLABS",
  publisher: "VIBECLABS",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: "VIBECLABS",
    description: "Creative laboratory for the decoupled era. Experiments in digital longevity and multi-tier market orchestration.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VIBECLABS",
    description: "Creative laboratory for the decoupled era. Experiments in digital longevity and multi-tier market orchestration.",
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}

