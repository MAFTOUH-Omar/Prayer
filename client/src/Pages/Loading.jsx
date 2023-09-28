import React, { useEffect } from 'react'
import LoadingSvg from '../Icons/LoadingSvg'
const Loading = () => {
    useEffect(()=>{
        document.title = 'Loading...'
    },[])
  return (
    <div className='w-full min-h-screen top-0 z-50 overflow-hidden fixed flex place-content-center place-items-center bg-zinc-900'>
        <LoadingSvg/>
    </div>
  )
}

export default Loading