import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GrainOverlay from "@/components/GrainOverlay";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "VibecLabs | Agentic Infrastructure & Logistics R&D",
  description: "VibecLabs specializes in agentic infrastructure and logistics R&D, codifying 15 years of Google ecosystem integration and 4 years of longitudinal content data analysis into autonomous systems. Based in Sagarejo Regional Hub.",
  keywords: ["agentic infrastructure", "logistics R&D", "autonomous systems", "Google ecosystem", "content data analysis", "distributed logistics", "posthumous data orchestration"],
  authors: [{ name: "VibecLabs" }],
  creator: "VibecLabs",
  publisher: "VibecLabs",
  openGraph: {
    title: "VibecLabs | Agentic Infrastructure & Logistics R&D",
    description: "Codifying 15 years of Google ecosystem integration into autonomous systems.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "VibecLabs | Agentic Infrastructure & Logistics R&D",
    description: "Codifying 15 years of Google ecosystem integration into autonomous systems.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
