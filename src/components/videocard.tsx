// components/VideoCard.jsx
import React from 'react';
import '../../public/play.png'
import styles from '../styles/videocard.module.css'
import Image from 'next/image';
import Link from 'next/link';


const VideoCard = ({ id, title, thumbnail }: any) => {
  const videoUrl = `https://www.youtube.com/embed/${id}`;

  return (
    <div className={styles.cards}>
      <div className={styles.thumbnail}>
        <img src={thumbnail} alt={title} />
        <div className={styles.playButton}>
          <Link href={videoUrl}  target="_blank" >
            <Image
              src="/play.png"
              width={100}
              height={100}
              alt="play button"
            />
          </Link>
        </div>
      </div>
      <div className={styles.title}>
        <p>{title}</p>
      </div>
    </div>
  );
};

export default VideoCard;
