import React, { useEffect, useState } from 'react';
import { GoArrowRight } from 'react-icons/go';
import './Product.css';
import ProductRating from '../../pages/categories/ProductRating';
import { TbShoppingCartHeart } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addLike } from '../../reduxToolkit/likeSlice';
import { addCart } from '../../reduxToolkit/cartSlice';

interface ProductData {
    id: number;
    title: string;
    description: string;
    price: number;
    thumbnail: string;
    images: string[];
    rating: number;
}

const Product = () => {
    const [productData, setProductData] = useState<ProductData[]>([]);
    const [loading, setLoading] = useState(true);
    const [topRatedProducts, setTopRatedProducts] = useState<ProductData[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products/category/mens-shoes');
                const { products } = await response.json();
                setProductData(products);
            } catch (error) {
                console.error('Xato:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchTopRatedProducts = async () => {
            try {
                const response = await fetch('https://dummyjson.com/products');
                const { products } = await response.json();
                const topRated = products.sort((a: ProductData, b: ProductData) => b.rating - a.rating).slice(0, 5);
                setTopRatedProducts(topRated);
            } catch (error) {
                console.error('Xato:', error);
            }
        };

        fetchTopRatedProducts();
    }, []);

    const handleLike = (product: ProductData) => {
        dispatch(addLike(product));
    };
    const handleCart = (product: ProductData) => {
        dispatch(addCart(product));
    };

    return (
        <div className="product-wrapper">
            <h2>Mens Shoes</h2>
            <h3 className='product-see-all'><Link to="/allproducts">See All<GoArrowRight style={{ marginLeft: '5px', fontSize: '25px' }} /></Link></h3>
            <div className="product-container rated-product">
                {loading ? (
                    <p>Loading...</p>
                ) : productData && productData.length > 0 ? (
                    productData.map((product: ProductData) => (
                        <div key={product.id} className="product-item">
                            <Link style={{ width: '100%', textDecoration: 'none', color: 'black', height: '100%' }} to={`/singleproduct/${product.id}`}>
                                <img src={product.images[1]} alt={product.title} />
                                <h3 className="product-title">{product.title}</h3>
                                <p className="product-price">Price: ${product.price}</p>
                                {product.rating && (
                                    <ProductRating rating={product.rating} />
                                )}

                            </Link>
                            <button onClick={() => handleCart(product)} className="product-button">Add to cart</button>
                            <button onClick={() => handleLike(product)} className="product-like-button"><TbShoppingCartHeart /></button>
                        </div>
                    ))
                ) : (
                    <p>Mahsulotlar topilmadi.</p>
                )}
            </div>
            <div className="product-banner">
                <div className="product-banner-text">
                    <p className='product-banner-title'>More than two wheels</p>
                    <p className='product-banner-subtitle'>Parts you need. Prices you want.</p>
                    <Link to="/allproducts"><button className='product-banner-button'>Shop parts</button></Link>
                </div>
                <div className="product-banner-bg"></div>
            </div>
            <div className="favorite-product">
                <a href="#">
                    <div className="favorite-text-frame">
                        <p className='favorite-product-title'>
                            All your favorite collectibles right here
                        </p>
                        <p className='favorite-product-text'>
                            It doesn't take special powers to find what you want on eBay.
                        </p>
                    </div>
                </a>
                <a href="#">
                    <button className="favorite-product-button">
                        Shop now
                    </button>
                </a>
            </div>
            <h2 style={{ marginTop: '20px' }}>Top Rated</h2>
            <h3 className='product-see-all'><Link to="/allproducts">See All<GoArrowRight style={{ marginLeft: '5px', fontSize: '25px' }} /></Link></h3>
            <div className="rated-product">
                {topRatedProducts.map((product: ProductData) => (
                    <div key={product.id} className="product-item">
                        <Link style={{ width: '100%', textDecoration: 'none', color: 'black', height: '100%' }} to={`/singleproduct/${product.id}`}>
                            <img src={product.images[1]} alt={product.title} />
                            <h3 className="product-title">{product.title}</h3>
                            <p className="product-price">Price: ${product.price}</p>
                            {product.rating && (
                                <ProductRating rating={product.rating} />
                            )}
                        </Link>
                        <button onClick={() => handleCart(product)} className="product-button">Add to cart</button>
                        <button onClick={() => handleLike(product)} className="product-like-button"><TbShoppingCartHeart /></button>
                    </div>
                ))}
            </div>
            <div className="product-banner2">
                <div className="product-banner-text2">
                    <p className='product-banner-title2'>More than two wheels</p>
                    <p className='product-banner-subtitle2'>Parts you need. Prices you want.</p>
                    <a href="/allproducts"><button className='product-banner-button2'>Shop parts</button></a>
                </div>
                <div className="product-banner-bg2"></div>
            </div>
        </div>
    );
};

export default Product;
