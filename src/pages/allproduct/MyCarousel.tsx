import React, { useState, useEffect } from 'react';
import { FaPlay } from "react-icons/fa";
import { CiPause1 } from "react-icons/ci";
import './Allproducts.css';
import { Link } from 'react-router-dom';

const MyCarousel2: React.FC = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const images = [
        {
            src: 'https://us-i.makeupstore.com/w/we/we06wfp820gv.jpg',
        },
        {
            src: 'https://us-i.makeupstore.com/7/71/71zaserq5kxk.jpg',
        },
        {
            src: 'https://us-i.makeupstore.com/g/gc/gc6xrqrtuuyo.jpg',
        },
        {
            src: 'https://us-i.makeupstore.com/m/ma/mafczdd4iuxq.jpg',
        },
        {
            src: 'https://us-i.makeupstore.com/2/2g/2gul6yglipiv.jpg',
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
            <div className="carousel" style={{cursor: 'pointer'}}>
                    <img
                        src={images[activeIndex].src}
                        alt={`Slide ${activeIndex + 1}`}
                    />
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

export default MyCarousel2;
