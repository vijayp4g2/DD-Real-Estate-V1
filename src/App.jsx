import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import Rent from './pages/Rent';
import Buy from './pages/Buy';
import Sell from './pages/Sell';
import SearchResults from './pages/SearchResults';
import Favorites from './pages/Favorites';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { mockProperties, mockBuyProperties } from './data/mockProperties';
import { useEffect, useState } from 'react';

function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function AnimatedRoutes({ favorites, onToggleFavorite, properties }) {
    const location = useLocation();

    // Filter properties for specific pages
    const rentProperties = properties.filter(p => p.category === 'rent');
    const buyProperties = properties.filter(p => p.category === 'buy');

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Home favorites={favorites} onToggleFavorite={onToggleFavorite} properties={properties} />} />
                <Route path="/rent" element={<Rent favorites={favorites} onToggleFavorite={onToggleFavorite} properties={rentProperties} />} />
                <Route path="/buy" element={<Buy favorites={favorites} onToggleFavorite={onToggleFavorite} properties={buyProperties} />} />
                <Route path="/sell" element={<Sell />} />
                <Route path="/search" element={<SearchResults favorites={favorites} onToggleFavorite={onToggleFavorite} properties={properties} />} />
                <Route path="/favorites" element={<Favorites favorites={favorites} onToggleFavorite={onToggleFavorite} />} />
            </Routes>
        </AnimatePresence>
    );
}

function App() {
    const [favorites, setFavorites] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);

    // Initialize properties from localStorage or mocks
    const [properties, setProperties] = useState(() => {
        const savedProperties = localStorage.getItem('properties');
        if (savedProperties) {
            try {
                const parsed = JSON.parse(savedProperties);
                if (Array.isArray(parsed)) {
                    return parsed;
                }
            } catch (e) {
                console.error('Failed to parse saved properties:', e);
            }
        }
        // Merge mocks and add categories if no saved data or parse error
        return [
            ...mockProperties.map(p => ({ ...p, category: 'rent' })),
            ...mockBuyProperties.map(p => ({ ...p, category: 'buy' }))
        ];
    });

    // Load favorites from localStorage on mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem('favorites');
        if (savedFavorites) {
            try {
                const parsed = JSON.parse(savedFavorites);
                if (Array.isArray(parsed)) {
                    setFavorites(parsed);
                }
            } catch (e) {
                console.error('Failed to parse saved favorites:', e);
            }
        }

        // Check admin session
        const adminSession = localStorage.getItem('isAdmin');
        if (adminSession === 'true') {
            setIsAdmin(true);
        }
    }, []);

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }, [favorites]);

    // Save properties to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('properties', JSON.stringify(properties));
    }, [properties]);

    const toggleFavorite = (property) => {
        setFavorites(prev => {
            if (prev.find(p => p.id === property.id)) {
                return prev.filter(p => p.id !== property.id);
            }
            return [...prev, property];
        });
    };

    // Admin Handlers
    const handleLogin = () => {
        setIsAdmin(true);
        localStorage.setItem('isAdmin', 'true');
    };

    const handleLogout = () => {
        setIsAdmin(false);
        localStorage.removeItem('isAdmin');
    };

    const handleAddProperty = (newProperty) => {
        // Normalize property data to match mock structure
        const normalizedProperty = {
            ...newProperty,
            id: newProperty.id || Date.now(), // Ensure unique ID
            name: newProperty.title || newProperty.name, // Ensure 'name' field exists
            title: undefined, // Remove 'title' field to avoid confusion
            category: newProperty.status === 'For Rent' ? 'rent' : 'buy', // CRITICAL: Add category for filtering
            period: newProperty.status === 'For Rent' ? '/month' : undefined,
            amenities: newProperty.amenities || ['Parking', 'Security', 'Power Backup'],
            agent: newProperty.agent || {
                name: 'Property Agent',
                phone: '+91 98765 43210',
                image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=200&auto=format&fit=crop'
            },
            images: newProperty.images || [newProperty.image]
        };
        setProperties(prev => [normalizedProperty, ...prev]);
    };

    const handleUpdateProperty = (updatedProperty) => {
        // Normalize property data to match mock structure
        const normalizedProperty = {
            ...updatedProperty,
            name: updatedProperty.title || updatedProperty.name,
            title: undefined,
            category: updatedProperty.status === 'For Rent' ? 'rent' : 'buy', // Update category based on status
            period: updatedProperty.status === 'For Rent' ? '/month' : undefined,
            images: updatedProperty.images || [updatedProperty.image]
        };
        setProperties(prev => prev.map(p => p.id === normalizedProperty.id ? normalizedProperty : p));
    };

    const handleDeleteProperty = (id) => {
        setProperties(prev => prev.filter(p => p.id !== id));
    };

    return (
        <Router basename="/DD-Real-Estate-V1">
            <ScrollToTop />
            <Routes>
                {/* Admin Routes - No Header/Footer */}
                <Route path="/admin/login" element={<AdminLogin onLogin={handleLogin} />} />
                <Route
                    path="/admin/dashboard"
                    element={
                        isAdmin ? (
                            <AdminDashboard
                                properties={properties}
                                onAddProperty={handleAddProperty}
                                onUpdateProperty={handleUpdateProperty}
                                onDeleteProperty={handleDeleteProperty}
                                onLogout={handleLogout}
                            />
                        ) : (
                            <Navigate to="/admin/login" replace />
                        )
                    }
                />

                {/* Regular Routes - With Header/Footer */}
                <Route path="*" element={
                    <>
                        <Header favoritesCount={favorites.length} />
                        <AnimatedRoutes
                            favorites={favorites}
                            onToggleFavorite={toggleFavorite}
                            properties={properties}
                        />
                        <Footer />
                    </>
                } />
            </Routes>
        </Router>
    );
}

export default App;
