import {
  collection,
  doc,
  getDoc,
  getDocs,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import { auth, db } from "../firebase";

// Fetch all resume history for logged-in user
export async function fetchResumeHistory() {
  const uid = auth.currentUser?.uid;
  if (!uid) return [];

  const q = query(
    collection(db, "resumeHistory"),
    where("userId", "==", uid),
    orderBy("createdAt", "desc")
  );

  const snap = await getDocs(q);

  return snap.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
}

// Fetch detail of a single history item
export async function fetchResumeHistoryDetail(id) {
  const ref = doc(db, "resumeHistory", id);
  const snap = await getDoc(ref);

  if (snap.exists()) return snap.data();
  return null;
}
