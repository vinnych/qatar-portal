"use client";

import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/prayer", label: "Prayer Times" },
  { href: "/weather", label: "Weather" },
  { href: "/currency", label: "QAR Rates" },
  { href: "/news", label: "News" },
  { href: "/jobs", label: "Jobs" },
  { href: "/qatar-metro", label: "Metro" },
  { href: "/about", label: "About" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <div className="sm:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label="Toggle menu"
        aria-expanded={open}
        className="p-3 rounded focus:outline-none transition-colors"
        style={{ color: "rgba(200,168,75,0.7)" }}
      >
        {open ? <X size={22} /> : <Menu size={22} />}
      </button>

      {open && (
        <div
          className="absolute top-full left-0 right-0 z-50 shadow-xl"
          style={{ background: "#1E0A14", borderBottom: "1px solid rgba(139,26,60,0.4)" }}
        >
          <nav className="w-full px-4 sm:px-6 lg:px-8 py-2 flex flex-col">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-[11px] font-bold tracking-widest uppercase py-4 transition-colors"
                style={{
                  color: "rgba(248,236,210,0.55)",
                  borderBottom: "1px solid rgba(139,26,60,0.2)",
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
