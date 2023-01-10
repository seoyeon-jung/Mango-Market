import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7urirbxoXBsC8h7DHN1LDxa1IDoei4MM",
  authDomain: "fir-dd60a.firebaseapp.com",
  projectId: "fir-dd60a",
  storageBucket: "fir-dd60a.appspot.com",
  messagingSenderId: "487503040464",
  appId: "1:487503040464:web:c2de2dc22f763be3bbb3d5",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
