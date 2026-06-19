import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { auth, db } from "../../utils/firebase";

export const registerWithEmail = async (email, password, name) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password,
    );
    const user = userCredential.user;

    // Create user profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      email,
      role: "buyer", // default role
      createdAt: new Date(),
    });

    return user;
  } catch (error) {
    console.error("Error in registerWithEmail:", error);
    throw error;
  }
};

export const loginWithEmail = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password,
    );
    return userCredential.user;
  } catch (error) {
    console.error("Error in loginWithEmail:", error);
    throw error;
  }
};

export const loginWithGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    // Check if user exists in Firestore
    const userDoc = await getDoc(doc(db, "users", user.uid));

    if (!userDoc.exists()) {
      // Create user profile if it's their first time logging in with Google
      await setDoc(doc(db, "users", user.uid), {
        name: user.displayName,
        email: user.email,
        role: "buyer", // default role
        createdAt: new Date(),
      });
    }

    return user;
  } catch (error) {
    console.error("Error in loginWithGoogle:", error);
    throw error;
  }
};

export const logoutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error in logoutUser:", error);
    throw error;
  }
};

export const getUserRole = async (uid) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    if (userDoc.exists()) {
      return userDoc.data().role;
    }
    return "buyer";
  } catch (error) {
    console.error("Error getting user role:", error);
    return "buyer";
  }
};
