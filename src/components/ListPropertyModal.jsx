import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

export default function ListPropertyModal({ isOpen, onClose }) {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        propertyType: 'Apartment',
        location: '',
        bedrooms: '',
        bathrooms: '',
        size: '',
        price: '',
        name: '',
        email: '',
        phone: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        console.log('Property Listing Submitted:', formData);
        alert('Property listing submitted successfully! An agent will contact you shortly.');
        onClose();
        setStep(1); // Reset step
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
                        padding: '40px',
                        maxWidth: '600px',
                        width: '100%',
                        boxShadow: 'var(--shadow-lg)',
                        position: 'relative',
                        maxHeight: '90vh',
                        overflowY: 'auto'
                    }}
                >
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

                    <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                        <h2 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: 700, color: 'var(--navy)' }}>
                            List Your Property
                        </h2>
                        <p style={{ margin: 0, color: 'var(--muted)', fontSize: '15px' }}>
                            Step {step} of 2: {step === 1 ? 'Property Details' : 'Contact Information'}
                        </p>
                    </div>

                    <form onSubmit={handleSubmit}>
                        {step === 1 ? (
                            <>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>Property Type</label>
                                        <select
                                            value={formData.propertyType}
                                            onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        >
                                            <option>Apartment</option>
                                            <option>House</option>
                                            <option>Villa</option>
                                            <option>Plot</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>Location</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Gachibowli, Hyderabad"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                                            required
                                        />
                                    </div>
                                </div>

                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>Bedrooms</label>
                                        <select
                                            value={formData.bedrooms}
                                            onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        >
                                            <option value="">Select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3</option>
                                            <option>4+</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>Bathrooms</label>
                                        <select
                                            value={formData.bathrooms}
                                            onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        >
                                            <option value="">Select</option>
                                            <option>1</option>
                                            <option>2</option>
                                            <option>3+</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>Size (sqft)</label>
                                        <input
                                            type="number"
                                            placeholder="e.g. 1200"
                                            value={formData.size}
                                            onChange={(e) => setFormData({ ...formData, size: e.target.value })}
                                            style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        />
                                    </div>
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>Expected Price (₹)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 5000000"
                                        value={formData.price}
                                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        required
                                    />
                                </div>

                                <button
                                    type="button"
                                    onClick={() => setStep(2)}
                                    className="btn btn-primary"
                                    style={{ width: '100%', padding: '14px', fontSize: '16px' }}
                                >
                                    Next Step
                                </button>
                            </>
                        ) : (
                            <>
                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>Full Name</label>
                                    <input
                                        type="text"
                                        placeholder="Enter your name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        required
                                    />
                                </div>

                                <div style={{ marginBottom: '20px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>Email Address</label>
                                    <input
                                        type="email"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        required
                                    />
                                </div>

                                <div style={{ marginBottom: '24px' }}>
                                    <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, fontSize: '14px', color: 'var(--navy)' }}>Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="Enter your phone number"
                                        value={formData.phone}
                                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                        style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        required
                                    />
                                </div>

                                <div style={{ display: 'flex', gap: '16px' }}>
                                    <button
                                        type="button"
                                        onClick={() => setStep(1)}
                                        className="btn btn-outline"
                                        style={{ flex: 1, padding: '14px', fontSize: '16px' }}
                                    >
                                        Back
                                    </button>
                                    <button
                                        type="submit"
                                        className="btn btn-primary"
                                        style={{ flex: 1, padding: '14px', fontSize: '16px' }}
                                    >
                                        Submit Listing
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
