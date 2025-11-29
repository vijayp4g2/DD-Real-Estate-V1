import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function AdminLogin({ onLogin }) {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        // Simple hardcoded password for demo purposes
        if (password === 'admin123') {
            onLogin();
            navigate('/admin/dashboard');
        } else {
            setError('Invalid password. Please try again.');
            // Shake animation on error
            const form = e.target;
            form.style.animation = 'shake 0.5s';
            setTimeout(() => {
                form.style.animation = '';
            }, 500);
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'linear-gradient(135deg, #0B2545 0%, #0EA5A4 100%)',
            position: 'relative',
            overflow: 'hidden',
            padding: '20px'
        }}>
            {/* Animated Background Pattern */}
            <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                opacity: 0.6
            }} />

            {/* Floating Shapes */}
            <motion.div
                animate={{
                    y: [0, -20, 0],
                    rotate: [0, 5, 0]
                }}
                transition={{
                    duration: 6,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '100px',
                    height: '100px',
                    background: 'rgba(255, 255, 255, 0.1)',
                    borderRadius: '30% 70% 70% 30% / 30% 30% 70% 70%',
                    backdropFilter: 'blur(10px)'
                }}
            />
            <motion.div
                animate={{
                    y: [0, 20, 0],
                    rotate: [0, -5, 0]
                }}
                transition={{
                    duration: 8,
                    repeat: Infinity,
                    ease: "easeInOut"
                }}
                style={{
                    position: 'absolute',
                    bottom: '15%',
                    right: '15%',
                    width: '150px',
                    height: '150px',
                    background: 'rgba(255, 255, 255, 0.08)',
                    borderRadius: '63% 37% 54% 46% / 55% 48% 52% 45%',
                    backdropFilter: 'blur(10px)'
                }}
            />

            <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                    background: 'white',
                    padding: '48px',
                    borderRadius: '24px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
                    width: '100%',
                    maxWidth: '450px',
                    position: 'relative',
                    zIndex: 10
                }}
            >
                {/* Logo/Icon */}
                <div style={{
                    width: '80px',
                    height: '80px',
                    background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                    borderRadius: '20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 24px',
                    boxShadow: '0 10px 30px rgba(14, 165, 164, 0.3)'
                }}>
                    <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                    </svg>
                </div>

                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '8px',
                    color: 'var(--navy)',
                    fontSize: '28px',
                    fontWeight: 800
                }}>
                    Admin Portal
                </h2>
                <p style={{
                    textAlign: 'center',
                    color: 'var(--muted)',
                    marginBottom: '32px',
                    fontSize: '15px'
                }}>
                    Enter your credentials to access the dashboard
                </p>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '24px' }}>
                        <label style={{
                            display: 'block',
                            marginBottom: '10px',
                            fontWeight: 600,
                            color: 'var(--navy)',
                            fontSize: '14px',
                            textTransform: 'uppercase',
                            letterSpacing: '0.5px'
                        }}>
                            Password
                        </label>
                        <div style={{ position: 'relative' }}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setError('');
                                }}
                                style={{
                                    width: '100%',
                                    padding: '14px 45px 14px 16px',
                                    borderRadius: '12px',
                                    border: error ? '2px solid #ff4444' : '2px solid #e8ecef',
                                    fontSize: '16px',
                                    transition: 'all 0.3s ease',
                                    outline: 'none'
                                }}
                                placeholder="Enter your password"
                                onFocus={(e) => {
                                    if (!error) {
                                        e.target.style.borderColor = 'var(--teal)';
                                    }
                                }}
                                onBlur={(e) => {
                                    if (!error) {
                                        e.target.style.borderColor = '#e8ecef';
                                    }
                                }}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                style={{
                                    position: 'absolute',
                                    right: '12px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    background: 'none',
                                    border: 'none',
                                    cursor: 'pointer',
                                    padding: '8px',
                                    color: 'var(--muted)'
                                }}
                            >
                                {showPassword ? (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                                        <line x1="1" y1="1" x2="23" y2="23" />
                                    </svg>
                                ) : (
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                                        <circle cx="12" cy="12" r="3" />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            style={{
                                background: '#ffebee',
                                border: '1px solid #ff4444',
                                borderRadius: '8px',
                                padding: '12px 16px',
                                marginBottom: '20px',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px'
                            }}
                        >
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ff4444" strokeWidth="2">
                                <circle cx="12" cy="12" r="10" />
                                <line x1="12" y1="8" x2="12" y2="12" />
                                <line x1="12" y1="16" x2="12.01" y2="16" />
                            </svg>
                            <span style={{ color: '#d32f2f', fontSize: '14px', fontWeight: 500 }}>{error}</span>
                        </motion.div>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '16px',
                            background: 'linear-gradient(135deg, var(--primary), var(--teal))',
                            color: 'white',
                            border: 'none',
                            borderRadius: '12px',
                            fontSize: '16px',
                            fontWeight: 700,
                            cursor: 'pointer',
                            boxShadow: '0 8px 24px rgba(14, 165, 164, 0.3)',
                            transition: 'all 0.3s ease',
                            marginBottom: '20px'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.transform = 'translateY(-2px)';
                            e.target.style.boxShadow = '0 12px 32px rgba(14, 165, 164, 0.4)';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.transform = 'translateY(0)';
                            e.target.style.boxShadow = '0 8px 24px rgba(14, 165, 164, 0.3)';
                        }}
                    >
                        Access Dashboard
                    </button>

                    <div style={{
                        textAlign: 'center',
                        padding: '16px',
                        background: '#f8f9fa',
                        borderRadius: '8px',
                        marginTop: '20px'
                    }}>
                        <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>
                            🔒 This is a secure admin area
                        </p>
                        <p style={{ margin: '8px 0 0', fontSize: '12px', color: 'var(--muted)', fontStyle: 'italic' }}>
                            Demo password: admin123
                        </p>
                    </div>
                </form>

                {/* Back to Home Link */}
                <div style={{ textAlign: 'center', marginTop: '24px' }}>
                    <a
                        href="/"
                        style={{
                            color: 'var(--teal)',
                            textDecoration: 'none',
                            fontSize: '14px',
                            fontWeight: 600,
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '6px'
                        }}
                    >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <line x1="19" y1="12" x2="5" y2="12" />
                            <polyline points="12 19 5 12 12 5" />
                        </svg>
                        Back to Home
                    </a>
                </div>
            </motion.div>

            <style>{`
                @keyframes shake {
                    0%, 100% { transform: translateX(0); }
                    10%, 30%, 50%, 70%, 90% { transform: translateX(-10px); }
                    20%, 40%, 60%, 80% { transform: translateX(10px); }
                }
            `}</style>
        </div>
    );
}
