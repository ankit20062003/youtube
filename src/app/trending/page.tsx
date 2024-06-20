"use client"
import Image from 'next/image';
import axios from 'axios';
import dummydata from './dummydata.json'
import { YouTubeResponse, YouTubeVideo } from '../../../types/types.js';
import VideoCard from '@/components/videocard';
import React from 'react'
import GoHome from "@/components/gohome";

import { useSession, signIn, signOut } from 'next-auth/react';



const TrendingVideos = () => {

  // const API_KEY = 'AIzaSyD0hZ2UUgbazEwDfA7uh-W3B7aAwzR5TcM';
  try {

    // const res = await axios.get<YouTubeResponse>(`https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&maxResults=10&key=${API_KEY}`);
    // const videos :YouTubeVideo = res.items;
    const videos = dummydata.items;


    // return (
    //   <div>

    //     <h1>Trending Videos</h1>
    //     <div>
    //       {videos.map((video) => (
    //         <div key={video.id}>
    //           <h3>{video.snippet.title}</h3>
    //           <p>{video.snippet.description}</p>
    //           <Image
    //             src={video.snippet.thumbnails.default.url}
    //             alt={video.snippet.title}
    //             width={video.snippet.thumbnails.default.width}
    //             height={video.snippet.thumbnails.default.height}
    //           />
    //         </div>
    //       ))}
    //     </div>
    //   </div>
    // );


    // status in nextauth

    const { data: session } = useSession();
    if (session === null) {
      return (
        <>
          <p>Not signed In</p> <br />
          <button onClick={() => signIn()}>Login</button>
        </>
  
      )
    }

    return (
      <>
        

        <h1>Trending Videos</h1>
        <GoHome />

        <div className="video-list">
          {videos.map((video) => (
              <div key={video.id}>
                {/* <VideoCard/> */}
                <VideoCard
                  // key={video.id}
                  id= {video.id}
                  title={video.snippet.title}
                  thumbnail={video.snippet.thumbnails.default.url}
                />
              </div>
          ))}

        </div>
      </>
    );
  } catch (error) {

    <p>Failed to load trending videos</p>;
    throw error;
  }

};

export default TrendingVideos;
