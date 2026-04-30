import axios from 'axios';

const WEATHER_API_KEY = 'YOUR_OPENWEATHER_KEY';
const UNSPLASH_ACCESS_KEY = 'YOUR_UNSPLASH_KEY';

export const getWeatherData = async (city) => {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${WEATHER_API_KEY}`
    );
    return response.data;
  } catch (error) {
    console.error("Weather API Error", error);
  }
};

export const getCityImage = async (city) => {
  try {
    const response = await axios.get(
      `https://api.unsplash.com/search/photos?page=1&query=${city}&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    return response.data.results[0]?.urls?.regular;
  } catch (error) {
    return "https://images.unsplash.com/photo-1488646953014-85cb44e25828"; // Fallback image
  }
};