import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import ContactAgentModal from './ContactAgentModal';
import ScheduleTourModal from './ScheduleTourModal';

export default function QuickViewModal({ isOpen, onClose, property, onToggleFavorite, isFavorite }) {
    const [activeImageIndex, setActiveImageIndex] = useState(0);
    const [isContactModalOpen, setIsContactModalOpen] = useState(false);
    const [isTourModalOpen, setIsTourModalOpen] = useState(false);

    if (!isOpen || !property) return null;

    const images = property.images || [property.image];

    return (
        <>
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
                            overflow: 'hidden',
                            maxWidth: '1000px',
                            width: '100%',
                            boxShadow: 'var(--shadow-lg)',
                            position: 'relative',
                            display: 'flex',
                            flexDirection: 'column',
                            maxHeight: '90vh'
                        }}
                    >
                        <button
                            onClick={onClose}
                            style={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                background: 'rgba(255, 255, 255, 0.9)',
                                border: 'none',
                                borderRadius: '50%',
                                width: '40px',
                                height: '40px',
                                fontSize: '24px',
                                cursor: 'pointer',
                                color: 'var(--navy)',
                                zIndex: 10,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: 'var(--shadow-sm)'
                            }}
                            aria-label="Close"
                        >
                            ×
                        </button>

                        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}>
                            {/* Image Gallery */}
                            <div style={{ position: 'relative', height: '400px', flexShrink: 0 }}>
                                <img
                                    src={images[activeImageIndex]}
                                    alt={property.name}
                                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />

                                {/* Favorite Button */}
                                {onToggleFavorite && (
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            onToggleFavorite(property);
                                        }}
                                        style={{
                                            position: 'absolute',
                                            top: '20px',
                                            left: '20px',
                                            background: isFavorite ? 'var(--coral)' : 'rgba(255, 255, 255, 0.9)',
                                            color: isFavorite ? 'white' : 'var(--navy)',
                                            border: 'none',
                                            borderRadius: '50%',
                                            width: '40px',
                                            height: '40px',
                                            fontSize: '20px',
                                            cursor: 'pointer',
                                            zIndex: 10,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            boxShadow: 'var(--shadow-sm)',
                                            transition: 'all 0.2s ease'
                                        }}
                                        aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                                    >
                                        {isFavorite ? '♥' : '♡'}
                                    </button>
                                )}

                                {/* Image Navigation */}
                                {images.length > 1 && (
                                    <>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveImageIndex(prev => prev === 0 ? images.length - 1 : prev - 1);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                left: '20px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'rgba(255,255,255,0.8)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '40px',
                                                height: '40px',
                                                cursor: 'pointer',
                                                fontSize: '20px'
                                            }}
                                        >
                                            ←
                                        </button>
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setActiveImageIndex(prev => prev === images.length - 1 ? 0 : prev + 1);
                                            }}
                                            style={{
                                                position: 'absolute',
                                                right: '20px',
                                                top: '50%',
                                                transform: 'translateY(-50%)',
                                                background: 'rgba(255,255,255,0.8)',
                                                border: 'none',
                                                borderRadius: '50%',
                                                width: '40px',
                                                height: '40px',
                                                cursor: 'pointer',
                                                fontSize: '20px'
                                            }}
                                        >
                                            →
                                        </button>
                                        {/* Dots */}
                                        <div style={{
                                            position: 'absolute',
                                            bottom: '20px',
                                            left: '50%',
                                            transform: 'translateX(-50%)',
                                            display: 'flex',
                                            gap: '8px'
                                        }}>
                                            {images.map((_, idx) => (
                                                <div
                                                    key={idx}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setActiveImageIndex(idx);
                                                    }}
                                                    style={{
                                                        width: '8px',
                                                        height: '8px',
                                                        borderRadius: '50%',
                                                        background: idx === activeImageIndex ? 'white' : 'rgba(255,255,255,0.5)',
                                                        cursor: 'pointer'
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}

                                {property.badge && (
                                    <div style={{
                                        position: 'absolute',
                                        top: '20px',
                                        left: '20px',
                                        background: 'var(--teal-600)',
                                        color: 'white',
                                        padding: '6px 12px',
                                        borderRadius: '8px',
                                        fontSize: '13px',
                                        fontWeight: 700
                                    }}>
                                        {property.badge}
                                    </div>
                                )}
                            </div>

                            {/* Content Section */}
                            <div className="quick-view-content">
                                <div className="quick-view-grid">
                                    <div className="quick-view-main">
                                        <div className="quick-view-header">
                                            <div>
                                                <h2 className="quick-view-title">
                                                    {property.name}
                                                </h2>
                                                <p className="quick-view-location">
                                                    📍 {property.location}
                                                </p>
                                            </div>
                                            <div className="quick-view-price-section">
                                                <div className="quick-view-price">
                                                    {property.price}
                                                </div>
                                                <div className="quick-view-period">{property.period}</div>
                                            </div>
                                        </div>

                                        <div className="quick-view-stats">
                                            <div className="stat-item">
                                                <div className="stat-icon">🛏️</div>
                                                <div className="stat-label">{property.beds} Beds</div>
                                            </div>
                                            <div className="stat-item bordered">
                                                <div className="stat-icon">🚿</div>
                                                <div className="stat-label">{property.baths} Baths</div>
                                            </div>
                                            <div className="stat-item">
                                                <div className="stat-icon">📐</div>
                                                <div className="stat-label">{property.sqft} sqft</div>
                                            </div>
                                        </div>

                                        <div className="quick-view-description">
                                            <h3>Description</h3>
                                            <p>
                                                Experience luxury living in this stunning {property.type?.toLowerCase() || 'property'} located in the heart of {property.location?.split(',')[0] || property.location}.
                                                Featuring modern amenities, spacious interiors, and breathtaking views, this home is perfect for those seeking comfort and style.
                                                Close to major IT hubs, international schools, and shopping malls.
                                            </p>
                                        </div>

                                        {property.amenities && (
                                            <div className="quick-view-amenities">
                                                <h3>Amenities</h3>
                                                <div className="amenities-list">
                                                    {property.amenities.map((amenity, idx) => (
                                                        <span key={idx} className="amenity-tag">
                                                            {amenity}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Sidebar: Agent & Actions */}
                                    <div className="quick-view-sidebar">
                                        <div className="agent-card">
                                            {property.agent && (
                                                <div className="agent-info">
                                                    <img
                                                        src={property.agent.image}
                                                        alt={property.agent.name}
                                                        className="agent-image"
                                                    />
                                                    <div>
                                                        <div className="agent-name">{property.agent.name}</div>
                                                        <div className="agent-role">Property Agent</div>
                                                    </div>
                                                </div>
                                            )}

                                            <div className="action-buttons">
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => setIsContactModalOpen(true)}
                                                >
                                                    Contact Agent
                                                </button>
                                                <button
                                                    className="btn btn-outline"
                                                    onClick={() => setIsTourModalOpen(true)}
                                                >
                                                    Schedule Tour
                                                </button>
                                                {property.agent && (
                                                    <div className="agent-phone">
                                                        or call <a href={`tel:${property.agent.phone}`}>{property.agent.phone}</a>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </AnimatePresence>

            <ContactAgentModal
                isOpen={isContactModalOpen}
                onClose={() => setIsContactModalOpen(false)}
                property={property}
                agent={property.agent}
            />

            <ScheduleTourModal
                isOpen={isTourModalOpen}
                onClose={() => setIsTourModalOpen(false)}
                property={property}
            />
        </>
    );
}
