"use client"
import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react';
import GoHome from "@/components/gohome";



function MostLiked() {

  const { data: session } = useSession();


  return (
    <div>
        <GoHome />

      These are the most liked videos
    </div>
  )
}

export default MostLiked
