import { motion, useScroll, useTransform } from 'framer-motion';
import { useState, useRef } from 'react';
import PropertyCard from '../components/PropertyCard';
import QuickViewModal from '../components/QuickViewModal';

export default function Home({ favorites = [], onToggleFavorite, properties = [] }) {
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [searchLocation, setSearchLocation] = useState('');
    const [searchType, setSearchType] = useState('buy');
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll();

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -400]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

    const handleQuickView = (property) => {
        setSelectedProperty(property);
    };

    const handleSearch = () => {
        window.location.href = `/search?type=${searchType}&location=${searchLocation}`;
    };

    return (
        <div ref={containerRef} style={{ background: '#f8fafc', color: '#0f172a', overflow: 'hidden' }}>
            {/* Hero Section with Gradient */}
            <section style={{
                minHeight: '100vh',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }}>
                {/* Animated Background Elements */}
                <motion.div
                    style={{ y: y1 }}
                    className="absolute top-0 left-0 w-full h-full"
                >
                    <div style={{
                        position: 'absolute',
                        top: '10%',
                        left: '5%',
                        width: '500px',
                        height: '500px',
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                        animation: 'float 8s ease-in-out infinite'
                    }} />
                    <div style={{
                        position: 'absolute',
                        top: '40%',
                        right: '10%',
                        width: '400px',
                        height: '400px',
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(80px)',
                        animation: 'float 10s ease-in-out infinite reverse'
                    }} />
                </motion.div>

                <motion.div
                    style={{ y: y2 }}
                >
                    <div style={{
                        position: 'absolute',
                        bottom: '20%',
                        left: '15%',
                        width: '350px',
                        height: '350px',
                        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.12) 0%, transparent 70%)',
                        borderRadius: '50%',
                        filter: 'blur(70px)',
                        animation: 'float 12s ease-in-out infinite'
                    }} />
                </motion.div>

                {/* Grid Pattern Overlay */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: `
                        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
                    `,
                    backgroundSize: '50px 50px',
                    opacity: 0.5
                }} />

                <motion.div
                    className="container"
                    style={{ opacity, maxWidth: '1400px', padding: '0 20px', position: 'relative', zIndex: 10 }}
                >
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, ease: 'easeOut' }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        {/* Badge */}
                        <motion.div
                            initial={{ scale: 0, rotateX: -180 }}
                            animate={{ scale: 1, rotateX: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            style={{
                                display: 'inline-block',
                                padding: '12px 32px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(20px)',
                                border: '1px solid rgba(255, 255, 255, 0.2)',
                                borderRadius: '50px',
                                marginBottom: '32px',
                                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
                            }}
                        >
                            <span style={{
                                fontSize: '14px',
                                fontWeight: 800,
                                letterSpacing: '2px',
                                textTransform: 'uppercase',
                                color: 'white'
                            }}>
                                ✨ Premium Real Estate Platform
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            style={{
                                fontSize: 'clamp(48px, 10vw, 96px)',
                                fontWeight: 900,
                                marginBottom: '24px',
                                lineHeight: 1,
                                letterSpacing: '-0.04em',
                                color: 'white'
                            }}
                        >
                            <span style={{ display: 'block', marginBottom: '16px' }}>
                                Find Your Perfect
                            </span>
                            <span style={{
                                background: 'linear-gradient(135deg, #fbbf24, #f59e0b)',
                                WebkitBackgroundClip: 'text',
                                WebkitTextFillColor: 'transparent'
                            }}>
                                Dream Home
                            </span>
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.6 }}
                            style={{
                                fontSize: '22px',
                                color: 'rgba(255, 255, 255, 0.9)',
                                maxWidth: '700px',
                                margin: '0 auto 60px',
                                lineHeight: 1.7,
                                fontWeight: 400
                            }}
                        >
                            Discover premium properties in Hyderabad with cutting-edge technology
                            and zero brokerage fees
                        </motion.p>

                        {/* Glassmorphism Search Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 40, rotateX: -20 }}
                            animate={{ opacity: 1, y: 0, rotateX: 0 }}
                            transition={{ duration: 1, delay: 0.8 }}
                            style={{
                                background: 'rgba(255, 255, 255, 0.95)',
                                backdropFilter: 'blur(30px)',
                                border: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: '28px',
                                padding: '16px',
                                maxWidth: '1000px',
                                margin: '0 auto',
                                boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)'
                            }}
                        >
                            <div style={{
                                display: 'grid',
                                gridTemplateColumns: 'auto 1fr auto',
                                gap: '16px',
                                alignItems: 'center'
                            }}>
                                {/* Buy/Rent Toggle */}
                                <div style={{
                                    display: 'flex',
                                    background: '#f1f5f9',
                                    borderRadius: '20px',
                                    padding: '6px'
                                }}>
                                    {['buy', 'rent'].map((type) => (
                                        <motion.button
                                            key={type}
                                            onClick={() => setSearchType(type)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{
                                                padding: '16px 32px',
                                                border: 'none',
                                                borderRadius: '16px',
                                                background: searchType === type
                                                    ? 'linear-gradient(135deg, #6366f1, #8b5cf6)'
                                                    : 'transparent',
                                                color: searchType === type ? 'white' : '#64748b',
                                                fontWeight: 800,
                                                fontSize: '15px',
                                                cursor: 'pointer',
                                                transition: 'all 0.3s ease',
                                                textTransform: 'capitalize',
                                                boxShadow: searchType === type
                                                    ? '0 8px 20px rgba(99, 102, 241, 0.3)'
                                                    : 'none'
                                            }}
                                        >
                                            {type}
                                        </motion.button>
                                    ))}
                                </div>

                                {/* Search Input */}
                                <div style={{ position: 'relative' }}>
                                    <input
                                        type="text"
                                        placeholder="Search location, landmark, or property..."
                                        value={searchLocation}
                                        onChange={(e) => setSearchLocation(e.target.value)}
                                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                                        style={{
                                            width: '100%',
                                            padding: '20px 24px 20px 56px',
                                            border: '2px solid #e2e8f0',
                                            borderRadius: '18px',
                                            fontSize: '16px',
                                            outline: 'none',
                                            background: 'white',
                                            color: '#0f172a',
                                            fontWeight: 500,
                                            transition: 'all 0.3s ease'
                                        }}
                                        onFocus={(e) => {
                                            e.target.style.borderColor = '#6366f1';
                                            e.target.style.boxShadow = '0 0 0 3px rgba(99, 102, 241, 0.1)';
                                        }}
                                        onBlur={(e) => {
                                            e.target.style.borderColor = '#e2e8f0';
                                            e.target.style.boxShadow = 'none';
                                        }}
                                    />
                                    <svg
                                        style={{
                                            position: 'absolute',
                                            left: '20px',
                                            top: '50%',
                                            transform: 'translateY(-50%)',
                                            color: '#94a3b8'
                                        }}
                                        width="20"
                                        height="20"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2.5"
                                    >
                                        <circle cx="11" cy="11" r="8" />
                                        <path d="m21 21-4.35-4.35" />
                                    </svg>
                                </div>

                                {/* Search Button */}
                                <motion.button
                                    onClick={handleSearch}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: '0 20px 40px rgba(16, 185, 129, 0.4)'
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    style={{
                                        padding: '20px 48px',
                                        background: 'linear-gradient(135deg, #10b981, #059669)',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '18px',
                                        fontSize: '17px',
                                        fontWeight: 800,
                                        cursor: 'pointer',
                                        boxShadow: '0 12px 28px rgba(16, 185, 129, 0.3)',
                                        whiteSpace: 'nowrap',
                                        transition: 'all 0.3s ease'
                                    }}
                                >
                                    🔍 Search
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* Floating Scroll Indicator */}
                <motion.div
                    animate={{ y: [0, 15, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    style={{
                        position: 'absolute',
                        bottom: '40px',
                        left: '50%',
                        transform: 'translateX(-50%)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        gap: '8px',
                        opacity: 0.7,
                        color: 'white'
                    }}
                >
                    <span style={{ fontSize: '12px', fontWeight: 600, letterSpacing: '2px' }}>SCROLL</span>
                    <div style={{
                        width: '2px',
                        height: '40px',
                        background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)'
                    }} />
                </motion.div>
            </section>

            {/* Featured Properties */}
            <section style={{ padding: '120px 20px', background: 'white' }}>
                <div className="container" style={{ maxWidth: '1400px' }}>
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '60px',
                            flexWrap: 'wrap',
                            gap: '24px'
                        }}
                    >
                        <div>
                            <p style={{
                                color: '#6366f1',
                                fontWeight: 800,
                                fontSize: '14px',
                                letterSpacing: '3px',
                                textTransform: 'uppercase',
                                marginBottom: '12px'
                            }}>
                                Premium Collection
                            </p>
                            <h2 style={{
                                fontSize: 'clamp(36px, 6vw, 56px)',
                                fontWeight: 900,
                                margin: 0,
                                color: '#0f172a'
                            }}>
                                Featured Properties
                            </h2>
                        </div>

                        <motion.a
                            href="/buy"
                            whileHover={{ scale: 1.05, x: 5 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                                padding: '16px 40px',
                                background: 'white',
                                border: '2px solid #6366f1',
                                borderRadius: '16px',
                                color: '#6366f1',
                                fontWeight: 800,
                                textDecoration: 'none',
                                fontSize: '15px',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '8px',
                                transition: 'all 0.3s ease'
                            }}
                        >
                            View All
                            <span>→</span>
                        </motion.a>
                    </motion.div>

                    {properties.length > 0 ? (
                        <div className="property-grid">
                            {properties.slice(0, 6).map((property, index) => (
                                <motion.div
                                    key={property.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <PropertyCard
                                        property={property}
                                        index={index}
                                        onQuickView={handleQuickView}
                                        onToggleFavorite={onToggleFavorite}
                                        isFavorite={favorites.some(fav => fav.id === property.id)}
                                    />
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            style={{
                                textAlign: 'center',
                                padding: '100px 40px',
                                background: '#f8fafc',
                                border: '2px dashed #e2e8f0',
                                borderRadius: '32px'
                            }}
                        >
                            <div style={{ fontSize: '100px', marginBottom: '32px' }}>🏘️</div>
                            <h3 style={{
                                fontSize: '32px',
                                fontWeight: 900,
                                color: '#0f172a',
                                marginBottom: '16px'
                            }}>
                                No Properties Yet
                            </h3>
                            <p style={{
                                color: '#64748b',
                                fontSize: '18px',
                                marginBottom: '40px',
                                maxWidth: '500px',
                                margin: '0 auto 40px'
                            }}>
                                Add stunning properties from the admin dashboard to showcase them here
                            </p>
                            <motion.a
                                href="/admin/login"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '18px 48px',
                                    background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '16px',
                                    fontWeight: 800,
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    fontSize: '16px',
                                    boxShadow: '0 12px 32px rgba(99, 102, 241, 0.3)'
                                }}
                            >
                                Go to Admin Dashboard →
                            </motion.a>
                        </motion.div>
                    )}
                </div>
            </section>

            {/* Services Section */}
            <section style={{ padding: '100px 20px', background: '#f8fafc' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <p style={{
                            color: '#6366f1',
                            fontWeight: 800,
                            fontSize: '14px',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            marginBottom: '12px'
                        }}>
                            Our Services
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: 900,
                            color: '#0f172a'
                        }}>
                            Everything You Need
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            {
                                icon: '🏠',
                                title: 'Buy Property',
                                desc: 'Find your dream home from verified listings',
                                color: '#6366f1'
                            },
                            {
                                icon: '🔑',
                                title: 'Rent Property',
                                desc: 'Discover perfect rental homes',
                                color: '#8b5cf6'
                            },
                            {
                                icon: '💼',
                                title: 'Sell Property',
                                desc: 'List your property with zero fees',
                                color: '#ec4899'
                            },
                            {
                                icon: '📊',
                                title: 'Market Insights',
                                desc: 'Real-time market trends & analysis',
                                color: '#f59e0b'
                            }
                        ].map((service, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                style={{
                                    background: 'white',
                                    padding: '40px',
                                    borderRadius: '20px',
                                    border: '1px solid #e2e8f0',
                                    transition: 'all 0.3s ease',
                                    cursor: 'pointer'
                                }}
                            >
                                <div style={{
                                    width: '64px',
                                    height: '64px',
                                    background: `linear-gradient(135deg, ${service.color}, ${service.color}dd)`,
                                    borderRadius: '16px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '32px',
                                    marginBottom: '24px',
                                    boxShadow: `0 8px 20px ${service.color}40`
                                }}>
                                    {service.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '20px',
                                    fontWeight: 800,
                                    color: '#0f172a',
                                    marginBottom: '12px'
                                }}>
                                    {service.title}
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '15px', margin: 0, lineHeight: 1.6 }}>
                                    {service.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{
                padding: '80px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white'
            }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '48px',
                        textAlign: 'center'
                    }}>
                        {[
                            { number: '5000+', label: 'Properties', icon: '🏘️' },
                            { number: '12K+', label: 'Happy Clients', icon: '😊' },
                            { number: '50+', label: 'Awards', icon: '🏆' },
                            { number: '15+', label: 'Years', icon: '⭐' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                whileHover={{ scale: 1.05 }}
                            >
                                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{stat.icon}</div>
                                <div style={{
                                    fontSize: '48px',
                                    fontWeight: 900,
                                    marginBottom: '8px',
                                    color: '#fbbf24'
                                }}>
                                    {stat.number}
                                </div>
                                <div style={{ fontSize: '16px', opacity: 0.9, fontWeight: 600 }}>
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ padding: '100px 20px', background: 'white' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <p style={{
                            color: '#6366f1',
                            fontWeight: 800,
                            fontSize: '14px',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            marginBottom: '12px'
                        }}>
                            Why Choose Us
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: 900,
                            color: '#0f172a'
                        }}>
                            Your Trusted Partner
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            { icon: '✅', title: 'Verified Properties', desc: 'All listings verified by experts' },
                            { icon: '💰', title: 'Best Prices', desc: 'Competitive rates, zero hidden fees' },
                            { icon: '🔒', title: 'Secure Deals', desc: 'Safe & transparent transactions' },
                            { icon: '🎯', title: 'Expert Support', desc: '24/7 dedicated assistance' },
                            { icon: '⚡', title: 'Quick Process', desc: 'Fast documentation & approval' },
                            { icon: '📱', title: 'Easy Platform', desc: 'User-friendly interface' }
                        ].map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                style={{
                                    textAlign: 'center',
                                    padding: '32px 20px'
                                }}
                            >
                                <div style={{
                                    fontSize: '48px',
                                    marginBottom: '16px'
                                }}>
                                    {feature.icon}
                                </div>
                                <h3 style={{
                                    fontSize: '18px',
                                    fontWeight: 800,
                                    color: '#0f172a',
                                    marginBottom: '8px'
                                }}>
                                    {feature.title}
                                </h3>
                                <p style={{ color: '#64748b', fontSize: '14px', margin: 0, lineHeight: 1.6 }}>
                                    {feature.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={{ padding: '100px 20px', background: '#f8fafc' }}>
                <div className="container" style={{ maxWidth: '1000px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <p style={{
                            color: '#6366f1',
                            fontWeight: 800,
                            fontSize: '14px',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            marginBottom: '12px'
                        }}>
                            Simple Process
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: 900,
                            color: '#0f172a'
                        }}>
                            How It Works
                        </h2>
                    </motion.div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
                        {[
                            {
                                step: '01',
                                title: 'Search Properties',
                                desc: 'Browse through verified listings or use our smart search',
                                icon: '🔍'
                            },
                            {
                                step: '02',
                                title: 'Schedule Visit',
                                desc: 'Book a property visit at your convenient time',
                                icon: '📅'
                            },
                            {
                                step: '03',
                                title: 'Make Decision',
                                desc: 'Get expert guidance and make an informed choice',
                                icon: '✓'
                            },
                            {
                                step: '04',
                                title: 'Close Deal',
                                desc: 'Complete documentation and move into your dream home',
                                icon: '🎉'
                            }
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '32px',
                                    flexDirection: index % 2 === 0 ? 'row' : 'row-reverse'
                                }}
                            >
                                <motion.div
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    style={{
                                        minWidth: '100px',
                                        height: '100px',
                                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '32px',
                                        boxShadow: '0 20px 40px rgba(99, 102, 241, 0.3)',
                                        position: 'relative',
                                        color: 'white'
                                    }}
                                >
                                    {item.icon}
                                    <div style={{
                                        position: 'absolute',
                                        top: '-10px',
                                        right: '-10px',
                                        width: '40px',
                                        height: '40px',
                                        background: 'white',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '14px',
                                        fontWeight: 800,
                                        color: '#6366f1',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}>
                                        {item.step}
                                    </div>
                                </motion.div>

                                <div style={{
                                    flex: 1,
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '20px',
                                    padding: '32px',
                                    textAlign: index % 2 === 0 ? 'left' : 'right'
                                }}>
                                    <h3 style={{
                                        fontSize: '24px',
                                        fontWeight: 800,
                                        color: '#0f172a',
                                        marginBottom: '12px'
                                    }}>
                                        {item.title}
                                    </h3>
                                    <p style={{
                                        color: '#64748b',
                                        fontSize: '16px',
                                        margin: 0,
                                        lineHeight: 1.7
                                    }}>
                                        {item.desc}
                                    </p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <section style={{ padding: '100px 20px', background: 'white' }}>
                <div className="container" style={{ maxWidth: '1200px' }}>
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        style={{ textAlign: 'center', marginBottom: '60px' }}
                    >
                        <p style={{
                            color: '#6366f1',
                            fontWeight: 800,
                            fontSize: '14px',
                            letterSpacing: '3px',
                            textTransform: 'uppercase',
                            marginBottom: '12px'
                        }}>
                            Testimonials
                        </p>
                        <h2 style={{
                            fontSize: 'clamp(32px, 5vw, 48px)',
                            fontWeight: 900,
                            color: '#0f172a'
                        }}>
                            What Our Clients Say
                        </h2>
                    </motion.div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
                        gap: '32px'
                    }}>
                        {[
                            {
                                name: 'Rajesh Kumar',
                                role: 'Property Buyer',
                                image: 'https://i.pravatar.cc/150?img=12',
                                text: 'Found my dream home in just 2 weeks! The team was incredibly professional and helpful.',
                                rating: 5
                            },
                            {
                                name: 'Priya Sharma',
                                role: 'Property Seller',
                                image: 'https://i.pravatar.cc/150?img=5',
                                text: 'Sold my property at the best price with zero hassle. Highly recommend!',
                                rating: 5
                            },
                            {
                                name: 'Amit Patel',
                                role: 'Tenant',
                                image: 'https://i.pravatar.cc/150?img=33',
                                text: 'Best rental platform in Hyderabad! Found the perfect apartment.',
                                rating: 5
                            }
                        ].map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 40 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15 }}
                                whileHover={{ y: -8, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
                                style={{
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '24px',
                                    padding: '40px',
                                    transition: 'all 0.3s ease'
                                }}
                            >
                                <div style={{
                                    display: 'flex',
                                    gap: '4px',
                                    marginBottom: '24px',
                                    fontSize: '20px'
                                }}>
                                    {[...Array(testimonial.rating)].map((_, i) => (
                                        <span key={i} style={{ color: '#f59e0b' }}>⭐</span>
                                    ))}
                                </div>

                                <p style={{
                                    fontSize: '16px',
                                    lineHeight: 1.8,
                                    color: '#64748b',
                                    marginBottom: '32px',
                                    fontStyle: 'italic'
                                }}>
                                    "{testimonial.text}"
                                </p>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        style={{
                                            width: '60px',
                                            height: '60px',
                                            borderRadius: '50%',
                                            border: '3px solid #6366f1',
                                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                        }}
                                    />
                                    <div>
                                        <div style={{
                                            fontWeight: 800,
                                            fontSize: '18px',
                                            color: '#0f172a',
                                            marginBottom: '4px'
                                        }}>
                                            {testimonial.name}
                                        </div>
                                        <div style={{
                                            fontSize: '14px',
                                            color: '#64748b'
                                        }}>
                                            {testimonial.role}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{
                padding: '100px 20px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                color: 'white',
                textAlign: 'center'
            }}>
                <div className="container" style={{ maxWidth: '800px' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                    >
                        <h2 style={{
                            fontSize: 'clamp(36px, 6vw, 56px)',
                            fontWeight: 900,
                            marginBottom: '24px',
                            lineHeight: 1.2
                        }}>
                            Ready to Find Your Dream Home?
                        </h2>
                        <p style={{
                            fontSize: '20px',
                            marginBottom: '40px',
                            opacity: 0.95,
                            lineHeight: 1.7
                        }}>
                            Join thousands of happy homeowners. Start your journey today!
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <motion.a
                                href="/buy"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                style={{
                                    padding: '18px 48px',
                                    background: 'white',
                                    color: '#6366f1',
                                    border: 'none',
                                    borderRadius: '16px',
                                    fontWeight: 800,
                                    fontSize: '18px',
                                    textDecoration: 'none',
                                    display: 'inline-block',
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)'
                                }}
                            >
                                Get Started →
                            </motion.a>
                        </div>
                    </motion.div>
                </div>
            </section>

            <QuickViewModal
                isOpen={!!selectedProperty}
                property={selectedProperty}
                onClose={() => setSelectedProperty(null)}
                onToggleFavorite={onToggleFavorite}
                isFavorite={selectedProperty && favorites.some(fav => fav.id === selectedProperty.id)}
            />
        </div>
    );
}
