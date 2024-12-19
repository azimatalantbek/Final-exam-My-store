import React, { useEffect, useState } from 'react';
import { fetchProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import Spinner from '../components/Spinner';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [priceFilter, setPriceFilter] = useState('default');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProducts()
            .then((data) => {
                setProducts(data);
                setFilteredProducts(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        // Filter and sort products whenever filters or search term changes
        let filtered = products;

        // Filter by category
        if (categoryFilter !== 'all') {
            filtered = filtered.filter(product => product.category === categoryFilter);
        }

        // Search by title
        if (searchTerm) {
            filtered = filtered.filter(product =>
                product.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sort by price
        if (priceFilter === 'low-to-high') {
            filtered.sort((a, b) => a.price - b.price);
        } else if (priceFilter === 'high-to-low') {
            filtered.sort((a, b) => b.price - a.price);
        }

        setFilteredProducts(filtered);
    }, [searchTerm, categoryFilter, priceFilter, products]);

    if (loading) return <Spinner />;

    // Extract unique categories
    const categories = ['all', ...new Set(products.map(product => product.category))];

    return (
        <div>
            <h1>Product Catalogs</h1>

            {/* Search and Filters */}
            <div style={{ marginBottom: '20px' }}>
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                />
                <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    style={{ marginRight: '10px', padding: '5px' }}
                >
                    {categories.map((category) => (
                        <option key={category} value={category}>
                            {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                    ))}
                </select>
                <select
                    value={priceFilter}
                    onChange={(e) => setPriceFilter(e.target.value)}
                    style={{ padding: '5px' }}
                >
                    <option value="default">Sort by price</option>
                    <option value="low-to-high">Low to High</option>
                    <option value="high-to-low">High to Low</option>
                </select>
            </div>

            {/* Display Products */}
            <div>
                {filteredProducts.length > 0 ? (
                    <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                        {filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                ) : (
                    <p>No products found.</p>
                )}
            </div>
        </div>
    );
};

export default Home;
