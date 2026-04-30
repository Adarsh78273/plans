import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Weather = ({ city }) => {
  const [data, setData] = useState(null);
  const API_KEY = "YOUR_OPENWEATHER_KEY"; 

  useEffect(() => {
    if (city) {
      axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(res => setData(res.data))
        .catch(err => console.log("Weather error", err));
    }
  }, [city]);

  if (!data) return <p className="text-gray-500">Loading weather...</p>;

  return (
    <div className="bg-blue-50 p-4 rounded-lg flex justify-between items-center">
      <div>
        <h3 className="text-xl font-bold">{data.main.temp}°C</h3>
        <p className="text-gray-600 capitalize">{data.weather[0].description}</p>
      </div>
      <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`} alt="icon" />
    </div>
  );
};

export default Weather;