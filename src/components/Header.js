import React from 'react';
import './Header.css';

const Header = () => {
    return (
        <header>
            <div className="logo">My Store</div>
            <nav>
                <a href="/">Home</a>
                <a href="/about">About</a>
                <a href="/contact">Contact</a>
                <a href="/order">Order</a>
            </nav>
        </header>
    );
};

export default Header;
