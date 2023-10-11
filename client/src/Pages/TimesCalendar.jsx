import React, { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import moment from 'moment/moment';
import axios from 'axios';
import Loading from '../Pages/Loading';
import Search from '../Icons/Search';
import { AuthContext } from '../contexts/AuthContext';
import 'moment/locale/ar-ma';

const TimesCalendar = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get('x-auth');
    if (!token) {
      navigate('/home');
    }
  }, [navigate]);

  useEffect(() => {
    document.title = 'Times Calendar';
  }, []);

  const { picture, fullName } = useContext(AuthContext);

  // Part to display the current time
  const [timeNow , setTimeNow] = useState(moment().format('LTS'));

  const [dateNow , setDatenow] = useState(moment().format('L'))

  useEffect(() => {
    // Use setInterval to update the time every second
    const intervalId = setInterval(() => {
      setTimeNow(moment().format('LTS'));
      const newDate = moment().format('L');
      setDatenow(setDatenow)
    }, 1000);

    // Clean up the interval when the component unmounts to prevent memory leaks
    return () => clearInterval(intervalId);
  }, []);

  const [prayer, setPrayer] = useState(null);
  const [country, setCountry] = useState('Maroc');
  const [loading, setLoading] = useState(false);

  const getCountry = (event) => {
    setCountry(event.target.value);
  };

  const fetchPrayer = () => {
    setLoading(true)
    axios
      .get(`https://muslimsalat.p.rapidapi.com/${country}.json`, {
        headers: {
          'X-RapidAPI-Key': 'c0b5e8a4dfmsh16ed9ebd8f051dbp162e9ejsn4709b4612c73',
          'X-RapidAPI-Host': 'muslimsalat.p.rapidapi.com',
        },
      })
      .then((response) => setPrayer(response.data.items))
      .catch((error) => console.error(error))
      .finally(setInterval(()=>{setLoading(false)},2000))
  };

  useEffect(() => {
    fetchPrayer();
  }, []);

  return (
    <div className='mt-10'>
      {
        loading && <Loading/>
      }
      <div className='flex justify-center'>
        <img src={picture} alt='' className='rounded-lg object-fill mt-20' />
      </div>
      <div className='mt-2'>
        <h1 className='font-mono text-white text-2xl flex justify-center mt-2'>Welcome {fullName}</h1>
      </div>
      <div className='text-white flex justify-center'>
        <h1 className='font-bold font-mono text-xl'>{timeNow} {dateNow}</h1>
      </div>
      <div className='flex mt-4 justify-center flex-col md:flex-row px-6'>
        <input
          type='text'
          value={country}
          className='flex capitalize items-center mr-1 py-1 px-20 md:px-60 rounded-xl text-black outline-none text-center font-semibold'
          placeholder='Write your country Ex: Maroc'
          onChange={getCountry}
          //value={country}
        />
        <button className='flex items-center mx-auto md:mx-0 mt-1 md:mt-0 bg-white py-1 md:py-2 px-8 rounded-xl md:px-5' onClick={fetchPrayer}>
            <Search />
        </button>
      </div>
      {/* Prayer Items */}
      <div className='container mx-auto text-center'>
        <div className='grid md:grid-cols-3 sm:grid-cols-1 gap-4 my-5 mx-2'>
          {
            prayer && prayer.map((item)=>(
              // 001
              <>
              <div   className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1'>
                <img src="Prayers_img/fajr-prayer.png" alt="" className='w-full h-48 object-cover' />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{item.fajr} : الفجر</h3>
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1'>
                <img src="Prayers_img/dhhr-prayer-mosque.png" alt="" className='w-full h-48 object-cover' />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{item.dhuhr} : الظهر</h3>
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1'>
                <img src="Prayers_img/asr-prayer-mosque.png" alt="" className='w-full h-48 object-cover' />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{item.asr} : العصر</h3>
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1'>
                <img src="Prayers_img/sunset-prayer-mosque.png" alt="" className='w-full h-48 object-cover' />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{item.maghrib} : المغرب</h3>
                </div>
              </div>
              <div className='bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1'>
                <img src="Prayers_img/night-prayer-mosque.png" alt="" className='w-full h-48 object-cover' />
                <div className='p-4'>
                  <h3 className='text-xl font-semibold mb-2'>{item.isha} : العشاء</h3>
                </div>
              </div>
              </>
            ))
          }
        </div>
      </div>
    </div>
  );
};

export default TimesCalendar;