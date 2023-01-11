import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth"; // 아래 데이터는 본인의 Firebase 프로젝트 설정에서 확인할 수 있습니다.
// import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBeDwSdfEaxOXoniW6dUBmjyWvirK4vEk0",
  authDomain: "team-native-9d7c4.firebaseapp.com",
  projectId: "team-native-9d7c4",
  storageBucket: "team-native-9d7c4.appspot.com",
  messagingSenderId: "704784016110",
  appId: "1:704784016110:web:abcfd2dd9ba3008247c9ff",
  measurementId: "G-M93LV0N92G",
};

// export const storage = getStorage(app);
const app = initializeApp(firebaseConfig);
export const dbService = getFirestore(app);
export const authService = getAuth(app);
