import React, { useState } from 'react';
import { navData } from './navData';

export default function Navbar() {
    // 로그인 상태 정의
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [openAccordions, setOpenAccordions] = useState({});

    const authText = isLoggedIn ? "계정관리" : "로그인";
    const authLink = isLoggedIn ? navData.actions.auth.link : navData.actions.auth.loginLink;

    const notiIconSvg = (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path>
            <path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
        </svg> 
    );

    const authIconSvg = isLoggedIn ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle>
        </svg>
    ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
            <polyline points="10 17 15 12 10 7"></polyline>
            <line x1="15" y1="12" x2="3" y2="12"></line>
        </svg>
    );

    const toggleAccordion = (index) => {
        setOpenAccordions(prev => ({
            ...prev,
            [index]: !prev[index]
        }));
    };

    return (
        <>
            <header className="navbar" id="global-nav">
                <div className="nav-container">
                    <div className="nav-left">
                        <div className="dropdown brand-dropdown">
                            <a href={navData.brand.link} className="brand-link">
                                <img src={navData.brand.logo} alt={navData.brand.name} className="nav-logo" />
                            </a>
                            <ul className="dropdown-menu">
                                {navData.brand.items.map((item, idx) => (
                                    item.type === "divider" ? (
                                        <hr key={idx} className="divider" />
                                    ) : (
                                        <li key={idx}>
                                            <a href={item.link} className={item.studio ? 'studio-link' : ''}>{item.name}</a>
                                        </li>
                                    )
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="nav-right">
                        <nav className="desktop-only-group desktop-only">
                            {navData.dropdowns.map((menu, idx) => (
                                <div className="dropdown" key={idx}>
                                    <button className="nav-txt-btn">{menu.title}</button>
                                    <ul className={`dropdown-menu ${menu.align || ''}`}>
                                        {menu.items.map((item, iIdx) => (
                                            <li key={iIdx}>
                                                <a href={item.link} className={item.highlight ? 'support-link' : ''}>{item.name}</a>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}

                            <div className="noti-wrapper" style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
                                <button className="noti-trigger-btn" aria-label={navData.actions.notification.ariaLabel} style={{ background: 'transparent', border: 'none', cursor: 'pointer', padding: '6px', color: '#4b5563' }}>
                                    {notiIconSvg}
                                    <span className="noti-badge" style={{ position: 'absolute', top: 0, right: 0, background: '#f97316', color: '#fff', fontSize: '10px', padding: '2px 5px', borderRadius: '10px' }}>
                                        {navData.actions.notification.badgeCount}
                                    </span>
                                </button>
                            </div>

                            <a 
                                href={authLink} 
                                className="icon-auth-btn" 
                                aria-label={authText} 
                                style={{ background: 'none', border: 'none', color: '#4b5563', padding: '6px', display: 'flex', alignItems: 'center', textDecoration: 'none' }} 
                                title={authText}
                            >
                                {authIconSvg}
                            </a>
                        </nav>

                        {/* 햄버거 메뉴 버튼 */}
                        <button className="hamburger-btn" onClick={() => setIsSidebarOpen(true)} aria-label="메뉴 열기">
                            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round">
                                <line x1="3" y1="12" x2="21" y2="12"></line>
                                <line x1="3" y1="6" x2="21" y2="6"></line>
                                <line x1="3" y1="18" x2="21" y2="18"></line>
                            </svg>
                        </button>
                    </div>
                </div>
            </header>

            {/* 모바일 사이드바 */}
            <aside className={`sidebar ${isSidebarOpen ? 'active' : ''}`} id="mobile-sidebar">
                <div className="sidebar-inner">
                    <div className="sidebar-top">
                        <img src={navData.brand.logo} alt={navData.brand.name} className="nav-logo-sm" />
                        <button className="close-btn" onClick={() => setIsSidebarOpen(false)} aria-label="메뉴 닫기">✕</button>
                    </div>

                    <div className="mobile-actions-bar" style={{ display: 'flex', gap: '12px', marginBottom: '20px', paddingBottom: '16px', borderBottom: '1px solid #e5e7eb' }}>
                        <a href={authLink} className="s-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', padding: '8px 12px', background: '#f3f4f6', borderRadius: '8px', flex: 1, justifyContent: 'center', textDecoration: 'none', color: '#1f2937' }}>
                            {authIconSvg} {authText}
                        </a>
                        <button className="s-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.9rem', padding: '8px 12px', background: '#f3f4f6', borderRadius: '8px', border: 'none', color: '#1f2937', cursor: 'pointer', flex: 1, justifyContent: 'center' }}>
                            {notiIconSvg} 알림
                        </button>
                    </div>

                    <nav className="sidebar-links">
                        {navData.sidebarLinks.map((s, idx) => (
                            <a key={idx} href={s.link} className={`s-link ${s.accent ? 'studio-accent' : ''}`}>{s.name}</a>
                        ))}

                        {navData.dropdowns.map((menu, index) => (
                            <div className="nav-section" key={index}>
                                <button 
                                    type="button"
                                    className={`s-link accordion-trigger ${openAccordions[index] ? 'active' : ''}`} 
                                    onClick={() => toggleAccordion(index)}
                                >
                                    {menu.title}
                                    <svg className="chevron-icon" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ transform: openAccordions[index] ? 'rotate(90deg)' : 'none', transition: 'transform 0.2s' }}>
                                        <polyline points="9 18 15 12 9 6"></polyline>
                                    </svg>
                                </button>
                                
                                {/* 💡 display 인라인 스타일을 제거하고 클래스(active)로만 제어 */}
                                <div className={`accordion-content ${openAccordions[index] ? 'active' : ''}`}>
                                    {menu.items.map((item, iIdx) => (
                                        <a key={iIdx} href={item.link} className={`s-link sub ${item.highlight ? 'support-highlight' : ''}`}>{item.name}</a>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </nav>
                </div>
            </aside>

            {/* 오버레이 */}
            <div className={`overlay ${isSidebarOpen ? 'active' : ''}`} id="menu-overlay" onClick={() => setIsSidebarOpen(false)}></div>
        </>
    );
}