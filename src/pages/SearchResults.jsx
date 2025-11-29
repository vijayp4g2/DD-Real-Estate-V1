import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import QuickViewModal from '../components/QuickViewModal';

export default function SearchResults({ favorites = [], onToggleFavorite, properties = [] }) {
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [selectedProperty, setSelectedProperty] = useState(null);
    const [visibleCount, setVisibleCount] = useState(12);
    const [sortBy, setSortBy] = useState('featured');
    const [viewMode, setViewMode] = useState('grid');
    const [showFilters, setShowFilters] = useState(true);

    // Get search parameters from URL
    const searchType = searchParams.get('type') || 'buy';
    const [searchFilters, setSearchFilters] = useState({
        location: searchParams.get('location') || 'Hyderabad, India',
        propertyType: searchParams.get('propertyType') || 'All Types',
        budget: searchParams.get('budget') || (searchType === 'buy' ? 'Any Price' : 'Any Budget'),
        bhk: searchParams.get('bhk') || 'Any',
        availability: searchParams.get('availability') || 'Immediate'
    });

    const [filteredProperties, setFilteredProperties] = useState([]);
    const [isSearching, setIsSearching] = useState(false);

    const parsePrice = (priceStr) => {
        if (!priceStr || typeof priceStr !== 'string') return 0;
        const cleaned = priceStr.replace(/[₹,\s]/g, '');
        if (cleaned.includes('Cr')) {
            return parseFloat(cleaned.replace('Cr', '')) * 10000000;
        } else if (cleaned.includes('Lakhs') || cleaned.includes('L')) {
            return parseFloat(cleaned.replace(/Lakhs|L/g, '')) * 100000;
        }
        return parseFloat(cleaned) || 0;
    };

    const performSearch = () => {
        setIsSearching(true);
        const sourceData = properties.filter(p => p.category === searchType);

        let filtered = sourceData.filter(property => {
            if (searchFilters.location !== 'Hyderabad, India') {
                if (!property.location?.toLowerCase().includes(searchFilters.location.toLowerCase())) {
                    return false;
                }
            }

            if (searchFilters.propertyType !== 'All Types') {
                if (searchType === 'buy') {
                    if (property.type !== searchFilters.propertyType) return false;
                } else {
                    if (searchFilters.propertyType === 'Apartment' && property.type !== 'Apartment') return false;
                    if (searchFilters.propertyType === 'Full House' && property.type !== 'House' && property.type !== 'Villa') return false;
                }
            }

            if (searchType === 'buy' && searchFilters.bhk !== 'Any') {
                const bhkNum = parseInt(searchFilters.bhk);
                if (searchFilters.bhk.includes('+')) {
                    if (property.beds < bhkNum) return false;
                } else {
                    if (property.beds !== bhkNum) return false;
                }
            }

            if (searchFilters.budget !== 'Any Price' && searchFilters.budget !== 'Any Budget') {
                const price = parsePrice(property.price);

                if (searchType === 'buy') {
                    if (searchFilters.budget === 'Under ₹50 L' && price >= 5000000) return false;
                    if (searchFilters.budget === '₹50 L - ₹1 Cr' && (price < 5000000 || price > 10000000)) return false;
                    if (searchFilters.budget === '₹1 Cr - ₹3 Cr' && (price < 10000000 || price > 30000000)) return false;
                    if (searchFilters.budget === 'Above ₹3 Cr' && price <= 30000000) return false;
                } else {
                    if (searchFilters.budget === 'Under ₹10k' && price >= 10000) return false;
                    if (searchFilters.budget === '₹10k - ₹25k' && (price < 10000 || price > 25000)) return false;
                    if (searchFilters.budget === '₹25k - ₹50k' && (price < 25000 || price > 50000)) return false;
                    if (searchFilters.budget === 'Above ₹50k' && price <= 50000) return false;
                }
            }

            return true;
        });

        if (sortBy === 'price_low') {
            filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (sortBy === 'price_high') {
            filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        }

        setTimeout(() => {
            setFilteredProperties(filtered);
            setVisibleCount(12);
            setIsSearching(false);
        }, 300);
    };

    useEffect(() => {
        performSearch();
    }, [searchType, sortBy]);

    const handleQuickView = (property) => {
        setSelectedProperty(property);
    };

    const handleApplyFilters = () => {
        const params = new URLSearchParams({
            type: searchType,
            location: searchFilters.location,
            propertyType: searchFilters.propertyType,
            budget: searchFilters.budget,
            bhk: searchFilters.bhk,
            availability: searchFilters.availability
        });
        setSearchParams(params);
        performSearch();
    };

    const handleResetFilters = () => {
        const resetFilters = {
            location: 'Hyderabad, India',
            propertyType: 'All Types',
            budget: searchType === 'buy' ? 'Any Price' : 'Any Budget',
            bhk: 'Any',
            availability: 'Immediate'
        };
        setSearchFilters(resetFilters);
        const params = new URLSearchParams({
            type: searchType,
            ...resetFilters
        });
        setSearchParams(params);
        performSearch();
    };

    const handleLoadMore = () => {
        setVisibleCount(prev => Math.min(prev + 12, filteredProperties.length));
    };

    const activeFiltersCount = Object.values(searchFilters).filter(v =>
        v !== 'Hyderabad, India' &&
        v !== 'All Types' &&
        v !== 'Any Price' &&
        v !== 'Any Budget' &&
        v !== 'Any' &&
        v !== 'Immediate'
    ).length;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
        >
            {/* Modern Header Section */}
            <section style={{
                background: searchType === 'buy'
                    ? 'linear-gradient(135deg, #0B2545 0%, #0EA5A4 100%)'
                    : 'linear-gradient(135deg, #0EA5A4 0%, #0B2545 100%)',
                padding: '40px 0',
                color: 'white',
                position: 'relative',
                overflow: 'hidden'
            }}>
                {/* Background Pattern */}
                <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
                    opacity: 0.6
                }} />

                <div className="container" style={{ position: 'relative', zIndex: 2 }}>
                    {/* Back Button */}
                    <motion.button
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        onClick={() => navigate(-1)}
                        style={{
                            background: 'rgba(255,255,255,0.15)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255,255,255,0.2)',
                            color: 'white',
                            padding: '12px 24px',
                            borderRadius: '12px',
                            cursor: 'pointer',
                            marginBottom: '24px',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '15px',
                            fontWeight: 600,
                            transition: 'all 0.3s ease'
                        }}
                        whileHover={{ scale: 1.05, background: 'rgba(255,255,255,0.25)' }}
                        whileTap={{ scale: 0.95 }}
                    >
                        ← Back to {searchType === 'buy' ? 'Buy' : 'Rent'}
                    </motion.button>

                    {/* Header Content */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.1 }}
                        >
                            <div style={{
                                display: 'inline-block',
                                background: 'rgba(255, 255, 255, 0.15)',
                                backdropFilter: 'blur(10px)',
                                padding: '6px 16px',
                                borderRadius: '20px',
                                fontSize: '13px',
                                fontWeight: 600,
                                marginBottom: '12px',
                                border: '1px solid rgba(255, 255, 255, 0.2)'
                            }}>
                                {searchType === 'buy' ? '🏡 Properties for Sale' : '🏠 Rental Properties'}
                            </div>
                            <h1 style={{ fontSize: '42px', fontWeight: 900, marginBottom: '8px', lineHeight: 1.2, textShadow: '0 4px 20px rgba(0,0,0,0.2)' }}>
                                Search Results
                            </h1>
                            <p style={{ opacity: 0.95, fontSize: '18px', margin: 0, fontWeight: 500 }}>
                                <span style={{ fontWeight: 700 }}>{filteredProperties.length}</span> {filteredProperties.length === 1 ? 'property' : 'properties'} found
                                {searchFilters.location !== 'Hyderabad, India' && ` in ${searchFilters.location}`}
                            </p>
                        </motion.div>

                        <motion.button
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ delay: 0.2 }}
                            onClick={() => setShowFilters(!showFilters)}
                            style={{
                                background: 'white',
                                color: searchType === 'buy' ? 'var(--primary)' : 'var(--teal)',
                                border: 'none',
                                padding: '14px 28px',
                                borderRadius: '12px',
                                fontSize: '15px',
                                fontWeight: 700,
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                                transition: 'all 0.3s ease'
                            }}
                            whileHover={{ scale: 1.05, boxShadow: '0 12px 32px rgba(0,0,0,0.2)' }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {showFilters ? '✕ Hide Filters' : `⚙️ Show Filters ${activeFiltersCount > 0 ? `(${activeFiltersCount})` : ''}`}
                        </motion.button>
                    </div>
                </div>
            </section>

            {/* Advanced Filters Section */}
            {showFilters && (
                <motion.section
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        background: 'white',
                        borderBottom: '2px solid #e8ecef',
                        boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
                    }}
                >
                    <div className="container" style={{ padding: '40px 20px' }}>
                        {/* Filters Grid */}
                        <div style={{
                            display: 'grid',
                            gridTemplateColumns: searchType === 'buy' ? 'repeat(auto-fit, minmax(220px, 1fr))' : 'repeat(auto-fit, minmax(240px, 1fr))',
                            gap: '24px',
                            marginBottom: '28px'
                        }}>
                            {/* Location */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontWeight: 700,
                                    fontSize: '13px',
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
                                        e.target.style.borderColor = searchType === 'buy' ? 'var(--primary)' : 'var(--teal)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e8ecef';
                                        e.target.style.background = '#f8f9fa';
                                    }}
                                >
                                    <option>Hyderabad, India</option>
                                    <option>Banjara Hills</option>
                                    <option>Jubilee Hills</option>
                                    <option>Gachibowli</option>
                                    <option>Hitech City</option>
                                    <option>Kondapur</option>
                                    <option>Madhapur</option>
                                    <option>Manikonda</option>
                                    <option>Kukatpally</option>
                                </select>
                            </div>

                            {/* Property Type */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                    color: '#333',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    🏢 Property Type
                                </label>
                                <select
                                    value={searchFilters.propertyType}
                                    onChange={(e) => setSearchFilters({ ...searchFilters, propertyType: e.target.value })}
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
                                        e.target.style.borderColor = searchType === 'buy' ? 'var(--primary)' : 'var(--teal)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e8ecef';
                                        e.target.style.background = '#f8f9fa';
                                    }}
                                >
                                    {searchType === 'buy' ? (
                                        <>
                                            <option>All Types</option>
                                            <option>Apartment</option>
                                            <option>Villa</option>
                                            <option>House</option>
                                            <option>Plot</option>
                                        </>
                                    ) : (
                                        <>
                                            <option>All Types</option>
                                            <option>Apartment</option>
                                            <option>Full House</option>
                                            <option>PG / Hostel</option>
                                            <option>Shared Room</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            {/* Budget */}
                            <div>
                                <label style={{
                                    display: 'block',
                                    marginBottom: '10px',
                                    fontWeight: 700,
                                    fontSize: '13px',
                                    color: '#333',
                                    textTransform: 'uppercase',
                                    letterSpacing: '0.5px'
                                }}>
                                    💰 {searchType === 'buy' ? 'Budget' : 'Monthly Budget'}
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
                                        e.target.style.borderColor = searchType === 'buy' ? 'var(--primary)' : 'var(--teal)';
                                        e.target.style.background = 'white';
                                    }}
                                    onBlur={(e) => {
                                        e.target.style.borderColor = '#e8ecef';
                                        e.target.style.background = '#f8f9fa';
                                    }}
                                >
                                    {searchType === 'buy' ? (
                                        <>
                                            <option>Any Price</option>
                                            <option>Under ₹50 L</option>
                                            <option>₹50 L - ₹1 Cr</option>
                                            <option>₹1 Cr - ₹3 Cr</option>
                                            <option>Above ₹3 Cr</option>
                                        </>
                                    ) : (
                                        <>
                                            <option>Any Budget</option>
                                            <option>Under ₹10k</option>
                                            <option>₹10k - ₹25k</option>
                                            <option>₹25k - ₹50k</option>
                                            <option>Above ₹50k</option>
                                        </>
                                    )}
                                </select>
                            </div>

                            {/* BHK (Buy only) */}
                            {searchType === 'buy' && (
                                <div>
                                    <label style={{
                                        display: 'block',
                                        marginBottom: '10px',
                                        fontWeight: 700,
                                        fontSize: '13px',
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
                                            e.target.style.borderColor = 'var(--primary)';
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
                            )}
                        </div>

                        {/* Action Buttons */}
                        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', alignItems: 'center' }}>
                            <button
                                onClick={handleApplyFilters}
                                style={{
                                    padding: '14px 32px',
                                    fontSize: '15px',
                                    fontWeight: 700,
                                    borderRadius: '12px',
                                    border: 'none',
                                    background: searchType === 'buy'
                                        ? 'linear-gradient(135deg, var(--primary), var(--teal))'
                                        : 'linear-gradient(135deg, var(--teal), var(--primary))',
                                    color: 'white',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(14, 165, 164, 0.3)',
                                    transition: 'all 0.3s ease',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.transform = 'translateY(-2px)';
                                    e.target.style.boxShadow = '0 8px 20px rgba(14, 165, 164, 0.4)';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.transform = 'translateY(0)';
                                    e.target.style.boxShadow = '0 4px 12px rgba(14, 165, 164, 0.3)';
                                }}
                            >
                                🔍 Apply Filters
                            </button>
                            <button
                                onClick={handleResetFilters}
                                style={{
                                    padding: '14px 32px',
                                    fontSize: '15px',
                                    fontWeight: 600,
                                    borderRadius: '12px',
                                    border: '2px solid #e8ecef',
                                    background: 'white',
                                    color: '#666',
                                    cursor: 'pointer',
                                    transition: 'all 0.3s ease'
                                }}
                                onMouseOver={(e) => {
                                    e.target.style.borderColor = '#ccc';
                                    e.target.style.background = '#f8f9fa';
                                }}
                                onMouseOut={(e) => {
                                    e.target.style.borderColor = '#e8ecef';
                                    e.target.style.background = 'white';
                                }}
                            >
                                ↻ Reset All
                            </button>
                            {activeFiltersCount > 0 && (
                                <div style={{
                                    marginLeft: 'auto',
                                    padding: '12px 20px',
                                    background: searchType === 'buy' ? '#e6f3ff' : '#e6f9f9',
                                    borderRadius: '12px',
                                    color: searchType === 'buy' ? 'var(--primary)' : 'var(--teal)',
                                    fontWeight: 700,
                                    fontSize: '14px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}>
                                    <span style={{ fontSize: '16px' }}>✓</span>
                                    {activeFiltersCount} Active {activeFiltersCount === 1 ? 'Filter' : 'Filters'}
                                </div>
                            )}
                        </div>
                    </div>
                </motion.section>
            )}

            {/* Results Section */}
            <section style={{ background: '#f8f9fa', minHeight: '60vh', padding: '40px 0' }}>
                <div className="container">
                    {/* Toolbar */}
                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            marginBottom: '32px',
                            flexWrap: 'wrap',
                            gap: '16px',
                            background: 'white',
                            padding: '24px 28px',
                            borderRadius: '16px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                        }}
                    >
                        <div>
                            <h2 style={{ fontSize: '22px', fontWeight: 700, marginBottom: '6px', color: '#333' }}>
                                {isSearching ? 'Searching...' : `${filteredProperties.length} Properties Found`}
                            </h2>
                            <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>
                                Showing {Math.min(visibleCount, filteredProperties.length)} of {filteredProperties.length} results
                            </p>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
                            {/* View Mode Toggle */}
                            <div style={{ display: 'flex', gap: '6px', background: '#f5f7fa', padding: '4px', borderRadius: '10px' }}>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    style={{
                                        padding: '10px 18px',
                                        border: 'none',
                                        background: viewMode === 'grid' ? 'white' : 'transparent',
                                        color: viewMode === 'grid' ? (searchType === 'buy' ? 'var(--primary)' : 'var(--teal)') : '#666',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        boxShadow: viewMode === 'grid' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    ⊞ Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    style={{
                                        padding: '10px 18px',
                                        border: 'none',
                                        background: viewMode === 'list' ? 'white' : 'transparent',
                                        color: viewMode === 'list' ? (searchType === 'buy' ? 'var(--primary)' : 'var(--teal)') : '#666',
                                        borderRadius: '8px',
                                        cursor: 'pointer',
                                        fontWeight: 600,
                                        fontSize: '14px',
                                        boxShadow: viewMode === 'list' ? '0 2px 8px rgba(0,0,0,0.08)' : 'none',
                                        transition: 'all 0.3s'
                                    }}
                                >
                                    ☰ List
                                </button>
                            </div>

                            {/* Sort Dropdown */}
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                                <span style={{ color: '#666', fontSize: '14px', fontWeight: 600 }}>Sort:</span>
                                <select
                                    value={sortBy}
                                    onChange={(e) => setSortBy(e.target.value)}
                                    style={{
                                        padding: '10px 16px',
                                        borderRadius: '10px',
                                        border: '2px solid #e8ecef',
                                        background: 'white',
                                        cursor: 'pointer',
                                        fontSize: '14px',
                                        fontWeight: 600,
                                        color: '#333'
                                    }}
                                >
                                    <option value="featured">Featured</option>
                                    <option value="price_low">Price: Low to High</option>
                                    <option value="price_high">Price: High to Low</option>
                                    <option value="newest">Newest First</option>
                                </select>
                            </div>
                        </div>
                    </motion.div>

                    {/* Property Grid/List */}
                    {isSearching ? (
                        <div style={{ textAlign: 'center', padding: '100px 20px' }}>
                            <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                style={{ fontSize: '48px', marginBottom: '20px' }}
                            >
                                🔍
                            </motion.div>
                            <h3 style={{ fontSize: '22px', color: '#666', fontWeight: 600 }}>Searching properties...</h3>
                        </div>
                    ) : filteredProperties.length > 0 ? (
                        <>
                            <div className={viewMode === 'grid' ? 'property-grid' : ''} style={viewMode === 'list' ? { display: 'flex', flexDirection: 'column', gap: '20px' } : {}}>
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

                            {filteredProperties.length > visibleCount && (
                                <div style={{ textAlign: 'center', marginTop: '48px' }}>
                                    <button
                                        onClick={handleLoadMore}
                                        style={{
                                            padding: '16px 48px',
                                            borderRadius: '14px',
                                            fontWeight: 700,
                                            fontSize: '16px',
                                            background: searchType === 'buy'
                                                ? 'linear-gradient(135deg, var(--primary), var(--teal))'
                                                : 'linear-gradient(135deg, var(--teal), var(--primary))',
                                            color: 'white',
                                            border: 'none',
                                            cursor: 'pointer',
                                            boxShadow: '0 4px 16px rgba(14, 165, 164, 0.3)',
                                            transition: 'all 0.3s ease'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.transform = 'translateY(-2px)';
                                            e.target.style.boxShadow = '0 8px 24px rgba(14, 165, 164, 0.4)';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.transform = 'translateY(0)';
                                            e.target.style.boxShadow = '0 4px 16px rgba(14, 165, 164, 0.3)';
                                        }}
                                    >
                                        Load More ({filteredProperties.length - visibleCount} remaining)
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div style={{
                            textAlign: 'center',
                            padding: '80px 20px',
                            background: 'white',
                            borderRadius: '20px',
                            boxShadow: '0 4px 16px rgba(0,0,0,0.06)'
                        }}>
                            <div style={{ fontSize: '80px', marginBottom: '24px' }}>🏘️</div>
                            <h3 style={{ fontSize: '32px', fontWeight: 800, marginBottom: '12px', color: '#333' }}>No Properties Found</h3>
                            <p style={{ color: 'var(--muted)', marginBottom: '32px', fontSize: '16px', maxWidth: '500px', margin: '0 auto 32px', lineHeight: 1.6 }}>
                                We couldn't find any properties matching your criteria. Try adjusting your filters to see more results.
                            </p>
                            <button
                                onClick={handleResetFilters}
                                style={{
                                    padding: '16px 40px',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    borderRadius: '12px',
                                    background: searchType === 'buy'
                                        ? 'linear-gradient(135deg, var(--primary), var(--teal))'
                                        : 'linear-gradient(135deg, var(--teal), var(--primary))',
                                    color: 'white',
                                    border: 'none',
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 16px rgba(14, 165, 164, 0.3)'
                                }}
                            >
                                Reset All Filters
                            </button>
                        </div>
                    )}
                </div>
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
