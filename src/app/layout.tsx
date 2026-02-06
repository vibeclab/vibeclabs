import type { Metadata } from "next";
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
        className={`${inter.variable} ${ibmPlexMono.variable} antialiased`}
      >
        <GrainOverlay />
        {children}
      </body>
    </html>
  );
}
