import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "eatwisely-2b3cf.firebaseapp.com",
  projectId: "eatwisely-2b3cf",
  messagingSenderId: "925300118964",
  appId: "1:925300118964:web:0f26e4167cbe282139cee1",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
