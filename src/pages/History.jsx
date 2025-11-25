import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { motion } from "framer-motion";
import { BarChart3, ChevronRight, Clock, History } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";

export default function HistoryPage() {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const uid = auth.currentUser?.uid;
    if (!uid) return;

    async function fetchHistory() {
      const q = query(
        collection(db, "resumeHistory"),
        where("userId", "==", uid),
        orderBy("createdAt", "desc")
      );

      const snap = await getDocs(q);
      const list = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setHistory(list);
      setLoading(false);
    }

    fetchHistory();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 p-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="p-3 rounded-lg bg-blue-100 text-blue-600">
            <History className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Your History</h1>
            <p className="text-gray-600 text-sm">
              View all your previous resume analyses
            </p>
          </div>
        </div>

        {/* Loading state */}
        {loading && (
          <p className="text-center text-gray-500 py-10">Loading...</p>
        )}

        {/* Empty state */}
        {!loading && history.length === 0 && (
          <p className="text-center text-gray-500 py-20">
            No history found. Analyze your first resume!
          </p>
        )}

        {/* History List */}
        <div className="space-y-4">
          {history.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/history/${item.id}`)}
              className="bg-white p-5 rounded-xl shadow-md border border-gray-300 hover:shadow-lg cursor-pointer transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  {/* ATS Score */}
                  <div className="flex items-center gap-2 mb-1">
                    <BarChart3 className="w-4 h-4 text-blue-600" />
                    <span className="font-semibold">
                      ATS Score: {item.atsScore}
                    </span>
                  </div>

                  {/* Summary */}
                  <p className="text-gray-600 text-sm line-clamp-2 max-w-xl">
                    {item.summary}
                  </p>

                  {/* Date */}
                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <Clock className="w-4 h-4" />
                    {item.createdAt?.toDate?.().toLocaleString() ??
                      "Unknown date"}
                  </div>
                </div>

                <ChevronRight className="w-5 h-5 text-gray-400" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
