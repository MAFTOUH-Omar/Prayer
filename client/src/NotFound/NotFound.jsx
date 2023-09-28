import React from 'react'
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
  const Navigate = useNavigate();
  return (
  <main className="h-screen w-full flex flex-col justify-center items-center">
    <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
    <div className="bg-white px-2 text-sm rounded rotate-12 absolute">
      Page Not Found
    </div>
    <button className='bg-white rounded-md mt-5 py-3 px-5 hover:bg-black hover:text-white font-mono transition-all duration-500' onClick={()=>{Navigate("/home")}}>
      Back Home
    </button>
  </main>
  )
}

export default NotFound