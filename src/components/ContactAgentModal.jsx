import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ContactAgentModal({ isOpen, onClose, property, agent }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        message: `I am interested in ${property?.name} at ${property?.location}. Please get back to me.`
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Contact Agent Form Submitted:', formData);
        alert(`Message sent to ${agent?.name || 'the agent'}!`);
        onClose();
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
                    background: 'rgba(11, 37, 69, 0.6)',
                    backdropFilter: 'blur(4px)',
                    zIndex: 1100, // Higher than QuickViewModal
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
                        padding: '32px',
                        maxWidth: '500px',
                        width: '100%',
                        boxShadow: 'var(--shadow-lg)',
                        position: 'relative'
                    }}
                >
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            position: 'absolute',
                            top: '20px',
                            right: '20px',
                            background: 'none',
                            border: 'none',
                            fontSize: '24px',
                            cursor: 'pointer',
                            color: 'var(--muted)'
                        }}
                    >
                        ×
                    </button>

                    <h2 style={{ margin: '0 0 8px', fontSize: '24px', fontWeight: 700, color: 'var(--navy)' }}>
                        Contact Agent
                    </h2>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
                        <img
                            src={agent?.image}
                            alt={agent?.name}
                            style={{ width: '40px', height: '40px', borderRadius: '50%', objectFit: 'cover' }}
                        />
                        <div>
                            <div style={{ fontWeight: 600, color: 'var(--navy)' }}>{agent?.name}</div>
                            <div style={{ fontSize: '13px', color: 'var(--muted)' }}>{agent?.phone}</div>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '16px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>Name</label>
                            <input
                                type="text"
                                required
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--muted)', opacity: 0.8 }}
                                placeholder="Your Name"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>Email</label>
                            <input
                                type="email"
                                required
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--muted)', opacity: 0.8 }}
                                placeholder="your@email.com"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>Phone</label>
                            <input
                                type="tel"
                                required
                                pattern="[0-9+\s-]{10,}"
                                title="Please enter a valid phone number (at least 10 digits)"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--muted)', opacity: 0.8 }}
                                placeholder="Your Phone Number"
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 600, color: 'var(--navy)' }}>Message</label>
                            <textarea
                                rows={4}
                                value={formData.message}
                                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--muted)', opacity: 0.8, fontFamily: 'inherit' }}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '14px' }}>
                            Send Message
                        </button>
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
