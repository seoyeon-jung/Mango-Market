import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCPs7KOpmhVSLiroAqztRrNcQMCs5jDD6I",
  authDomain: "react-native-e5dcd.firebaseapp.com",
  projectId: "react-native-e5dcd",
  storageBucket: "react-native-e5dcd.appspot.com",
  messagingSenderId: "976058217062",
  appId: "1:976058217062:web:2189d8b179f4d0fbb5f3a7",
};

// export const storage = getStorage(app);
const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
