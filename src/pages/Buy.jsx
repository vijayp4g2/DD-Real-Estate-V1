import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PropertyCard from '../components/PropertyCard';
import QuickViewModal from '../components/QuickViewModal';
import { mockBuyProperties } from '../data/mockProperties';

export default function Buy({ favorites = [], onToggleFavorite, properties = mockBuyProperties }) {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('buy');
    const [selectedProperty, setSelectedProperty] = useState(null);
    const [visibleCount, setVisibleCount] = useState(6);
    const [sortBy, setSortBy] = useState('featured');

    const [searchFilters, setSearchFilters] = useState({
        location: 'Hyderabad, India',
        type: 'All Types',
        budget: 'Any Price',
        bhk: 'Any'
    });
    const [filteredProperties, setFilteredProperties] = useState(properties);

    // Mortgage Calculator State
    const [loanAmount, setLoanAmount] = useState(5000000);
    const [interestRate, setInterestRate] = useState(8.5);
    const [loanTerm, setLoanTerm] = useState(20);

    const calculateEMI = () => {
        const r = interestRate / 12 / 100;
        const n = loanTerm * 12;
        const emi = (loanAmount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
        return Math.round(emi).toLocaleString('en-IN');
    };

    const handleQuickView = (property) => {
        setSelectedProperty(property);
    };

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

    const handleSearch = () => {
        // Navigate to search results page with filters as query parameters
        const params = new URLSearchParams({
            type: 'buy',
            location: searchFilters.location,
            propertyType: searchFilters.type,
            budget: searchFilters.budget,
            bhk: searchFilters.bhk
        });
        navigate(`/search?${params.toString()}`);
    };

    const handleReset = () => {
        setSearchFilters({
            location: 'Hyderabad, India',
            type: 'All Types',
            budget: 'Any Price',
            bhk: 'Any'
        });
        setFilteredProperties(properties);
        setVisibleCount(6);
    };

    // Auto-search when sort changes
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
            if (searchFilters.budget !== 'Any Price') {
                const price = parsePrice(property.price);
                if (searchFilters.budget === 'Under ₹50 L' && price >= 5000000) return false;
                if (searchFilters.budget === '₹50 L - ₹1 Cr' && (price < 5000000 || price > 10000000)) return false;
                if (searchFilters.budget === '₹1 Cr - ₹3 Cr' && (price < 10000000 || price > 30000000)) return false;
                if (searchFilters.budget === 'Above ₹3 Cr' && price <= 30000000) return false;
            }
            return true;
        });

        if (sortBy === 'price_low') {
            filtered.sort((a, b) => parsePrice(a.price) - parsePrice(b.price));
        } else if (sortBy === 'price_high') {
            filtered.sort((a, b) => parsePrice(b.price) - parsePrice(a.price));
        }

        setFilteredProperties(filtered);
    }, [sortBy, properties, searchFilters]);

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
                background: 'linear-gradient(135deg, #0B2545 0%, #0EA5A4 100%)',
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
                    backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(255, 255, 255, 0.05) 0%, transparent 50%)',
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
                            ✨ Premium Properties in Hyderabad
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
                            Find Your Dream Home
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
                            Discover verified properties for sale in Hyderabad's most sought-after locations
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
                                onClick={() => navigate('/rent')}
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
                                🏠 Rent
                            </button>
                            <button
                                style={{
                                    flex: 1,
                                    maxWidth: '150px',
                                    padding: '14px 24px',
                                    border: 'none',
                                    background: 'white',
                                    color: 'var(--primary)',
                                    borderRadius: '12px',
                                    fontSize: '16px',
                                    fontWeight: 700,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(14, 165, 164, 0.2)'
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
                                    <option>Banjara Hills</option>
                                    <option>Jubilee Hills</option>
                                    <option>Gachibowli</option>
                                    <option>Hitech City</option>
                                    <option>Kondapur</option>
                                    <option>Madhapur</option>
                                    <option>Manikonda</option>
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
                                    <option>Villa</option>
                                    <option>House</option>
                                    <option>Plot</option>
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
                                    💰 Budget
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
                                    <option>Any Price</option>
                                    <option>Under ₹50 L</option>
                                    <option>₹50 L - ₹1 Cr</option>
                                    <option>₹1 Cr - ₹3 Cr</option>
                                    <option>Above ₹3 Cr</option>
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
                                background: 'linear-gradient(135deg, var(--primary), var(--teal))',
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
                            Search Properties
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
                                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
                                    {mockBuyProperties.length}+
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>Properties Listed</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--teal)', marginBottom: '4px' }}>
                                    100%
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>Verified Listings</div>
                            </div>
                            <div style={{ textAlign: 'center' }}>
                                <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--primary)', marginBottom: '4px' }}>
                                    24/7
                                </div>
                                <div style={{ fontSize: '13px', color: '#666', fontWeight: 500 }}>Support Available</div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Browse by Category */}
            <section className="container" style={{ padding: '60px 20px' }}>
                <h2 style={{ fontSize: '28px', fontWeight: 700, marginBottom: '32px', color: 'var(--primary)' }}>Browse by Category</h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px' }}>
                    {[
                        { name: 'Apartments', icon: '🏢', count: '1,240+' },
                        { name: 'Villas', icon: '🏡', count: '450+' },
                        { name: 'Plots', icon: '📐', count: '890+' },
                        { name: 'Commercial', icon: '🏢', count: '320+' }
                    ].map((cat, i) => (
                        <motion.div
                            key={i}
                            whileHover={{ y: -5 }}
                            style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid #eee', textAlign: 'center', cursor: 'pointer', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}
                        >
                            <div style={{ fontSize: '40px', marginBottom: '16px' }}>{cat.icon}</div>
                            <h3 style={{ fontSize: '18px', fontWeight: 600, marginBottom: '8px' }}>{cat.name}</h3>
                            <p style={{ color: 'var(--muted)', fontSize: '14px', margin: 0 }}>{cat.count} Listings</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Main Listings Section */}
            <section className="container" style={{ paddingBottom: '60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                        <h2 style={{ fontSize: '32px', fontWeight: 700, color: 'var(--primary)', margin: '0 0 8px' }}>Latest Properties</h2>
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
                            <option value="price_low">Price: Low to High</option>
                            <option value="price_high">Price: High to Low</option>
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
                            {visibleCount >= filteredProperties.length ? 'Show Less' : 'Load More Properties'}
                        </button>
                    </div>
                )}
            </section>

            {/* Mortgage Calculator Section */}
            <section style={{ background: '#f8f9fa', padding: '80px 0' }}>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '48px' }}>
                        <h2 style={{ fontSize: '36px', fontWeight: 700, marginBottom: '16px', color: 'var(--primary)' }}>Mortgage Calculator</h2>
                        <p style={{ fontSize: '18px', color: 'var(--muted)', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
                            Estimate your monthly payments and plan your budget effectively. Adjust the loan amount, interest rate, and tenure to see how it affects your EMI.
                        </p>
                    </div>

                    <div style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                        gap: '40px',
                        background: 'white',
                        padding: '40px',
                        borderRadius: '24px',
                        boxShadow: '0 20px 40px rgba(0,0,0,0.05)'
                    }}>
                        {/* Inputs */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <label style={{ fontWeight: 600, color: 'var(--navy)' }}>Loan Amount</label>
                                    <span style={{ fontWeight: 700, color: 'var(--teal)' }}>₹{loanAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <input
                                    type="range"
                                    min="1000000"
                                    max="50000000"
                                    step="100000"
                                    value={loanAmount}
                                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: 'var(--teal)', height: '6px', cursor: 'pointer' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                                    <span>₹10 L</span>
                                    <span>₹5 Cr</span>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <label style={{ fontWeight: 600, color: 'var(--navy)' }}>Interest Rate</label>
                                    <span style={{ fontWeight: 700, color: 'var(--teal)' }}>{interestRate}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="15"
                                    step="0.1"
                                    value={interestRate}
                                    onChange={(e) => setInterestRate(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: 'var(--teal)', height: '6px', cursor: 'pointer' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                                    <span>5%</span>
                                    <span>15%</span>
                                </div>
                            </div>

                            <div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <label style={{ fontWeight: 600, color: 'var(--navy)' }}>Loan Tenure</label>
                                    <span style={{ fontWeight: 700, color: 'var(--teal)' }}>{loanTerm} Years</span>
                                </div>
                                <input
                                    type="range"
                                    min="5"
                                    max="30"
                                    step="1"
                                    value={loanTerm}
                                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                                    style={{ width: '100%', accentColor: 'var(--teal)', height: '6px', cursor: 'pointer' }}
                                />
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', color: 'var(--muted)' }}>
                                    <span>5 Years</span>
                                    <span>30 Years</span>
                                </div>
                            </div>
                        </div>

                        {/* Results */}
                        <div style={{
                            background: '#f8f9fa',
                            borderRadius: '20px',
                            padding: '32px',
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                            textAlign: 'center'
                        }}>
                            <div style={{ marginBottom: '32px' }}>
                                <span style={{ fontSize: '16px', color: 'var(--muted)', display: 'block', marginBottom: '8px' }}>Monthly EMI</span>
                                <span style={{ fontSize: '48px', fontWeight: 800, color: 'var(--primary)', lineHeight: 1 }}>₹{calculateEMI()}</span>
                            </div>

                            <div style={{ width: '100%', borderTop: '1px solid #e0e0e0', paddingTop: '24px', marginBottom: '32px' }}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ color: 'var(--muted)' }}>Principal Amount</span>
                                    <span style={{ fontWeight: 600 }}>₹{loanAmount.toLocaleString('en-IN')}</span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                                    <span style={{ color: 'var(--muted)' }}>Total Interest</span>
                                    <span style={{ fontWeight: 600 }}>
                                        ₹{(parseInt(calculateEMI().replace(/,/g, '')) * loanTerm * 12 - loanAmount).toLocaleString('en-IN')}
                                    </span>
                                </div>
                                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                    <span style={{ color: 'var(--muted)' }}>Total Amount Payable</span>
                                    <span style={{ fontWeight: 700, color: 'var(--teal)' }}>
                                        ₹{(parseInt(calculateEMI().replace(/,/g, '')) * loanTerm * 12).toLocaleString('en-IN')}
                                    </span>
                                </div>
                            </div>

                            <button className="btn btn-teal" style={{ width: '100%', padding: '16px', fontSize: '16px' }}>
                                Apply for Loan Now
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Newsletter CTA */}
            <div className="container" style={{ marginTop: '80px', marginBottom: '80px' }}>
                <section className="cta-band" style={{ borderRadius: '24px' }}>
                    <div className="cta-content">
                        <h2>Get Market Updates</h2>
                        <p>Stay informed about the latest price trends and new launches in Hyderabad.</p>
                        <div className="cta-form">
                            <input type="email" placeholder="Enter your email address" />
                            <button className="btn btn-primary">Subscribe</button>
                        </div>
                    </div>
                </section>
            </div>

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
