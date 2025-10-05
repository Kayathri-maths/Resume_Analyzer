export default function ResultCard({ result }) {
  if (!result) return null;

  return (
    <div className="bg-gray-50 shadow-lg rounded-2xl p-6 mt-8 w-96">
      <h2 className="text-xl font-semibold mb-3 text-blue-600">
        AI Analysis Result
      </h2>
      <p>
        <strong>ATS Score:</strong> {result.ats_score}
      </p>
      <p>
        <strong>Key Skills:</strong> {result.key_skills.join(", ")}
      </p>
      <p className="mt-2">
        <strong>Summary:</strong> {result.summary}
      </p>
      <div className="mt-3">
        <strong>Suggestions:</strong>
        <ul className="list-disc list-inside text-sm mt-1">
          {result.suggestions.map((s, i) => (
            <li key={i}>{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
