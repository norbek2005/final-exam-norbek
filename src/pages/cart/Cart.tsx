import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import ProductRating from '../categories/ProductRating';
import { useDispatch } from 'react-redux';
import { addLike } from '../../reduxToolkit/likeSlice';
import { removeCart } from '../../reduxToolkit/cartSlice';
import { TbShoppingCartHeart, TbShoppingCartOff, TbShoppingBagPlus } from 'react-icons/tb';

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  rating: number;
}

const Cart = () => {
  const cartProducts = useSelector((state: any) => state.cart);
  const dispatch = useDispatch();

  const uniqueProducts = cartProducts.reduce((acc: ProductData[], product: ProductData) => {
    if (!acc.some((p) => p.id === product.id)) {
      acc.push(product);
    }
    return acc;
  }, []);

  const handleAddToLike = (product: ProductData) => {
    dispatch(addLike(product));
  };

  const handleRemoveToCart = (product: ProductData) => {
    dispatch(removeCart(product));
  }

  return (
    <div className="product-wrapper">
      {uniqueProducts.length === 0 ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <h2 style={{display: 'flex', justifyContent: 'center', color: 'red', padding: '20px', backgroundColor: 'whitesmoke', border: '1px solid gray', width: '30%', borderRadius: '10px' }}>Your cart is empty<TbShoppingCartOff /></h2>
          <Link style={{ marginTop: '20px', fontSize: '20px', textDecoration: 'none' }} to="/allproducts">Go to all products<TbShoppingBagPlus /></Link>
        </div>
      ) : (
        <>
          <h2>Your Cart</h2>
          <div className="product-container">
            {uniqueProducts.map((product: ProductData) => (
              <div key={product.id} className="product-item">
                <Link style={{ width: '100%', textDecoration: 'none', color: 'black', height: '100%' }} to={`/singleproduct/${product.id}`}>
                  <img src={product.images[0]} alt={product.title} />
                  <h3 className="product-title">{product.title}</h3>
                  <p className="product-price">Price: ${product.price}</p>
                  {product.rating && <ProductRating rating={product.rating} />}
                </Link>
                <button onClick={() => handleRemoveToCart(product)} className="product-button">Remove to cart</button>
                <button onClick={() => handleAddToLike(product)} className="product-like-button">
                  <TbShoppingCartHeart />
                </button>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
