'use client'
import styles from '../styles/app.module.css';
import { useState } from 'react';
import axios from 'axios';
import { YouTubeResponse, YouTubeVideo } from '../../types/types.js';
import Image from 'next/image';

const Search = () => {
  const [query, setQuery] = useState('');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);

  const handlesearch = async (event : any) => {
    event.preventDefault();
    if (!query) return;

    const API_KEY =  'AIzaSyD0hZ2UUgbazEwDfA7uh-W3B7aAwzR5TcM'; 
    const response = await axios.get<YouTubeResponse>(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${query}&key=${API_KEY}`
    );

    setVideos(response.data.items);
  };

  return (
    <div>
        <form onSubmit={handlesearch} className={styles.searchForm} >
        
             <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for videos"
                className={styles.searchInput}
              />
              <button type="submit" className={styles.searchButton}>Search</button>
            </form>
      <div>
      {videos.map((video) => (
          <div key={video.id.videoId}>
            <h3>{video.snippet.title === null ? "" : video.snippet.title}</h3>
            <p>{video.snippet.description ===null ? "" : video.snippet.description}</p>
            <Image
              src={video.snippet.thumbnails.default.url === null ? "https://www.shutterstock.com/image-photo/skeptic-surprised-cat-thinking-dont-know-1905929728" :video.snippet.thumbnails.default.url  }
              alt={video.snippet.title === null ? "" : video.snippet.title }
              width={50}
              height={50}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
