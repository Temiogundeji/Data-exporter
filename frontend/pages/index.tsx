import Image from 'next/image'
import { Inter } from 'next/font/google'
import { useForm } from 'react-hook-form'
import { useState } from 'react';
import AppBar from '@/components/AppBar';

const inter = Inter({ subsets: ['latin'] })

type FormData = {
  email: string,
  password: string
}

export default function Home() {
  const { register, setValue, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const onSubmit = handleSubmit(data => console.log(data));
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-y-hidden">

      <h1 className="text-white">My name is Yusuff</h1>
    </main>
  )
}
