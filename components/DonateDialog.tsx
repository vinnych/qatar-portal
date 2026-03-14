"use client";

import { useState, useEffect } from "react";

const PRESETS = [1, 5, 10, 100];
const DONATE_URL = "https://razorpay.me/@qatarportal";

export default function DonateDialog() {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<number>(5);
  const [custom, setCustom] = useState("");

  useEffect(() => {
    const timer = setTimeout(() => setOpen(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!open) return null;

  const amount = custom || selected;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-sm w-full p-6 text-center space-y-4">
        {/* Icon */}
        <div className="text-4xl">🕌</div>

        {/* Heading */}
        <h2 className="text-xl font-bold text-rose-900">Support Qatar Portal</h2>

        {/* Message */}
        <p className="text-gray-600 text-sm leading-relaxed">
          Qatar Portal is free, ad-free, and maintained by one person. If it
          helps you with prayer times, news, or job searches — please consider
          a small contribution to keep it running.
        </p>

        {/* Preset amounts */}
        <div className="grid grid-cols-4 gap-2">
          {PRESETS.map((amt) => (
            <button
              key={amt}
              onClick={() => { setSelected(amt); setCustom(""); }}
              className={`py-2 rounded-xl text-sm font-bold border-2 transition-colors ${
                !custom && selected === amt
                  ? "bg-amber-400 border-amber-400 text-rose-900"
                  : "bg-white border-gray-200 text-gray-700 hover:border-amber-300"
              }`}
            >
              ${amt}
            </button>
          ))}
        </div>

        {/* Custom amount */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-medium">$</span>
          <input
            type="number"
            min="1"
            placeholder="Custom amount"
            value={custom}
            onChange={(e) => { setCustom(e.target.value); setSelected(0); }}
            className="w-full pl-7 pr-4 py-2 border-2 border-gray-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 text-center"
          />
        </div>

        {/* Donate button */}
        <a
          href={DONATE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full bg-[#2D81F7] hover:bg-[#1a6fe0] text-white font-bold py-3 px-6 rounded-xl transition-colors text-sm"
          onClick={() => setOpen(false)}
        >
          💙 Donate ${amount} via Razorpay
        </a>

        <p className="text-xs text-gray-400">Accepts cards, UPI &amp; net banking · No account needed</p>

        {/* Dismiss */}
        <button
          onClick={() => setOpen(false)}
          className="text-gray-400 hover:text-gray-600 text-sm transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  );
}
