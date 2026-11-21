import React from 'react';
import ReactDOM from 'react-dom/client';
import Navbar from './components/navbar.jsx'; // 👈 1. 대문자 Navbar로 가져오기 (파일 이름이 소문자여도 보통 대문자로 임포트하는 것이 좋습니다)
import Footer from './components/footer.jsx';
import './css/navbar.css';
import './css/footer.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Navbar /> {/* 👈 2. 태그도 대문자 <Navbar />로 변경 */}
    <Footer />
  </React.StrictMode>
);