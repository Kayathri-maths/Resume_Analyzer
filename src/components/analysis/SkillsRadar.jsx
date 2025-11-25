import { motion } from "framer-motion";
import { BarChart3 } from "lucide-react";
import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";

export default function SkillsRadar({ skills }) {
  if (!skills) return null;

  const toRadarData = (skillObj) =>
    Object.entries(skillObj).map(([skill, score]) => ({ skill, score }));

  return (
    <motion.div
      className="bg-white p-6 rounded-xl border border-gray-300 shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-blue-50 text-blue-600">
          <BarChart3 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">Skill Radar</div>
          <div className="text-xs text-gray-500">Visual skill analysis</div>
        </div>
      </div>

      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={toRadarData(skills)}>
            <PolarGrid strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="skill"
              tick={{ fontSize: 11, fill: "#6B7280" }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fontSize: 10 }}
            />
            <Radar
              dataKey="score"
              stroke="#3B82F6"
              fill="#3B82F6"
              fillOpacity={0.25}
              strokeWidth={2}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
