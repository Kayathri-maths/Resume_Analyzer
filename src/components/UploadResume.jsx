import { FileText, Sparkles, Upload } from "lucide-react";
import { useState } from "react";
import pdfToText from "react-pdftotext";
import { ResultCard } from "./ResultCard";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    try {
      if (!file) return alert("Please select a file!");
      setLoading(true);

      const text = await pdfToText(file);

      const prompt = `
          You are an HR expert.

          First, determine if the uploaded text is a resume or not. 
          If it’s not a resume, respond with:
          {"is_resume": false, "reason": "It looks like an article/invoice/book, not a resume."}

          If it is a resume, analyze it and return a JSON object with:
          {
            "is_resume": true,
            "ats_score": (0–100),
            "key_skills": [...],
            "summary": "...",
            "suggestions": [...]
          }

          Resume text:
          ${text}
          `;

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            // NOTE: For demo purposes only; do not expose secrets on the client in production.
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b:free",
            messages: [{ role: "user", content: prompt }],
          }),
        }
      );

      const data = await response.json();
      const output = data?.choices?.[0]?.message?.content ?? "";
      const cleanOutput = output
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();
      const parsed = JSON.parse(cleanOutput);

      if (!parsed.is_resume) {
        alert(parsed.reason || "This file doesn't appear to be a resume.");
        setLoading(false);
        setFile(null);
        return;
      }

      setResult(parsed);

      setLoading(false);
      setFile(null);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume.");
      setLoading(false);
    }
  };

  return (
    <section className="font-sans">
      <header className="mb-8 text-center">
        <h1 className="text-balance text-3xl font-semibold tracking-tight text-gray-900 md:text-4xl">
          Resume ATS Analyzer
        </h1>
        <p className="mt-2 text-sm text-gray-600 md:text-base">
          Get instant AI-powered feedback on your resume
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm md:p-8 h-fit">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-100 text-blue-700">
              <Upload className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h2 className="text-lg font-semibold leading-none">
                Upload Resume
              </h2>
              <p className="mt-1 text-xs text-gray-500">
                PDF format only, max 10MB
              </p>
            </div>
          </div>

          <div className="mb-6 rounded-lg border border-dashed border-gray-300 p-6 text-center transition-colors hover:border-blue-400">
            <input
              id="file-upload"
              type="file"
              accept=".pdf"
              onChange={(e) => setFile(e.target.files?.[0] ?? null)}
              className="sr-only"
            />
            <label
              htmlFor="file-upload"
              className="inline-flex cursor-pointer flex-col items-center"
            >
              <FileText
                className="mb-3 h-10 w-10 text-gray-400"
                aria-hidden="true"
              />
              {file ? (
                <div className="text-center">
                  <p className="font-medium">{file.name}</p>
                  <p className="mt-1 text-xs text-gray-500">
                    Click to change file
                  </p>
                </div>
              ) : (
                <div className="text-center">
                  <p className="font-medium">
                    Click to upload or drag and drop
                  </p>
                  <p className="mt-1 text-xs text-gray-500">PDF files only</p>
                </div>
              )}
            </label>
          </div>

          <button
            type="button"
            onClick={handleUpload}
            disabled={loading || !file}
            aria-disabled={loading || !file}
            aria-busy={loading}
            className={[
              "inline-flex w-full items-center justify-center rounded-lg px-4 py-3 text-sm font-semibold cursor-pointer",
              "bg-blue-600 text-white transition-colors hover:bg-blue-700",
              "disabled:cursor-not-allowed disabled:opacity-50",
            ].join(" ")}
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <svg
                  className="h-4 w-4 animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0A12 12 0 000 12h4z"
                  />
                </svg>
                Analyzing Resume...
              </span>
            ) : (
              "Analyze Resume"
            )}
          </button>

          <div className="mt-6 rounded-lg border border-gray-200 bg-gray-50 p-4">
            <p className="text-sm text-gray-600">
              <strong className="font-semibold text-gray-900">
                How it works:
              </strong>{" "}
              Our AI analyzes your resume against ATS standards, identifying key
              skills and providing actionable feedback to improve your chances
              of getting hired.
            </p>
          </div>
        </div>

        {result ? (
          <ResultCard result={result} />
        ) : (
          <div className="flex min-h-[420px] items-center justify-center rounded-xl border border-gray-200 bg-white p-8 text-center shadow-sm">
            <div>
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
                <Sparkles
                  className="h-8 w-8 text-gray-500"
                  aria-hidden="true"
                />
              </div>
              <h3 className="text-base font-semibold">No Analysis Yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Upload your resume to see AI-powered insights
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
