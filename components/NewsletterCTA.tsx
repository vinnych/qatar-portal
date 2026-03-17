"use client";

import { useState, useEffect } from "react";

export default function NewsletterCTA() {
  const [dismissed, setDismissed] = useState(true); // start hidden to avoid flash

  useEffect(() => {
    setDismissed(localStorage.getItem("newsletter_dismissed") === "1");
  }, []);

  if (dismissed) return null;

  function dismiss() {
    localStorage.setItem("newsletter_dismissed", "1");
    setDismissed(true);
  }

  return (
    <div className="bg-amber-50 border border-amber-200 rounded-2xl px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
      <span className="text-2xl flex-shrink-0">📬</span>
      <div className="flex-1">
        <p className="font-semibold text-amber-900 text-sm">Get weekly Qatar updates</p>
        <p className="text-xs text-amber-700">Prayer times, news highlights, and job picks — free, no spam.</p>
      </div>
      <div className="flex items-center gap-2 flex-shrink-0">
        <a
          href="https://qatarportal.substack.com"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-amber-700 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-amber-800 transition-colors"
        >
          Subscribe free →
        </a>
        <button
          onClick={dismiss}
          aria-label="Dismiss"
          className="text-amber-500 hover:text-amber-700 text-lg leading-none p-1"
        >
          ×
        </button>
      </div>
    </div>
  );
}
