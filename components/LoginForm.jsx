'use client'

import { signIn } from 'next-auth/react';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import { useState } from 'react'

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();
  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (res.error) {
        setError('Invalid Credentials');
        return;
      }
      router.push('/')

    } catch (error) {
      console.log('Error', error)
    }
  }

  return (
    <div className='grid place-items-center h-screen'>
      <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
        <h1 className="text-xl font-bold text-green-700 my-4">WELLCOME TO LOGIN</h1>

        <form onSubmit={handleLogin} className='flex flex-col gap-3' >
          <input onChange={e => setEmail(e.target.value)} type='text' placeholder='Email' />
          <input onChange={e => setPassword(e.target.value)} type='password' placeholder='Password' />
          <button type='submit' className='bg-green-600 rounded-lg text-white font-bold cursor-pointer px-6 py-2'>Login</button>
        </form>
        {error && <div className="text-red-600 text-xs ">{error}</div>}
        <span className='mt-3 w-full text-sm flex items-center justify-end ' >Don't have an account ? &nbsp; <Link href={'/register'} className='text-green-800 underline font-semibold'>Register</Link></span>
      </div>

    </div>
  )
}

export default LoginForm