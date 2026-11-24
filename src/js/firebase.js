// src/js/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// 🔥 파이어베이스 콘솔(Project Settings > General)에서 복사해온 본인의 설정값 입력
const firebaseConfig = {
  apiKey: "AIzaSyDxY1VFF-Yk2Gb9IiS5O-9k4PE2-1G8_Jo",
  authDomain: "aquila-forge.firebaseapp.com",
  projectId: "aquila-forge",
  storageBucket: "aquila-forge.firebasestorage.app",
  messagingSenderId: "415485796165",
  appId: "1:415485796165:web:0b5e95f73764bc962ea82c",
  measurementId: "G-YMR7D3Q97B"
};


// 1. 파이어베이스 앱 초기화
const app = initializeApp(firebaseConfig);

// 2. 인증(Auth) 및 클라우드 데이터베이스(Firestore) 객체 생성 후 내보내기
export const auth = getAuth(app);
export const db = getFirestore(app);