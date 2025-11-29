import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function SignInModal({ isOpen, onClose, onLogin }) {
    const [isSignUp, setIsSignUp] = useState(false);
    const [authMethod, setAuthMethod] = useState('email'); // 'email', 'google', 'phone'
    const [phoneStep, setPhoneStep] = useState('input'); // 'input', 'otp'
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        name: '',
        phone: '',
        otp: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate network request
        setTimeout(() => {
            setIsLoading(false);
            const mockUser = {
                name: formData.name || 'Vijay Babu',
                email: formData.email || 'vijay@example.com',
                avatar: null
            };
            if (onLogin) onLogin(mockUser);
        }, 1500);
    };

    const handleGoogleSignIn = () => {
        setIsLoading(true);

        // Simulate Google OAuth flow
        setTimeout(() => {
            setIsLoading(false);
            const mockGoogleUser = {
                name: 'Vijay Babu',
                email: 'vijay@example.com',
                avatar: 'V'
            };
            if (onLogin) onLogin(mockGoogleUser);
        }, 2000);
    };

    const handlePhoneAuth = () => {
        setAuthMethod('phone');
    };

    const handleSendOTP = (e) => {
        e.preventDefault();
        if (formData.phone.length >= 10) {
            setIsLoading(true);
            setTimeout(() => {
                setIsLoading(false);
                setPhoneStep('otp');
                alert(`OTP sent to ${formData.phone} (Demo: 123456)`);
            }, 1000);
        }
    };

    const handleVerifyOTP = (e) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            const mockUser = {
                name: 'Vijay Babu',
                email: `+91 ${formData.phone}`,
                avatar: 'V'
            };
            if (onLogin) onLogin(mockUser);
        }, 1500);
    };

    const resetToEmail = () => {
        setAuthMethod('email');
        setPhoneStep('input');
        setFormData({ ...formData, phone: '', otp: '' });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'rgba(11, 37, 69, 0.8)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1000,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '20px'
                }}
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    onClick={(e) => e.stopPropagation()}
                    style={{
                        background: 'var(--surface)',
                        borderRadius: 'var(--radius-lg)',
                        padding: '48px',
                        maxWidth: '480px',
                        width: '100%',
                        boxShadow: 'var(--shadow-lg)',
                        position: 'relative',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'none',
                            border: 'none',
                            fontSize: '28px',
                            cursor: 'pointer',
                            color: 'var(--muted)',
                            padding: '4px 8px',
                            lineHeight: 1
                        }}
                        aria-label="Close"
                    >
                        ×
                    </button>

                    {/* Header */}
                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <div className="logo" style={{
                            width: '60px',
                            height: '60px',
                            margin: '0 auto 16px',
                            fontSize: '24px'
                        }}>
                            E
                        </div>
                        <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: 'var(--navy)' }}>
                            {authMethod === 'phone'
                                ? (phoneStep === 'otp' ? 'Verify OTP' : 'Sign in with Phone')
                                : (isSignUp ? 'Create Account' : 'Welcome Back')
                            }
                        </h2>
                        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
                            {authMethod === 'phone'
                                ? (phoneStep === 'otp' ? 'Enter the code sent to your phone' : 'We\'ll send you a verification code')
                                : (isSignUp ? 'Sign up to find your dream home' : 'Sign in to continue to Estatery')
                            }
                        </p>
                    </div>

                    {/* Phone Authentication Flow */}
                    {authMethod === 'phone' && (
                        <>
                            {phoneStep === 'input' ? (
                                <form onSubmit={handleSendOTP}>
                                    <div style={{ marginBottom: '24px' }}>
                                        <label htmlFor="phone-auth" style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            color: 'var(--navy)'
                                        }}>
                                            Phone Number
                                        </label>
                                        <div style={{ display: 'flex', gap: '8px' }}>
                                            <input
                                                type="text"
                                                value="+91"
                                                disabled
                                                style={{
                                                    width: '60px',
                                                    padding: '14px 12px',
                                                    border: '2px solid rgba(11, 37, 69, 0.1)',
                                                    borderRadius: '10px',
                                                    fontSize: '15px',
                                                    background: 'var(--bg)',
                                                    textAlign: 'center',
                                                    fontWeight: 600
                                                }}
                                            />
                                            <input
                                                id="phone-auth"
                                                type="tel"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value.replace(/\D/g, '').slice(0, 10) })}
                                                placeholder="98765 43210"
                                                required
                                                disabled={isLoading}
                                                style={{
                                                    flex: 1,
                                                    padding: '14px 16px',
                                                    border: '2px solid rgba(11, 37, 69, 0.1)',
                                                    borderRadius: '10px',
                                                    fontSize: '15px',
                                                    outline: 'none',
                                                    transition: 'border-color 0.2s'
                                                }}
                                                onFocus={(e) => e.target.style.borderColor = 'var(--teal-600)'}
                                                onBlur={(e) => e.target.style.borderColor = 'rgba(11, 37, 69, 0.1)'}
                                            />
                                        </div>
                                        <p style={{ margin: '8px 0 0', fontSize: '13px', color: 'var(--muted)' }}>
                                            📱 We'll send a 6-digit OTP to verify your number
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            marginBottom: '16px',
                                            opacity: isLoading ? 0.7 : 1,
                                            cursor: isLoading ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isLoading ? 'Sending...' : 'Send OTP'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={resetToEmail}
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            background: 'none',
                                            border: '2px solid rgba(11, 37, 69, 0.1)',
                                            borderRadius: '10px',
                                            cursor: isLoading ? 'not-allowed' : 'pointer',
                                            fontSize: '15px',
                                            fontWeight: 600,
                                            color: 'var(--navy)'
                                        }}
                                    >
                                        ← Back to Email Sign In
                                    </button>
                                </form>
                            ) : (
                                <form onSubmit={handleVerifyOTP}>
                                    <div style={{ marginBottom: '24px' }}>
                                        <label htmlFor="otp" style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            color: 'var(--navy)'
                                        }}>
                                            Enter OTP
                                        </label>
                                        <input
                                            id="otp"
                                            type="text"
                                            value={formData.otp}
                                            onChange={(e) => setFormData({ ...formData, otp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                                            placeholder="000000"
                                            required
                                            maxLength="6"
                                            disabled={isLoading}
                                            style={{
                                                width: '100%',
                                                padding: '16px',
                                                border: '2px solid rgba(11, 37, 69, 0.1)',
                                                borderRadius: '10px',
                                                fontSize: '24px',
                                                fontWeight: 700,
                                                textAlign: 'center',
                                                letterSpacing: '8px',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--teal-600)'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(11, 37, 69, 0.1)'}
                                        />
                                        <div style={{ marginTop: '12px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <p style={{ margin: 0, fontSize: '13px', color: 'var(--muted)' }}>
                                                Sent to +91 {formData.phone}
                                            </p>
                                            <button
                                                type="button"
                                                onClick={() => alert('OTP resent!')}
                                                disabled={isLoading}
                                                style={{
                                                    background: 'none',
                                                    border: 'none',
                                                    color: 'var(--teal-600)',
                                                    fontSize: '13px',
                                                    fontWeight: 600,
                                                    cursor: isLoading ? 'not-allowed' : 'pointer',
                                                    textDecoration: 'underline'
                                                }}
                                            >
                                                Resend OTP
                                            </button>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '16px',
                                            fontSize: '16px',
                                            fontWeight: 700,
                                            marginBottom: '16px',
                                            opacity: isLoading ? 0.7 : 1,
                                            cursor: isLoading ? 'not-allowed' : 'pointer'
                                        }}
                                    >
                                        {isLoading ? 'Verifying...' : 'Verify & Continue'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={() => setPhoneStep('input')}
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            background: 'none',
                                            border: '2px solid rgba(11, 37, 69, 0.1)',
                                            borderRadius: '10px',
                                            cursor: isLoading ? 'not-allowed' : 'pointer',
                                            fontSize: '15px',
                                            fontWeight: 600,
                                            color: 'var(--navy)'
                                        }}
                                    >
                                        ← Change Phone Number
                                    </button>
                                </form>
                            )}
                        </>
                    )}

                    {/* Email Authentication Form */}
                    {authMethod === 'email' && (
                        <>
                            <form onSubmit={handleSubmit}>
                                {isSignUp && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <label htmlFor="name" style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            color: 'var(--navy)'
                                        }}>
                                            Full Name
                                        </label>
                                        <input
                                            id="name"
                                            type="text"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your full name"
                                            required={isSignUp}
                                            disabled={isLoading}
                                            style={{
                                                width: '100%',
                                                padding: '14px 16px',
                                                border: '2px solid rgba(11, 37, 69, 0.1)',
                                                borderRadius: '10px',
                                                fontSize: '15px',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--teal-600)'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(11, 37, 69, 0.1)'}
                                        />
                                    </div>
                                )}

                                <div style={{ marginBottom: '20px' }}>
                                    <label htmlFor="email" style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: 'var(--navy)'
                                    }}>
                                        Email Address
                                    </label>
                                    <input
                                        id="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="you@example.com"
                                        required
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            border: '2px solid rgba(11, 37, 69, 0.1)',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--teal-600)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(11, 37, 69, 0.1)'}
                                    />
                                </div>

                                {isSignUp && (
                                    <div style={{ marginBottom: '20px' }}>
                                        <label htmlFor="phone" style={{
                                            display: 'block',
                                            marginBottom: '8px',
                                            fontWeight: 600,
                                            fontSize: '14px',
                                            color: 'var(--navy)'
                                        }}>
                                            Phone Number
                                        </label>
                                        <input
                                            id="phone"
                                            type="tel"
                                            value={formData.phone}
                                            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                            placeholder="+91 98765 43210"
                                            required={isSignUp}
                                            disabled={isLoading}
                                            style={{
                                                width: '100%',
                                                padding: '14px 16px',
                                                border: '2px solid rgba(11, 37, 69, 0.1)',
                                                borderRadius: '10px',
                                                fontSize: '15px',
                                                outline: 'none',
                                                transition: 'border-color 0.2s'
                                            }}
                                            onFocus={(e) => e.target.style.borderColor = 'var(--teal-600)'}
                                            onBlur={(e) => e.target.style.borderColor = 'rgba(11, 37, 69, 0.1)'}
                                        />
                                    </div>
                                )}

                                <div style={{ marginBottom: '24px' }}>
                                    <label htmlFor="password" style={{
                                        display: 'block',
                                        marginBottom: '8px',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        color: 'var(--navy)'
                                    }}>
                                        Password
                                    </label>
                                    <input
                                        id="password"
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                        placeholder="Enter your password"
                                        required
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '14px 16px',
                                            border: '2px solid rgba(11, 37, 69, 0.1)',
                                            borderRadius: '10px',
                                            fontSize: '15px',
                                            outline: 'none',
                                            transition: 'border-color 0.2s'
                                        }}
                                        onFocus={(e) => e.target.style.borderColor = 'var(--teal-600)'}
                                        onBlur={(e) => e.target.style.borderColor = 'rgba(11, 37, 69, 0.1)'}
                                    />
                                </div>

                                {!isSignUp && (
                                    <div style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        marginBottom: '24px'
                                    }}>
                                        <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '14px' }}>
                                            <input type="checkbox" style={{ accentColor: 'var(--teal-600)' }} disabled={isLoading} />
                                            Remember me
                                        </label>
                                        <a href="#" style={{
                                            color: 'var(--teal-600)',
                                            textDecoration: 'none',
                                            fontSize: '14px',
                                            fontWeight: 600,
                                            pointerEvents: isLoading ? 'none' : 'auto'
                                        }}>
                                            Forgot password?
                                        </a>
                                    </div>
                                )}

                                <button
                                    type="submit"
                                    className="btn btn-primary"
                                    disabled={isLoading}
                                    style={{
                                        width: '100%',
                                        padding: '16px',
                                        fontSize: '16px',
                                        fontWeight: 700,
                                        marginBottom: '16px',
                                        opacity: isLoading ? 0.7 : 1,
                                        cursor: isLoading ? 'not-allowed' : 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        gap: '10px'
                                    }}
                                >
                                    {isLoading && (
                                        <div style={{
                                            width: '20px',
                                            height: '20px',
                                            border: '2px solid rgba(255,255,255,0.3)',
                                            borderTopColor: 'white',
                                            borderRadius: '50%',
                                            animation: 'spin 1s linear infinite'
                                        }} />
                                    )}
                                    {isSignUp ? 'Create Account' : 'Sign In'}
                                </button>

                                <div style={{ textAlign: 'center' }}>
                                    <p style={{ margin: 0, color: 'var(--muted)', fontSize: '14px' }}>
                                        {isSignUp ? 'Already have an account?' : "Don't have an account?"}{' '}
                                        <button
                                            type="button"
                                            onClick={() => setIsSignUp(!isSignUp)}
                                            disabled={isLoading}
                                            style={{
                                                background: 'none',
                                                border: 'none',
                                                color: 'var(--teal-600)',
                                                fontWeight: 700,
                                                cursor: isLoading ? 'not-allowed' : 'pointer',
                                                fontSize: '14px',
                                                textDecoration: 'underline'
                                            }}
                                        >
                                            {isSignUp ? 'Sign In' : 'Sign Up'}
                                        </button>
                                    </p>
                                </div>
                            </form>

                            {/* Social Sign In */}
                            <div style={{ marginTop: '32px' }}>
                                <div style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '16px',
                                    marginBottom: '20px'
                                }}>
                                    <div style={{ flex: 1, height: '1px', background: 'rgba(11, 37, 69, 0.1)' }}></div>
                                    <span style={{ color: 'var(--muted)', fontSize: '13px', fontWeight: 500 }}>OR CONTINUE WITH</span>
                                    <div style={{ flex: 1, height: '1px', background: 'rgba(11, 37, 69, 0.1)' }}></div>
                                </div>

                                <div style={{ display: 'grid', gap: '12px' }}>
                                    <button
                                        type="button"
                                        onClick={handleGoogleSignIn}
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '14px',
                                            border: '2px solid rgba(11, 37, 69, 0.1)',
                                            borderRadius: '10px',
                                            background: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            cursor: isLoading ? 'not-allowed' : 'pointer',
                                            fontSize: '15px',
                                            fontWeight: 600,
                                            transition: 'all 0.2s',
                                            color: 'var(--navy)',
                                            opacity: isLoading ? 0.7 : 1
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isLoading) {
                                                e.currentTarget.style.borderColor = 'var(--teal-600)';
                                                e.currentTarget.style.background = 'var(--bg)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(11, 37, 69, 0.1)';
                                            e.currentTarget.style.background = 'white';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        {isLoading ? (
                                            <div style={{
                                                width: '20px',
                                                height: '20px',
                                                border: '2px solid rgba(11, 37, 69, 0.2)',
                                                borderTopColor: 'var(--teal-600)',
                                                borderRadius: '50%',
                                                animation: 'spin 1s linear infinite'
                                            }} />
                                        ) : (
                                            <svg width="20" height="20" viewBox="0 0 24 24">
                                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                            </svg>
                                        )}
                                        {isLoading ? 'Connecting...' : 'Continue with Google'}
                                    </button>

                                    <button
                                        type="button"
                                        onClick={handlePhoneAuth}
                                        disabled={isLoading}
                                        style={{
                                            width: '100%',
                                            padding: '14px',
                                            border: '2px solid rgba(11, 37, 69, 0.1)',
                                            borderRadius: '10px',
                                            background: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '12px',
                                            cursor: isLoading ? 'not-allowed' : 'pointer',
                                            fontSize: '15px',
                                            fontWeight: 600,
                                            transition: 'all 0.2s',
                                            color: 'var(--navy)',
                                            opacity: isLoading ? 0.7 : 1
                                        }}
                                        onMouseEnter={(e) => {
                                            if (!isLoading) {
                                                e.currentTarget.style.borderColor = 'var(--teal-600)';
                                                e.currentTarget.style.background = 'var(--bg)';
                                                e.currentTarget.style.transform = 'translateY(-2px)';
                                                e.currentTarget.style.boxShadow = 'var(--shadow-md)';
                                            }
                                        }}
                                        onMouseLeave={(e) => {
                                            e.currentTarget.style.borderColor = 'rgba(11, 37, 69, 0.1)';
                                            e.currentTarget.style.background = 'white';
                                            e.currentTarget.style.transform = 'translateY(0)';
                                            e.currentTarget.style.boxShadow = 'none';
                                        }}
                                    >
                                        <span style={{ fontSize: '20px' }}>📱</span>
                                        Continue with Phone
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </motion.div>
            </motion.div>
            <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
        </AnimatePresence>
    );
}
