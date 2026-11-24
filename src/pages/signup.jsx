// src/pages/Signup.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import InputBox from '../components/inputbox';
import { registerUserFinal, loginWithGoogle, loginWithGitHub } from '../js/auth';
import '../css/auth.css';

function Signup() {
    const navigate = useNavigate();
    
    const [step, setStep] = useState(1);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        nickname: '',
        birthDate: '',
        country: '대한민국 (South Korea)',
        termsAccepted: false,
        marketingAccepted: false
    });

    const [authType, setAuthType] = useState('email');
    const [showTermsModal, setShowTermsModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
    };

    const checkUnder13 = (birthString) => {
        const birth = new Date(birthString);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const m = today.getMonth() - birth.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        return age < 13;
    };

    const handleStep1Submit = (e) => {
        e.preventDefault();
        let newErrors = {};
        if (!formData.email) newErrors.email = '이메일을 입력해주세요.';
        if (!formData.password) newErrors.password = '비밀번호를 입력해주세요.';
        if (!formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호 확인을 입력해주세요.';
        } else if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = '비밀번호가 일치하지 않습니다.';
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setAuthType('email');
        setStep(2); 
    };

    // 소셜 회원가입 핸들러
    const handleSocialSignup = async (providerType) => {
        setLoading(true);
        setErrors({});
        let result = providerType === 'Google' ? await loginWithGoogle() : await loginWithGitHub();
        setLoading(false);

        if (result.success) {
            if (result.isNewUser) {
                setAuthType(providerType.toLowerCase());
                setFormData(prev => ({ ...prev, email: result.user.email || '' }));
                setStep(2); // 💡 소셜 인증 후 프로필 작성 단계로 진입
            } else {
                alert('이미 가입된 계정입니다. 환영합니다!');
                navigate('/dashboard');
            }
        } else {
            if (result.error === 'auth/github-email-private') {
                setErrors({ general: 'GitHub 계정의 이메일이 비공개 상태입니다. 공개로 설정하거나 다른 방법으로 가입해주세요.' });
            } else {
                setErrors({ general: `${providerType} 로그인에 실패했습니다. (팝업 차단 여부를 확인해주세요)` });
            }
        }
    };

    const handleFinalSubmit = async (e) => {
        e.preventDefault();
        let newErrors = {};

        if (!formData.nickname) newErrors.nickname = '닉네임을 입력해주세요.';
        if (!formData.birthDate) {
            newErrors.birthDate = '생년월일을 입력해주세요.';
        } else if (checkUnder13(formData.birthDate)) {
            newErrors.birthDate = '만 13세 미만은 아쿠아 포지 스튜디오를 이용할 수 없습니다.';
        }
        if (!formData.country) newErrors.country = '국가를 선택해주세요.';
        if (!formData.termsAccepted) newErrors.terms = '서비스 이용약관에 필수 동의해주세요.';

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        setLoading(true);
        const result = await registerUserFinal(formData.email, formData.password, {
            ...formData,
            authtype: authType
        });
        setLoading(false);

        if (result.success) {
            setStep(3);
        } else {
            if (result.error === 'auth/under-age') {
                setErrors({ birthDate: '만 13세 미만은 가입할 수 없습니다.' });
            } else if (result.error === 'auth/email-already-in-use') {
                setErrors({ general: '이미 사용 중인 이메일입니다.' });
                setStep(1); 
            } else {
                setErrors({ general: '회원가입 처리 중 오류가 발생했습니다.' });
            }
        }
    };

    return (
        <div className="auth-container">
            <h1>회원가입</h1>

            <div className="step-indicator" style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px', gap: '6px', fontSize: '0.8rem', color: '#6b7280' }}>
                <span style={{ fontWeight: step === 1 ? 'bold' : 'normal', color: step === 1 ? '#f97316' : 'inherit' }}>1. 계정정보</span> &gt;
                <span style={{ fontWeight: step === 2 ? 'bold' : 'normal', color: step === 2 ? '#f97316' : 'inherit' }}> 2. 프로필/약관</span> &gt;
                <span style={{ fontWeight: step === 3 ? 'bold' : 'normal', color: step === 3 ? '#f97316' : 'inherit' }}> 3. 완료</span>
            </div>

            {errors.general && <div className="input-error-text" style={{ marginBottom: '15px', textAlign: 'center' }}>{errors.general}</div>}

            {step === 1 && (
                <>
                    <form className="auth-form" onSubmit={handleStep1Submit} noValidate>
                        <div>
                            <InputBox label="이메일" type="email" name="email" value={formData.email} onChange={handleChange} placeholder="이메일을 입력하세요" />
                            {errors.email && <span className="input-error-text">{errors.email}</span>}
                        </div>
                        <div>
                            <InputBox label="비밀번호" type="password" name="password" value={formData.password} onChange={handleChange} placeholder="비밀번호를 입력하세요" />
                            {errors.password && <span className="input-error-text">{errors.password}</span>}
                        </div>
                        <div>
                            <InputBox label="비밀번호 확인" type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="비밀번호를 다시 입력하세요" />
                            {errors.confirmPassword && <span className="input-error-text">{errors.confirmPassword}</span>}
                        </div>
                        <button type="submit" className="auth-button">다음 단계로</button>
                    </form>

                    <div className="auth-divider">
                        <hr />
                        <span>또는 소셜 계정으로 회원가입</span>
                        <hr />
                    </div>

                    <div className="social-login-group">
                        <button type="button" onClick={() => handleSocialSignup('Google')} className="social-btn google-btn" disabled={loading}>
                            <svg className="socialIcon" viewBox="0 0 24 24" width="20" height="20" fill="currentColor">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                            </svg>
                            구글로 회원가입
                        </button>
                        <button type="button" onClick={() => handleSocialSignup('GitHub')} className="social-btn github-btn" disabled={loading}>
                            <svg className="socialIcon" viewBox="0 0 16 16" width="20" height="20" fill="currentColor">
                                <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                            </svg>
                            깃허브로 회원가입
                        </button>
                    </div>
                </>
            )}

            {step === 2 && (
                <form className="auth-form" onSubmit={handleFinalSubmit} noValidate>
                    <div>
                        <InputBox label="이메일" type="email" name="email" value={formData.email} onChange={handleChange} readOnly={authType !== 'email'} />
                    </div>

                    <div className="input-box-wrapper">
                        <label htmlFor="country" className="input-label">국가</label>
                        <select id="country" name="country" value={formData.country} onChange={handleChange} className="input-element">
                            <option value="대한민국 (South Korea)">대한민국 (South Korea)</option>
                            <option value="미국 (United States)">미국 (United States)</option>
                            <option value="일본 (Japan)">일본 (Japan)</option>
                            <option value="중국 (China)">중국 (China)</option>
                            <option value="영국 (United Kingdom)">영국 (United Kingdom)</option>
                            <option value="기타 (Other)">기타 (Other)</option>
                        </select>
                        {errors.country && <span className="input-error-text">{errors.country}</span>}
                    </div>

                    <div>
                        <InputBox label="닉네임" type="text" name="nickname" value={formData.nickname} onChange={handleChange} placeholder="사용할 닉네임을 입력하세요" />
                        {errors.nickname && <span className="input-error-text">{errors.nickname}</span>}
                    </div>

                    <div>
                        <InputBox label="생년월일" type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} />
                        {errors.birthDate && <span className="input-error-text">{errors.birthDate}</span>}
                    </div>

                    <div style={{ margin: '12px 0 6px 0', textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer', color: '#374151' }}>
                            <input type="checkbox" name="termsAccepted" checked={formData.termsAccepted} onChange={handleChange} />
                            [필수] 서비스 이용약관 및 개인정보 처리방침 동의
                        </label>
                        <button type="button" onClick={() => setShowTermsModal(true)} style={{ background: 'none', border: 'none', color: '#f97316', fontSize: '0.85rem', cursor: 'pointer', textDecoration: 'underline' }}>자세히 보기</button>
                    </div>
                    {errors.terms && <span className="input-error-text" style={{ textAlign: 'left', marginBottom: '8px' }}>{errors.terms}</span>}

                    <div style={{ margin: '6px 0 16px 0', textAlign: 'left' }}>
                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', cursor: 'pointer', color: '#4b5563' }}>
                            <input type="checkbox" name="marketingAccepted" checked={formData.marketingAccepted} onChange={handleChange} />
                            [선택] 광고성 이메일 및 혜택 알림 수신 동의
                        </label>
                    </div>

                    <button type="submit" className="auth-button" disabled={loading}>{loading ? '처리 중...' : '회원가입 완료'}</button>
                </form>
            )}

            {showTermsModal && (
                <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                    <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '12px', width: '90%', maxWidth: '400px', maxHeight: '80vh', overflowY: 'auto', textAlign: 'left' }}>
                        <h3 style={{ marginBottom: '12px', color: '#1f2937' }}>서비스 이용약관</h3>
                        <p style={{ fontSize: '0.85rem', color: '#4b5563', lineHeight: '1.6', marginBottom: '16px' }}>
                            아쿠아 포지 스튜디오 서비스 이용약관 및 개인정보 수집·이용 동의서입니다.<br/><br/>
                            1. 수집 목적: 회원 식별, 만 13세 미만 아동 가입 제한, 서비스 제공<br/>
                            2. 수집 항목: 이메일, 닉네임, 생년월일, 국가<br/>
                            3. 보유 및 이용기간: 회원 탈퇴 시까지
                        </p>
                        <button type="button" className="auth-button" onClick={() => setShowTermsModal(false)}>확인</button>
                    </div>
                </div>
            )}

            {step === 3 && (
                <div style={{ textAlign: 'center', padding: '30px 0' }}>
                    <h2 style={{ color: '#f97316', marginBottom: '12px' }}>🎉 가입을 환영합니다!</h2>
                    <p style={{ color: '#4b5563', marginBottom: '24px' }}>모든 가입 절차가 성공적으로 완료되었습니다.</p>
                    <button type="button" className="auth-button" onClick={() => navigate('/login')}>로그인하러 가기</button>
                </div>
            )}

            <div className="auth-switch-text">
                이미 계정이 있나요? <Link to="/login">로그인하기</Link>
            </div>
        </div>
    );
}

export default Signup;