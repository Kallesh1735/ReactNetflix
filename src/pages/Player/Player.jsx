import React, { useEffect, useState } from 'react';
import './Player.css';
import back_arrow_icon from '../../assets/back_arrow_icon.png';
import { useNavigate, useParams } from 'react-router-dom';

const Player = () => {
const {id} = useParams();

const  navigate=useNavigate()

  const [apiData, setApiData] = useState({
    name: "",
    key: "",
    published_at: "",
    type: "" // ✅ Changed `typeof` to `type`
  });

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5YjAzMjkwZmJiNmViN2I4MGRmNGMzYTRlOTBjZTg5OCIsIm5iZiI6MTc0MjUzMzI4NC45NTI5OTk4LCJzdWIiOiI2N2RjZjJhNGFkZjIxYTE2NjhmNTQxN2EiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.3qCpXuUrWHyZT3XjEbspMIFwhmjkF2iMPp5zmNkRTw4'
    }
  };

  useEffect(() => {
    fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
      .then(res => res.json())
      .then(res => {
        if (res.results.length > 0) {
          setApiData(res.results[0]); // ✅ Ensures we have data before updating state
        }
      })
      .catch(err => console.error("Error fetching video:", err));
  }, []);

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-2)}}/>
      
      {/* ✅ Fixed iframe URL */}
      <iframe 
        width='90%' 
        height='90%' 
        src={`https://www.youtube.com/embed/${apiData.key}`} 
        title='trailer' 
        frameBorder='0' 
        allowFullScreen
      ></iframe>

      <div className="player-info">
        <p>{apiData.published_at.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>
    </div>
  );
}

export default Player;
