import { getJobs } from "@/lib/jobs";

export default async function JobList({ limit = 6 }: { limit?: number }) {
  let jobs;
  try {
    jobs = await getJobs(limit);
  } catch {
    return <p className="text-red-500">Could not load jobs.</p>;
  }

  if (jobs.length === 0) {
    return <p className="text-gray-400">No job listings available right now.</p>;
  }

  return (
    <div className="flex flex-col gap-3">
      {jobs.map((job) => (
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
  );
}
