// src/pages/Login.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import InputBox from '../components/inputbox';
import { loginUser, loginWithGoogle, loginWithGitHub } from '../js/auth';
import '../css/auth.css';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    
    // 인라인 에러 메시지 관리 상태
    const [errors, setErrors] = useState({ email: '', password: '', general: '' });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // 타이핑 시작하면 해당 필드의 에러 초기화
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    // 파이어베이스 에러 코드를 사용자가 이해하기 쉬운 인라인 메시지로 변환하는 함수
    const getFriendlyErrorMessage = (errorCode) => {
        switch (errorCode) {
            case 'auth/invalid-email':
                return '올바르지 않은 이메일 형식입니다.';
            case 'auth/user-not-found':
            case 'auth/invalid-credential':
            case 'auth/wrong-password':
                return '이메일 또는 비밀번호가 일치하지 않습니다.';
            case 'auth/too-many-requests':
                return '로그인 시도가 너무 많습니다. 잠시 후 다시 시도해주세요.';
            default:
                return '로그인 중 오류가 발생했습니다.';
        }
    };

    // 이메일 로그인 제출
    const handleSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!formData.email) newErrors.email = '이메일을 입력해주세요.';
        if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // auth.js의 로그인 함수 호출 (내부적으로 localStorage 저장 포함)
        const result = await loginUser(formData.email, formData.password);

        if (result.success) {
            alert('로그인 성공!');
            // TODO: 대시보드나 메인 페이지로 이동 로직 추가
        } else {
            // 파이어베이스에서 반환된 에러를 인라인 에러로 처리
            const friendlyMsg = getFriendlyErrorMessage(result.error);
            setErrors(prev => ({ ...prev, general: friendlyMsg }));
        }
    };

    // 소셜 로그인 핸들러
    const handleSocial = async (providerType) => {
        let result;
        if (providerType === 'Google') {
            result = await loginWithGoogle();
        } else if (providerType === 'GitHub') {
            result = await loginWithGitHub();
        }

        if (result.success) {
            alert(`${providerType} 로그인 성공!`);
            // TODO: 대시보드나 메인 페이지로 이동 로직 추가
        } else {
            setErrors(prev => ({ ...prev, general: `${providerType} 로그인에 실패했습니다.` }));
        }
    };

    return (
        <div className="auth-container">
            <h1>로그인</h1>

            {/* 전체 공통 에러 (예: 아이디/비밀번호 불일치 등) */}
            {errors.general && <div className="input-error-text" style={{ marginBottom: '15px', textAlign: 'center' }}>{errors.general}</div>}
            
            <form className="auth-form" onSubmit={handleSubmit} noValidate>
                <div>
                    <InputBox 
                        label="이메일" 
                        type="email" 
                        name="email" 
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="이메일을 입력하세요" 
                    />
                    {errors.email && <span className="input-error-text">{errors.email}</span>}
                </div>

                <div>
                    <InputBox 
                        label="비밀번호" 
                        type="password" 
                        name="password" 
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="비밀번호를 입력하세요" 
                    />
                    {errors.password && <span className="input-error-text">{errors.password}</span>}
                </div>

                <button type="submit" className="auth-button">로그인</button>
            </form>

            <div className="auth-switch-text">
                계정이 없나요? <Link to="/signup/">지금 시작하기</Link>
            </div>

            <div className="auth-divider">
                <hr />
                <span>또는 소셜 계정으로 로그인</span>
                <hr />
            </div>

            <div className="social-login-group">
                {/* 구글 로그인 버튼 + SVG 아이콘 */}
                <button 
                    type="button"
                    onClick={() => handleSocial('Google')}
                    className="social-btn google-btn"
                >
                    <svg className="socialIcon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                    </svg>
                    구글로 로그인
                </button>

                {/* 깃허브 로그인 버튼 + SVG 아이콘 */}
                <button 
                    type="button"
                    onClick={() => handleSocial('GitHub')}
                    className="social-btn github-btn"
                >
                    <svg className="socialIcon" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                    </svg>
                    깃허브로 로그인
                </button>
            </div>
        </div>
    );
}

export default Login;