import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/navigation';
import 'swiper/css/thumbs';
import './Single.css';
import { FreeMode, Navigation, Thumbs } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useDispatch } from 'react-redux';
import { addLike } from '../../reduxToolkit/likeSlice';
import { addCart } from '../../reduxToolkit/cartSlice';
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { TbShoppingCartHeart } from 'react-icons/tb';
import ProductRating from '../categories/ProductRating';
import { GiAirplaneDeparture } from "react-icons/gi";
import { TbRefreshAlert } from "react-icons/tb";
import { FaCcVisa } from "react-icons/fa6";
import { FaCcMastercard } from "react-icons/fa6";
import { FaCcApplePay } from "react-icons/fa";
import { FaGooglePay } from "react-icons/fa6";
import { FaCcPaypal } from "react-icons/fa";
import { FaCcAmex } from "react-icons/fa6";
import { FaCcDiscover } from "react-icons/fa6";
import { RiShoppingBag4Line } from "react-icons/ri";

interface Product {
  id: number;
  images: string[];
  title: string;
  category: string;
  brand: string;
  rating: number;
  description: string;
  price: number;
  discountPercentage: number;
  stock: number;
}

const Single: React.FC = () => {
  const [thumbsSwiper, setThumbsSwiper] = useState<Swiper | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();

  const addToCart = (product: Product) => {
    dispatch(addCart(product));
  };

  const addToLike = (product: Product) => {
    dispatch(addLike(product));
  };

  useEffect(() => {
    axios(`https://dummyjson.com/products/${id}`)
      .then(res => setProducts(res.data));
  }, [id]);

  return (
    <>
      <div className='single_page_wrapper'>
        <div className='single_page_container'>
          <div className='swiper_controller'>
            <Swiper
              style={{
                '--swiper-navigation-color': '#fff',
                '--swiper-pagination-color': '#fff',
              }}
              spaceBetween={10}
              navigation={true}
              thumbs={{ swiper: thumbsSwiper }}
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiper_wrapper"
            >
              {products?.images?.map((img: string) => <SwiperSlide key={img}><img src={img} alt="" /></SwiperSlide>)}
            </Swiper>
            <Swiper
              onSwiper={setThumbsSwiper}
              spaceBetween={10}
              slidesPerView={4}
              freeMode={true}
              watchSlidesProgress={true}
              modules={[FreeMode, Navigation, Thumbs]}
              className="swiper_wrapper2"
            >
              {products?.images?.map((img: string) => <SwiperSlide className='swiper_slide1' key={img}><img src={img} alt="" /></SwiperSlide>)}
            </Swiper>
          </div>
          <div className='single_page_content'>
            <h1 className='single_title'><span>Name: </span>{products?.title}</h1>
            <p className='single_category'><span>category: </span> {products?.category}</p>
            <p className='single_brand'><span>brand: </span>{products?.brand}</p>
            <p className='single_rating'>{products?.rating && <ProductRating rating={products.rating} />}</p>
            <p className='single_description'><span>description: </span> {products?.description}</p>
            <p className='single_description'><span>Stock: </span> {products?.stock}</p>
            <p className='single_price'><b>price: </b> {products?.price}$ <span>{products?.discountPercentage}% off</span></p>
            <div className='single_buttons'>
              <button onClick={() => addToCart(products)} className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  Buy Now<RiShoppingBag4Line />
                </span>
              </button>
              <button onClick={() => addToLike(products)} className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  add to watchlist<TbShoppingCartHeart />
                </span>
              </button>
              <button onClick={() => addToCart(products)} className="button-82-pushable" role="button">
                <span className="button-82-shadow"></span>
                <span className="button-82-edge"></span>
                <span className="button-82-front text">
                  add to cart <MdOutlineLocalGroceryStore />
                </span>
              </button>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '30px', textTransform: 'capitalize' }} className="single_category"><span>Delivery: </span> FastAirlane<GiAirplaneDeparture style={{ fontSize: '22px', color: 'blue' }} /></p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '30px', textTransform: 'capitalize' }} className="single_category"><span>Returns: </span>30 days returns. Buyer pays for return shipping<TbRefreshAlert style={{ fontSize: '28px', color: 'red' }} /></p>
              <p style={{ display: 'flex', alignItems: 'center', gap: '5px', marginTop: '30px', textTransform: 'capitalize' }} className="single_category"><span>Payments: </span><FaCcPaypal style={{ fontSize: '70px', color: 'blue', cursor: 'pointer' }} /><FaGooglePay style={{ fontSize: '70px', color: 'yellowgreen', cursor: 'pointer' }} />
                <FaCcVisa style={{ fontSize: '70px', cursor: 'pointer', color: 'black' }} />
                <FaCcMastercard style={{ fontSize: '70px', cursor: 'pointer', color: 'orange' }} />
                <FaCcAmex style={{ fontSize: '70px', cursor: 'pointer', color: "steelblue" }} />
                <FaCcDiscover style={{ fontSize: '70px', cursor: 'pointer', color: 'red' }} />
                <FaCcApplePay style={{ fontSize: '70px', cursor: 'pointer', color: 'gray' }} />
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Single;
