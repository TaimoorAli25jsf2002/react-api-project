import React, { useState, useEffect } from "react";

export default function NasaApod() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchApod = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "https://api.nasa.gov/planetary/apod?api_key=a88pXJNYQMcA70G7gpKZ8pgIS8q9AZsybh24xCnC"
      );
      if (!res.ok) throw new Error("Failed to fetch data");
      const result = await res.json();
      setData(result);
    } catch (err) {
      setError("Could not load NASA image. Try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApod();
  }, []);

  return (
    <div className="p-6 min-h-screen bg-gray-50 text-center">
      <h1 className="text-3xl font-bold mb-6">🚀 NASA Picture of the Day</h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && data && (
        <div className="bg-white p-6 rounded-xl shadow-md max-w-3xl mx-auto space-y-4">
          <h2 className="text-2xl font-semibold">{data.title}</h2>
          <p className="text-sm text-gray-500">{data.date}</p>

          {/* Media (Image/Video) */}
          {data.media_type === "image" ? (
            <img
              src={data.url}
              alt={data.title}
              className="rounded-lg shadow-md mx-auto"
            />
          ) : (
            <iframe
              title="nasa-video"
              src={data.url}
              className="w-full h-96 rounded-lg shadow-md"
              allowFullScreen
            ></iframe>
          )}

          <p className="text-gray-700 text-justify">{data.explanation}</p>

          <button
            onClick={fetchApod}
            className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            🔄 Load Again
          </button>
        </div>
      )}
    </div>
  );
}
