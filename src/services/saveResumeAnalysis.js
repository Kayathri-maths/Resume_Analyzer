import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { normalizeAnalysis } from "../utils/normalizeAnalysis";

export async function saveResumeAnalysis(userId, analysisData) {
  if (!userId) throw new Error("User ID is required");

  try {
    const normalized = normalizeAnalysis(analysisData);

    const historyRef = collection(db, "resumeHistory");

    const savedDoc = await addDoc(historyRef, {
      ...normalized,
      userId,
      createdAt: serverTimestamp(),
    });

    return savedDoc.id;
  } catch (err) {
    console.error("🔥 Firestore Save Error:", err);
    throw err;
  }
}
