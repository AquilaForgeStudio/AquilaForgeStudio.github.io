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
                        야구 팬들과 개발자들을 위한 최고의 플랫폼, 아퀼라 베이스볼입니다.
                    </p>
                </div>

                <hr className="footerDivider" />

                {/* 하단: 저작권 및 링크 */}
                <div className="footerBottom">
                    <p className="copyright">
                        &copy; {currentYear} {navData.brand.name}. All rights reserved.
                    </p>
                    <div className="footerLinks">
                        <a href={`${navData.brand.link}`}>홈</a>
                        <a href={`${navData.brand.items[0]?.link}`}>설치</a>
                        <a href={`${navData.brand.items[1]?.link}`}>About Us</a>
                        <a href="https://aquilaforgestudio.github.io" target="_blank" rel="noopener noreferrer">Studio</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}