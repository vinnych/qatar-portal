"use client";

import { useState, useMemo } from "react";
import type { Job } from "@/lib/jobs";

export default function JobSearch({ jobs }: { jobs: Job[] }) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    if (!query.trim()) return jobs;
    const q = query.toLowerCase();
    return jobs.filter(
      (job) =>
        job.title.toLowerCase().includes(q) ||
        job.company.toLowerCase().includes(q) ||
        job.source.toLowerCase().includes(q)
    );
  }, [query, jobs]);

  return (
    <div className="space-y-4">
      {/* Search bar */}
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm">🔍</span>
        <input
          type="search"
          placeholder="Search jobs or companies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-stone-200 bg-white text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-200 focus:border-emerald-300 transition"
        />
        {query && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-gray-400">
            {filtered.length} job{filtered.length !== 1 ? "s" : ""}
          </span>
        )}
      </div>

      {/* Results */}
      {filtered.length === 0 ? (
        <p className="text-gray-400 text-sm text-center py-8">No jobs found for &ldquo;{query}&rdquo;</p>
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((job) => (
            <a
              key={job.link}
              href={`/jobs/${job.slug}`}
              className="bg-emerald-50 rounded-xl border border-emerald-100 shadow-sm p-4 hover:shadow-md hover:border-emerald-300 transition-all flex items-start justify-between gap-4"
            >
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{job.title}</h3>
                <p className="text-xs text-gray-500 mt-1">
                  {job.company} · {job.location}
                </p>
              </div>
              <span className="text-xs text-emerald-800 font-medium whitespace-nowrap bg-emerald-100 border border-emerald-200 px-2 py-1 rounded-full">
                {job.source}
              </span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
