import { getQARRates } from "@/lib/currency";
import CurrencyConverter from "@/components/CurrencyConverter";
import { safeJsonLd } from "@/lib/utils";
import type { Metadata } from "next";

const SITE_URL = "https://qatar-portal.vercel.app";

export const metadata: Metadata = {
  title: "QAR Exchange Rate Today — Qatar Riyal to USD, INR, EUR & More | Qatar Portal",
  description:
    "Live Qatar Riyal (QAR) exchange rates today. Convert QAR to USD, EUR, GBP, INR, PKR, PHP, EGP, BDT and more. Updated hourly.",
  alternates: { canonical: `${SITE_URL}/currency` },
  keywords: [
    "QAR to USD",
    "Qatar riyal exchange rate",
    "1 QAR to INR",
    "QAR to EUR",
    "Qatar currency rate today",
    "QAR exchange rate",
    "Qatari riyal",
    "QAR to PKR",
    "QAR to PHP",
  ],
  openGraph: {
    title: "QAR Exchange Rate Today — Qatar Riyal Rates",
    description: "Live Qatar Riyal exchange rates vs USD, EUR, GBP, INR, PKR and more. Updated hourly.",
    url: `${SITE_URL}/currency`,
    siteName: "Qatar Portal",
    type: "website",
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image", title: "QAR Exchange Rate Today — Qatar Riyal Rates", description: "Live Qatar Riyal exchange rates vs USD, EUR, GBP, INR, PKR and more." },
};

export default async function CurrencyPage() {
  const data = await getQARRates();

  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric",
  });

  const allRates = data?.rates ?? [];

  // Build FAQ entries for top pairs
  const faqEntries = allRates.slice(0, 4).map((r) => ({
    "@type": "Question",
    name: `What is 1 QAR to ${r.code} today?`,
    acceptedAnswer: {
      "@type": "Answer",
      text: `1 Qatari Riyal (QAR) = ${r.value < 1 ? r.value.toFixed(4) : r.value.toFixed(2)} ${r.code} (${r.name}) as of today. Rates are updated hourly.`,
    },
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      ...faqEntries,
      {
        "@type": "Question",
        name: "Is the Qatari Riyal pegged to the US Dollar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. The Qatari Riyal (QAR) is pegged to the US Dollar at a fixed rate of 1 USD = 3.64 QAR (or 1 QAR ≈ 0.2747 USD). This peg has been maintained since 1980 and provides currency stability.",
        },
      },
      {
        "@type": "Question",
        name: "What currency is used in Qatar?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Qatar uses the Qatari Riyal (QAR), issued by the Qatar Central Bank. It is subdivided into 100 dirhams. The Riyal is pegged to the US Dollar at 3.64 QAR per USD.",
        },
      },
    ],
  };

  return (
    <div className="max-w-3xl mx-auto space-y-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />

      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
          QAR Exchange Rates Today
        </h1>
        <p className="text-gray-500 text-sm">{today} · Updated hourly</p>
      </div>

      {!data ? (
        <p className="text-gray-400">Exchange rate data is currently unavailable. Please try again shortly.</p>
      ) : (
        <>
          {/* USD peg highlight */}
          <div className="bg-rose-50 border border-rose-100 rounded-2xl p-5 flex items-center gap-5">
            <span className="text-4xl">🇶🇦</span>
            <div>
              <p className="text-sm text-rose-700 font-semibold uppercase tracking-wide mb-1">Qatari Riyal (QAR)</p>
              <p className="text-gray-700 text-sm">The QAR is <strong>pegged to the US Dollar</strong> at a fixed rate of <strong>1 USD = 3.64 QAR</strong>. This peg has been maintained since 1980.</p>
            </div>
          </div>

          {/* Currency converter */}
          <CurrencyConverter rates={allRates} />

          {/* SEO info section */}
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-gray-900">About the Qatari Riyal</h2>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-stone-50 rounded-xl border border-stone-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Currency Facts</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>· Symbol: QAR (﷼)</li>
                  <li>· Subdivisions: 100 dirhams</li>
                  <li>· Issued by: Qatar Central Bank</li>
                  <li>· Peg: Fixed at 3.64 QAR/USD since 1980</li>
                </ul>
              </div>
              <div className="bg-stone-50 rounded-xl border border-stone-200 p-4">
                <h3 className="font-semibold text-gray-800 mb-2">Sending Money to Qatar?</h3>
                <p className="text-sm text-gray-600">
                  Most major remittance services (Western Union, Wise, MoneyGram) support QAR. Compare rates before sending — service fees can vary significantly between providers.
                </p>
              </div>
            </div>
          </section>
        </>
      )}

      <p className="text-xs text-gray-400">Exchange rate source: ExchangeRate-API (open.er-api.com) · Updated hourly · Rates are for informational purposes only.</p>
    </div>
  );
}
