import React, { useState, useEffect } from "react";

export default function UrduQuranApp() {
  const [verse, setVerse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchVerse = async () => {
    setLoading(true);
    setError(null);

    try {
      const surah = Math.floor(Math.random() * 114) + 1; // 1 to 114
      const ayah = Math.floor(Math.random() * 7) + 1; // just small range for demo

      const res = await fetch(
        `https://api.alquran.cloud/v1/ayah/${surah}:${ayah}/ur.junagarhi`
      );

      const data = await res.json();

      if (data.status === "OK") {
        setVerse(data.data);
      } else {
        setError("Verses not available. Try again.");
      }
    } catch (err) {
      setError("Failed to fetch verse. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVerse();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50 flex flex-col items-center justify-center text-center">
      <h1 className="text-3xl font-bold mb-6">اردو قرآن ایپ</h1>

      {loading && <p>Loading verse...</p>}

      {error && !verse && (
        <p className="text-red-500 mb-4">{error}</p>
      )}

      {verse && (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-xl space-y-4">
          <p className="text-2xl leading-relaxed font-serif">
            {verse.text}
          </p>
          <p className="text-gray-600 text-sm">
            {verse.surah.englishName} — Ayah {verse.numberInSurah}
          </p>
        </div>
      )}

      <button
        onClick={fetchVerse}
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
      >
        Load Another Verse
      </button>
    </div>
  );
}
