import React, { useState, useEffect } from "react";

export default function GoldSilverApp() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Live clock
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  // Fetch gold & silver rates
  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("https://data-asg.goldprice.org/dbXRates/USD");
        if (!res.ok) throw new Error("Failed to fetch gold/silver rates");
        const json = await res.json();
        setData(json.items[0]);
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

  // Hardcoded USD → PKR
  const USD_PKR = 285;

  // Gold calculations
  const gold24kOZ = data.xauPrice;
  const gold22kOZ = gold24kOZ * 0.916;
  const gold18kOZ = gold24kOZ * 0.75;
  const gold24kG = gold24kOZ / 31.1035;
  const gold22kG = gold22kOZ / 31.1035;
  const gold18kG = gold18kOZ / 31.1035;

  // Silver calculations
  const silverOZ = data.xagPrice;
  const silverG = silverOZ / 31.1035;

  // Pakistani Tola & Masha
  const TOLA = 11.664; 
  const MASHA = 0.916; 

  // PKR prices
  const gold24kG_PKR = gold24kG * USD_PKR;
  const gold22kG_PKR = gold22kG * USD_PKR;
  const gold18kG_PKR = gold18kG * USD_PKR;

  const gold24kTola = gold24kG_PKR * TOLA;
  const gold22kTola = gold22kG_PKR * TOLA;
  const gold18kTola = gold18kG_PKR * TOLA;

  const gold24kMasha = gold24kG_PKR * MASHA;
  const gold22kMasha = gold22kG_PKR * MASHA;
  const gold18kMasha = gold18kG_PKR * MASHA;

  const silverG_PKR = silverG * USD_PKR;
  const silverTola = silverG_PKR * TOLA;
  const silverMasha = silverG_PKR * MASHA;

  const formattedTime = currentTime.toLocaleString();

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-8">Gold & Silver Rates</h1>

      {/* USD Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mb-8">
        {/* Gold USD */}
        <div className="flex-1 bg-gradient-to-br from-yellow-200 to-yellow-400 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">💰 Gold Prices (USD)</h2>
          <div className="space-y-2 text-lg text-left">
            <p>24k: ${gold24kOZ.toFixed(2)} / oz | ${gold24kG.toFixed(2)} / g</p>
            <p>22k: ${gold22kOZ.toFixed(2)} / oz | ${gold22kG.toFixed(2)} / g</p>
            <p>18k: ${gold18kOZ.toFixed(2)} / oz | ${gold18kG.toFixed(2)} / g</p>
          </div>
        </div>

        {/* Silver USD */}
        <div className="flex-1 bg-gradient-to-br from-gray-200 to-gray-400 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">🥈 Silver Prices (USD)</h2>
          <div className="space-y-2 text-lg text-left">
            <p>Per ounce: ${silverOZ.toFixed(2)}</p>
            <p>Per gram: ${silverG.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* PKR Cards */}
      <div className="flex flex-col md:flex-row justify-center items-stretch gap-6 mb-8">
        {/* Gold PKR */}
        <div className="flex-1 bg-gradient-to-br from-yellow-300 to-yellow-500 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">💰 Gold Prices (PKR)</h2>
          <div className="space-y-2 text-lg text-left">
            <p>
              24k: ₨{gold24kG_PKR.toFixed(2)} / g | ₨{gold24kTola.toFixed(2)} / Tola | ₨{gold24kMasha.toFixed(2)} / Masha
            </p>
            <p>
              22k: ₨{gold22kG_PKR.toFixed(2)} / g | ₨{gold22kTola.toFixed(2)} / Tola | ₨{gold22kMasha.toFixed(2)} / Masha
            </p>
            <p>
              18k: ₨{gold18kG_PKR.toFixed(2)} / g | ₨{gold18kTola.toFixed(2)} / Tola | ₨{gold18kMasha.toFixed(2)} / Masha
            </p>
          </div>
        </div>

        {/* Silver PKR */}
        <div className="flex-1 bg-gradient-to-br from-gray-300 to-gray-500 p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">🥈 Silver Prices (PKR)</h2>
          <div className="space-y-2 text-lg text-left">
            <p>Per gram: ₨{silverG_PKR.toFixed(2)}</p>
            <p>Per Tola: ₨{silverTola.toFixed(2)}</p>
            <p>Per Masha: ₨{silverMasha.toFixed(2)}</p>
          </div>
        </div>
      </div>

      {/* Big Clock */}
      <p className="text-xl font-semibold text-gray-700">
        Latest Rates: {formattedTime}
      </p>
    </div>
  );
}
