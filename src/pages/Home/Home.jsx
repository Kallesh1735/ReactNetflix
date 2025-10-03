import React from 'react';
import './Home.css';
import Navbar from '../../Components/Navbar/Navbar';
import Footer from '../../Components/Footer/Footer';
import hero_banner from '../../assets/hero_banner.jpg';
import hero_title from '../../assets/hero_title.png';
import play_icon from '../../assets/play_icon.png';
import info_icon from '../../assets/info_icon.png';
import TitleCards from '../../Components/TitleCards/TitleCards';

const Home = () => {
  return (
    <div className='home'>
      <Navbar />
      <div className="hero">
        <img src={hero_banner} alt="" className='banner-img' />
        <div className="hero-caption">
          <img src={hero_title} alt="" className='caption-img' />
          <p>
            This is the movie image displaying on the screen which showcases and gives some good-looking appearance to images.
          </p>
          <div className="hero_btns">
            <button className='btn'><img src={play_icon} alt="" />Play</button>
            <button className='btn dark_btn'><img src={info_icon} alt="" />More Info</button>
          </div>

          {/* ✅ Popular on Netflix (back on hero section) */}
          <TitleCards key="popular_netflix" title="Popular on Netflix" category="popular" />
        </div>
      </div>

      {/* ✅ Other Categories */}
      <div className="title-card-section">
        <TitleCards key="top_rated" title="Only on Netflix" category="top_rated" />
        <TitleCards key="blockbuster" title="Blockbuster" category="popular" />
        <TitleCards key="top_picks" title="Top Picks" category="upcoming" />
        <TitleCards key="now_playing" title="Upcoming" category="now_playing" />
      </div>

      <Footer />
    </div>
  );
};

export default Home;
