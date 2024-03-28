import RegisterForm from '@/components/RegisterForm'
import { getServerSession } from 'next-auth'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'
import { redirect } from 'next/navigation'

const RegisterPage = async () => {
  const session = await getServerSession(authOptions)
  if (session) redirect('/');
  return <RegisterForm />
}

export default RegisterPage 