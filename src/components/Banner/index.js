import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import './styles.css';

const banners = [
  { _id: uuid(), image: './banner/banner1.jpg' },
  {
    _id: uuid(),
    image: './banner/banner2.jpg',
  },
  {
    _id: uuid(),
    image: './banner/banner3.jpg',
  },
  {
    _id: uuid(),
    image: './banner/banner4.jpg',
  },
  {
    _id: uuid(),
    image: './banner/banner5.jpg',
  },
  { _id: uuid(), image: './banner/banner6.jpg' },
  { _id: uuid(), image: './banner/banner7.jpg' },
];

const Banner = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const updateIndex = (newIndex) => {
    if (newIndex < 0) {
      newIndex = banners.length - 1;
    } else if (newIndex >= banners.length) {
      newIndex = 0;
    }
    setActiveIndex(newIndex);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!paused) {
        updateIndex(activeIndex + 1);
      }
    }, 5000);
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  });

  return (
    <div
      className="banner"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {banners.map((item, index) => {
        let position = 'active';
        if (index < activeIndex) {
          position = 'prev';
        }
        if (index > activeIndex) {
          position = 'next';
        }
        return (
          <div key={item._id} className={`slider__img ${position}`}>
            <img src={item.image} alt={item.image} />
          </div>
        );
      })}
      <div
        className="btn__banner prev"
        onClick={(e) => {
          e.preventDefault();
          updateIndex(activeIndex - 1);
        }}
      >
        <i className="bx bx-chevron-left"></i>
      </div>
      <div
        className="btn__banner next"
        onClick={(e) => {
          e.preventDefault();
          updateIndex(activeIndex - 1);
        }}
      >
        <i className="bx bx-chevron-right"></i>
      </div>
    </div>
  );
};

export default Banner;
