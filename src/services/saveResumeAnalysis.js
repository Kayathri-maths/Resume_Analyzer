import {
  addDoc,
  collection,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../firebase";

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

export async function saveUserProfile(uid, { name, photoFile }) {
  if (!uid) throw new Error("User ID missing");

  const userRef = doc(db, "users", uid);

  let photoURL = null;

  // Upload photo if provided
  if (photoFile) {
    const imageRef = ref(storage, `profilePhotos/${uid}.jpg`);
    await uploadBytes(imageRef, photoFile);
    photoURL = await getDownloadURL(imageRef);
  }

  const updateData = {
    name: name || "",
    updatedAt: serverTimestamp(),
  };

  if (photoURL) updateData.photoURL = photoURL;

  await updateDoc(userRef, updateData);

  return updateData;
}

export async function createUserDocument(user) {
  if (!user) return;

  const ref = doc(db, "users", user.uid);
  const snap = await getDoc(ref);

  if (snap.exists()) return;

  await setDoc(ref, {
    uid: user.uid,
    name: user.displayName || "",
    email: user.email,
    photoURL: user.photoURL || "",
    createdAt: serverTimestamp(),
  });
}

export async function getUserProfile(uid) {
  const refDoc = doc(db, "users", uid);
  const snap = await getDoc(refDoc);

  return snap.exists() ? snap.data() : null;
}
