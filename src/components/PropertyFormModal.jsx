import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function PropertyFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
    const [formData, setFormData] = useState({
        title: '',
        price: '',
        location: '',
        type: 'Apartment',
        beds: 2,
        baths: 2,
        sqft: 1000,
        image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
        status: 'For Sale'
    });
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadMethod, setUploadMethod] = useState('url'); // 'url' or 'upload'

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
            setImagePreview(initialData.image);
        } else {
            setFormData({
                title: '',
                price: '',
                location: '',
                type: 'Apartment',
                beds: 2,
                baths: 2,
                sqft: 1000,
                image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1000&auto=format&fit=crop',
                status: 'For Sale'
            });
            setImagePreview(null);
        }
    }, [initialData, isOpen]);

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            // Check file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }

            // Check file type
            if (!file.type.startsWith('image/')) {
                alert('Please upload an image file');
                return;
            }

            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result;
                setFormData({ ...formData, image: base64String });
                setImagePreview(base64String);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            backdropFilter: 'blur(4px)'
        }}
            onClick={onClose}>
            <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '24px',
                    width: '90%',
                    maxWidth: '700px',
                    maxHeight: '90vh',
                    overflowY: 'auto',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
                }}
            >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: 800, color: '#1e293b', margin: 0 }}>
                        {initialData ? '✏️ Edit Property' : '➕ Add New Property'}
                    </h2>
                    <button
                        onClick={onClose}
                        aria-label="Close modal"
                        style={{
                            width: '40px',
                            height: '40px',
                            borderRadius: '12px',
                            border: 'none',
                            background: '#f1f5f9',
                            color: '#64748b',
                            cursor: 'pointer',
                            fontSize: '20px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.3s ease'
                        }}
                        onMouseOver={(e) => {
                            e.target.style.background = '#e2e8f0';
                            e.target.style.color = '#1e293b';
                        }}
                        onMouseOut={(e) => {
                            e.target.style.background = '#f1f5f9';
                            e.target.style.color = '#64748b';
                        }}
                    >
                        ✕
                    </button>
                </div>

                <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '24px' }}>
                    {/* Image Upload Section */}
                    <div style={{
                        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)',
                        padding: '24px',
                        borderRadius: '16px',
                        border: '2px dashed #cbd5e1'
                    }}>
                        <label style={{ display: 'block', marginBottom: '16px', fontWeight: 700, color: '#1e293b', fontSize: '15px' }}>
                            📸 Property Image
                        </label>

                        {/* Upload Method Toggle */}
                        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
                            <button
                                type="button"
                                onClick={() => setUploadMethod('upload')}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: uploadMethod === 'upload' ? '2px solid #6366f1' : '2px solid #e2e8f0',
                                    background: uploadMethod === 'upload' ? '#ede9fe' : 'white',
                                    color: uploadMethod === 'upload' ? '#6366f1' : '#64748b',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontSize: '14px'
                                }}
                            >
                                📤 Upload from Device
                            </button>
                            <button
                                type="button"
                                onClick={() => setUploadMethod('url')}
                                style={{
                                    flex: 1,
                                    padding: '12px',
                                    borderRadius: '12px',
                                    border: uploadMethod === 'url' ? '2px solid #6366f1' : '2px solid #e2e8f0',
                                    background: uploadMethod === 'url' ? '#ede9fe' : 'white',
                                    color: uploadMethod === 'url' ? '#6366f1' : '#64748b',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease',
                                    fontSize: '14px'
                                }}
                            >
                                🔗 Use Image URL
                            </button>
                        </div>

                        {uploadMethod === 'upload' ? (
                            <div>
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                    id="imageUpload"
                                    style={{ display: 'none' }}
                                />
                                <label
                                    htmlFor="imageUpload"
                                    style={{
                                        display: 'block',
                                        padding: '32px',
                                        borderRadius: '12px',
                                        border: '2px dashed #cbd5e1',
                                        background: 'white',
                                        textAlign: 'center',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onMouseOver={(e) => {
                                        e.currentTarget.style.borderColor = '#6366f1';
                                        e.currentTarget.style.background = '#f8fafc';
                                    }}
                                    onMouseOut={(e) => {
                                        e.currentTarget.style.borderColor = '#cbd5e1';
                                        e.currentTarget.style.background = 'white';
                                    }}
                                >
                                    <div style={{ fontSize: '48px', marginBottom: '12px' }}>📁</div>
                                    <div style={{ fontWeight: 600, color: '#1e293b', marginBottom: '4px' }}>
                                        Click to upload or drag and drop
                                    </div>
                                    <div style={{ fontSize: '13px', color: '#64748b' }}>
                                        PNG, JPG, WEBP up to 5MB
                                    </div>
                                </label>
                            </div>
                        ) : (
                            <input
                                type="text"
                                value={formData.image}
                                onChange={(e) => {
                                    setFormData({ ...formData, image: e.target.value });
                                    setImagePreview(e.target.value);
                                }}
                                placeholder="https://example.com/image.jpg"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '15px',
                                    outline: 'none',
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
                        )}

                        {/* Image Preview */}
                        {(imagePreview || formData.image) && (
                            <div style={{ marginTop: '20px' }}>
                                <div style={{ fontSize: '13px', fontWeight: 600, color: '#64748b', marginBottom: '8px' }}>
                                    Preview:
                                </div>
                                <img
                                    src={imagePreview || formData.image}
                                    alt="Preview"
                                    style={{
                                        width: '100%',
                                        height: '200px',
                                        objectFit: 'cover',
                                        borderRadius: '12px',
                                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                                    }}
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Property Details */}
                    <div>
                        <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#1e293b', fontSize: '15px' }}>
                            🏠 Property Title
                        </label>
                        <input
                            type="text"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            required
                            placeholder="e.g. Luxury 3BHK Apartment in Banjara Hills"
                            style={{
                                width: '100%',
                                padding: '14px 16px',
                                borderRadius: '12px',
                                border: '2px solid #e2e8f0',
                                fontSize: '15px',
                                outline: 'none',
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
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#1e293b', fontSize: '15px' }}>
                                💰 Price
                            </label>
                            <input
                                type="text"
                                value={formData.price}
                                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                                required
                                placeholder="e.g. ₹1.5 Cr"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '15px',
                                    outline: 'none',
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
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#1e293b', fontSize: '15px' }}>
                                📍 Location
                            </label>
                            <input
                                type="text"
                                value={formData.location}
                                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                required
                                placeholder="e.g. Banjara Hills, Hyderabad"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '15px',
                                    outline: 'none',
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
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#1e293b', fontSize: '15px' }}>
                                🏢 Property Type
                            </label>
                            <select
                                value={formData.type}
                                onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    background: 'white',
                                    color: '#1e293b'
                                }}
                            >
                                <option>Apartment</option>
                                <option>Villa</option>
                                <option>House</option>
                                <option>Plot</option>
                                <option>Commercial</option>
                            </select>
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#1e293b', fontSize: '15px' }}>
                                🏷️ Status
                            </label>
                            <select
                                value={formData.status}
                                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    background: 'white',
                                    color: '#1e293b'
                                }}
                            >
                                <option>For Sale</option>
                                <option>For Rent</option>
                            </select>
                        </div>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#1e293b', fontSize: '15px' }}>
                                🛏️ Bedrooms
                            </label>
                            <input
                                type="number"
                                value={formData.beds}
                                onChange={(e) => setFormData({ ...formData, beds: parseInt(e.target.value) })}
                                min="1"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '15px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#1e293b', fontSize: '15px' }}>
                                🛁 Bathrooms
                            </label>
                            <input
                                type="number"
                                value={formData.baths}
                                onChange={(e) => setFormData({ ...formData, baths: parseInt(e.target.value) })}
                                min="1"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '15px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', marginBottom: '10px', fontWeight: 700, color: '#1e293b', fontSize: '15px' }}>
                                📐 Sqft
                            </label>
                            <input
                                type="number"
                                value={formData.sqft}
                                onChange={(e) => setFormData({ ...formData, sqft: parseInt(e.target.value) })}
                                min="100"
                                style={{
                                    width: '100%',
                                    padding: '14px 16px',
                                    borderRadius: '12px',
                                    border: '2px solid #e2e8f0',
                                    fontSize: '15px',
                                    outline: 'none'
                                }}
                            />
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', marginTop: '8px' }}>
                        <button
                            type="button"
                            onClick={onClose}
                            style={{
                                flex: 1,
                                padding: '16px',
                                borderRadius: '12px',
                                border: '2px solid #e2e8f0',
                                background: 'white',
                                color: '#64748b',
                                fontWeight: 700,
                                fontSize: '15px',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = '#f8fafc';
                                e.target.style.borderColor = '#cbd5e1';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = 'white';
                                e.target.style.borderColor = '#e2e8f0';
                            }}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            style={{
                                flex: 1,
                                padding: '16px',
                                borderRadius: '12px',
                                border: 'none',
                                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                                color: 'white',
                                fontWeight: 700,
                                fontSize: '15px',
                                cursor: 'pointer',
                                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 28px rgba(99, 102, 241, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 20px rgba(99, 102, 241, 0.3)';
                            }}
                        >
                            {initialData ? '✓ Update Property' : '+ Add Property'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
}
