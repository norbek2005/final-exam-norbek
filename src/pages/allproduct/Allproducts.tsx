import React, { useEffect, useState } from 'react';
import ProductRating from '../../pages/categories/ProductRating';
import { TbShoppingCartHeart } from 'react-icons/tb';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './Allproducts.css';
import { addLike } from '../../reduxToolkit/likeSlice';
import { addCart } from '../../reduxToolkit/cartSlice';
import MyCarousel2 from './MyCarousel';

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  rating: number;
}

const Allproducts = () => {
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
      const fetchData = async () => {
          try {
              const response = await fetch('https://dummyjson.com/products?limit=100&skip=0');
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

  const handleLike = (product: ProductData) => {
      dispatch(addLike(product));
  };

  const handleCart = (product: ProductData) => {
      dispatch(addCart(product));
  }
  return (
    <div className="product-wrapper">
        <MyCarousel2 />
            <h2 style={{textTransform: 'capitalize', marginTop: '30px'}}>All Products</h2>
            <div className="product-container rated-product">
                {loading ? (
                    <p>Loading...</p>
                ) : productData && productData.length > 0 ? (
                    productData.map((product: ProductData) => (
                        <div key={product.id} className="product-item">
                            <Link style={{ width: '100%', textDecoration: 'none', color: 'black', height: '100%' }} to={`/singleproduct/${product.id}`}>
                                <img src={product.images[0]} alt={product.title} />
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
        </div>
  )
}

export default Allproducts