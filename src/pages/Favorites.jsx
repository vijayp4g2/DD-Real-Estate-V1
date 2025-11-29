import { motion } from 'framer-motion';
import PropertyCard from '../components/PropertyCard';
import QuickViewModal from '../components/QuickViewModal';
import { Link } from 'react-router-dom';
import { useState } from 'react';

export default function Favorites({ favorites = [], onToggleFavorite }) {
    const [selectedProperty, setSelectedProperty] = useState(null);

    const handleQuickView = (property) => {
        setSelectedProperty(property);
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="page-container"
            style={{ paddingTop: '80px', minHeight: '100vh', paddingBottom: '80px' }}
        >
            <div className="container">
                <div style={{ marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--navy)', marginBottom: '16px' }}>
                        Your Favorites
                    </h1>
                    <p style={{ color: 'var(--muted)', fontSize: '16px' }}>
                        {favorites.length} {favorites.length === 1 ? 'property' : 'properties'} saved
                    </p>
                </div>

                {favorites.length > 0 ? (
                    <div className="property-grid">
                        {favorites.map((property, index) => (
                            <PropertyCard
                                key={property.id}
                                property={property}
                                index={index}
                                onToggleFavorite={onToggleFavorite}
                                onQuickView={handleQuickView}
                                isFavorite={true}
                            />
                        ))}
                    </div>
                ) : (
                    <div style={{ textAlign: 'center', padding: '60px 0', background: 'var(--bg-light)', borderRadius: '16px' }}>
                        <div style={{ fontSize: '48px', marginBottom: '16px' }}>💔</div>
                        <h3 style={{ fontSize: '24px', fontWeight: 600, color: 'var(--navy)', marginBottom: '12px' }}>
                            No favorites yet
                        </h3>
                        <p style={{ color: 'var(--muted)', marginBottom: '24px' }}>
                            Start exploring and save properties you love!
                        </p>
                        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
                            <Link to="/buy" className="btn btn-primary">Browse Buy</Link>
                            <Link to="/rent" className="btn btn-outline">Browse Rent</Link>
                        </div>
                    </div>
                )}
            </div>

            <QuickViewModal
                isOpen={!!selectedProperty}
                onClose={() => setSelectedProperty(null)}
                property={selectedProperty}
                onToggleFavorite={onToggleFavorite}
                isFavorite={true}
            />
        </motion.div>
    );
}
