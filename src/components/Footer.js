import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer>
            <p>&copy; 2024 My Store. All rights reserved.</p>
            <div className="footer-links">
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/order">Order</a>
            </div>
        </footer>
    );
};

export default Footer;
