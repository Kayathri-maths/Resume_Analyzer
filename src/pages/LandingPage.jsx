import { motion } from "framer-motion";
import { BarChart3, Sparkles, Upload, UserCheck, Wand2 } from "lucide-react";
import GoogleAuthButton from "../components/GoogleAuthButton";

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="pt-16 pb-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-6"
          >
            Resume ATS Analyzer
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg sm:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
          >
            Improve your resume with AI — Instantly
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <GoogleAuthButton />
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-sm text-slate-500"
          >
            Sign in with your Google account to get started
          </motion.p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white/50 backdrop-blur">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 text-center mb-16">
            Powerful Resume Analysis Features
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl border border-blue-200"
            >
              <div className="w-12 h-12 rounded-lg bg-blue-500 flex items-center justify-center mb-4 text-white">
                <Upload className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Easy Upload
              </h3>
              <p className="text-slate-700">
                Upload your PDF resume and let AI analyze it in seconds.
              </p>
            </motion.div>

            {/* Feature 2 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl border border-purple-200"
            >
              <div className="w-12 h-12 rounded-lg bg-purple-500 flex items-center justify-center mb-4 text-white">
                <Sparkles className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                AI Analysis
              </h3>
              <p className="text-slate-700">
                Get ATS score, key skills identified, and improvement
                suggestions.
              </p>
            </motion.div>

            {/* Feature 3 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-xl border border-green-200"
            >
              <div className="w-12 h-12 rounded-lg bg-green-500 flex items-center justify-center mb-4 text-white">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Skill Graph
              </h3>
              <p className="text-slate-700">
                Visualize your skill strengths with interactive charts.
              </p>
            </motion.div>

            {/* Feature 4 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="p-6 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl border border-orange-200"
            >
              <div className="w-12 h-12 rounded-lg bg-orange-500 flex items-center justify-center mb-4 text-white">
                <UserCheck className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Role Predictor
              </h3>
              <p className="text-slate-700">
                AI predicts best job roles based on your resume.
              </p>
            </motion.div>

            {/* Feature 5 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="p-6 bg-gradient-to-br from-red-50 to-red-100 rounded-xl border border-red-200"
            >
              <div className="w-12 h-12 rounded-lg bg-red-500 flex items-center justify-center mb-4 text-white">
                <Wand2 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Project Enhancer
              </h3>
              <p className="text-slate-700">
                Get AI-enhanced project descriptions for better impact.
              </p>
            </motion.div>

            {/* Feature 6 */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-6 bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-xl border border-cyan-200"
            >
              <div className="w-12 h-12 rounded-lg bg-cyan-500 flex items-center justify-center mb-4 text-white">
                <BarChart3 className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                Detailed Metrics
              </h3>
              <p className="text-slate-700">
                Get comprehensive insights about your resume performance.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6"
          >
            Ready to Improve Your Resume?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-lg text-slate-600 mb-8"
          >
            Sign in with Google and start analyzing your resume today. It's free
            and takes just seconds.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-md mx-auto"
          >
            <GoogleAuthButton />
          </motion.div>
        </div>
      </section>
    </div>
  );
}
