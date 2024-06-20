"use client"
import styles from '../styles/app.module.css';
import React, { useState } from 'react';
import axios from 'axios';
import Search from '../components/search'
import Cards from '../components/cards';
import { maxHeaderSize } from 'http';
import InfiniteScroll from "react-infinite-scroll-component";
import data from './sampledata.json'
import { Snippet } from 'next/font/google';
import GoHome from "@/components/gohome";
import { useSession, signIn, signOut } from 'next-auth/react';

async function fetchdata(query = '') {
  try {
    const arr = [];
    // const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search?key=AIzaSyD0hZ2UUgbazEwDfA7uh-W3B7aAwzR5TcM&maxResults=30');
    const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: {
        key: 'AIzaSyD0hZ2UUgbazEwDfA7uh-W3B7aAwzR5TcM',
        q: query,
        maxResults: 30,
        part: "snippet",
        type: "video",
        page: 1

      }
    });

    let cnt = 0;
    for (let item of data.items) {
      arr.push(item);
      cnt++;
      if (cnt == 15) break;
    }
    console.log(arr);
    return arr;
  } catch (e) {
    console.log("error!!");
    throw e;
  }
}

const fetchMoredata = async () => {

  const { data } = await axios.get('https://www.googleapis.com/youtube/v3/search', {
    params: {
      key: 'AIzaSyD0hZ2UUgbazEwDfA7uh-W3B7aAwzR5TcM',
      maxResults: 30
    }
  });


}

export default function Home() {

  // const articles = await fetchdata();
  let articles = data;
  // const [Articles , setArticles] = useState([]);

  // authorization
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

      {/* <InfiniteScroll
     dataLength={data.length}
     next= {fetchMoredata}
     hasMore = {true}
    //  loader = {}
     > */}

      <button onClick={() => signOut()}>Sign out</button>

      <div className={styles.container}>
        <Search />
        <div className={styles.grid}>
          {articles.map((ele) => {
            return (
              <div key={ele.id.videoId} className={styles.displaycard}>
                <Cards id={ele.id} />
              </div>
            );
          })}
        </div>
      </div>

      {/* </InfiniteScroll> */}
    </>
  );
}
