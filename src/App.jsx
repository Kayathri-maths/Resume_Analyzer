import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import ResultCard from "./components/ResultCard";
import UploadResume from "./components/UploadResume";
import { db } from "./firebase";

export default function App() {
  const [result, setResult] = useState(null);

  useEffect(() => {
    const q = query(collection(db, "results"), orderBy("createdAt", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const latest = snapshot.docs.map((doc) => doc.data())[0];
      if (latest) {
        try {
          setResult(JSON.parse(latest.result));
        } catch {
          console.error("Invalid JSON format from AI");
        }
      }
    });
    return unsubscribe;
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-50 to-blue-100">
      <h1 className="text-4xl font-bold text-blue-600 mb-8">
        Resume Analyzer with AI
      </h1>
      <UploadResume onUpload={() => console.log("File uploaded")} />
      <ResultCard result={result} />
    </div>
  );
}
