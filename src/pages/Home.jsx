import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  // Pages info: label, emoji/icon, route
  const pages = [
    { label: "Weather", icon: "☀️", route: "/weather" },
    { label: "Countries", icon: "🌍", route: "/countries" },
    { label: "Movies", icon: "🎬", route: "/movies" },
    { label: "Currency", icon: "💵", route: "/currency" },
    { label: "Gold & Silver", icon: "💰", route: "/gold" },
    { label: "Advice", icon: "💡", route: "/advice" },
    { label: "Color Palette", icon: "🎨", route: "/colorpalette" },
    { label: "Quiz", icon: "❓", route: "/quiz" },
    { label: "Urdu Quran", icon: "📖", route: "/quran" },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 p-6">
      <h1 className="text-4xl font-bold mb-8">React APIs Hub</h1>
      <p className="text-gray-700 mb-12 text-center max-w-md">
        Explore different small React apps using public APIs. Click any card below to go to the page.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl">
        {pages.map((page) => (
          <div
            key={page.route}
            onClick={() => navigate(page.route)}
            className="cursor-pointer flex flex-col items-center justify-center bg-white shadow-lg rounded-2xl p-6 hover:scale-105 transition-transform"
          >
            <span className="text-5xl mb-4">{page.icon}</span>
            <h2 className="text-2xl font-semibold">{page.label}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}
