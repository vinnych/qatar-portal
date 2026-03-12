import { getJobs } from "@/lib/jobs";
import { safeJsonLd } from "@/lib/utils";
import { cache } from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

const getCachedJobs = cache(() => getJobs(48));

const SITE_URL = "https://qatarportal.vercel.app";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  let link: string;
  try {
    link = Buffer.from(params.slug, "base64url").toString();
  } catch {
    return {};
  }
  const jobs = await getCachedJobs();
  const job = jobs.find((j) => j.link === link);
  if (!job) return {};
  return {
    title: `${job.title} at ${job.company} — Qatar Jobs | Qatar Portal`,
    description: `${job.title} position at ${job.company} in ${job.location}. Apply now via Qatar Portal.`,
    alternates: { canonical: `${SITE_URL}/jobs/${params.slug}` },
    openGraph: {
      title: `${job.title} — ${job.company}`,
      description: `Job opportunity in Qatar: ${job.title} at ${job.company}`,
      url: `${SITE_URL}/jobs/${params.slug}`,
      siteName: "Qatar Portal",
      type: "article",
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  let link: string;
  try {
    link = Buffer.from(params.slug, "base64url").toString();
  } catch {
    return notFound();
  }

  const jobs = await getCachedJobs();
  const job = jobs.find((j) => j.link === link);
  if (!job) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    url: job.link,
    hiringOrganization: { "@type": "Organization", name: job.company },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressCountry: "QA",
      },
    },
    datePosted: job.pubDate || new Date().toISOString().split("T")[0],
    mainEntityOfPage: `${SITE_URL}/jobs/${params.slug}`,
  };

  return (
    <div className="max-w-2xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: safeJsonLd(jsonLd) }}
      />
      <div className="mb-6">
        <a href="/jobs" className="text-sm text-emerald-700 hover:underline font-medium">
          ← Back to Jobs
        </a>
      </div>
      <span className="inline-block text-xs text-emerald-800 font-semibold bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full mb-3">
        {job.source}
      </span>
      <h1 className="text-2xl font-bold text-gray-900 mt-2 mb-1 leading-snug">
        {job.title}
      </h1>
      <p className="text-base text-gray-600 mb-1 font-medium">{job.company}</p>
      <p className="text-sm text-gray-400 mb-6">{job.location}</p>
      {job.pubDate && (
        <p className="text-xs text-gray-400 mb-8">Posted: {job.pubDate}</p>
      )}
      <a
        href={job.link}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-emerald-700 text-white px-6 py-3 rounded-lg font-medium hover:bg-emerald-800 transition-colors"
      >
        View & Apply on {job.source} →
      </a>
    </div>
  );
}
