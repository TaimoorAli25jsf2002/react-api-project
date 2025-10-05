import React, { useState, useEffect } from "react";

export default function Advice() {
  const [advice, setAdvice] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch a random advice
  const fetchAdvice = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("https://api.adviceslip.com/advice");
      const data = await res.json();
      if (!data.slip || !data.slip.advice) throw new Error("Failed to fetch");
      setAdvice(data.slip.advice);
    } catch (err) {
      setError("Advice could not be loaded. Try again.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch first advice on load
  useEffect(() => {
    fetchAdvice();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-6">Random Advice</h1>

      {loading && <p>Loading advice...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-lg mx-auto space-y-4">
          <p className="text-xl italic">"{advice}"</p>

          <button
            onClick={fetchAdvice}
            className="mt-4 bg-blue-500 text-white p-3 rounded hover:bg-blue-600"
          >
            Next Advice
          </button>
        </div>
      )}
    </div>
  );
}
