import { motion } from "framer-motion";
import { AlertCircle, FileText, UploadCloud } from "lucide-react";

export default function UploadResume({
  file,
  error,
  analyzing,
  handleFileChange,
  handleAnalyze,
  handleReset,
}) {
  return (
    <motion.div
      className="bg-white p-6 rounded-xl shadow-lg border"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 rounded-lg bg-blue-50 text-blue-600">
          <UploadCloud className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold">Upload Resume</h2>
          <p className="text-xs text-gray-500">PDF only • max 10MB</p>
        </div>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-4 hover:border-blue-400 hover:bg-blue-50/30 transition-all">
        <FileText className="mx-auto h-12 w-12 text-gray-400 mb-3" />
        <p className="font-medium text-gray-700">
          {file ? file.name : "Click to upload"}
        </p>
        <p className="mt-1 text-xs text-gray-500">
          {file
            ? `${(file.size / 1024 / 1024).toFixed(2)} MB`
            : "PDF files only"}
        </p>

        <input
          id="file"
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="sr-only"
        />
        <label
          htmlFor="file"
          className="mt-4 inline-block cursor-pointer px-5 py-2.5 bg-gray-100 hover:bg-gray-200 rounded-lg text-sm border transition-colors"
        >
          {file ? "Change file" : "Choose file"}
        </label>
      </div>

      <div className="flex gap-3">
        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleAnalyze}
          disabled={analyzing || !file}
          className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-semibold disabled:opacity-50 disabled:cursor-not-allowed hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md"
        >
          {analyzing ? "Analyzing..." : "Analyze Resume"}
        </motion.button>

        <motion.button
          whileTap={{ scale: 0.98 }}
          onClick={handleReset}
          className="px-4 py-3 rounded-lg border hover:bg-gray-50 transition-colors"
        >
          Reset
        </motion.button>
      </div>

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 p-4 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700 flex items-start gap-3"
        >
          <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </motion.div>
      )}
    </motion.div>
  );
}
