// // import Link from 'next/link';
// 'use client'
// import { useRouter } from 'next/navigation';
// import React from 'react';
// import Link from 'next/link'
// import styles from '../styles/app.module.css';

// export default function GoHome() {
//     // const router = useRouter;

//     // const handleClick =() =>{
//     //     router.push('/');
//     // } 
//     return (
//         <div className= {styles.homestyle}>
//             {/* <div>
//                 <button 
//                  onClick={ handleClick}
//                 >Home</button>
//             </div> */}

//             <div>
//                 <Link href={"/"}>
//                 </Link>
//             </div>

//         </div>
//     );
// }


// components/gohome.jsx
import styles from '../styles/app.module.css'
import Link from 'next/link';

export default function GoHome() {
  return (
    <div className= {styles.homestyle}>
      <Link href="/">
          Return Home
      </Link>
    </div>
  );
}
