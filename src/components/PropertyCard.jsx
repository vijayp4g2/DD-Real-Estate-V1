import { motion } from 'framer-motion';

export default function PropertyCard({ property, index = 0, onQuickView, onToggleFavorite, isFavorite }) {
    return (
        <motion.div
            className="property-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
        >
            <div className="property-image">
                <img src={property.image} alt={property.name} />
                {property.badge && <div className="property-badge">{property.badge}</div>}
                <button
                    className={`property-favorite ${isFavorite ? 'active' : ''}`}
                    aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    style={{
                        background: isFavorite ? 'var(--coral)' : 'white',
                        color: isFavorite ? 'white' : 'var(--navy)',
                        borderColor: isFavorite ? 'var(--coral)' : 'transparent'
                    }}
                    onClick={(e) => {
                        e.stopPropagation();
                        onToggleFavorite && onToggleFavorite(property);
                    }}
                >
                    {isFavorite ? '♥' : '♡'}
                </button>
            </div>
            <div className="property-body">
                <div className="property-price">
                    {property.price}
                    <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--muted)' }}>
                        {property.period}
                    </span>
                </div>
                <div className="property-name">{property.name || property.title}</div>
                <div className="property-meta">
                    <span>🛏️ {property.beds} Beds</span>
                    <span>🚿 {property.baths} Baths</span>
                    <span>📐 {property.sqft} sqft</span>
                </div>
                <div className="property-location">{property.location}</div>
                <button
                    className="btn btn-teal"
                    style={{ width: '100%', marginTop: '16px', fontSize: '14px' }}
                    onClick={() => onQuickView && onQuickView(property)}
                >
                    Quick View
                </button>
            </div>
        </motion.div>
    );
}
