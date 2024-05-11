import React, { useState, useEffect } from 'react';
import { FaPlay } from "react-icons/fa";
import { CiPause1 } from "react-icons/ci";
import './Swiper.css';
import { Link } from 'react-router-dom';

const MyCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const images = [
    {
      src: 'https://i.ebayimg.com/00/s/ODI2WDIyNzY=/z/fPoAAOSwZE5mHTet/$_57.JPG',
    },
    {
      src: 'https://us-i.makeupstore.com/m/mo/mo9shuvahyct.jpg',
    },
    {
      src: 'https://i.ebayimg.com/thumbs/images/g/crkAAOSwclFk6Npy/s-l1200.webp',
    },
    {
      src: 'https://i.ebayimg.com/00/s/NTgxWDE2MDA=/z/t~AAAOSwUdNmJ4w4/$_57.JPG',
    },
    {
      src: 'https://us-i.makeupstore.com/r/ra/radfi2bexsay.jpg',
    },
    {
      src: 'https://i.makeupstore.uz/a/am/am7yas8apkai.jpg',
    },
    {
      src: 'https://i.ebayimg.com/thumbs/images/g/ixIAAOSwPrdk6NrF/s-l1200.webp',
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
      }
    }, 4000);

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="carousel-container">
      <div className="carousel">
        <Link to="/allproducts">
          <img
            src={images[activeIndex].src}
            alt={`Slide ${activeIndex + 1}`}
          />
        </Link>
        <div className="controls">
          <button className="carousel-button" onClick={handlePrev}>{'<'}</button>
          <button className="carousel-button" onClick={handleNext}>{'>'}</button>
        </div>
        <button className="pause-btn" onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? <FaPlay style={{ fontSize: '18px', marginLeft: '4px' }} /> : <CiPause1 style={{ fontSize: '20px' }} />}
        </button>
      </div>
    </div>
  );
};

export default MyCarousel;
