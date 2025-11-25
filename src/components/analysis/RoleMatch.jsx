import { motion } from "framer-motion";
import { UserCheck } from "lucide-react";

export default function RoleMatch({ roles }) {
  if (!roles) return null;

  return (
    <motion.div
      className="bg-white p-6 rounded-xl border border-gray-300 shadow-lg"
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-2 rounded-lg bg-indigo-50 text-indigo-600">
          <UserCheck className="w-5 h-5" />
        </div>
        <div>
          <div className="text-sm font-semibold">Job Role Match</div>
          <div className="text-xs text-gray-500">AI-predicted roles</div>
        </div>
      </div>

      <div className="space-y-4">
        {roles.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-lg border border-gray-300 p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-baseline justify-between mb-2">
              <div className="font-semibold text-sm text-gray-900">
                {r.role}
              </div>
              <div className="text-xs font-semibold text-indigo-600">
                {r.score}%
              </div>
            </div>
            <div className="text-xs text-gray-600 mb-3">{r.evidence}</div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${r.score}%` }}
                className="h-2 rounded-full bg-gradient-to-r from-indigo-500 to-purple-600"
                transition={{ duration: 1, delay: i * 0.1 }}
              />
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
