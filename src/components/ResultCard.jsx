import { Sparkles } from "lucide-react";

export function ResultCard({ result }) {
  if (!result) return null;
  console.log(result);
  const score = Math.max(0, Math.min(100, Number(result.ats_score ?? 0)));
  const skills = result.key_skills ?? [];
  const suggestions = result.suggestions ?? [];

  return (
    <aside className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
          <Sparkles className="h-5 w-5" aria-hidden="true" />
        </div>
        <div>
          <h2 className="text-lg font-semibold leading-none">AI Analysis</h2>
          <p className="mt-1 text-xs text-gray-500">
            Resume evaluation results
          </p>
        </div>
      </div>

      <div className="space-y-6">
        <section aria-labelledby="ats-score">
          <h3 id="ats-score" className="mb-2 text-sm font-medium text-gray-600">
            ATS Score
          </h3>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold tracking-tight text-gray-900">
              {score}
            </span>
            <span className="text-sm text-gray-500">/100</span>
          </div>
          <div
            className="mt-3 h-2 w-full rounded-full bg-gray-200"
            role="progressbar"
            aria-valuenow={score}
            aria-valuemin={0}
            aria-valuemax={100}
          >
            <div
              className="h-2 rounded-full bg-blue-600 transition-[width] duration-500"
              style={{ width: `${score}%` }}
            />
          </div>
        </section>

        <section aria-labelledby="key-skills">
          <h3 id="key-skills" className="mb-2 text-sm font-semibold">
            Key Skills Identified
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, i) => (
              <span
                key={i}
                className="inline-flex items-center rounded-md border border-gray-200 bg-gray-50 px-2.5 py-1 text-xs font-medium text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        <section aria-labelledby="summary">
          <h3 id="summary" className="mb-2 text-sm font-semibold">
            Summary
          </h3>
          <p className="text-sm leading-relaxed text-gray-700">
            {result.summary}
          </p>
        </section>

        <section aria-labelledby="improvement-suggestions">
          <h3
            id="improvement-suggestions"
            className="mb-3 text-sm font-semibold"
          >
            Improvement Suggestions
          </h3>
          <ul className="space-y-2">
            {suggestions?.map((s, i) => (
              <li key={i} className="flex items-start gap-2">
                <span
                  className="mt-2 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-blue-600"
                  aria-hidden="true"
                />
                <span className="text-sm leading-relaxed text-gray-700">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </aside>
  );
}
