import React, { useState, useEffect } from 'react';
import { fetchProducts } from '../services/api';  // Assuming you have this function

const Order = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);

    useEffect(() => {
        const getProducts = async () => {
            const data = await fetchProducts();
            setProducts(data);
        };

        getProducts();
    }, []);

    const addToCart = (product) => {
        setCart((prevCart) => {
            const updatedCart = [...prevCart, product];
            calculateTotalPrice(updatedCart);
            return updatedCart;
        });
    };

    const calculateTotalPrice = (updatedCart) => {
        const price = updatedCart.reduce((total, item) => total + item.price, 0);
        setTotalPrice(price);
    };


    const removeFromCart = (productId) => {
        const updatedCart = cart.filter(item => item.id !== productId);
        setCart(updatedCart);
        calculateTotalPrice(updatedCart);
    };

    return (
        <div className="order-container">
            <h2>Order Now</h2>
            <div className="products-list">
                <h3>Available Products</h3>
                <div className="products">
                    {products.map(product => (
                        <div key={product.id} className="product-card">
                            <img src={product.image} alt={product.title} />
                            <h4>{product.title}</h4>
                            <p>${product.price}</p>
                            <button onClick={() => addToCart(product)}>Add to Cart</button>
                        </div>
                    ))}
                </div>
            </div>

            <div className="cart">
                <h3>Your Cart</h3>
                {cart.length === 0 ? (
                    <p>Your cart is empty!</p>
                ) : (
                    <div>
                        {cart.map(item => (
                            <div key={item.id} className="cart-item">
                                <h4>{item.title}</h4>
                                <p>Price: ${item.price}</p>
                                <button onClick={() => removeFromCart(item.id)}>Remove</button>
                            </div>
                        ))}
                        <div className="order-summary">
                            <h4>Total Price: ${totalPrice}</h4>
                            <button className="checkout-button">Proceed to Checkout</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Order;
