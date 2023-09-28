import React, { useContext, useState } from 'react'
import MenuIcon from "../Icons/MenuIcon"
import Close from "../Icons/Close"
import LogOut from "../Icons/LogOut"
import TimesCalandar from "../Pages/TimesCalendar"
import NotFound from "../NotFound/NotFound"
import Contact from '../Pages/Contact'
import NextPrayer from '../Pages/NextPrayer'
import GoogleAuth from "../GoogleAuth/AuthComponent"
import {BrowserRouter as Router , Routes , Route , Link} from "react-router-dom";
import Cookies from 'js-cookie';
import { AuthContext } from '../contexts/AuthContext'
const Header = () => {
    const [open, SetOpen]=useState(false);

    const token = Cookies.get("x-auth");

    // const navigate = useNavigate()

    const Deconnecter = ()=>{
        Cookies.remove('x-auth', { path: '/' })
        Cookies.remove('clientId', { path: '/' })
        Cookies.remove('Full_Name', { path: '/' })
        Cookies.remove('g_state', { path: '/' })
        Cookies.remove('picture', { path: '/' })
        window.location.reload();
    }
  return (
    <Router>
        <nav className={`shadow-md w-full top-0 left-0 mb-5 ${!token?'hidden':''} fixed`} >
            <div className='md:flex items-center justify-between bg-black py-4 md:px-10 px-7'>
                <Link className='cursor-pointer flex items-center' href={"/home"}> 
                    <img src="/praia.png" alt="" width={45} />
                </Link>
            
                <div className='cursor-pointer absolute right-8 top-6 md:hidden items-center' onClick={()=>{SetOpen(!open)}}>
                    {
                        open?<Close/>:<MenuIcon/>
                    }
                </div>
                <ul className={`md:flex ${open ? 'md:flex-col' : ''} md:items-center md:pb-0 pb-12 absolute md:static bg-black md:z-auto z-[-1] left-0 w-full md:w-auto md:pl-0 pl-9 transition-all duration-500 ease-in ${open ? 'top-20' : 'top-[-490px]'} text-white`}>
                    <li className={`md:ml-8 font-mono md:my-0 my-7 ${open?"text-center":""}`}>
                        <Link className={`mx-4 ${open ? 'block my-2' : 'inline-block'} capitalize font-semibold`} to={"/home"}>prayer time</Link>
                        <Link className={`mx-4 ${open ? 'block my-2' : 'inline-block'} capitalize font-semibold`} to={"/nextPrayer"}>next Prayer</Link>
                        <Link className={`mx-4 ${open ? 'block my-2' : 'inline-block'} font-semibold`} to={"/contact"}>Contact</Link>
                    </li>
                    <li className={`${open?"flex justify-center":""}`}>
                        <button className={`bg-white rounded-md py-2 w-auto px-4 text-black font-mono ${open?"mx-auto":"ml-10"} hover:bg-black hover:text-white transition-all duration-500 font-semibold`} onClick={Deconnecter}>
                            Se déconnecter <span><LogOut/></span>
                        </button>
                    </li>
                </ul>
            </div>
        </nav>
        <Routes>
            <Route  path="/home" element={token ? <TimesCalandar/> : <GoogleAuth/>}/>
            <Route path='*' element={<NotFound/>}/>
            <Route path='/contact' element={token ? <Contact/> : <GoogleAuth/>}/>
            <Route path='/nextPrayer' element={token ?<NextPrayer/>:<GoogleAuth/>}/>
        </Routes>
    </Router>
  )
}

export default Header