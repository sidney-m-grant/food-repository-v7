import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";
import { getStorage } from "@firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCFYNT8xkGTT0sk5d6mvWbUsOkLCEveeNM",
  authDomain: "food-repository-v7.firebaseapp.com",
  projectId: "food-repository-v7",
  storageBucket: "food-repository-v7.appspot.com",
  messagingSenderId: "914609075664",
  appId: "1:914609075664:web:d0cf6699ad695fbaddf5d5",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);
