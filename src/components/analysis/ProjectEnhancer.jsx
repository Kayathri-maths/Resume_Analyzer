import { motion } from "framer-motion";
import { Wand2 } from "lucide-react";

export default function ProjectEnhancer({ projects }) {
  if (!projects) return null;

  return (
    <motion.div
      className="bg-white p-6 rounded-xl border shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-emerald-50 text-emerald-600">
          <Wand2 className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">Project Enhancer</div>
          <div className="text-xs text-gray-500">
            ATS-optimized descriptions
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {projects.map((p, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="p-4 rounded-lg border bg-gradient-to-br from-emerald-50/50 to-teal-50/50"
          >
            <div className="text-xs font-semibold text-gray-500 uppercase">
              Original
            </div>
            <div className="mt-1 text-sm text-gray-700 italic">
              "{p.original}"
            </div>

            <div className="mt-3 text-xs font-semibold text-emerald-700 uppercase">
              Enhanced
            </div>
            <ul className="ml-4 list-disc text-sm mt-2 space-y-1 text-gray-700">
              {p.enhanced.map((b, j) => (
                <li key={j}>{b}</li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
