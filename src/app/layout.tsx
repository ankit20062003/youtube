import type { Metadata } from "next";
import { Inter, Nanum_Gothic_Coding } from "next/font/google";
import "./globals.css";
import Image from "next/image"
import "./icon.png"
import { SessionProvider } from 'next-auth/react'
import SessionWrapper from '@/app/component/sessionwrapper'

// import GoHome from '../components/gohome.jsx'
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Youtube",

  description: "A youtube clone",
};


export default function RootLayout({
  children,
}: Readonly<{children: React.ReactNode;}>) {

  // const {data: session, status} = useSession();

   
  return (
    <html lang="en">
      <SessionWrapper>

      <body className={inter.className}>

          <div style={{ textAlign: "center", display: "flex", alignContent: "center", marginLeft: "50%" }}>
            <Image
              src="/icon.png"
              width={30}
              height={30}
              alt="Picture of the author"
            />
            <p style={{ padding: "2px 2px", fontFamily: "unset" }}>Youtube</p>
          </div>

          {children}


      </body>
      </SessionWrapper>

    </html>
  );
}


// url https://www.googleapis.com/youtube/v3/playlistItems?key=AIzaSyA4-mM6dQu6VHnVBvTCEVSUy9dzdLxShL0