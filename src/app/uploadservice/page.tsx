"use client"
import UploadForm from '@/components/uploadform'
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';
import GoHome from "@/components/gohome";



const UploadPage = () => {

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
        <div>
            <h1>Upload a Video</h1>
            <GoHome/>
            <UploadForm />
        </div>
    );
};

export default UploadPage;
