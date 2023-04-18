import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24 overflow-y-hidden">
      <div className='overflow-y-hidden'>
        <span className='font-bold text-2xl'>Xportt</span>
        <div className='flex flex-row justify-between items-center rounded-lg '>
          <div className='w-1/2'>
            <h1 className='text-4xl font-bold mb-2'>Data Exporter</h1>
            <p className='text-left text-lg'>Making data export easier for teams for free. It supports common data formats like csv, and xlsx</p>
          </div>
          <div>
            <header>
              <h2 className='text-black text-2xl text-left'>Login here</h2>
            </header>
            <div className='flex items-center justify-center flex-col bg-white h-[400px] w-[400px] rounded-lg px-5'>
              <div className='mb-10'>
                <input className='text-black w-full' type='text' placeholder='Username or Email' />
              </div>
              <div>
                <input className='text-black w-full' type='password' placeholder='**********' />
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  )
}
