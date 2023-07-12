"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'

const LoginPage = () => {

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [loading, setLoading] = React.useState(false);



  const onLogin = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", user);
      console.log("Login Success", response.data);
      toast.success("Login Success");
      router.push("/profile");
    } catch (error: any) {
      const my_error = error.response.data.error.split(":")[0];
      console.log("Login failed", error);
      toast.error(my_error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (user.email.length > 0 && user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{loading ? "Processing" : "Login"}</h1>
      <hr />
      
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        name="email"
        value={user.email}
        placeholder='email'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onChange={(e) => setUser({
          ...user, email: e.target.value
        })}
      />
      <label htmlFor="username">Password</label>
      <input
        type="password"
        id="username"
        name="username"
        value={user.password}
        placeholder='password'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onChange={(e) => setUser({
          ...user, password: e.target.value
        })}
      />
      <button
        onClick={onLogin}
        disabled={buttonDisabled}
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        Login here
      </button>
      <Toaster />
      <Link href='/signup'>View Signup Page</Link>
    </div>
  )
}

export default LoginPage