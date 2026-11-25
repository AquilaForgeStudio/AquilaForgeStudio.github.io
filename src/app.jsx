// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import Footer from './components/footer';
import Home from './pages/home';
import Login from './pages/login';
import Signup from './pages/signup';

import './css/navbar.css';
import './css/footer.css';
import './css/auth.css';

function App() {
  return (
    <Router>
      {/* Navbar는 라우터 안에 있으므로 모든 페이지에서 공통으로 보입니다 */}
      <Navbar />

      {/* 주소에 따라 바뀌는 메인 콘텐츠 영역 */}
      <main style={{ padding: '40px 20px', maxWidth: '1200px', margin: '70px auto 0', width: '100%', flex: 1 }}>
        <Routes>
          <Route path="/" element={<Home />} />         
          <Route path="/login" element={<Login />} /> 
          <Route path="/signup" element={<Signup />} />  
        </Routes>
      </main>

      {/* Footer 역시 모든 페이지에서 공통으로 고정됩니다 */}
      <Footer />
    </Router>
  );
}

export default App;