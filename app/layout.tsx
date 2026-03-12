import type { Metadata } from "next";
import { Playfair_Display } from "next/font/google";
import FooterScenery from "@/components/FooterScenery";
import { safeJsonLd } from "@/lib/utils";
import "./globals.css";

const playfair = Playfair_Display({ subsets: ["latin"], weight: ["700"] });

export const metadata: Metadata = {
  title: "Qatar Portal — Prayer Times, Jobs & News",
  description:
    "Your daily Qatar resource: accurate prayer times for Doha, latest job listings in Qatar, and top Gulf news headlines.",
  keywords: ["Qatar prayer times", "Doha prayer times today", `Qatar jobs ${new Date().getFullYear()}`, "Qatar news", "Gulf jobs", "Fajr time Doha"],
  alternates: { canonical: "https://qatarportal.vercel.app" },
  openGraph: {
    title: "Qatar Portal",
    description: "Prayer times, jobs, and news for Qatar",
    url: "https://qatarportal.vercel.app",
    siteName: "Qatar Portal",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-stone-50 text-gray-900 min-h-screen">
        <header className="bg-rose-900 sticky top-0 z-10 shadow-md">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <a href="/" className={`${playfair.className} text-2xl tracking-widest text-amber-300 uppercase`}>
              Qatar
            </a>
            <nav className="flex gap-6 text-sm font-medium">
              <a href="/" className="text-white hover:text-amber-300 transition-colors">Home</a>
              <a href="/prayer" className="text-white hover:text-amber-300 transition-colors">Prayer</a>
              <a href="/news" className="text-white hover:text-amber-300 transition-colors">News</a>
              <a href="/jobs" className="text-white hover:text-amber-300 transition-colors">Jobs</a>
            </nav>
          </div>
        </header>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{__html: safeJsonLd({
            "@context": "https://schema.org",
            "@type": "WebSite",
            "name": "Qatar Portal",
            "url": "https://qatarportal.vercel.app",
            "description": "Prayer times, jobs, and news for Qatar"
          })}}
        />
        <main className="max-w-6xl mx-auto px-4 py-8">{children}</main>
        <FooterScenery />
        <footer className="bg-amber-50 border-t border-amber-200 py-6 text-center text-sm text-gray-500">
          © {new Date().getFullYear()} Qatar Portal. All rights reserved.
        </footer>
      </body>
    </html>
  );
}
