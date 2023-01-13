import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
import { getStorage } from "firebase/storage";
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAK7lzrwqZnJtEVZdiniW4w0Tqps21bZFw",
  authDomain: "ex-mango-app.firebaseapp.com",
  projectId: "ex-mango-app",
  storageBucket: "ex-mango-app.appspot.com",
  messagingSenderId: "80849199493",
  appId: "1:80849199493:web:c294663cc908d8c2b8e4ec",
  measurementId: "G-VJVKVZ4LBE",
};

// export const storage = getStorage(app);
const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
export const storage = getStorage(app);
