// src/data/navData.js

export const navData = {
    brand: {
        name: "Aquila Forge Studio",
        logo: "/Aquila-Logo.png",
        link: "/", // 👈 브라우저 라우터 기준 홈 (/)
        items: [
            { name: "설치", link: "/" },
            { name: "About Us", link: "/about" }
        ],
        socialLinks: [
            { 
                name: "Github", 
                link: "https://github.com/aquilaforgestudio", 
                icon: "M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.22 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" 
            },
            { 
                name: "Padlet",
                link: "https://padlet.com/fasara140708/aquila-forge-studio-s025or5jxp64ic945etr",
                icon: "M1.5 1.5A1.5 1.5 0 0 1 3 0h10a1.5 1.5 0 0 1 1.5 1.5v13a1.5 1.5 0 0 1-1.5 1.5H3a1.5 1.5 0 0 1-1.5-1.5v-13zM3 1a.5.5 0 0 0-.5.5v13a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-13A.5.5 0 0 0 13 1H3zm2 3.5a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h5a.5.5 0 0 1 0 1h-5a.5.5 0 0 1-.5-.5zm0 3a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5z"
            }
        ]
    },
    dropdowns: [
        {
            title: "COMMUNITY",
            align: "align-right",
            items: [
                { name: "공지사항", link: "/community/notice" },
                { name: "자유게시판", link: "/community/free" },
                { name: "1:1 CHAT", link: "/community/chat", highlight: true }
            ]
        },
        {
            title: "DEVLOG",
            align: "align-right",
            items: [
                { name: "Update Log", link: "/devlog/update" },
                { name: "버그 신고", link: "/devlog/bug-report" }
            ]
        }
    ],
    sidebarLinks: [
        { name: "설치", link: "/install" },
        { name: "About Us", link: "/about" },
    ],
    actions: {
        notification: {
            id: "noti-trigger",
            ariaLabel: "알림 열기",
            badgeCount: 0
        },
        auth: {
            id: "auth-trigger-btn",
            ariaLabel: "계정 메뉴",
            link: "/account",
            loginLink: "/login" // 👈 깔끔한 경로로 매칭됩니다!
        }
    }
};