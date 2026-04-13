import type { Metadata } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { GoogleAnalytics } from "@next/third-parties/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Eleva Peptides | Physician-Prescribed Peptide Therapy",
    template: "%s | Eleva Peptides",
  },
  description:
    "Physician-prescribed peptide therapy for energy, recovery, weight management, and longevity. Free 30-minute consultation with a real doctor. Telemedicine available nationwide.",
  keywords: [
    "peptide therapy",
    "peptides",
    "telemedicine",
    "physician consultation",
    "anti-aging",
    "weight loss",
    "energy recovery",
    "longevity",
    "BPC-157",
    "Semaglutide",
    "hormone optimization",
  ],
  openGraph: {
    title: "Eleva Peptides | Physician-Prescribed Peptide Therapy",
    description:
      "Not a supplement. Not a shortcut. A real prescription from a real doctor. Book your free 30-minute consultation today.",
    type: "website",
    url: "https://elevapeptides.com",
    siteName: "Eleva Peptides",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eleva Peptides | Physician-Prescribed Peptide Therapy",
    description: "Biology can be fixed. Book your free physician consultation.",
  },
};

function AnalyticsProvider() {
  if (
    process.env.ANALYTICS_ENABLED === "true" &&
    process.env.GOOGLE_ANALYTICS_GAID
  ) {
    return <GoogleAnalytics gaId={process.env.GOOGLE_ANALYTICS_GAID} />;
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <Header />
        <main
          id="main-content"
          tabIndex={-1}
          className="flex flex-col flex-1 outline-none"
        >
          {children}
        </main>
      </body>
      <AnalyticsProvider />
    </html>
  );
}
