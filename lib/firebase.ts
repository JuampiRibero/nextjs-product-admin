// ------ Import the functions you need from the SDKs you need ------
import { initializeApp } from "firebase/app";
import {
  createUserWithEmailAndPassword,
  getAuth,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getStorage,
  uploadString,
  getDownloadURL,
  ref,
} from "firebase/storage";
// ------ TODO: Add SDKs for Firebase products that you want to use ------
// ------ https://firebase.google.com/docs/web/setup#available-libraries ------

// ------ Your web app's Firebase configuration ------
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

// ------ Initialize Firebase ------
const app = initializeApp(firebaseConfig);

export default app;

export const auth = getAuth(app);

export const db = getFirestore(app);

export const storage = getStorage(app);

// ------ Auth Functions ------

// Create user with email and password
export const createUser = async (user: { email: string; password: string }) => {
  return await createUserWithEmailAndPassword(auth, user.email, user.password);
};

// ------ Updates user's displayName and photoURL ------
export const updateUser = (user: {
  displayName?: string | null | undefined;
  photoURL?: string | null | undefined;
}) => {
  if (auth.currentUser) return updateProfile(auth.currentUser, user);
};

// ------ Sign In with email and password ------
export const signIn = async (user: { email: string; password: string }) => {
  return await signInWithEmailAndPassword(auth, user.email, user.password);
};

// ------ Sign Out ------
export const signOut = () => {
  localStorage.removeItem("user");
  return auth.signOut();
};

// ------ Send email to reset user's password ------
export const sendResetPassword = (email: string) => {
  return sendPasswordResetEmail(auth, email);
};

// ------ Database Functions ------

// ------ Get a collection ------
export const getCollection = async (
  collectionName: string,
  queryArray?: any[]
) => {
  const ref = collection(db, collectionName);

  const q = queryArray ? query(ref, ...queryArray) : query(ref);

  return (await getDocs(q)).docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// ------ Add a document in a collection ------
export const addDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp();
  return addDoc(collection(db, path), data);
};

// ------ Set a document in a collection ------
export const setDocument = (path: string, data: any) => {
  data.createdAt = serverTimestamp();
  return setDoc(doc(db, path), data);
};

// ------ Get a document in a collection ------
export const getDocument = async (path: string) => {
  return (await getDoc(doc(db, path))).data();
};

// ------ Update a document in a collection ------
export const updateDocument = (path: string, data: any) => {
  return updateDoc(doc(db, path), data);
};

// ------ Delete a document in a collection ------
export const deleteDocument = (path: string) => {
  return deleteDoc(doc(db, path));
};

// ------ Storage Functions ------

// ------ Upload a file with base64 format and get the url ------
export const uploadBase64 = async (path: string, base64: string) => {
  return uploadString(ref(storage, path), base64, "data_url").then(() => {
    return getDownloadURL(ref(storage, path));
  });
};
