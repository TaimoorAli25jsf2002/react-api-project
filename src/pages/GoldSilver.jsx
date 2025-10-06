import React, { useState, useEffect } from "react";

export default function GoldSilverApp() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch API once
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          `https://api.metalpriceapi.com/v1/latest?api_key=f16a1e65e4f7473309d3ba3e748e62b4&base=USD&currencies=PKR,XAU,XAG`
        );
        if (!res.ok) throw new Error("Failed to fetch rates");
        const json = await res.json();
        setRates(json.rates);
      } catch (err) {
        setError("Could not load gold/silver rates.");
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading rates...</p>;
  if (error) return <p className="text-center text-red-500 mt-6">{error}</p>;

  // Constants
  const TOLA = 11.664;
  const MASHA = 0.916;
  const GRAMS_PER_OUNCE = 31.1035;

  // Extract correct values
  const usdToPkr = rates.PKR;
  const goldPerOunceUSD = 1 / rates.XAU;
  const silverPerOunceUSD = 1 / rates.XAG;

  // PKR values
  const goldPerGramPKR = (goldPerOunceUSD * usdToPkr) / GRAMS_PER_OUNCE;
  const silverPerGramPKR = (silverPerOunceUSD * usdToPkr) / GRAMS_PER_OUNCE;

  // Generate carat prices dynamically
  const carats = {
    "24k": 1,
    "22k": 0.916,
    "21k": 0.875,
    "20k": 0.833,
    "19k": 0.791,
    "18k": 0.75,
    "16k": 0.666,
    "14k": 0.583,
    "12k": 0.5,
    "10k": 0.416,
    "9k": 0.375,
  };

  // Format timestamp
  const formattedTime = currentTime.toLocaleString();

  return (
    <div className="p-4 min-h-screen bg-gray-50">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Gold & Silver Rates in PKR
      </h1>

      {/* Gold Table */}
      <div className="bg-gradient-to-br from-yellow-200 to-yellow-400 p-4 rounded-2xl shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-center">💰 Gold</h2>
        <table className="w-full text-sm md:text-base border-collapse">
          <thead>
            <tr className="bg-yellow-300">
              <th className="p-2 border">Carat</th>
              <th className="p-2 border">Per Gram</th>
              <th className="p-2 border">10g</th>
              <th className="p-2 border">Per Tola</th>
              <th className="p-2 border">Per Masha</th>
              <th className="p-2 border">Per Ounce</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(carats).map(([carat, purity]) => {
              const perGram = goldPerGramPKR * purity;
              return (
                <tr key={carat} className="text-center">
                  <td className="border p-1 font-semibold">{carat}</td>
                  <td className="border p-1">₨{perGram.toFixed(0)}</td>
                  <td className="border p-1">₨{(perGram * 10).toFixed(0)}</td>
                  <td className="border p-1">₨{(perGram * TOLA).toFixed(0)}</td>
                  <td className="border p-1">₨{(perGram * MASHA).toFixed(0)}</td>
                  <td className="border p-1">
                    ₨{(perGram * GRAMS_PER_OUNCE).toFixed(0)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Silver Table */}
      <div className="bg-gradient-to-br from-gray-300 to-gray-500 p-4 rounded-2xl shadow-lg mb-6">
        <h2 className="text-2xl font-semibold mb-3 text-center">🥈 Silver</h2>
        <table className="w-full text-sm md:text-base border-collapse">
          <thead>
            <tr className="bg-gray-400">
              <th className="p-2 border">Unit</th>
              <th className="p-2 border">Price (PKR)</th>
            </tr>
          </thead>
          <tbody className="text-center">
            <tr>
              <td className="border p-1">Per Gram</td>
              <td className="border p-1">₨{silverPerGramPKR.toFixed(0)}</td>
            </tr>
            <tr>
              <td className="border p-1">10 Grams</td>
              <td className="border p-1">₨{(silverPerGramPKR * 10).toFixed(0)}</td>
            </tr>
            <tr>
              <td className="border p-1">Per Tola</td>
              <td className="border p-1">₨{(silverPerGramPKR * TOLA).toFixed(0)}</td>
            </tr>
            <tr>
              <td className="border p-1">Per Masha</td>
              <td className="border p-1">₨{(silverPerGramPKR * MASHA).toFixed(0)}</td>
            </tr>
            <tr>
              <td className="border p-1">Per Ounce</td>
              <td className="border p-1">
                ₨{(silverPerGramPKR * GRAMS_PER_OUNCE).toFixed(0)}
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Timestamp */}
      <p className="text-center text-lg font-semibold text-gray-700">
        Latest Rates: {formattedTime}
      </p>
    </div>
  );
}
