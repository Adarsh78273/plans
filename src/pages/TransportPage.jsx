import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Map from '../components/Map';

const Transport = () => {
  const navigate = useNavigate();
  const [fromCity, setFromCity] = useState('');
  const [toCity, setToCity] = useState('');
  const [fromCoords, setFromCoords] = useState(null);
  const [toCoords, setToCoords] = useState(null);
  const [coords, setCoords] = useState({ lat: 28.6139, lon: 77.2090 }); 
  const [selectionMode, setSelectionMode] = useState('from'); 
  const [loading, setLoading] = useState(false);

  // --- DISTANCE & OPTIONS LOGIC ---
  const getTransportOptions = () => {
    if (!fromCoords || !toCoords) return [];
    
    // Haversine formula simplified for flat approximation
    const distance = Math.round(Math.sqrt(
      Math.pow(toCoords.lat - fromCoords.lat, 2) + 
      Math.pow(toCoords.lon - fromCoords.lon, 2)
    ) * 111);

    const options = [
      { id: 1, name: "Luxury Flight", icon: "✈️", price: 3000 + (distance * 5), time: `${Math.round(distance / 500 + 1)}h`, type: "Air" },
      { id: 2, name: "Express Train", icon: "🚂", price: 500 + (distance * 1.5), time: `${Math.round(distance / 60)}h`, type: "Rail" },
      { id: 3, name: "Private Cab", icon: "🚗", price: distance * 12, time: `${Math.round(distance / 50)}h`, type: "Road" },
      { id: 4, name: "Volvo AC Bus", icon: "🚌", price: distance * 3, time: `${Math.round(distance / 40)}h`, type: "Road" }
    ];
    
    // Agar distance 300km se kam hai toh flights hide kar dein
    return distance < 300 ? options.filter(o => o.type !== "Air") : options;
  };

  const handleConfirm = (option) => {
    const distanceVal = Math.round(Math.sqrt(Math.pow(toCoords.lat - fromCoords.lat, 2) + Math.pow(toCoords.lon - fromCoords.lon, 2)) * 111);
    
    const routeData = {
      from: fromCity,
      to: toCity,
      price: Math.round(option.price), 
      name: `${option.icon} ${option.name}`,
      distance: `${distanceVal} km`
    };

    localStorage.setItem('tempTransport', JSON.stringify(routeData));
    alert(`${option.name} Selected! Redirecting...`);
    navigate('/home'); 
  };

  const handleMapSelection = async (lat, lon) => {
    setLoading(true);
    try {
      // ✅ FIX: "User-Agent" header hata diya gaya hai browser error se bachne ke liye
      const res = await axios.get(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`
      );
      
      const address = res.data.address;
      const cityName = address.city || address.town || address.village || address.state || "Selected Location";
      
      if (selectionMode === 'from') {
        setFromCity(cityName);
        setFromCoords({ lat, lon });
        setSelectionMode('to'); // Auto-switch to destination for better UX
      } else {
        setToCity(cityName);
        setToCoords({ lat, lon });
      }
    } catch (err) {
      console.error("Geocoding Error:", err);
      alert("Could not fetch city name. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20 font-sans">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 pt-10">
        
        {/* HEADER */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/home')} 
              className="p-3 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md hover:bg-gray-50 transition-all group"
            >
              <span className="text-xl group-hover:-translate-x-1 inline-block transition-transform">⬅️</span>
            </button>
            <div>
              <h1 className="text-3xl font-black text-gray-800 uppercase tracking-tighter leading-none">Select Transport 🗺️</h1>
              <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">Select From and To points on the map</p>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Left Panel: Selection & Options */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100">
              <div className="flex bg-gray-100 p-1 rounded-2xl mb-6">
                <button 
                  onClick={() => setSelectionMode('from')} 
                  className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${selectionMode === 'from' ? 'bg-white shadow-md text-blue-600' : 'text-gray-500'}`}
                >
                  📍 FROM: {fromCity || 'Click Map'}
                </button>
                <button 
                  onClick={() => setSelectionMode('to')} 
                  className={`flex-1 py-3 rounded-xl font-bold text-xs transition-all ${selectionMode === 'to' ? 'bg-white shadow-md text-red-600' : 'text-gray-500'}`}
                >
                  🏁 TO: {toCity || 'Click Map'}
                </button>
              </div>

              <div className="space-y-3 max-h-[450px] overflow-y-auto pr-2 custom-scrollbar">
                {fromCoords && toCoords ? (
                    getTransportOptions().map((option) => (
                        <div 
                          key={option.id} 
                          className="group border-2 border-transparent hover:border-blue-500 bg-gray-50 p-4 rounded-2xl transition-all cursor-pointer flex justify-between items-center"
                          onClick={() => handleConfirm(option)}
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl">{option.icon}</span>
                                <div>
                                    <h3 className="font-black text-sm text-gray-800 uppercase">{option.name}</h3>
                                    <p className="text-[10px] font-bold text-gray-400 uppercase">{option.time} • {option.type}</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-blue-600">₹{Math.round(option.price)}</p>
                                <span className="text-[9px] font-bold text-gray-400 uppercase group-hover:text-blue-500 transition-colors">Select ➔</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-2xl">
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                          Step 1: Set pickup point<br/>
                          Step 2: Set destination<br/>
                          <span className="text-blue-500 mt-2 block">To see transport prices</span>
                        </p>
                    </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Panel: Map */}
          <div className="lg:col-span-3 h-[600px] bg-white p-2 rounded-[40px] shadow-2xl border relative overflow-hidden">
            {loading && (
              <div className="absolute inset-0 bg-white/60 z-20 flex items-center justify-center">
                <div className="bg-white px-6 py-3 rounded-full shadow-xl flex items-center gap-3">
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                  <span className="font-black text-xs text-blue-600 tracking-tighter uppercase">Finding City...</span>
                </div>
              </div>
            )}
            <Map 
                lat={coords.lat} 
                lon={coords.lon} 
                onMapClick={handleMapSelection} 
                fromCoords={fromCoords} 
                toCoords={toCoords} 
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transport;