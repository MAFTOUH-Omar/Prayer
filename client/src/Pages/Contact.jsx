import React from 'react'

const Contact = () => {
  return (
    <div className='flex flex-col md:flex-row h-screen justify-center items-center mx-5 md:mx-20'>
      <div className='md:w-1/2 flex flex-col md:flex-col'>
        <h1 className='text-white font-bold text-2xl mb-2'>Get in touch</h1>
        <span className='text-slate-200 font-mono'>
          Feel free to get in touch with me using the contact form below.
        </span>
      </div>
      <div className='mt-5 flex flex-wrap md:flex-nowrap'>
        <div className='bg-gray-700 text-white mx-1 w-full md:w-1/2 rounded-md h-32 py-2 px-5 mb-3 md:mb-0'>
          <h1 className='text-white font-semibold font-mono'>Collaborate</h1>
          <a href="mailto:omarmaftouh2022@gmail.com" className='text-slate-300 font-semibold'>omarmaftouh2022@gmail.com</a><br />
          <a href="https://api.whatsapp.com/send?phone=0604534791" className='text-slate-300 font-semibold pt-1'>+212 604 534 791</a><br />
        </div>
        <div className='bg-gray-700 text-white w-full md:w-1/2 rounded-md h-32 py-2 px-5'>
          <h1 className='text-white font-semibold font-mono'>Locations</h1>
          <p className='text-slate-300 font-semibold'>1391 QUARTIER EL AMAL KHOURIBGA</p>
        </div>
      </div>
    </div>

  )
}

export default Contact