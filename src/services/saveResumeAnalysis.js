import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";

export async function saveResumeAnalysis(userId, analysisData) {
  if (!userId) throw new Error("User ID is required");

  try {
    const finalData =
      typeof analysisData === "string"
        ? JSON.parse(analysisData)
        : analysisData;
    const historyRef = collection(db, "resumeHistory");

    const savedDoc = await addDoc(historyRef, {
      ...finalData,
      userId,
      createdAt: serverTimestamp(),
    });

    return savedDoc.id;
  } catch (err) {
    console.error("🔥 Firestore Save Error:", err);
    throw err;
  }
}
