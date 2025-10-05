import React, { useState, useEffect } from "react";

export default function CurrencyApp() {
  const [rates, setRates] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [base, setBase] = useState("USD");

  const baseOptions = ["USD", "EUR", "GBP", "PKR", "INR"];
  const mainCurrencies = ["USD", "EUR", "GBP", "PKR", "INR", "JPY", "AUD", "CAD"];

  const currencyEmoji = {
    USD: "💵",
    EUR: "💶",
    GBP: "💷",
    PKR: "🇵🇰",
    INR: "₹",
    JPY: "¥",
    AUD: "🇦🇺",
    CAD: "🇨🇦",
  };

  useEffect(() => {
    const fetchRates = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(`https://open.er-api.com/v6/latest/${base}`);
        if (!res.ok) throw new Error("Failed to fetch rates");
        const data = await res.json();
        if (data.result !== "success") throw new Error("API returned an error");
        setRates(data.rates || {});
      } catch (err) {
        setError("Could not load rates. Try again.");
      } finally {
        setLoading(false);
      }
    };
    fetchRates();
  }, [base]);

  const otherCurrencies = Object.keys(rates).filter(
    (cur) => !mainCurrencies.includes(cur)
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-6">Currency Rates</h1>

      {/* Base selection */}
      <select
        className="border p-3 text-lg rounded mb-6"
        value={base}
        onChange={(e) => setBase(e.target.value)}
      >
        {baseOptions.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </select>

      {loading && <p>Loading rates...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {/* Main currencies cards */}
      {!loading && !error && (
        <>
          <div className="flex flex-wrap justify-center gap-4 mb-6">
            {mainCurrencies.map(
              (cur) =>
                rates[cur] && (
                  <div
                    key={cur}
                    className="bg-white p-4 rounded-2xl shadow-md w-40 flex flex-col items-center gap-2 hover:scale-105 transform transition"
                  >
                    <span className="text-3xl">{currencyEmoji[cur]}</span>
                    <p className="font-semibold">{cur}</p>
                    <p className="text-lg">
                      1 {base} = {rates[cur].toFixed(4)} {cur}
                    </p>
                  </div>
                )
            )}
          </div>

          {/* Other currencies scrollable */}
          {/* Other currencies grid */}
{otherCurrencies.length > 0 && (
  <div className="mt-6">
    <h2 className="text-xl font-semibold mb-4">Other Currencies</h2>
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
      {otherCurrencies.map((cur) => (
        <div
          key={cur}
          className="bg-white p-3 rounded-2xl shadow-md flex flex-col items-center gap-1 hover:scale-105 transform transition"
        >
          <p className="font-semibold">{cur}</p>
          <p className="text-sm">
            1 {base} = {rates[cur].toFixed(4)} {cur}
          </p>
        </div>
      ))}
    </div>
  </div>
)}

        </>
      )}
    </div>
  );
}
