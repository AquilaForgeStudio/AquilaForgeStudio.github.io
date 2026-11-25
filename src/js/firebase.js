// src/js/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 파이어베이스 콘솔(Project Settings > General)에서 복사해온 본인의 설정값 입력
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};


// 1. 파이어베이스 앱 초기화
const app = initializeApp(firebaseConfig);

// 2. 인증(Auth) 및 클라우드 데이터베이스(Firestore) 객체 생성 후 내보내기
export const auth = getAuth(app);
export const db = getFirestore(app);