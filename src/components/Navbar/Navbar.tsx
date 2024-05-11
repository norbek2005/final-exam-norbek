import { LuHeartHandshake } from "react-icons/lu";
import { FiShoppingCart } from "react-icons/fi";
import { IoIosSearch } from "react-icons/io";
import { SlArrowDown } from "react-icons/sl";
import Logo from '../../assets/images/ebayLogo2.png';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import './Navbar.css';
import ProductRating from '../../pages/categories/ProductRating';
import { TbShoppingCartHeart } from "react-icons/tb";
import { MdOutlineRemoveShoppingCart } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addLike } from "../../reduxToolkit/likeSlice";
import { addCart } from "../../reduxToolkit/cartSlice";
import { FaSearchengin } from "react-icons/fa";

interface ProductData {
  id: number;
  title: string;
  description: string;
  price: number;
  thumbnail: string;
  images: string[];
  rating: number;
}

const Navbar = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const categoryName = pathname.split('/').pop();
  const [isActive, setIsActive] = useState(false);
  const [isRotated, setIsRotated] = useState(false);
  const [category, setCategory] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [submittedQuery, setSubmittedQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`https://dummyjson.com/products/search?q=${submittedQuery}`);
        const data = await response.json();
        setProducts(data.products);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    if (submittedQuery) {
      fetchData();
    }
  }, [submittedQuery]);


  const handleInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setProducts([]);
    setSubmittedQuery(searchQuery);
  };



  fetch('https://dummyjson.com/products/categories')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const eightCategories = data.slice(0, 14);
      setCategory(eightCategories);
    })
    .catch(error => {
      console.error('There was a problem fetching the data:', error);
    });


  const handleToggleRotation = () => {
    setIsRotated(!isRotated);
  };
  const handleToggle = () => {
    setIsActive(!isActive);
  };
  const handleAddToCart = (product: ProductData) => {
    dispatch(addCart(product));
  }
  const handleLike = (product: ProductData) => {
    dispatch(addLike(product));
  }

  return (
    <div className="nav-container">
      <div className="nav-wrapper">
        <ul className="nav-list1">
          <li className="nav-item1">Hi!<Link style={{ marginLeft: '5px' }} className="nav-link" to="/login">sign-up</Link><span className="or">or</span><Link className="nav-link" to="/register">register</Link></li>
          <li className="nav-item1"><a className="nav-link1" href="#">Daily Details</a></li>
          <li className="nav-item1"><a className="nav-link1" href="#">Help & Contact</a></li>
        </ul>
        <ul className="nav-list1">
          <li className="nav-item1"><a className="nav-link1" href="#">Sell</a></li>
          <li className="nav-item1"><a className="nav-link1" href="#">Watchlist <SlArrowDown /></a></li>
          <li className="nav-item1"><a className="nav-link1" href="#">My eBay  <SlArrowDown /></a></li>
          <li className="nav-item1">
            <Link to="/wishlist"><LuHeartHandshake className="nav-icon1" /></Link>
            <Link to="/cart"><FiShoppingCart className="nav-icon2" /></Link>
          </li>
        </ul>
      </div>
      <div className="nav-frame">
        <ul className="nav-list2">
          <li className="nav-item2"><a href="/"><img src={Logo} alt="site-logo" style={{ width: 120, height: 48 }} /></a></li>
          <li className={`nav-item2 ${isActive ? 'active' : ''}`} onClick={handleToggle}>
            <p className="nav-category" onClick={handleToggleRotation}>Shop by category <span className={isRotated ? 'nav-icon3 rotated' : 'nav-icon3'}><SlArrowDown /></span></p>
            {isActive && (
              <div className="category-dropdown">
                <h4>Categories</h4>
                <ul>
                  {
                    category.map((item, index) => (
                      <li key={index} className="nav-category-item"><Link to={`/category/${item}`}>{item}</Link></li>
                    ))
                  }
                </ul>
              </div>
            )}
          </li>
          <li className="nav-item2 nav-search">
            <IoIosSearch />
            <form onSubmit={handleSubmit}>
              <input
                className="search-bar"
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
              />
              <select>
                <option value="All">All Categories</option>
                <option value="Clothing">Clothing</option>
                <option value="Electronics">Electronics</option>
                <option value="Home">Home</option>
                <option value="Sports">Sports</option>
                <option value="Toys">Toys</option>
                <option value="Other">Other</option>
              </select>
              <button className="button-9">Search</button>
            </form>
          </li>
          <li className="nav-item2"><a className="advanced-link" href="#">Advanced</a></li>
        </ul>
      </div>
      <div className="nav-categories">
        <ul className="nav-category-list">
          {
            category.map((item, index) => (
              <li key={index} className="nav-category-item"><Link to={`/category/${item}`}>{item}</Link></li>
            ))
          }
        </ul>
      </div>
      <div className='product-wrapper'>
        <div className="product-container">
          {!submittedQuery && products.length === 0 && (
            <div className='not-found find'>find the product you need faster through search<FaSearchengin /></div>
          )}
          {loading ? (
            <div className='loader'></div>
          ) : (
            <>
              {products.length === 0 && submittedQuery && (
                <div className='not-found'>Product not found<MdOutlineRemoveShoppingCart /></div>
              )}
              {products.map((product: ProductData) => (
                <div key={product.id} className="product-item">
                  <Link to={`/singleproduct/${product.id}`} style={{ width: '100%', textDecoration: 'none', color: 'black', height: '100%' }}>
                    <img src={product.images[0]} alt={product.title} />
                    <h3 className="product-title">{product.title}</h3>
                    <p className="product-price">Price: ${product.price}</p>
                    <ProductRating rating={product.rating} />
                  </Link>
                  <button onClick={() => handleAddToCart(product)} className="product-button">Add to Cart</button>
                  <button onClick={() => handleLike(product)} className="product-like-button"><TbShoppingCartHeart /></button>
                </div>
              ))}
            </>
          )}
        </div>
      </div>


    </div>
  );
}

export default Navbar;
