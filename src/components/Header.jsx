import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SignInModal from './SignInModal';

export default function Header({ favoritesCount = 0 }) {
    const location = useLocation();

    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isSignInOpen, setIsSignInOpen] = useState(false);
    const [user, setUser] = useState(null);

    const isActive = (path) => location.pathname === path;

    const handleLogin = (userData) => {
        setUser(userData);
        setIsSignInOpen(false);
    };

    const handleLogout = () => {
        setUser(null);
    };

    return (
        <>
            <header>
                <Link className="brand" to="/">
                    <div className="logo">E</div>
                    <span>Estatery</span>
                </Link>

                <nav aria-label="Primary navigation">
                    <Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link>
                    <Link to="/rent" className={isActive('/rent') ? 'active' : ''}>Rent</Link>
                    <Link to="/buy" className={isActive('/buy') ? 'active' : ''}>Buy</Link>
                    <Link to="/sell" className={isActive('/sell') ? 'active' : ''}>Sell</Link>
                </nav>

                <div className="nav-right">
                    <Link
                        to="/favorites"
                        className="desktop-only"
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            textDecoration: 'none',
                            color: 'var(--navy)',
                            marginRight: '8px',
                            padding: '8px',
                            position: 'relative'
                        }}
                        aria-label="Favorites"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={favoritesCount > 0 ? "var(--coral)" : "none"} stroke={favoritesCount > 0 ? "var(--coral)" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {favoritesCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '0',
                                right: '0',
                                background: 'var(--coral)',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                height: '16px',
                                width: '16px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid white'
                            }}>
                                {favoritesCount}
                            </span>
                        )}
                    </Link>
                    {user ? (
                        <div className="desktop-only" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div style={{ textAlign: 'right' }}>
                                <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>{user.name}</div>
                                <div style={{ fontSize: '12px', color: 'var(--muted)' }}>{user.email}</div>
                            </div>
                            <div
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '50%',
                                    background: 'var(--teal-100)',
                                    color: 'var(--teal-600)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontWeight: 700,
                                    fontSize: '18px',
                                    border: '2px solid var(--teal-200)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => {
                                    if (window.confirm('Do you want to logout?')) handleLogout();
                                }}
                                title="Click to logout"
                            >
                                {user.avatar || user.name.charAt(0)}
                            </div>
                        </div>
                    ) : (
                        <button
                            className="btn btn-outline desktop-only"
                            onClick={() => setIsSignInOpen(true)}
                        >
                            Sign In
                        </button>
                    )}

                    {/* Mobile Favorites Button */}
                    <Link
                        to="/favorites"
                        className="mobile-nav-icon"
                        style={{
                            textDecoration: 'none',
                            color: 'var(--navy)',
                            marginRight: '12px',
                            position: 'relative',
                            width: '44px',
                            height: '44px',
                            borderRadius: '12px',
                            border: '2px solid var(--slate-200)',
                            transition: 'all 0.2s ease'
                        }}
                        aria-label="Favorites"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={favoritesCount > 0 ? "#f59e0b" : "none"} stroke={favoritesCount > 0 ? "#f59e0b" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        {favoritesCount > 0 && (
                            <span style={{
                                position: 'absolute',
                                top: '-4px',
                                right: '-4px',
                                background: '#ef4444',
                                color: 'white',
                                fontSize: '10px',
                                fontWeight: 'bold',
                                height: '18px',
                                width: '18px',
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '2px solid white'
                            }}>
                                {favoritesCount}
                            </span>
                        )}
                    </Link>

                    {/* Enhanced Animated Hamburger Button */}
                    <motion.button
                        className="menu-btn"
                        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.92 }}
                        animate={{
                            background: isMenuOpen
                                ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                : 'transparent',
                            borderColor: isMenuOpen ? '#6366f1' : '#6366f1',
                            boxShadow: isMenuOpen
                                ? '0 8px 24px rgba(99, 102, 241, 0.4)'
                                : '0 2px 8px rgba(99, 102, 241, 0.1)'
                        }}
                        transition={{ duration: 0.3 }}
                        style={{
                            border: '2px solid #6366f1',
                            borderRadius: '14px',
                            padding: '12px',
                            cursor: 'pointer',
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '5px',
                            width: '48px',
                            height: '48px',
                            alignItems: 'center',
                            justifyContent: 'center',
                            position: 'relative',
                            overflow: 'visible'
                        }}
                    >
                        {/* Top Bar */}
                        <motion.span
                            animate={{
                                rotate: isMenuOpen ? 45 : 0,
                                y: isMenuOpen ? 8 : 0,
                                scaleX: isMenuOpen ? 1.1 : 1
                            }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            style={{
                                display: 'block',
                                width: '26px',
                                height: '3px',
                                background: isMenuOpen ? 'white' : '#6366f1',
                                borderRadius: '3px',
                                transformOrigin: 'center'
                            }}
                        />

                        {/* Middle Bar */}
                        <motion.span
                            animate={{
                                opacity: isMenuOpen ? 0 : 1,
                                scaleX: isMenuOpen ? 0 : 1,
                                rotate: isMenuOpen ? 180 : 0
                            }}
                            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                            style={{
                                display: 'block',
                                width: '26px',
                                height: '3px',
                                background: isMenuOpen ? 'white' : '#6366f1',
                                borderRadius: '3px',
                                transformOrigin: 'center'
                            }}
                        />

                        {/* Bottom Bar */}
                        <motion.span
                            animate={{
                                rotate: isMenuOpen ? -45 : 0,
                                y: isMenuOpen ? -8 : 0,
                                scaleX: isMenuOpen ? 1.1 : 1
                            }}
                            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                            style={{
                                display: 'block',
                                width: '26px',
                                height: '3px',
                                background: isMenuOpen ? 'white' : '#6366f1',
                                borderRadius: '3px',
                                transformOrigin: 'center'
                            }}
                        />

                        {/* Ripple Effect on Click */}
                        {isMenuOpen && (
                            <motion.div
                                initial={{ scale: 0, opacity: 0.6 }}
                                animate={{ scale: 2, opacity: 0 }}
                                transition={{ duration: 0.6 }}
                                style={{
                                    position: 'absolute',
                                    width: '100%',
                                    height: '100%',
                                    borderRadius: '14px',
                                    background: 'rgba(99, 102, 241, 0.3)',
                                    pointerEvents: 'none'
                                }}
                            />
                        )}
                    </motion.button>
                </div>
            </header>

            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            onClick={() => setIsMenuOpen(false)}
                            style={{
                                position: 'fixed',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: 'rgba(0, 0, 0, 0.5)',
                                backdropFilter: 'blur(4px)',
                                zIndex: 999
                            }}
                        />

                        {/* Menu Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                            style={{
                                position: 'fixed',
                                top: 0,
                                right: 0,
                                bottom: 0,
                                width: '320px',
                                maxWidth: '85vw',
                                background: 'white',
                                boxShadow: '-4px 0 24px rgba(0, 0, 0, 0.15)',
                                zIndex: 1000,
                                padding: '24px',
                                overflowY: 'auto',
                                display: 'flex',
                                flexDirection: 'column'
                            }}
                        >
                            {/* Close Button */}
                            <motion.button
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => setIsMenuOpen(false)}
                                style={{
                                    alignSelf: 'flex-end',
                                    background: '#f1f5f9',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '40px',
                                    height: '40px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '24px',
                                    cursor: 'pointer',
                                    color: '#64748b',
                                    marginBottom: '32px',
                                    transition: 'all 0.2s ease'
                                }}
                            >
                                ×
                            </motion.button>

                            {/* Navigation Links */}
                            <nav style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '24px' }}>
                                {[
                                    { to: '/', label: 'Home', icon: '🏠' },
                                    { to: '/rent', label: 'Rent', icon: '🔑' },
                                    { to: '/buy', label: 'Buy', icon: '🏘️' },
                                    { to: '/sell', label: 'Sell', icon: '💼' }
                                ].map((link, index) => (
                                    <motion.div
                                        key={link.to}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={link.to}
                                            onClick={() => setIsMenuOpen(false)}
                                            style={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'space-between',
                                                padding: '16px 20px',
                                                borderRadius: '12px',
                                                textDecoration: 'none',
                                                color: isActive(link.to) ? '#6366f1' : '#0f172a',
                                                background: isActive(link.to) ? '#eef2ff' : 'transparent',
                                                fontWeight: isActive(link.to) ? 700 : 600,
                                                fontSize: '16px',
                                                transition: 'all 0.2s ease',
                                                border: isActive(link.to) ? '2px solid #6366f1' : '2px solid transparent',
                                                position: 'relative'
                                            }}
                                            onMouseEnter={(e) => {
                                                if (!isActive(link.to)) {
                                                    e.target.style.background = '#f8fafc';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                if (!isActive(link.to)) {
                                                    e.target.style.background = 'transparent';
                                                }
                                            }}
                                        >
                                            <span style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                <span style={{ fontSize: '20px' }}>{link.icon}</span>
                                                {link.label}
                                            </span>
                                            {link.badge > 0 && (
                                                <span style={{
                                                    background: '#ef4444',
                                                    color: 'white',
                                                    fontSize: '12px',
                                                    fontWeight: 700,
                                                    padding: '4px 8px',
                                                    borderRadius: '12px',
                                                    minWidth: '24px',
                                                    textAlign: 'center'
                                                }}>
                                                    {link.badge}
                                                </span>
                                            )}
                                        </Link>
                                    </motion.div>
                                ))}
                            </nav>

                            {/* Divider */}
                            <div style={{
                                height: '1px',
                                background: '#e2e8f0',
                                margin: '16px 0'
                            }} />

                            {/* User Section */}
                            {user ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    style={{
                                        padding: '20px',
                                        background: '#f8fafc',
                                        borderRadius: '16px',
                                        marginTop: 'auto'
                                    }}
                                >
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                                        <div style={{
                                            width: '48px',
                                            height: '48px',
                                            borderRadius: '50%',
                                            background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                            color: 'white',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            fontWeight: 700,
                                            fontSize: '20px'
                                        }}>
                                            {user.avatar || user.name.charAt(0)}
                                        </div>
                                        <div style={{ flex: 1 }}>
                                            <div style={{ fontWeight: 700, fontSize: '16px', color: '#0f172a' }}>{user.name}</div>
                                            <div style={{ fontSize: '13px', color: '#64748b' }}>{user.email}</div>
                                        </div>
                                    </div>
                                    <motion.button
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        style={{
                                            width: '100%',
                                            padding: '12px',
                                            background: 'white',
                                            border: '2px solid #ef4444',
                                            borderRadius: '12px',
                                            color: '#ef4444',
                                            fontWeight: 700,
                                            fontSize: '15px',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease'
                                        }}
                                        onClick={() => {
                                            handleLogout();
                                            setIsMenuOpen(false);
                                        }}
                                    >
                                        Logout
                                    </motion.button>
                                </motion.div>
                            ) : (
                                <motion.button
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    style={{
                                        marginTop: 'auto',
                                        padding: '16px',
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        border: 'none',
                                        borderRadius: '12px',
                                        color: 'white',
                                        fontWeight: 700,
                                        fontSize: '16px',
                                        cursor: 'pointer',
                                        boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
                                        transition: 'all 0.2s ease'
                                    }}
                                    onClick={() => {
                                        setIsMenuOpen(false);
                                        setIsSignInOpen(true);
                                    }}
                                >
                                    Sign In
                                </motion.button>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            <SignInModal
                isOpen={isSignInOpen}
                onClose={() => setIsSignInOpen(false)}
                onLogin={handleLogin}
            />
        </>
    );
}
