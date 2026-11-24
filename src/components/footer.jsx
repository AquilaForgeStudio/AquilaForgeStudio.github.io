import React from 'react';
import { navData } from './navData';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <div className="footerContainer">
                {/* 상단: 브랜드 및 간단 소개 */}
                <div className="footerTop">
                    <div className="footerBrand">
                        <img src={navData.brand.logo} alt={navData.brand.name} className="footerLogo" />
                        <span className="brandName">{navData.brand.name}</span>
                    </div>
                    <p className="footerDesc">
                        Aquila Forge Studio는 여러 도구를 제공하는 개발스튜디오입니다.
                    </p>
                </div>

                <hr className="footerDivider" />

                {/* 하단: 저작권 및 링크 */}
                <div className="footerBottom">
                    <p className="copyright">
                        &copy; {currentYear} {navData.brand.name}. All rights reserved.
                    </p>

                    <div className="socialLinks">
                        {navData.brand.socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={social.name}
                            >
                                <svg
                                    className="socialIcon"
                                    viewBox="0 0 16 16"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                >
                                    <path d={social.icon} />
                                </svg>
                            </a>
                        ))}
                    </div> {/* 👈 누락되었던 socialLinks 닫는 태그 */}
                </div>    {/* 👈 누락되었던 footerBottom 닫는 태그 */}
            </div>        {/* 👈 누락되었던 footerContainer 닫는 태그 */}
        </footer>
    );
}