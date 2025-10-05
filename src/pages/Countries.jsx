import React, { useState } from "react";

export default function Countries() {
  const [country, setCountry] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function fetchCountry() {
    setLoading(true);
    setError(null);
    setData(null);

    try {
      const res = await fetch(`https://restcountries.com/v3.1/name/${country}`);
      if (!res.ok) throw new Error("Country not found");
      const result = await res.json();

      const c = result[0];
      setData({
        name: c.name.common,
        capital: c.capital ? c.capital[0] : "N/A",
        region: c.region,
        population: c.population,
        flag: c.flags.png,
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-6">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold mb-8 text-center">🌎 Country Info</h1>

      {/* Search bar at top */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8 w-full max-w-sm">
        <input
          type="text"
          placeholder="Enter country..."
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="flex-1 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400"
        />
        <button
          onClick={fetchCountry}
          className="bg-purple-500 text-white px-6 py-3 rounded-xl hover:bg-purple-600 transition-colors"
        >
          Search
        </button>
      </div>

      {/* Status messages */}
      {loading && <p className="text-gray-700 text-lg mb-4">Loading...</p>}
      {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

      {/* Result card */}
      {data && (
        <div className="bg-white rounded-2xl shadow-lg p-6 w-80 flex flex-col items-center transition-transform hover:scale-105">
          <img
            src={data.flag}
            alt={data.name + " flag"}
            className="w-32 h-20 object-cover rounded mb-4"
          />
          <h2 className="text-2xl font-semibold mb-3">{data.name}</h2>
          <p>🏛️ Capital: {data.capital}</p>
          <p>🌍 Region: {data.region}</p>
          <p>👥 Population: {data.population.toLocaleString()}</p>
        </div>
      )}
    </div>
  );
}
