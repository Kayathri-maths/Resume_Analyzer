import { useState } from "react";
import AnalysisPanel from "../components/analysis/AnalysisPanel";
import ProjectEnhancer from "../components/analysis/ProjectEnhancer";
import RoleMatch from "../components/analysis/RoleMatch";
import SkillsRadar from "../components/analysis/SkillsRadar";
import UploadResume from "../components/upload/UploadResume";

import { analyzeResume } from "../services/resumeApi";
import { extractTextFromPdf } from "../utils/pdfUtils";

export default function Dashboard() {
  const [file, setFile] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selected = e.target.files?.[0];
    if (
      selected &&
      selected.type === "application/pdf" &&
      selected.size <= 10 * 1024 * 1024
    ) {
      setFile(selected);
      setError(null);
    } else {
      setError("Please upload a valid PDF under 10MB");
    }
  };

  const handleAnalyze = async () => {
    if (!file) return setError("Please upload a file first.");

    setAnalyzing(true);
    setError(null);
    setResult(null);

    try {
      const text = await extractTextFromPdf(file);
      const output = await analyzeResume(text);

      if (!output.is_resume) return setError("Not a resume");

      setResult(output);
    } catch (err) {
      setError(err.message);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleReset = () => {
    setFile(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Upload + Analysis (TOP) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-12 mb-5">
          <UploadResume
            file={file}
            analyzing={analyzing}
            error={error}
            handleFileChange={handleFileChange}
            handleAnalyze={handleAnalyze}
            handleReset={handleReset}
          />

          <AnalysisPanel result={result} />
        </div>

        {/* Bottom 3 grids */}
        {result && (
          <>
            <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
              <SkillsRadar skills={result.skills} />
              <RoleMatch roles={result.roles} />
            </section>
            <section className="mb-8">
              <ProjectEnhancer projects={result.projects} />
            </section>
          </>
        )}
      </main>
    </div>
  );
}
