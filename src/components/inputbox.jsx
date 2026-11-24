// src/components/InputBox.jsx
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import '../css/inputbox.css'; // 👈 inputbox.css 파일 불러오기

function InputBox({ label, type = 'text', name, value, onChange, placeholder }) {
    const [showPassword, setShowPassword] = useState(false);
    const isPasswordType = type === 'password';
    const inputType = isPasswordType && showPassword ? 'text' : type;

    return (
        <div className="input-box-wrapper">
            {label && <label htmlFor={name} className="input-label">{label}</label>}

            <div className="input-field-container">
                <input
                    id={name}
                    type={inputType}
                    name={name}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    className={`input-element ${isPasswordType ? 'password-type' : ''}`}
                />

                {isPasswordType && (
                    <button
                        type="button"
                        onClick={() => setShowPassword(prev => !prev)}
                        className="password-toggle-btn"
                        aria-label="비밀번호 표시 전환"
                    >
                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                )}
            </div>
        </div>
    );
}

export default InputBox;