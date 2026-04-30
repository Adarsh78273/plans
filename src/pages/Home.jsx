import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Map from '../components/Map';

const Home = () => {
  const navigate = useNavigate();
  
  // --- Auth Check (Executed immediately to prevent blank screen) ---
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  
  // States
  const [cityInput, setCityInput] = useState('');
  const [activeCity, setActiveCity] = useState('Delhi');
  const [coords, setCoords] = useState({ lat: 28.6139, lon: 77.2090 });
  const [weatherData, setWeatherData] = useState(null); 
  
  const [selectedTransport, setSelectedTransport] = useState(null);
  const [selectedHotel, setSelectedHotel] = useState(null);
  const [selectedFood, setSelectedFood] = useState(null);
  const [attractionPrice, setAttractionPrice] = useState(0);

  const WEATHER_API_KEY = "7a08a3033beee75ffb877ee8996324c5";

  // --- Functions ---
  const refreshAllData = useCallback(() => {
    // UI data ko fresh state mein lane ke liye
    setSelectedTransport(JSON.parse(localStorage.getItem('tempTransport') || 'null'));
    setSelectedHotel(JSON.parse(localStorage.getItem('tempHotel') || 'null'));
    setSelectedFood(JSON.parse(localStorage.getItem('tempFood') || 'null'));
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}&units=metric`
      );
      setWeatherData({
        temp: res.data.main.temp,
        desc: res.data.weather[0].description,
        icon: res.data.weather[0].icon
      });
    } catch (err) { console.error("Weather error", err); }
  };

  // --- Effects ---
  useEffect(() => {
    // Agar login nahi hai, toh replace() use karein taaki loop na bane
    if (!isLoggedIn) {
      window.location.replace("/");
      return;
    }

    refreshAllData();
    fetchWeather(coords.lat, coords.lon); 

    // Focus listener for real-time updates
    const handleFocus = () => refreshAllData();
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, [isLoggedIn, refreshAllData]);

  const handleSearch = async () => {
    if (!cityInput.trim()) return;
    try {
      const res = await axios.get(`https://nominatim.openstreetmap.org/search?format=json&q=${cityInput}`);
      if (res.data.length > 0) {
        const { lat, lon } = res.data[0];
        const newLat = parseFloat(lat);
        const newLon = parseFloat(lon);
        setCoords({ lat: newLat, lon: newLon });
        setActiveCity(cityInput);
        fetchWeather(newLat, newLon);
        setAttractionPrice(0); 
      }
    } catch (e) { console.error("Search failed", e); }
  };

  const handleBooking = () => {
    alert(`Success! Your trip for ₹${grandTotal} has been booked.`);
    localStorage.removeItem('tempTransport');
    localStorage.removeItem('tempHotel');
    localStorage.removeItem('tempFood');
    refreshAllData();
    setAttractionPrice(0);
  };

  // Calculations
  const transportPrice = selectedTransport ? Number(selectedTransport.price) : 0;
  const hotelPrice = selectedHotel ? Number(selectedHotel.price) : 0;
  const foodPrice = selectedFood ? Number(selectedFood.price) : 0;
  const grandTotal = transportPrice + hotelPrice + foodPrice + attractionPrice;

  // --- Return Null if not logged in to prevent flash of content ---
  if (!isLoggedIn) return null;

  return (
    <div className="min-h-screen bg-[#f1f5f9] pb-20 font-sans text-slate-900">
      {/* Hero Section */}
      <div className="bg-[#064e3b] h-[350px] relative flex flex-col items-center justify-center text-center px-4">
        <div className="z-10">
            <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-2 tracking-tight">
               {activeCity} 🌎
            </h1>
            <p className="text-emerald-200 font-medium italic opacity-80">Plan your perfect getaway</p>
        </div>
        
        <div className="absolute bottom-0 translate-y-1/2 w-full max-w-4xl px-4 z-30">
          <div className="bg-white p-2 rounded-2xl shadow-2xl border border-slate-200 flex flex-col md:flex-row gap-2">
            <input 
              type="text" 
              placeholder="Where to next?" 
              className="flex-1 px-6 py-4 text-lg font-semibold outline-none"
              value={cityInput}
              onChange={(e) => setCityInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            />
            <button onClick={handleSearch} className="bg-emerald-600 text-white px-10 py-4 rounded-xl font-bold hover:bg-emerald-700 transition-all">
              SEARCH
            </button>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-6 mt-32 grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-12">
          
          <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold">Dashboard</h2>
              <p className="text-slate-500 text-sm">Real-time weather for {activeCity}</p>
            </div>
            {weatherData && (
              <div className="flex items-center gap-3">
                <img src={`https://openweathermap.org/img/wn/${weatherData.icon}.png`} alt="weather" className="bg-emerald-50 rounded-full" />
                <span className="text-2xl font-black text-emerald-700">{Math.round(weatherData.temp)}°C</span>
              </div>
            )}
          </div>

          <div className="bg-white p-2 rounded-[2rem] shadow-lg h-[400px] overflow-hidden border border-slate-200">
             <Map 
                lat={coords.lat} 
                lon={coords.lon} 
                onMapClick={(lat, lon) => { 
                  setCoords({lat, lon}); 
                  fetchWeather(lat, lon); 
                }} 
              />
          </div>

          <div className="grid grid-cols-3 gap-4">
            <Link to="/transport" className="bg-white p-4 rounded-2xl border text-center hover:shadow-md transition-all">
              <span className="text-2xl">🎫</span>
              <p className="text-xs font-bold mt-2">Transport</p>
              <p className={`text-[10px] font-bold ${selectedTransport ? 'text-emerald-600' : 'text-slate-400'}`}>
                {selectedTransport ? 'Added' : 'Add'}
              </p>
            </Link>
            <Link to="/hotels" className="bg-white p-4 rounded-2xl border text-center hover:shadow-md transition-all">
              <span className="text-2xl">🏠</span>
              <p className="text-xs font-bold mt-2">Hotel</p>
              <p className={`text-[10px] font-bold ${selectedHotel ? 'text-emerald-600' : 'text-slate-400'}`}>
                {selectedHotel ? 'Added' : 'Add'}
              </p>
            </Link>
            <Link to="/food" className="bg-white p-4 rounded-2xl border text-center hover:shadow-md transition-all">
              <span className="text-2xl">🍕</span>
              <p className="text-xs font-bold mt-2">Food</p>
              <p className={`text-[10px] font-bold ${selectedFood ? 'text-emerald-600' : 'text-slate-400'}`}>
                {selectedFood ? 'Added' : 'Add'}
              </p>
            </Link>
          </div>
        </div>

        <div className="lg:col-span-4">
          <div className="sticky top-28 bg-[#064e3b] p-8 rounded-[2.5rem] shadow-2xl text-white">
            <h2 className="text-2xl font-bold mb-6 border-b border-emerald-800 pb-2">Trip Summary</h2>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm opacity-80">
                <span>Total Amount:</span>
                <span className="text-2xl font-black text-white">₹{grandTotal}</span>
              </div>
              <button 
                onClick={handleBooking}
                disabled={grandTotal === 0}
                className="w-full bg-white text-emerald-900 py-4 rounded-xl font-black hover:bg-emerald-50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                BOOK NOW
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Home;