import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { auth } from "../firebase";
import { createUserDocument } from "./saveResumeAnalysis";

export async function signInWithGoogle() {
  try {
    const provider = new GoogleAuthProvider();
    provider.addScope("profile");
    provider.addScope("email");

    const result = await signInWithPopup(auth, provider);
    const user = result.user;

    await createUserDocument(user);

    return user;
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error;
  }
}

export async function logoutUser() {
  return signOut(auth);
}
