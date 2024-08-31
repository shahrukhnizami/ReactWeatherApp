import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { data } from 'autoprefixer';

function App() {


  const cities= [
    { name: "Karachi", latitude: 24.8607, longitude: 67.0011 },
    { name: "Hunza Valley", latitude: 36.3167, longitude: 74.65 },
    { name: "Skardu", latitude: 35.2971, longitude: 75.6333 },
    { name: "Fairy Meadows", latitude: 35.4213, longitude: 74.5969 },
    { name: "Naltar Valley", latitude: 36.1396, longitude: 74.1928 },
    { name: "Murree", latitude: 33.9062, longitude: 73.3903 },
    { name: "Kaghan Valley", latitude: 34.7939, longitude: 73.5793 },
    { name: "Swat Valley", latitude: 35.222, longitude: 72.4258 },
    { name: "Chitral", latitude: 35.851, longitude: 71.7864 },
    { name: "Neelum Valley", latitude: 34.5857, longitude: 73.907 },
    { name: "Ratti Gali Lake", latitude: 34.8861, longitude: 74.0486 },
    { name: "Shangrila Resort", latitude: 35.3525, longitude: 75.5088 },
    { name: "Deosai National Park", latitude: 35.0303, longitude: 75.443 },
    { name: "Khunjerab Pass", latitude: 36.8497, longitude: 75.4306 },
    { name: "Shogran", latitude: 34.6271, longitude: 73.495 },
    { name: "Rama Meadows", latitude: 35.2918, longitude: 74.9643 },
    { name: "Gojal Valley", latitude: 36.6833, longitude: 74.85 },
    { name: "Kalash Valley", latitude: 35.6699, longitude: 71.7309 },
    { name: "Ayubia National Park", latitude: 34.0607, longitude: 73.402 },
    { name: "Saiful Muluk Lake", latitude: 34.8722, longitude: 73.6919 },
    { name: "Khaplu", latitude: 35.1404, longitude: 76.337 },
   
];




  const [weatherdata , setWeatherdata] = useState([])
  const [selectcities , setselectcities] = useState(cities[0])
  const [loading , setLoading] = useState(true)
  const date = new Date()
 
  
  
  useEffect(() => {
    const { latitude, longitude } = selectcities;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1f136667cfcdb418bf8b7a4c5a542f00`;
    setLoading(true);
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setWeatherdata(data);
        setLoading(false);
      });
  }, [selectcities]);

  
  // console.log("BArray",weatherdata);
  // console.log("icon",weather[0].icon)

  const handle =(e)=>{setselectcities(cities[e.target.value]) }
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <h1 className="text-4xl font-bold">Loading...</h1>
      </div>
    );
  }
  //  console.log("Select city",selectcities);


    // const { icon} = weather;
    const { main, weather, sys , name,wind } = weatherdata;
    const weatherIcon = `http://openweathermap.org/img/w/${weather[0].icon}.png`;  
    const temperature = Math.round(main.temp - 273.15);
    const maxTemp = Math.round(main.temp_max-273.15  );
    const minTemp = Math.round(main.temp_min-273.15  );
    const humidity = main.humidity
    const windSpeed = wind.speed
     
   
  const feelsLike = Math.round(main.feels_like - 273.15);
 
  

  return (
    <>
     <div className=' w m-auto center w-[200px]'>
     
     <img className='center py-2 w-[400px] h-[200px]' src="https://shahrukhnizami.github.io/Weather_App/image/cloudy.png" />
     <div className='flex flex-row items-center justify-center'>
     

     <h1 className='font-bold text-xl center'>Weather App</h1>
     </div>
     
     </div>
     <div className='py-3 w m-auto center w-[200px] flex' >
    
      <select
        onChange={handle}
        className="p-3  border rounded bg-white text-black"
      >
        <option> Select Cities </option>
        {cities.map((data, ind) => (
          <option key={ind} value={ind}>
            {data.name}
          </option>
        ))}
      </select>
      </div>

  <div className=" flex  justify-center   ">
    
    <div className="  border flex flex-col bg-yellow-100 rounded p-4 w-[500px] ">
      <div className="font-bold text-xl">{name}</div>
      <div className="text-sm text-gray-500">{date.toDateString()}</div>
      <div className="mt-6 text-6xl self-center inline-flex items-center justify-center rounded-lg text-indigo-400 h-24 w-28">
       {/* <img className='w-[250px] h-[250]' src={`http://openweathermap.org/img/w/${weatherdata.weather[0].icon}.png`}/> */}
       <img className='w-[500px] h-[120px] ' src={weatherIcon}/>
      </div>
      <div className="flex flex-row items-center justify-center mt-6">
        <div className="font-medium text-6xl">{temperature}°</div>
        <div className="flex flex-col items-center ml-6">
          {/* <div>{weather}</div> */}
          <div className="mt-1">
            <span className="text-sm">
              <i className="far fa-long-arrow-up" />
            </span>
            <span className="text-sm font-light text-gray-500">{minTemp}°C</span>
          </div>
          <div>
            <span className="text-sm">
              <i className="far fa-long-arrow-down" />
            </span>
            <span className="text-sm font-light text-gray-500">{maxTemp}°C</span>
          </div>
        </div>
      </div>
      <div className="flex flex-row justify-between mt-6">
        <div className="flex flex-col items-center">
          <div className="font-medium text-sm">Wind</div>
          <div className="text-sm text-gray-500">{windSpeed}k/h</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-sm">Humidity</div>
          <div className="text-sm text-gray-500">{humidity}%</div>
        </div>
        <div className="flex flex-col items-center">
          <div className="font-medium text-sm">feels_like</div>
          <div className="text-sm text-gray-500">{feelsLike}°C</div>
        </div>
      </div>
    </div>
  </div>


    </>
  )
}

export default App
