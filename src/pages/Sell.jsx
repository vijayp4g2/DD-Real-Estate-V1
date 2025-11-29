import { motion } from 'framer-motion';
import { useState } from 'react';
import ListPropertyModal from '../components/ListPropertyModal';

export default function Sell() {
    const [isListModalOpen, setIsListModalOpen] = useState(false);

    const fadeIn = {
        initial: { opacity: 0, y: 20 },
        animate: { opacity: 1, y: 0 },
        transition: { duration: 0.6 }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="sell-page"
        >
            {/* Hero Section */}
            <section style={{
                position: 'relative',
                height: '85vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                overflow: 'hidden'
            }}>
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.7)), url(https://images.unsplash.com/photo-1613490493576-7fde63acd811?q=80&w=2071&auto=format&fit=crop) center/cover',
                    zIndex: -1
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
                    <motion.span
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        style={{
                            display: 'inline-block',
                            padding: '8px 16px',
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            borderRadius: '30px',
                            fontSize: '14px',
                            fontWeight: 600,
                            marginBottom: '24px',
                            border: '1px solid rgba(255,255,255,0.2)'
                        }}
                    >
                        #1 Real Estate Platform in Hyderabad
                    </motion.span>

                    <motion.h1
                        {...fadeIn}
                        style={{
                            fontSize: 'clamp(40px, 6vw, 72px)',
                            fontWeight: 800,
                            lineHeight: 1.1,
                            marginBottom: '24px',
                            letterSpacing: '-0.02em'
                        }}
                    >
                        Sell Your Property <br />
                        <span style={{
                            background: 'linear-gradient(135deg, #FF6B61 0%, #FFD4D1 100%)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>At The Best Price</span>
                    </motion.h1>

                    <motion.p
                        {...fadeIn}
                        transition={{ delay: 0.2 }}
                        style={{
                            fontSize: 'clamp(18px, 2vw, 22px)',
                            maxWidth: '700px',
                            margin: '0 auto 40px',
                            color: 'rgba(255,255,255,0.9)',
                            lineHeight: 1.6
                        }}
                    >
                        Experience a seamless selling process with our expert agents and cutting-edge technology. Get the value your home deserves.
                    </motion.p>

                    <motion.div
                        {...fadeIn}
                        transition={{ delay: 0.4 }}
                        style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}
                    >
                        <button
                            onClick={() => setIsListModalOpen(true)}
                            className="btn btn-primary"
                            style={{
                                padding: '18px 40px',
                                fontSize: '18px',
                                borderRadius: '50px',
                                boxShadow: '0 10px 30px rgba(255, 107, 97, 0.4)'
                            }}
                        >
                            List Your Property
                        </button>
                        <button
                            className="btn"
                            style={{
                                background: 'white',
                                color: 'var(--navy)',
                                padding: '18px 40px',
                                fontSize: '18px',
                                borderRadius: '50px'
                            }}
                        >
                            Get Free Valuation
                        </button>
                    </motion.div>
                </div>
            </section>

            {/* Stats Section */}
            <section style={{
                background: 'var(--surface)',
                padding: '80px 0',
                position: 'relative',
                marginTop: '-60px',
                zIndex: 10
            }}>
                <div className="container">
                    <div style={{
                        background: 'white',
                        borderRadius: '24px',
                        padding: '40px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                        gap: '40px',
                        textAlign: 'center'
                    }}>
                        {[
                            { label: 'Properties Sold', value: '12,000+' },
                            { label: 'Average Selling Time', value: '24 Days' },
                            { label: 'Happy Customers', value: '98%' },
                            { label: 'Cities Covered', value: '15+' }
                        ].map((stat, i) => (
                            <div key={i}>
                                <div style={{ fontSize: '42px', fontWeight: 800, color: 'var(--navy)', marginBottom: '8px' }}>{stat.value}</div>
                                <div style={{ color: 'var(--muted)', fontSize: '16px', fontWeight: 500 }}>{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* How It Works */}
            <section style={{ padding: '100px 0', background: 'var(--bg)' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '60px' }}>
                        <h2 style={{ fontSize: '36px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>How It Works</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '18px' }}>Sell your home in 3 simple steps</p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '40px'
                    }}>
                        {[
                            {
                                step: '01',
                                title: 'Get a Valuation',
                                desc: 'Receive a free, accurate valuation of your property from our local experts.',
                                icon: '📊'
                            },
                            {
                                step: '02',
                                title: 'List Your Property',
                                desc: 'We showcase your home with professional photography and virtual tours.',
                                icon: '📸'
                            },
                            {
                                step: '03',
                                title: 'Close the Deal',
                                desc: 'We handle negotiations and paperwork to ensure a smooth closing.',
                                icon: '🤝'
                            }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -10 }}
                                style={{
                                    background: 'white',
                                    padding: '40px',
                                    borderRadius: '24px',
                                    position: 'relative',
                                    overflow: 'hidden'
                                }}
                            >
                                <div style={{
                                    position: 'absolute',
                                    top: '-20px',
                                    right: '-20px',
                                    fontSize: '120px',
                                    fontWeight: 900,
                                    color: 'rgba(0,0,0,0.03)',
                                    lineHeight: 1
                                }}>{item.step}</div>
                                <div style={{ fontSize: '48px', marginBottom: '24px' }}>{item.icon}</div>
                                <h3 style={{ fontSize: '24px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>{item.title}</h3>
                                <p style={{ color: 'var(--muted)', lineHeight: 1.6 }}>{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Why Choose Us */}
            <section style={{ padding: '100px 0', background: 'var(--navy)', color: 'white' }}>
                <div className="container">
                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '60px',
                        alignItems: 'center'
                    }}>
                        <div>
                            <h2 style={{ fontSize: '42px', fontWeight: 700, marginBottom: '24px' }}>Why sell with AntiGraviti?</h2>
                            <p style={{ fontSize: '18px', opacity: 0.8, marginBottom: '40px', lineHeight: 1.8 }}>
                                We combine market expertise with innovative technology to give you the best selling experience possible. From listing to closing, we're with you every step of the way.
                            </p>
                            <ul style={{ listStyle: 'none', padding: 0, display: 'grid', gap: '20px' }}>
                                {[
                                    'Dedicated property manager',
                                    'Professional photoshoot included',
                                    'Premium marketing on all platforms',
                                    'Verified buyers only'
                                ].map((point, i) => (
                                    <li key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '18px' }}>
                                        <span style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            width: '24px',
                                            height: '24px',
                                            background: 'var(--teal-600)',
                                            borderRadius: '50%',
                                            fontSize: '14px'
                                        }}>✓</span>
                                        {point}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div style={{ position: 'relative' }}>
                            <div style={{
                                position: 'absolute',
                                top: '-20px',
                                left: '-20px',
                                width: '100%',
                                height: '100%',
                                border: '2px solid var(--teal-600)',
                                borderRadius: '24px',
                                zIndex: 0
                            }} />
                            <img
                                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop"
                                alt="Modern Interior"
                                style={{
                                    width: '100%',
                                    borderRadius: '24px',
                                    position: 'relative',
                                    zIndex: 1,
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
                                }}
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section style={{ padding: '100px 0', textAlign: 'center' }}>
                <div className="container">
                    <div style={{
                        background: 'linear-gradient(135deg, var(--teal-600), var(--teal-300))',
                        borderRadius: '32px',
                        padding: '80px 40px',
                        color: 'white',
                        position: 'relative',
                        overflow: 'hidden'
                    }}>
                        <div style={{ position: 'relative', zIndex: 1 }}>
                            <h2 style={{ fontSize: '42px', fontWeight: 800, marginBottom: '24px' }}>Ready to sell your property?</h2>
                            <p style={{ fontSize: '20px', maxWidth: '600px', margin: '0 auto 40px', opacity: 0.9 }}>
                                Join thousands of satisfied sellers who trusted us with their property.
                            </p>
                            <button
                                onClick={() => setIsListModalOpen(true)}
                                style={{
                                    background: 'white',
                                    color: 'var(--teal-600)',
                                    border: 'none',
                                    padding: '20px 48px',
                                    fontSize: '18px',
                                    fontWeight: 700,
                                    borderRadius: '50px',
                                    cursor: 'pointer',
                                    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
                                    transition: 'transform 0.2s'
                                }}
                                onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                                onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                            >
                                Start Selling Today
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            <ListPropertyModal
                isOpen={isListModalOpen}
                onClose={() => setIsListModalOpen(false)}
            />
        </motion.div>
    );
}
