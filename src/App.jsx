import { useEffect, useState } from 'react';
import './App.css';

function App() {
  const cities = [
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
  ];

  const [weatherData, setWeatherData] = useState(null);
  const [selectedCity, setSelectedCity] = useState(cities[0]);
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState(new Date());

  // Update time every minute
  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const { latitude, longitude } = selectedCity;
    const api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=1f136667cfcdb418bf8b7a4c5a542f00`;
    
    setLoading(true);
    fetch(api)
      .then((res) => res.json())
      .then((data) => {
        setWeatherData(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [selectedCity]);

  if (loading || !weatherData) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <h1 className="text-2xl font-semibold text-gray-700 mt-4">Loading weather data...</h1>
        </div>
      </div>
    );
  }

  const { main, weather, name, wind } = weatherData;
  const weatherIcon = `https://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;
  const temperature = Math.round(main.temp - 273.15);
  const maxTemp = Math.round(main.temp_max - 273.15);
  const minTemp = Math.round(main.temp_min - 273.15);
  const humidity = main.humidity;
  const windSpeed = wind.speed;
  const feelsLike = Math.round(main.feels_like - 273.15);
  const weatherDescription = weather[0].description;

  // Determine background based on weather condition
  const getBackgroundClass = () => {
    const mainWeather = weather[0].main.toLowerCase();
    if (mainWeather.includes('rain')) return 'bg-gradient-to-br from-gray-400 to-blue-600';
    if (mainWeather.includes('cloud')) return 'bg-gradient-to-br from-gray-200 to-gray-400';
    if (mainWeather.includes('clear')) return 'bg-gradient-to-br from-blue-400 to-indigo-600';
    if (mainWeather.includes('snow')) return 'bg-gradient-to-br from-blue-100 to-blue-300';
    return 'bg-gradient-to-br from-blue-300 to-indigo-500';
  };

  return (
    <div className={`min-h-screen py-8 ${getBackgroundClass()} transition-colors duration-500`}>
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Pakistan Weather Forecast</h1>
          <p className="text-white/80 mt-2">Real-time weather updates for beautiful locations</p>
        </div>

        {/* City Selector */}
        <div className="flex justify-center mb-8">
          <div className="relative w-full max-w-md">
            <select
              onChange={(e) => setSelectedCity(cities[e.target.value])}
              className="w-full p-4 pr-8 rounded-lg bg-white/90 backdrop-blur-sm border border-white/30 shadow-lg appearance-none focus:outline-none focus:ring-2 focus:ring-white/50 text-gray-800 font-medium"
            >
              <option value="">Select a city...</option>
              {cities.map((city, index) => (
                <option key={index} value={index}>
                  {city.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
              </svg>
            </div>
          </div>
        </div>

        {/* Main Weather Card */}
        <div className="max-w-3xl mx-auto bg-white/20 backdrop-blur-md rounded-2xl overflow-hidden shadow-xl">
          {/* Current Weather */}
          <div className="p-6 md:p-8 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-3xl font-bold">{name}</h2>
                <p className="text-white/80">{time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="text-xl capitalize mt-2">{weatherDescription}</p>
              </div>
              <div className="text-right">
                <p className="text-5xl font-bold">{temperature}°C</p>
                <p className="text-white/80">Feels like {feelsLike}°C</p>
              </div>
            </div>

            <div className="flex items-center justify-center my-6">
              <img src={weatherIcon} alt={weatherDescription} className="w-32 h-32" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-white/80">High / Low</p>
                <p className="text-xl font-semibold">{maxTemp}° / {minTemp}°</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-white/80">Humidity</p>
                <p className="text-xl font-semibold">{humidity}%</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-white/80">Wind</p>
                <p className="text-xl font-semibold">{windSpeed} km/h</p>
              </div>
              <div className="bg-white/10 p-4 rounded-lg backdrop-blur-sm">
                <p className="text-sm text-white/80">Pressure</p>
                <p className="text-xl font-semibold">{main.pressure} hPa</p>
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="bg-white/30 p-6">
            <div className="flex justify-between text-white">
              <div>
                <p className="text-sm">Sunrise</p>
                <p className="font-medium">
                  {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div>
                <p className="text-sm">Sunset</p>
                <p className="font-medium">
                  {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div>
                <p className="text-sm">Visibility</p>
                <p className="font-medium">{weatherData.visibility / 1000} km</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8 text-white/70 text-sm">
          <p>Data provided by OpenWeatherMap • Updated at {time.toLocaleTimeString()}</p>
        </div>
      </div>
    </div>
  );
}

export default App;