import React, { useEffect, useState } from 'react'
import Loading from '../Pages/Loading';
import axios from 'axios';
const NextPrayer = () => {
  const [loading,setLoading]=useState(false);
  const [country, setCountry] = useState('MA');
  const [prayerTimes, setPrayerTimes] = useState({});
  const [nextPrayer, setNextPrayer] = useState('');

  const countryData = [
    { code: 'MA', name: 'Maroc' },
    { code: 'SA', name: 'Arabie Saoudite' },
    { code: 'EG', name: 'Égypte' },
    { code: 'TR', name: 'Turquie' },
    { code: 'PK', name: 'Pakistan' },
    { code: 'ID', name: 'Indonésie' },
    { code: 'NZ', name: 'New Zealand' },
    { code: 'KH', name: 'Cambodia' },
    { code: 'TT', name: 'Trinidad & Tobago' },
    { code: 'LY', name: 'Libya' },
    { code: 'FK', name: 'Falkland Islands' },
    { code: 'BE', name: 'Belgium' },
    { code: 'AG', name: 'Antigua & Barbuda' },
    { code: 'XK', name: 'Kosovo' },
    { code: 'RW', name: 'Rwanda' },
    { code: 'EE', name: 'Estonia' },
    { code: 'GI', name: 'Gibraltar' },
    { code: 'ET', name: 'Ethiopia' },
    { code: 'SR', name: 'Suriname' },
  ];
  

  useEffect(() => {
    // Fonction pour obtenir les horaires de prière en fonction du pays sélectionné
    setLoading(true)
    async function fetchPrayerTimes() {
      try {
        const response = await axios.get(`https://api.aladhan.com/v1/timingsByCity?city=&country=${country}`);
        const data = response.data.data.timings;

        // Mettez à jour les horaires de prière et trouvez la prochaine prière
        setPrayerTimes(data);

        const currentTime = new Date();
        let nextPrayerTime = Infinity;

        for (const prayerTime in data) {
          const prayerTimeDate = new Date(`${new Date().toDateString()} ${data[prayerTime]}`);
          if (prayerTimeDate > currentTime && prayerTimeDate < nextPrayerTime) {
            nextPrayerTime = prayerTimeDate;
            setNextPrayer(prayerTime);
          }
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des horaires de prière :', error);
      } finally {
        setInterval(()=>{setLoading(false)},2000)
      }
    }

    fetchPrayerTimes();
    }, [country]);
  return (
    <div className='flex flex-col h-screen justify-center items-center font-mono md:mx-10 md:mt-0 mt-28'>
        {
            loading && <Loading/>
        }
        <div>
            <h1 className='text-white font-semibold my-4 text-xl md:text-3xl'>Next Prayer: <span className='bg-white text-black py-2 px-5 rounded-xl font-normal'>{nextPrayer}</span></h1>
        </div>
        <div className='my-4'>
            <select
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className='px-10 capitalize font-semibold text-lg rounded-md py-2 bg-white hover:scale-125 transition-all duration-500'
            >
            {countryData.map((country) => (
                <option key={country.code} value={country.code}>
                {country.name}
                </option>
            ))}
            </select>
        </div>
        <div className='text-black flex flex-wrap justify-center items-center'>
            {Object.entries(prayerTimes).map(([prayerName, time]) => (
                <div key={prayerName} className={` py-2 px-4 mx-1 md:mx-1 my-1 rounded-lg w-1/2 md:w-1/4 flex justify-center ${prayerName.toLowerCase() === nextPrayer.toLowerCase() ? 'bg-lime-500' : 'bg-white'}`}>
                  <strong className={`${prayerName.toLowerCase() === nextPrayer.toLowerCase() ? 'text-white' : ''}`}>{prayerName}:</strong> 
                  <span className={`${prayerName.toLowerCase() === nextPrayer.toLowerCase() ? 'text-white' : ''}`}>
                      {time}
                  </span>
                </div>
            ))}
        </div>


    </div>
  )
}

export default NextPrayer