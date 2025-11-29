export default function Footer() {
    return (
        <footer>
            <div className="footer-grid">
                <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                        <div className="logo">E</div>
                        <div>
                            <div style={{ fontWeight: 700, fontSize: '18px' }}>Estatery</div>
                            <div style={{ fontSize: '13px', opacity: 0.8 }}>Find your dream home</div>
                        </div>
                    </div>
                    <p style={{ margin: 0, opacity: 0.8, fontSize: '14px' }}>
                        The best platform to buy, sell, or rent properties without any commissions.
                    </p>
                </div>

                <div>
                    <h4>Sell a Home</h4>
                    <a href="#">Request an offer</a>
                    <a href="#">Pricing</a>
                    <a href="#">Reviews</a>
                    <a href="#">Stories</a>
                </div>

                <div>
                    <h4>Buy a Home</h4>
                    <a href="#">Buy</a>
                    <a href="#">Finance</a>
                    <a href="#">Guides</a>
                </div>

                <div>
                    <h4>Rent a Home</h4>
                    <a href="#">Browse rentals</a>
                    <a href="#">Landlord resources</a>
                    <a href="#">Tenant guides</a>
                </div>

                <div>
                    <h4>Resources</h4>
                    <a href="#">Blog</a>
                    <a href="#">Guides</a>
                    <a href="#">FAQ</a>
                    <a href="#">Help Center</a>
                </div>
            </div>

            <div className="footer-bottom">
                <p style={{ margin: 0 }}>© 2025 Estatery. All rights reserved.</p>
            </div>
        </footer>
    );
}
