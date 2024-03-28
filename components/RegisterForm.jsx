'use client'
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";


const RegisterForm = () => {

    const [name,setName]=useState('');
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [error,setError]=useState('');
    const router = useRouter();
    
    const handleRegister = async (e) => {
        e.preventDefault();
        if(!name || !email || !password){
            setError('All feilds are necessary.')
            return;
        }
        try{
            const resExistsUser = await fetch('/api/user-exists',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({email}),
            });

            const {user} = await resExistsUser.json();

            if(user){
                setError('User already exists.');
                return;
            }

            const resNewUser = await fetch('/api/register',{
                method: 'POST',
                headers: {'Content-Type':'application/json'},
                body:JSON.stringify({
                    name,email,password
                }),
            });
            if(resNewUser.ok){
                const form = e.target;
                form.reset();
                router.push('/signin')
            }else{
                console.log('User registered failed.')
            }
        }catch(error){
            console.log('Error during registration: ',error);
        }
    }

    return (
        <div className='grid place-items-center h-screen'>
            <div className="shadow-lg p-5 rounded-lg border-t-4 border-green-400">
                <h1 className="text-xl font-bold text-green-700 my-4">REGISTER YOUR ACCOUNT</h1>

                <form onSubmit={handleRegister} className='flex flex-col gap-3' >
                    <input type='text' placeholder='Full Name'  onChange={e => setName(e.target.value) }/>
                    <input type='email' placeholder='Email' onChange={e => setEmail(e.target.value) }/>
                    <input type='password' placeholder='Password' onChange={e => setPassword(e.target.value) }/>
                    <button type="submit" className='bg-green-600 rounded-lg text-white font-bold cursor-pointer px-6 py-2'>Signup</button>
                </form>
                {error && <div className="text-red-600 text-xs ">{error}</div>}
                <span className='mt-3 w-full text-sm flex items-center justify-end ' >Already have an account ? &nbsp; <Link href={'/login'} className='text-green-800 underline font-semibold'>Login</Link></span>
            </div>

        </div>
    )
}

export default RegisterForm     