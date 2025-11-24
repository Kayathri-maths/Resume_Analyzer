import { motion } from "framer-motion";

export default function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-r from-gray-900 to-gray-800 text-white py-4 text-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-3xl mx-auto">
        <div className="text-sm opacity-75">
          © {new Date().getFullYear()} Resume AI Analyzer.
        </div>
        <div className="mt-2 text-xs opacity-60">
          AI-driven analysis to optimize your resume for top ATS systems.
        </div>
      </div>
    </motion.footer>
  );
}
