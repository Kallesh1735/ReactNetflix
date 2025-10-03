import React, { useEffect, useRef, useState } from 'react';
import './TitleCards.css';
import cards_data from '../../assets/cards/Cards_data'
import { Link } from 'react-router-dom';


const TitleCards = ({ title, category }) => {
  const [apiData, setApiData] = useState([]);
  const cardsRef = useRef();

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjAzMjkwZmJiNmViN2I4MGRmNGMzYTRlOTBjZTg5OCIsIm5iZiI6MTc0MjUzMzI4NC45NTI5OTk4LCJzdWIiOiI2N2RjZjJhNGFkZjIxYTE2NjhmNTQxN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3qCpXuUrWHyZT3XjEbspMIFwhmjkF2iMPp5zmNkRTw4'
    }
  };

  useEffect(() => {
    if (!category) return;

    console.log(`Fetching data for category: ${category}`);

    fetch(`https://api.themoviedb.org/3/movie/${category}?language=en-US&page=1&timestamp=${Date.now()}`, options)
      .then(res => res.json())
      .then(res => {
        console.log(`Fetched data for ${category}:`, res.results);
        setApiData(res.results || []);
      })
      .catch(err => console.error(`Error fetching ${category}:`, err));
  }, [category]);

  useEffect(() => {
    const handleWheel = (event) => {
      event.preventDefault();
      if (cardsRef.current) {
        cardsRef.current.scrollLeft += event.deltaY;
      }
    };

    const cardList = cardsRef.current;
    if (cardList) {
      cardList.addEventListener('wheel', handleWheel);
    }

    return () => {
      if (cardList) {
        cardList.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className='title-cards'>
      <h2>{title}</h2>
      <div className="card-list" ref={cardsRef}>
        {apiData.length > 0 ? (
          apiData.map((card) => (
            <Link to = {`/player/${card.id}`} className="card" key={card.id}>
              <img 
                src={card.backdrop_path 
                  ? `https://image.tmdb.org/t/p/w500${card.backdrop_path}` 
                  : 'https://dummyimage.com/240x135/000/fff&text=No+Image'} 
                alt={card.original_title || 'No Title'} 
                className="card-img"
              />
              <p className="card-title">{card.original_title || 'Untitled'}</p>
            </Link>
          ))
        ) : (
          <p className="loading-text">Loading movies...</p>
        )}
      </div>
    </div>
  );
};

export default TitleCards;
