'use client'
import PropTypes from "prop-types";
import React from 'react'


export default function Cards({id}: any) {

    return (
        <>

          <div className ="cards">
          <iframe  width="560" height="315" src ={`https://www.youtube.com/embed/${id.videoId}?si=br0MQF-6DcpmyWe6`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen ></iframe>

          <div></div>
          </div>
           
        </>
    )
}

// components/cards.jsx
// import React from 'react';
// import styles from '../styles/cards.module.css';
// import Image  from 'next/image';

// export default function Cards({ id } : any) {
//   const videoUrl = `https://www.youtube.com/watch?v=${id.videoId}`;

//   return (
//     <div className={styles.card}>
//       <a href={videoUrl} target="_blank" rel="noopener noreferrer">
//         {/* Add your card content here */}
//         {/* <img src={id.snippet.thumbnails.default.url} alt={id.snippet.title} /> */}
//         <Image
//                 src={video.snippet.thumbnails.default.url}
//                 alt={video.snippet.title}
//                 width={video.snippet.thumbnails.default.width}
//                 height={video.snippet.thumbnails.default.height}
//               />
//         <h3>{id.snippet.title}</h3>
//       </a>
//     </div>
//   );
// }




