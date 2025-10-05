import React, { useState, useEffect } from "react";

export default function Weather() {
  const [city, setCity] = useState("");
  const [coords, setCoords] = useState(null);
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Get coordinates for city using Nominatim (OpenStreetMap)
  const fetchCoords = async (cityName) => {
    try {
      const res = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${cityName}`
      );
      const data = await res.json();
      if (data.length === 0) throw new Error("City not found");
      return { lat: data[0].lat, lon: data[0].lon, display_name: data[0].display_name };
    } catch (err) {
      throw err;
    }
  };

  // Fetch weather using Open-Meteo
  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError(null);
    setWeather(null);

    try {
      const location = await fetchCoords(city);
      setCoords(location);
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${location.lat}&longitude=${location.lon}&current_weather=true`
      );
      const data = await res.json();
      setWeather(data.current_weather);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-start bg-blue-50 p-6">
      <h1 className="text-4xl font-bold mb-6">Check Weather</h1>

      {/* Search bar */}
      <div className="flex w-full max-w-md mb-8">
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="flex-1 p-3 rounded-l-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={fetchWeather}
          className="bg-blue-500 text-white px-6 rounded-r-xl hover:bg-blue-600 transition-colors"
        >
          Search
        </button>
      </div>

      {loading && <p className="text-lg text-gray-700">Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Weather card */}
      {weather && coords && (
        <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-md text-center">
          <h2 className="text-2xl font-semibold mb-2">{coords.display_name}</h2>
          <div className="text-6xl mb-2">
            {weather.weathercode === 0 ? "☀️" :
             weather.weathercode === 1 ? "🌤️" :
             weather.weathercode === 2 ? "⛅" :
             weather.weathercode === 3 ? "☁️" :
             weather.weathercode >= 61 && weather.weathercode <= 67 ? "🌧️" :
             "❓"}
          </div>
          <p className="text-xl mb-1">Temperature: {weather.temperature}°C</p>
          <p className="text-lg">Wind Speed: {weather.windspeed} km/h</p>
        </div>
      )}
    </div>
  );
}
