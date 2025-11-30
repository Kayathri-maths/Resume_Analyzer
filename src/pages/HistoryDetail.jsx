import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AnalysisPanel from "../components/analysis/AnalysisPanel";
import ProjectEnhancer from "../components/analysis/ProjectEnhancer";
import RoleMatch from "../components/analysis/RoleMatch";
import SkillsRadar from "../components/analysis/SkillsRadar";
import { fetchResumeHistoryDetail } from "../services/historyService";

export default function HistoryDetail() {
  const { id } = useParams();
  const [analysis, setAnalysis] = useState(null);

  useEffect(() => {
    async function loadDetail() {
      const res = await fetchResumeHistoryDetail(id);
      setAnalysis(res);
    }
    loadDetail();
  }, [id]);

  if (!analysis)
    return (
      <p className="text-center text-gray-500 py-20">Loading details...</p>
    );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          Resume Analysis Details
        </h1>

        {/* Top Section: ATS + Summary */}
        <div className="grid grid-cols-1  gap-6">
          <AnalysisPanel result={analysis} />
        </div>

        {/* Bottom Section: 3 panels */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <SkillsRadar skills={analysis.skills} />
          <RoleMatch roles={analysis.roles} />
        </div>
        <div className="mt-8">
          <ProjectEnhancer projects={analysis.projects} />
        </div>
      </div>
    </div>
  );
}
