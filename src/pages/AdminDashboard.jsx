import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PropertyFormModal from '../components/PropertyFormModal';

export default function AdminDashboard({ properties, onAddProperty, onUpdateProperty, onDeleteProperty, onLogout }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProperty, setEditingProperty] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [selectedProperties, setSelectedProperties] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState('newest');
    const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'table'
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar state
    const itemsPerPage = viewMode === 'grid' ? 12 : 10;

    const handleEdit = (property) => {
        setEditingProperty(property);
        setIsModalOpen(true);
    };

    const handleAdd = () => {
        setEditingProperty(null);
        setIsModalOpen(true);
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this property?')) {
            onDeleteProperty(id);
        }
    };

    const handleBulkDelete = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedProperties.length} properties?`)) {
            selectedProperties.forEach(id => onDeleteProperty(id));
            setSelectedProperties([]);
        }
    };

    const handleFormSubmit = (formData) => {
        if (editingProperty) {
            onUpdateProperty({ ...editingProperty, ...formData });
        } else {
            onAddProperty({
                ...formData,
                id: Date.now(),
                category: formData.status === 'For Rent' ? 'rent' : 'buy',
                createdAt: new Date().toISOString()
            });
        }
    };

    const toggleSelectAll = () => {
        if (selectedProperties.length === filteredProperties.length) {
            setSelectedProperties([]);
        } else {
            setSelectedProperties(filteredProperties.map(p => p.id));
        }
    };

    const toggleSelect = (id) => {
        setSelectedProperties(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    const exportToCSV = () => {
        const headers = ['Title', 'Location', 'Price', 'Type', 'Status', 'Beds', 'Baths', 'Sqft'];
        const csvData = filteredProperties.map(p => [
            p.title || p.name,
            p.location,
            p.price,
            p.type,
            p.category === 'buy' ? 'For Sale' : 'For Rent',
            p.beds,
            p.baths,
            p.sqft
        ]);

        const csvContent = [
            headers.join(','),
            ...csvData.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `properties_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    // Filter and sort properties
    let filteredProperties = properties.filter(p => {
        const matchesSearch = (p.title || p.name)?.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.location?.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    // Sort properties
    filteredProperties = [...filteredProperties].sort((a, b) => {
        switch (sortBy) {
            case 'price_low':
                return parseFloat(a.price.replace(/[^0-9.]/g, '')) - parseFloat(b.price.replace(/[^0-9.]/g, ''));
            case 'price_high':
                return parseFloat(b.price.replace(/[^0-9.]/g, '')) - parseFloat(a.price.replace(/[^0-9.]/g, ''));
            case 'title':
                return (a.title || a.name).localeCompare(b.title || b.name);
            case 'newest':
            default:
                return (b.id || 0) - (a.id || 0);
        }
    });

    // Pagination
    const totalPages = Math.ceil(filteredProperties.length / itemsPerPage);
    const paginatedProperties = filteredProperties.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Calculate statistics
    const stats = {
        total: properties.length,
        forSale: properties.filter(p => p.category === 'buy').length,
        forRent: properties.filter(p => p.category === 'rent').length,
        apartments: properties.filter(p => p.type === 'Apartment').length,
        villas: properties.filter(p => p.type === 'Villa').length,
        houses: properties.filter(p => p.type === 'House').length
    };

    // Calculate average price
    const avgPrice = properties.length > 0
        ? Math.round(properties.reduce((sum, p) => {
            const price = parseFloat(p.price.replace(/[^0-9.]/g, ''));
            return sum + (isNaN(price) ? 0 : price);
        }, 0) / properties.length)
        : 0;

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)' }}>
            {/* Mobile Sidebar Toggle */}
            <button
                className="admin-mobile-toggle"
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            >
                {isSidebarOpen ? '✕' : '☰'}
            </button>

            {/* Mobile Overlay */}
            <div
                className={`admin-overlay ${isSidebarOpen ? 'open' : ''}`}
                onClick={() => setIsSidebarOpen(false)}
            />

            {/* Modern Sidebar + Header Layout */}
            <div className="admin-container" style={{ display: 'flex', minHeight: '100vh' }}>
                {/* Sidebar */}
                <aside
                    className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}
                    style={{
                        width: '280px',
                        background: 'linear-gradient(180deg, #1e3a8a 0%, #1e40af 100%)',
                        color: 'white',
                        padding: '32px 24px',
                        boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
                        position: 'sticky',
                        top: 0,
                        height: '100vh',
                        overflowY: 'auto'
                    }}>
                    {/* Logo */}
                    <div style={{ marginBottom: '48px' }}>
                        <div style={{
                            width: '60px',
                            height: '60px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: '16px',
                            backdropFilter: 'blur(10px)'
                        }}>
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                                <polyline points="9 22 9 12 15 12 15 22" />
                            </svg>
                        </div>
                        <h2 style={{ fontSize: '24px', fontWeight: 800, margin: 0, marginBottom: '4px' }}>Estatery</h2>
                        <p style={{ fontSize: '13px', opacity: 0.8, margin: 0 }}>Admin Dashboard</p>
                    </div>

                    {/* Navigation */}
                    <nav style={{ marginBottom: '32px' }}>
                        <div style={{
                            padding: '14px 16px',
                            background: 'rgba(255, 255, 255, 0.15)',
                            borderRadius: '12px',
                            marginBottom: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            fontWeight: 600,
                            fontSize: '15px'
                        }}>
                            <span style={{ fontSize: '20px' }}>📊</span>
                            Dashboard
                        </div>
                        <div style={{
                            padding: '14px 16px',
                            borderRadius: '12px',
                            marginBottom: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            opacity: 0.7,
                            transition: 'all 0.3s ease',
                            fontSize: '15px'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.opacity = '1';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.opacity = '0.7';
                            }}>
                            <span style={{ fontSize: '20px' }}>🏠</span>
                            Properties
                        </div>
                        <div style={{
                            padding: '14px 16px',
                            borderRadius: '12px',
                            marginBottom: '8px',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '12px',
                            opacity: 0.7,
                            transition: 'all 0.3s ease',
                            fontSize: '15px'
                        }}
                            onMouseOver={(e) => {
                                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                                e.currentTarget.style.opacity = '1';
                            }}
                            onMouseOut={(e) => {
                                e.currentTarget.style.background = 'transparent';
                                e.currentTarget.style.opacity = '0.7';
                            }}>
                            <span style={{ fontSize: '20px' }}>⚙️</span>
                            Settings
                        </div>
                    </nav>

                    {/* Quick Stats */}
                    <div style={{
                        background: 'rgba(255, 255, 255, 0.1)',
                        borderRadius: '16px',
                        padding: '20px',
                        marginBottom: '24px',
                        backdropFilter: 'blur(10px)'
                    }}>
                        <div style={{ fontSize: '13px', opacity: 0.8, marginBottom: '12px', fontWeight: 600 }}>QUICK STATS</div>
                        <div style={{ fontSize: '32px', fontWeight: 800, marginBottom: '4px' }}>{stats.total}</div>
                        <div style={{ fontSize: '13px', opacity: 0.9 }}>Total Properties</div>
                        <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '13px' }}>
                                <span style={{ opacity: 0.8 }}>For Sale</span>
                                <span style={{ fontWeight: 700 }}>{stats.forSale}</span>
                            </div>
                            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '13px' }}>
                                <span style={{ opacity: 0.8 }}>For Rent</span>
                                <span style={{ fontWeight: 700 }}>{stats.forRent}</span>
                            </div>
                        </div>
                    </div>

                    {/* Actions */}
                    <div style={{ marginTop: 'auto' }}>
                        <a
                            href="/"
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '12px',
                                color: 'white',
                                textDecoration: 'none',
                                opacity: 0.8,
                                marginBottom: '16px',
                                fontSize: '14px'
                            }}
                        >
                            <span>←</span> Back to Website
                        </a>
                        <button
                            onClick={onLogout}
                            style={{
                                width: '100%',
                                padding: '12px',
                                background: 'rgba(255, 255, 255, 0.15)',
                                border: 'none',
                                borderRadius: '12px',
                                color: 'white',
                                fontWeight: 600,
                                cursor: 'pointer',
                                transition: 'all 0.3s ease'
                            }}
                            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)'}
                            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)'}
                        >
                            Log Out
                        </button>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="admin-main" style={{ flex: 1, padding: '40px', overflowY: 'auto' }}>
                    {/* Header */}
                    <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                        <div>
                            <h1 style={{ fontSize: '32px', fontWeight: 800, color: '#1e293b', marginBottom: '8px' }}>Dashboard</h1>
                            <p style={{ color: '#64748b' }}>Welcome back, Admin!</p>
                        </div>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <button
                                onClick={handleAdd}
                                style={{
                                    padding: '12px 24px',
                                    background: '#1e40af',
                                    color: 'white',
                                    border: 'none',
                                    borderRadius: '12px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: '0 4px 12px rgba(30, 64, 175, 0.2)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '8px'
                                }}
                            >
                                <span>+</span> Add Property
                            </button>
                        </div>
                    </header>

                    {/* Stats Grid */}
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', marginBottom: '40px' }}>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>TOTAL REVENUE</div>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1e293b' }}>₹{avgPrice.toLocaleString()}</div>
                            <div style={{ color: '#10b981', fontSize: '13px', marginTop: '4px' }}>↑ 12% from last month</div>
                        </div>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>ACTIVE LISTINGS</div>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1e293b' }}>{stats.total}</div>
                            <div style={{ color: '#10b981', fontSize: '13px', marginTop: '4px' }}>+3 new this week</div>
                        </div>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>TOTAL VIEWS</div>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1e293b' }}>12.5k</div>
                            <div style={{ color: '#10b981', fontSize: '13px', marginTop: '4px' }}>↑ 8% from last month</div>
                        </div>
                        <div style={{ background: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
                            <div style={{ color: '#64748b', fontSize: '14px', fontWeight: 600, marginBottom: '8px' }}>LEADS GENERATED</div>
                            <div style={{ fontSize: '32px', fontWeight: 800, color: '#1e293b' }}>48</div>
                            <div style={{ color: '#ef4444', fontSize: '13px', marginTop: '4px' }}>↓ 2% from last month</div>
                        </div>
                    </div>

                    {/* Filters & Actions Bar */}
                    <div style={{ background: 'white', padding: '20px', borderRadius: '16px', marginBottom: '24px', display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
                        <div style={{ display: 'flex', gap: '16px', flex: 1, minWidth: '300px' }}>
                            <div style={{ position: 'relative', flex: 1 }}>
                                <input
                                    type="text"
                                    placeholder="Search properties..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    style={{
                                        width: '100%',
                                        padding: '12px 16px',
                                        paddingLeft: '40px',
                                        borderRadius: '10px',
                                        border: '1px solid #e2e8f0',
                                        outline: 'none',
                                        fontSize: '14px'
                                    }}
                                />
                                <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', opacity: 0.5 }}>🔍</span>
                            </div>
                            <select
                                value={categoryFilter}
                                onChange={(e) => setCategoryFilter(e.target.value)}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    fontSize: '14px',
                                    background: 'white'
                                }}
                            >
                                <option value="all">All Categories</option>
                                <option value="buy">For Sale</option>
                                <option value="rent">For Rent</option>
                            </select>
                            <select
                                value={sortBy}
                                onChange={(e) => setSortBy(e.target.value)}
                                style={{
                                    padding: '12px 16px',
                                    borderRadius: '10px',
                                    border: '1px solid #e2e8f0',
                                    outline: 'none',
                                    fontSize: '14px',
                                    background: 'white'
                                }}
                            >
                                <option value="newest">Newest First</option>
                                <option value="price_low">Price: Low to High</option>
                                <option value="price_high">Price: High to Low</option>
                                <option value="title">Name: A-Z</option>
                            </select>
                        </div>
                        <div style={{ display: 'flex', gap: '12px' }}>
                            <div style={{ display: 'flex', background: '#f1f5f9', padding: '4px', borderRadius: '8px' }}>
                                <button
                                    onClick={() => setViewMode('grid')}
                                    style={{
                                        padding: '8px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        background: viewMode === 'grid' ? 'white' : 'transparent',
                                        boxShadow: viewMode === 'grid' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Grid
                                </button>
                                <button
                                    onClick={() => setViewMode('table')}
                                    style={{
                                        padding: '8px',
                                        border: 'none',
                                        borderRadius: '6px',
                                        background: viewMode === 'table' ? 'white' : 'transparent',
                                        boxShadow: viewMode === 'table' ? '0 1px 2px rgba(0,0,0,0.1)' : 'none',
                                        cursor: 'pointer'
                                    }}
                                >
                                    Table
                                </button>
                            </div>
                            {selectedProperties.length > 0 && (
                                <button
                                    onClick={handleBulkDelete}
                                    style={{
                                        padding: '10px 20px',
                                        background: '#fee2e2',
                                        color: '#ef4444',
                                        border: 'none',
                                        borderRadius: '10px',
                                        fontWeight: 600,
                                        cursor: 'pointer',
                                        fontSize: '14px'
                                    }}
                                >
                                    Delete ({selectedProperties.length})
                                </button>
                            )}
                            <button
                                onClick={exportToCSV}
                                style={{
                                    padding: '10px 20px',
                                    background: 'white',
                                    border: '1px solid #e2e8f0',
                                    borderRadius: '10px',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    fontSize: '14px',
                                    color: '#64748b'
                                }}
                            >
                                Export CSV
                            </button>
                        </div>
                    </div>

                    {/* Content Area */}
                    {viewMode === 'grid' ? (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
                            <AnimatePresence>
                                {paginatedProperties.map(property => (
                                    <motion.div
                                        key={property.id}
                                        layout
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        style={{
                                            background: 'white',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                            position: 'relative',
                                            border: selectedProperties.includes(property.id) ? '2px solid #3b82f6' : '2px solid transparent'
                                        }}
                                        onClick={() => toggleSelect(property.id)}
                                    >
                                        <div style={{ position: 'relative', height: '200px' }}>
                                            <img
                                                src={property.images?.[0] || property.image}
                                                alt={property.name}
                                                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                            />
                                            <div style={{
                                                position: 'absolute',
                                                top: '12px',
                                                right: '12px',
                                                background: 'rgba(255,255,255,0.9)',
                                                padding: '4px 12px',
                                                borderRadius: '20px',
                                                fontSize: '12px',
                                                fontWeight: 700,
                                                color: property.category === 'buy' ? '#3b82f6' : '#10b981'
                                            }}>
                                                {property.category === 'buy' ? 'FOR SALE' : 'FOR RENT'}
                                            </div>
                                            <input
                                                type="checkbox"
                                                checked={selectedProperties.includes(property.id)}
                                                onChange={() => { }} // Handled by parent div click
                                                style={{
                                                    position: 'absolute',
                                                    top: '12px',
                                                    left: '12px',
                                                    width: '20px',
                                                    height: '20px',
                                                    cursor: 'pointer'
                                                }}
                                            />
                                        </div>
                                        <div style={{ padding: '20px' }}>
                                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
                                                <h3 style={{ margin: 0, fontSize: '18px', fontWeight: 700, color: '#1e293b' }}>{property.name || property.title}</h3>
                                                <div style={{ fontSize: '18px', fontWeight: 800, color: '#3b82f6' }}>{property.price}</div>
                                            </div>
                                            <p style={{ margin: '0 0 16px', color: '#64748b', fontSize: '14px' }}>{property.location}</p>
                                            <div style={{ display: 'flex', gap: '16px', color: '#64748b', fontSize: '13px', marginBottom: '20px' }}>
                                                <span>🛏 {property.beds} Beds</span>
                                                <span>🚿 {property.baths} Baths</span>
                                                <span>📐 {property.sqft} sqft</span>
                                            </div>
                                            <div style={{ display: 'flex', gap: '8px' }}>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleEdit(property); }}
                                                    style={{
                                                        flex: 1,
                                                        padding: '8px',
                                                        background: '#eff6ff',
                                                        color: '#3b82f6',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        fontWeight: 600,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Edit
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleDelete(property.id); }}
                                                    style={{
                                                        flex: 1,
                                                        padding: '8px',
                                                        background: '#fef2f2',
                                                        color: '#ef4444',
                                                        border: 'none',
                                                        borderRadius: '8px',
                                                        fontWeight: 600,
                                                        cursor: 'pointer'
                                                    }}
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    ) : (
                        <div style={{ background: 'white', borderRadius: '16px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)', overflow: 'hidden' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                                    <tr>
                                        <th style={{ padding: '16px', textAlign: 'left', width: '40px' }}>
                                            <input
                                                type="checkbox"
                                                checked={selectedProperties.length === filteredProperties.length && filteredProperties.length > 0}
                                                onChange={toggleSelectAll}
                                            />
                                        </th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Property</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Location</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Type</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Price</th>
                                        <th style={{ padding: '16px', textAlign: 'left', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Status</th>
                                        <th style={{ padding: '16px', textAlign: 'right', fontSize: '12px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {paginatedProperties.map(property => (
                                        <tr key={property.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                                            <td style={{ padding: '16px' }}>
                                                <input
                                                    type="checkbox"
                                                    checked={selectedProperties.includes(property.id)}
                                                    onChange={() => toggleSelect(property.id)}
                                                />
                                            </td>
                                            <td style={{ padding: '16px' }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                                                    <img
                                                        src={property.images?.[0] || property.image}
                                                        alt={property.name}
                                                        style={{ width: '48px', height: '48px', borderRadius: '8px', objectFit: 'cover' }}
                                                    />
                                                    <span style={{ fontWeight: 600, color: '#1e293b' }}>{property.name || property.title}</span>
                                                </div>
                                            </td>
                                            <td style={{ padding: '16px', color: '#64748b' }}>{property.location}</td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{ padding: '4px 12px', background: '#f1f5f9', borderRadius: '20px', fontSize: '12px', fontWeight: 600 }}>{property.type}</span>
                                            </td>
                                            <td style={{ padding: '16px', fontWeight: 600, color: '#1e293b' }}>{property.price}</td>
                                            <td style={{ padding: '16px' }}>
                                                <span style={{
                                                    padding: '4px 12px',
                                                    background: property.category === 'buy' ? '#eff6ff' : '#ecfdf5',
                                                    color: property.category === 'buy' ? '#3b82f6' : '#10b981',
                                                    borderRadius: '20px',
                                                    fontSize: '12px',
                                                    fontWeight: 700
                                                }}>
                                                    {property.category === 'buy' ? 'For Sale' : 'For Rent'}
                                                </span>
                                            </td>
                                            <td style={{ padding: '16px', textAlign: 'right' }}>
                                                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                                                    <button
                                                        onClick={() => handleEdit(property)}
                                                        style={{ padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                                                        title="Edit"
                                                    >
                                                        ✏️
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(property.id)}
                                                        style={{ padding: '6px', background: 'transparent', border: 'none', cursor: 'pointer', fontSize: '16px' }}
                                                        title="Delete"
                                                    >
                                                        🗑️
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {/* Pagination */}
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '40px' }}>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                style={{
                                    width: '40px',
                                    height: '40px',
                                    borderRadius: '10px',
                                    border: 'none',
                                    background: currentPage === page ? '#1e40af' : 'white',
                                    color: currentPage === page ? 'white' : '#64748b',
                                    fontWeight: 600,
                                    cursor: 'pointer',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                                }}
                            >
                                {page}
                            </button>
                        ))}
                    </div>
                </main>
            </div>

            {/* Property Form Modal */}
            <PropertyFormModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleFormSubmit}
                initialData={editingProperty}
            />
        </div>
    );
}
