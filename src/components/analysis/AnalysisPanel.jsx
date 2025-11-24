import { AnimatePresence, motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export default function AnalysisPanel({ result }) {
  if (!result)
    return (
      <AnimatePresence mode="wait">
        <motion.div
          key="empty"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="min-h-[400px] flex items-center justify-center text-center bg-white p-6 rounded-xl shadow-lg border"
        >
          <div>
            <div className="mb-4 mx-auto h-16 w-16 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-100 to-blue-100">
              <Sparkles className="h-8 w-8 text-purple-600" />
            </div>
            <h3 className="font-semibold text-lg">No Analysis Yet</h3>
            <p className="mt-2 text-sm text-gray-500 max-w-xs mx-auto">
              Upload your resume and click Analyze
            </p>
          </div>
        </motion.div>
      </AnimatePresence>
    );

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-5 max-h-[600px] overflow-y-auto pr-2 bg-white p-6 rounded-xl shadow-lg border"
    >
      {/* ATS Score */}
      <div>
        <div className="flex items-end justify-between mb-3">
          <div>
            <div className="text-xs text-gray-500 uppercase tracking-wide">
              ATS Score
            </div>
            <div className="text-4xl font-bold text-gray-900">
              {result.atsScore}
              <span className="text-lg text-gray-400">/100</span>
            </div>
          </div>

          <div
            className={`text-xs font-semibold px-3 py-1 rounded-full ${
              result.atsScore >= 80
                ? "bg-green-100 text-green-700"
                : result.atsScore >= 60
                ? "bg-blue-100 text-blue-700"
                : "bg-orange-100 text-orange-700"
            }`}
          >
            {result.atsScore >= 80
              ? "Excellent"
              : result.atsScore >= 60
              ? "Good"
              : "Needs Work"}
          </div>
        </div>

        <div className="bg-gray-100 h-3 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${result.atsScore}%` }}
            className={`h-3 rounded-full ${
              result.atsScore >= 80
                ? "bg-gradient-to-r from-green-500 to-emerald-600"
                : result.atsScore >= 60
                ? "bg-gradient-to-r from-blue-500 to-indigo-600"
                : "bg-gradient-to-r from-orange-500 to-red-600"
            }`}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Summary */}
      {result.summary && (
        <div>
          <div className="text-sm font-semibold mb-2 text-gray-700">
            Professional Summary
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {result.summary}
          </p>
        </div>
      )}

      {/* Suggestions */}
      {result.suggestions && (
        <div>
          <div className="text-sm font-semibold mb-2 text-gray-700">
            Improvement Suggestions
          </div>
          <ul className="space-y-2">
            {result.suggestions.map((s, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                className="flex items-start gap-2 text-sm text-gray-600"
              >
                <span className="text-blue-600 mt-1">•</span>
                <span>{s}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      )}
    </motion.div>
  );
}
