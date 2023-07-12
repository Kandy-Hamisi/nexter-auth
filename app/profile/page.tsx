"use client"

import React from 'react'
import axios from 'axios'
import Link from 'next/link'
import { toast, Toaster } from 'react-hot-toast'
import { useRouter } from 'next/navigation'

const ProfilePage = () => {

  const router = useRouter();
  const [data, setData] = React.useState("noting")

  const logout = async () => {
    try {
      await axios.get('/api/users/logout');
      toast.success('Logout Success');
      router.push('/login');
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  const getUserDetails = async () => {
    const res = await axios.get('/api/users/me')
    console.log(res.data);
    setData(res.data.data._id);
  }

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
        <h1>Profile</h1>
        <p>Profile page</p>
        <h2 className='padding rounded bg-green-500'>{data === 'noting' ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link> }</h2>
        <hr />
        <button onClick={getUserDetails} className='bg-green-800 mt-4 hover:bg:blue-700 text-white font-bold py-2 px-4 rounded'>Get user Details</button>
        <button onClick={logout} className='bg-blue-500 mt-4 hover:bg:blue-700 text-white font-bold py-2 px-4 rounded'>Logout</button>
        <Toaster />
    </div>
  )
}

export default ProfilePage