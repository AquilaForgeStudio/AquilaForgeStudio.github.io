import React from 'react';

function Home() {
    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '80px 20px',
            minHeight: '60vh'
        }}>
            <h1 style={{ fontSize: '2.5rem', color: '#1f2937', marginBottom: '16px' }}>
                🚀 Aquila Forge Studio
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#6b7280', maxWidth: '600px', lineHeight: '1.5', marginBottom: '30px' }}>
                현재 더 멋진 서비스를 위해 열심히 개발을 진행하고 있습니다.<br />
                빠른 시일 내에 완성된 모습으로 찾아뵙겠습니다!
            </p>
            <div style={{
                display: 'inline-block',
                padding: '10px 20px',
                backgroundColor: '#fff7ed',
                color: '#f97316',
                borderRadius: '8px',
                fontWeight: '600',
                border: '1px solid #ffedd5'
            }}>
                🛠️ Coming Soon...
            </div>
        </div>
    );
}

export default Home;