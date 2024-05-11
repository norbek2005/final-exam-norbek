import React, { useEffect, useState } from 'react';
import ProductRating from './ProductRating';
import { useLocation } from 'react-router-dom';
import { TbShoppingCartHeart } from "react-icons/tb";
import './Categories.css';
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

const Categories = () => {
  const { pathname } = useLocation();
  const categoryName = pathname.split('/').pop();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${categoryName}`)
      .then((response) => response.json())
      .then((data) => {
        setProducts(data.products);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, [categoryName]);

  const handleAddLike = (product: ProductData) => {
    dispatch(addLike(product));
  }

  const handleAddCart = (product: ProductData) => {
    dispatch(addCart(product));
    console.log(product);

  }

  return (
    <div className='product-wrapper Categories'>
      <h2 style={{ textTransform: 'capitalize' }}>{categoryName}</h2>
      <div className="product-container">
        {
          loading ? <div className='loader'></div> : products.map((product: ProductData) => (
            <div key={product.id} className="product-item">
              <Link style={{ textDecoration: 'none', color: 'black', height: '100%' }} to={`/singleproduct/${product.id}`}>
                <img src={product.images[0]} alt={product.title} />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">Price: ${product.price}</p>
                <ProductRating rating={product.rating} />
              </Link>
              <button onClick={() => handleAddCart(product)} className="product-button">Add to Cart</button>
              <button onClick={() => handleAddLike(product)} className="product-like-button"><TbShoppingCartHeart /></button>
            </div>
          ))
        }
      </div>
    </div>
  );
};

export default Categories;
