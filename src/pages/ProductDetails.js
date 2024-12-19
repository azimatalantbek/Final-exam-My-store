import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchProductById } from '../services/api';
import Spinner from '../components/Spinner';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchProductById(id)
            .then((data) => {
                setProduct(data);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching product details:", error);
                setLoading(false);
            });
    }, [id]);

    if (loading) return <Spinner />;
    if (!product) return <p>Product not found!</p>;

    return (
        <div>
            <h1>{product.title}</h1>
            <img src={product.image} alt={product.title} style={{ maxWidth: '300px' }} />
            <p>{product.description}</p>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Category:</strong> {product.category}</p>
        </div>
    );
};

export default ProductDetails;
