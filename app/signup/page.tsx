"use client"

import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import axios from 'axios'
import { Toaster, toast } from 'react-hot-toast'


const SignUpPage = () => {

  const router = useRouter();
  const [user, setUser] = React.useState({
    email: "",
    password: "",
    username: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(false);
  const [ loading, setLoading] = React.useState(false);

  const onSignUp = async () => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/signup", user);;

      console.log("Signup successful", response.data)

      if (response.data) toast('thanks for signing up');
      router.push('/login');
    } catch (error: any) {
      const my_error = error.response.data.error.split(":")[0];
      console.log("Signup failed", error.response.data.error.split(":")[0]);
      toast.error(my_error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if(user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return ( 
    <div className='flex flex-col items-center justify-center min-h-screen py-2'>
      <h1>{ loading ? "Processing" : "Sign Up" }</h1>
      <hr />
      <label htmlFor="username">Username</label>
      <input
        type="text"
        id="username"
        name="username"
        value={user.username}
        placeholder='username'
        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
        onChange={(e) => setUser({
          ...user, username: e.target.value
        })}
      />
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
      <label htmlFor="username">Username</label>
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
        onClick={onSignUp}

        className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600'
      >
        {buttonDisabled ? "No Signup" : "Signup here"}
      </button>
      <Toaster />
      <Link href='/login'>View Login Page</Link>
    </div>
  )
}

export default SignUpPage