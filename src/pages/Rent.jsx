import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import QuickViewModal from '../components/QuickViewModal';

export default function Rent({ favorites = [], onToggleFavorite, properties = [] }) {
    const navigate = useNavigate();
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const [sortBy, setSortBy] = useState('featured');
    const [searchFilters, setSearchFilters] = useState({
        location: 'Hyderabad, India',
        type: 'All Types',
        budget: 'Any Budget',
        bhk: 'Any'
    });
    const [filteredProperties, setFilteredProperties] = useState(properties);

    const parsePrice = (priceStr) => {
        if (!priceStr || typeof priceStr !== 'string') return 0;
        const cleaned = priceStr.replace(/[₹,\s]/g, '');
        if (cleaned.includes('Lakhs') || cleaned.includes('L')) {
            return parseFloat(cleaned.replace(/Lakhs|L/g, '')) * 100000;
        }
        return parseFloat(cleaned) || 0;
    };

    // Filter and sort properties
    useEffect(() => {
        let filtered = properties.filter(property => {
            if (searchFilters.location !== 'Hyderabad, India') {
                if (!property.location?.toLowerCase().includes(searchFilters.location.toLowerCase())) {
                    return false;
                }
            }
            if (searchFilters.type !== 'All Types' && property.type !== searchFilters.type) {
                return false;
            }
            if (searchFilters.bhk !== 'Any') {
                const bhkNum = parseInt(searchFilters.bhk);
                if (searchFilters.bhk.includes('+')) {
                    if (property.beds < bhkNum) return false;
                } else {
                    if (property.beds !== bhkNum) return false;
                }
            }
            if (searchFilters.budget !== 'Any Budget') {
                const price = parsePrice(property.price);
                if (searchFilters.budget === 'Under ₹10k' && price >= 10000) return false;
                if (searchFilters.budget === '₹10k - ₹25k' && (price < 10000 || price > 25000)) return false;
                if (searchFilters.budget === '₹25k - ₹50k' && (price < 25000 || price > 50000)) return false;
                if (searchFilters.budget === 'Above ₹50k' && price <= 50000) return false;
            }
            return true;
        });

        if (sortBy === 'price_low') {
            filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (sortBy === 'price_high') {
            filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        } else if (sortBy === 'newest') {
            filtered.sort((a, b) => (b.id || 0) - (a.id || 0));
        }

        setFilteredProperties(filtered);
    }, [sortBy, properties, searchFilters]);

    const handleQuickView = (property) => {
        setSelectedProperty(property);
    };

    const handleSearch = () => {
        const params = new URLSearchParams({
            type: 'rent',
            location: searchFilters.location,
            propertyType: searchFilters.type,
            budget: searchFilters.budget,
            bhk: searchFilters.bhk
        });
        navigate(`/search?${params.toString()}`);
    };

    const handleViewAll = () => {
        if (visibleCount >= filteredProperties.length) {
            setVisibleCount(6);
        } else {
            setVisibleCount(filteredProperties.length);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
        >
            {/* Modern Hero Section with Advanced Search */}
            <section style={{
                minHeight: '600px',
                background: 'linear-gradient(135deg, #0EA5A4 0%, #0B2545 100%)',
                position: 'relative',
                overflow: 'hidden',
                paddingTop: '80px',
                paddingBottom: '100px'
            }}>
                {/* Animated Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 30% 40%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                    opacity: 0.6
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    {/* Header Content */}
                    <div style={{ textAlign: 'center', marginBottom: '50px' }}>
                        <motion.div
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                            style={{
                                display: 'inline-block',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                padding: '8px 20px',
                                borderRadius: '30px',
                                color: 'white',
                                fontSize: '14px',
                                fontWeight: 600,
                                marginBottom: '24px',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}
                        >
                            ✨ Verified Rental Properties
                        </motion.div>

                        <motion.h1
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            style={{
                                fontSize: '56px',
                                fontWeight: 900,
                                color: 'white',
                                marginBottom: '16px',
                                lineHeight: 1.2,
                                textShadow: '0 4px 20px rgba(0,0,0,0.2)'
                            }}
                        >
                            Find Your Perfect Rental
                        </motion.h1>

                        <motion.p
                            initial={{ y: 30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                fontSize: '20px',
                                color: 'rgba(255, 255, 255, 0.9)',
                                maxWidth: '600px',
                                margin: '0 auto',
                                lineHeight: 1.6
                            }}
                        >
                            Explore verified rental homes with zero brokerage options in Hyderabad
                        </motion.p>
                    </div>

                    {/* Modern Search Card */}
                    <motion.div
                        initial={{ y: 40, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        style={{
                            maxWidth: '1100px',
                            margin: '0 auto',
                            background: 'white',
                            borderRadius: '24px',
                            padding: '32px',
                            boxShadow: '0 30px 60px rgba(0, 0, 0, 0.3)',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}
                    >
                        {/* Pill-Style Tabs */}
                        <div style={{
                            display: 'flex',
                            gap: '12px',
                            marginBottom: '32px',
                            padding: '6px',
                            background: '#f5f7fa',
                            borderRadius: '16px',
                            justifyContent: 'center'
                        }}>
                            <button
                                style={{
                                    flex: 1,
                                    maxWidth: '150px',
                                    padding: '14px 24px',
                                    border: 'none',
                                    background: 'white',
                                    color: 'var(--teal)',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(14, 165, 164, 0.2)'
                                }}
                            >
                                🏠 Rent
                            </button>
                            <button
                                onClick={() => navigate('/buy')}
                                style={{
                                    flex: 1,
                                    maxWidth: '150px',
                                    padding: '14px 24px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#666',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    if (e.target.style.background === 'transparent') {
                                        e.target.style.background = 'rgba(14, 165, 164, 0.1)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (e.target.style.background !== 'white') {
                                        e.target.style.background = 'transparent';
                                    }
                                }}
                            >
                                🏡 Buy
                            </button>
                            <button
                                onClick={() => navigate('/sell')}
                                style={{
                                    flex: 1,
                                    maxWidth: '150px',
                                    padding: '14px 24px',
                                    border: 'none',
                                    background: 'transparent',
                                    color: '#666',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    if (e.target.style.background === 'transparent') {
                                        e.target.style.background = 'rgba(14, 165, 164, 0.1)';
                                    }
                                }}
                                onMouseOut={(e) => {
                                    if (e.target.style.background !== 'white') {
                                        e.target.style.background = 'transparent';
                                    }
                                }}
                            >
                                💼 Sell
                            </button>
                        </div>

                        {/* Search Filters Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                            gap: '20px',
                            marginBottom: '24px'
                        }}>
                            {/* Location */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    color: '#333',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    📍 Location
                                </label>
                                <select
                                    value={searchFilters.location}
                                    onChange={(e) => setSearchFilters({ ...searchFilters, location: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '12px',
                                        border: '2px solid #e8ecef',
                                        fontSize: '15px',
                                        fontWeight: 500,
                                        color: '#333',
                                        background: '#f8f9fa',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--teal)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e8ecef';
                                        e.target.style.background = '#f8f9fa';
                                    }}
                                >
                                    <option>Hyderabad, India</option>
                                    <option>Gachibowli</option>
                                    <option>Hitech City</option>
                                    <option>Kondapur</option>
                                    <option>Madhapur</option>
                                    <option>Kukatpally</option>
                                    <option>Banjara Hills</option>
                                </select>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    color: '#333',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    🏢 Property Type
                                </label>
                                <select
                                    value={searchFilters.type}
                                    onChange={(e) => setSearchFilters({ ...searchFilters, type: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '12px',
                                        border: '2px solid #e8ecef',
                                        fontSize: '15px',
                                        fontWeight: 500,
                                        color: '#333',
                                        background: '#f8f9fa',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--teal)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e8ecef';
                                        e.target.style.background = '#f8f9fa';
                                    }}
                                >
                                    <option>All Types</option>
                                    <option>Apartment</option>
                                    <option>House</option>
                                    <option>Villa</option>
                                </select>
                            </div>

                            {/* Budget */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    color: '#333',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    💰 Monthly Budget
                                </label>
                                <select
                                    value={searchFilters.budget}
                                    onChange={(e) => setSearchFilters({ ...searchFilters, budget: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '12px',
                                        border: '2px solid #e8ecef',
                                        fontSize: '15px',
                                        fontWeight: 500,
                                        color: '#333',
                                        background: '#f8f9fa',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--teal)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e8ecef';
                                        e.target.style.background = '#f8f9fa';
                                    }}
                                >
                                    <option>Any Budget</option>
                                    <option>Under ₹10k</option>
                                    <option>₹10k - ₹25k</option>
                                    <option>₹25k - ₹50k</option>
                                    <option>Above ₹50k</option>
                                </select>
                            </div>

                            {/* BHK */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    color: '#333',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    🛏️ BHK
                                </label>
                                <select
                                    value={searchFilters.bhk}
                                    onChange={(e) => setSearchFilters({ ...searchFilters, bhk: e.target.value })}
                                    style={{
                                        width: '100%',
                                        padding: '14px 16px',
                                        borderRadius: '12px',
                                        border: '2px solid #e8ecef',
                                        fontSize: '15px',
                                        fontWeight: 500,
                                        color: '#333',
                                        background: '#f8f9fa',
                                        cursor: 'pointer',
                                        transition: 'all 0.3s ease'
                                    }}
                                    onFocus={(e) => {
                                        e.target.style.borderColor = 'var(--teal)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e8ecef';
                                        e.target.style.background = '#f8f9fa';
                                    }}
                                >
                                    <option>Any</option>
                                    <option>1 BHK</option>
                                    <option>2 BHK</option>
                                    <option>3 BHK</option>
                                    <option>4+ BHK</option>
                                </select>
                            </div>
                        </div>

                        {/* Search Button */}
                        <button
                            onClick={handleSearch}
                            style={{
                                width: '100%',
                                padding: '18px 32px',
                                background: 'linear-gradient(135deg, var(--teal), var(--primary))',
                                color: 'white',
                                border: 'none',
                                borderRadius: '14px',
                                fontSize: '18px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                boxShadow: '0 8px 24px rgba(14, 165, 164, 0.3)',
                                transition: 'all 0.3s ease',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '12px'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.transform = 'translateY(-2px)';
                                e.target.style.boxShadow = '0 12px 32px rgba(14, 165, 164, 0.4)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.transform = 'translateY(0)';
                                e.target.style.boxShadow = '0 8px 24px rgba(14, 165, 164, 0.3)';
                            }}
                        >
                            <span style={{ fontSize: '20px' }}>🔍</span>
                            Search Rental Properties
                        </button>

                        {/* Quick Stats */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: 'repeat(3, 1fr)',
                            gap: '16px',
                            marginTop: '24px',
                            padding: '20px 0 0',
                            borderTop: '1px solid #e8ecef'
                        }}>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--teal)', marginBottom: '4px' }}>
                                    {properties.length}+
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>Rentals Available</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
                                    Zero
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>Brokerage Options</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--teal)', marginBottom: '4px' }}>
                                    100%
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>Verified Listings</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Featured Rentals */}
            <section className="container" style={{ padding: '60px 20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', margin: '0 0 8px' }}>Featured Rentals</h2>
                        <p style={{ color: 'var(--muted)', fontSize: '16px', margin: 0 }}>
                            {filteredProperties.length > 0
                                ? `Showing ${Math.min(visibleCount, filteredProperties.length)} of ${filteredProperties.length} properties`
                                : 'No properties found matching your criteria'}
                        </p>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                        <span style={{ color: 'var(--muted)', fontSize: '14px' }}>Sort by:</span>
                        <select
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid #ddd', background: 'white', cursor: 'pointer' }}
                        >
                            <option value="featured">Featured</option>
                            <option value="price_low">Rent: Low to High</option>
                            <option value="price_high">Rent: High to Low</option>
                            <option value="newest">Newest First</option>
                        </select>
                    </div>
                </div>

                <div className="property-grid">
                    {filteredProperties.slice(0, visibleCount).map((property, index) => (
                        <PropertyCard
                            key={property.id}
                            property={property}
                            index={index}
                            onQuickView={handleQuickView}
                            onToggleFavorite={onToggleFavorite}
                            isFavorite={favorites.some(fav => fav.id === property.id)}
                        />
                    ))}
                </div>

                {filteredProperties.length > 0 && (
                    <div style={{ textAlign: 'center', marginTop: '48px' }}>
                        <button
                            className="btn btn-outline"
                            style={{ padding: '14px 48px', borderRadius: '30px', fontWeight: 600 }}
                            onClick={handleViewAll}
                        >
                            {visibleCount >= filteredProperties.length ? 'Show Less' : 'Load More Rentals'}
                        </button>
                    </div>
                )}
            </section>

            <QuickViewModal
                isOpen={!!selectedProperty}
                onClose={() => setSelectedProperty(null)}
                property={selectedProperty}
                onToggleFavorite={onToggleFavorite}
                isFavorite={selectedProperty && favorites.some(fav => fav.id === selectedProperty.id)}
            />
        </motion.div>
    );
}
