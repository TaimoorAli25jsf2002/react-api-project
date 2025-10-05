import React, { useState } from "react";

export default function ColorPalette() {
  const [color, setColor] = useState("#3498db");
  const [mode, setMode] = useState("analogic");
  const [palette, setPalette] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const modes = ["monochrome", "analogic", "complement", "triad", "tetrad"];

  const fetchPalette = async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://www.thecolorapi.com/scheme?hex=${color.replace(
          "#",
          ""
        )}&mode=${mode}&count=5`
      );
      const data = await res.json();
      if (!data.colors) throw new Error("Palette not found");
      setPalette(data.colors);
    } catch (err) {
      setError("Could not fetch palette. Try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyHex = (hex) => {
    navigator.clipboard.writeText(hex);
    alert(`${hex} copied to clipboard!`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center">🎨 Color Palette Generator</h1>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-8">
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="w-16 h-16 rounded-full border-2 border-gray-300 cursor-pointer"
        />

        <select
          value={mode}
          onChange={(e) => setMode(e.target.value)}
          className="p-2 rounded border border-gray-300 text-gray-700"
        >
          {modes.map((m) => (
            <option key={m} value={m}>
              {m.charAt(0).toUpperCase() + m.slice(1)}
            </option>
          ))}
        </select>

        <button
          onClick={fetchPalette}
          className="bg-purple-500 text-white px-4 py-2 rounded-xl hover:bg-purple-600 transition"
        >
          Generate
        </button>
      </div>

      {loading && <p className="text-gray-700 text-lg mb-4">Loading palette...</p>}
      {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

      {/* Palette display */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
        {palette.map((c) => (
          <div
            key={c.hex.value}
            className="rounded-2xl shadow-lg h-32 flex flex-col justify-center items-center cursor-pointer hover:scale-105 transform transition-all"
            style={{ backgroundColor: c.hex.value }}
            onClick={() => copyHex(c.hex.value)}
          >
            <p className="text-white font-bold">{c.hex.value}</p>
            <p className="text-white text-sm">{c.name.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
