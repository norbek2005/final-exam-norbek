import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import './Like.css';
import ProductRating from '../categories/ProductRating';
import { useDispatch } from 'react-redux';
import { removeLike } from '../../reduxToolkit/likeSlice';
import { addCart } from '../../reduxToolkit/cartSlice';
import { LuHeartOff } from 'react-icons/lu';
import { TbShoppingBagPlus, TbShoppingCartOff } from 'react-icons/tb';


interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  rating: number;
}

const Like = () => {
  const likedProducts = useSelector((state: any) => state.like);
  const dispatch = useDispatch();

  const uniqueProducts = likedProducts.reduce((acc: ProductData[], product: ProductData) => {
    if (!acc.some((p) => p.id === product.id)) {
      acc.push(product);
    }
    return acc;
  }, []);

  const dislike = (product: ProductData) => {
    dispatch(removeLike(product));
  };

  const handleAddToCart = (product: ProductData) => {
    dispatch(addCart(product));
  }  

  return (
    <div className="product-wrapper">
    {uniqueProducts.length === 0 ? (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <h2 style={{display: 'flex', justifyContent: 'center', color: 'red', padding: '20px', backgroundColor: 'whitesmoke', border: '1px solid gray', width: '30%', borderRadius: '10px' }}>Your wishlist is empty<TbShoppingCartOff /></h2>
        <Link style={{ marginTop: '20px', fontSize: '20px', textDecoration: 'none' }} to="/allproducts">Go to all products<TbShoppingBagPlus /></Link>
      </div>
    ) : (
      <>
        <h2>Your Wishlist</h2>
        <div className="product-container">
          {uniqueProducts.map((product: ProductData) => (
            <div key={product.id} className="product-item">
              <Link style={{ width: '100%', textDecoration: 'none', color: 'black', height: '100%' }} to={`/singleproduct/${product.id}`}>
                <img src={product.images[0]} alt={product.title} />
                <h3 className="product-title">{product.title}</h3>
                <p className="product-price">Price: ${product.price}</p>
                {product.rating && <ProductRating rating={product.rating} />}
              </Link>
              <button onClick={() => handleAddToCart(product)} className="product-button">Add to cart</button>
              <button onClick={() => dislike(product)} className="product-like-button">
                <LuHeartOff />
              </button>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
  );
};

export default Like;
