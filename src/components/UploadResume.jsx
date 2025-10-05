import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { useState } from "react";
import pdfToText from "react-pdftotext";
import { db } from "../firebase";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);

  const handleUpload = async () => {
    try {
      if (!file) return alert("Please select a file!");
      setLoading(true);

      const text = await pdfToText(file);

      // Send text to OpenAI for analysis
      const prompt = `
You are an expert HR recruiter and ATS evaluator.

Analyze this resume and return a JSON object with:
1. "ats_score" (0–100)
2. "key_skills" (list)
3. "summary" (2 lines)
4. "suggestions" (2–3 lines)

Resume text:
${text}
`;

      const response = await fetch(
        "https://openrouter.ai/api/v1/chat/completions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`, // ✅ store key in .env file
          },
          body: JSON.stringify({
            model: "openai/gpt-oss-20b:free",
            messages: [{ role: "user", content: prompt }],
          }),
        }
      );

      const data = await response.json();
      const output = data.choices[0].message.content;

      // ✅ Remove markdown formatting before parsing
      const cleanOutput = output
        .replace(/```json/g, "")
        .replace(/```/g, "")
        .trim();

      setResult(JSON.parse(cleanOutput));

      await addDoc(collection(db, "results"), {
        fileName: file.name,
        result: cleanOutput, // store string for easy parsing later
        createdAt: serverTimestamp(),
      });

      setLoading(false);
    } catch (err) {
      console.error(err);
      alert("Error analyzing resume.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center bg-white rounded-2xl shadow-lg p-6 w-[28rem]">
      <h2 className="text-2xl font-semibold mb-4 text-gray-800">
        Upload Your Resume
      </h2>

      <input
        type="file"
        accept=".pdf"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-4"
      />

      <button
        onClick={handleUpload}
        disabled={loading}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {loading ? "Analyzing..." : "Upload & Analyze"}
      </button>
    </div>
  );
}
