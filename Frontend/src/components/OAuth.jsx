import { createContext, useContext, useState, useEffect } from "react";
import { auth, db, googleProvider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  updateProfile,
  deleteUser,
  EmailAuthProvider,
  reauthenticateWithCredential,
  GoogleAuthProvider,
} from "firebase/auth";
import {
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Manage user authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setCurrentUser(userSnap.data());
        } else {
          setCurrentUser(user);
        }
      } else {
        setCurrentUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Signup new user
  const signupUser = async (email, password) => {
    const username = email.split("@")[0];
    const defaultAvatar =
      "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png"; // Default avatar

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;

    await updateProfile(user, { displayName: username });

    await setDoc(doc(db, "users", user.uid), {
      username,
      email,
      avatar: defaultAvatar,
      createdAt: serverTimestamp(),
    });

    setCurrentUser({ username, email, avatar: defaultAvatar }); // Update state
    return user;
  };

  // Signin user
  const signinUser = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      return userCredential;
    } catch (error) {
      console.error("Firebase Sign-in Error:", error);
      throw error;
    }
  };

  // Google Sign-up/Sign-in
  const signInWithGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      if (!user) throw new Error("Google Sign-In failed");

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        await setDoc(userRef, {
          username: user.displayName || "Google User",
          email: user.email,
          avatar:
            user.photoURL ||
            "https://www.pngall.com/wp-content/uploads/5/User-Profile-PNG-High-Quality-Image.png",
          createdAt: serverTimestamp(),
        });
      }

      return user;
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      throw error;
    }
  };

  // signout function
  const signout = () => {
    return signOut(auth);
    setCurrentUser(null);
  };

  const deleteUserAccount = async (password) => {
    if (!auth.currentUser) return;

    try {
      const user = auth.currentUser;
      console.log("Attempting to delete account for:", user.email);

      // Reauthenticate the user
      if (user.providerData[0]?.providerId === "password") {
        if (!password) {
          alert("Please enter your password to delete the account.");
          return;
        }
        const credential = EmailAuthProvider.credential(user.email, password);
        await reauthenticateWithCredential(user, credential);
      } else if (user.providerData[0]?.providerId === "google.com") {
        const provider = new GoogleAuthProvider();
        await signInWithPopup(auth, provider); // Reauthenticate Google user
      }

      console.log("Reauthentication successful.");

      // Delete User Data from Firestore
      const userRef = doc(db, "users", user.uid);
      await deleteDoc(userRef);
      console.log("User data deleted from Firestore.");

      // Delete User from Firebase Authentication
      await deleteUser(user);
      console.log("User deleted from Firebase Auth.");

      // Sign Out User
      alert("Your account has been deleted successfully.");
    } catch (error) {
      console.error("Error deleting user:", error);
      alert(`Failed to delete account: ${error.message}`);
    }
  };

  const value = {
    currentUser,
    signupUser,
    signinUser,
    signInWithGoogle,
    signout,
    deleteUserAccount,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
