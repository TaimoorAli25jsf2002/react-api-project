import React from "react";

/**
 * Footer component
 * Props (optional):
 *  - repoUrl: link to your GitHub repo (falls back to VITE_REPO_URL env var or placeholder)
 *  - liveUrl: link to your Netlify live site (falls back to VITE_NETLIFY_URL env var or empty)
 *
 * Note: Do NOT put API keys here. This footer is just informational.
 */
export default function Footer({ repoUrl, liveUrl, live2Url }) {
  const repo = repoUrl || import.meta.env.VITE_REPO_URL || "https://github.com/TaimoorAli25jsf2002/react-api-project";
  const live = liveUrl || import.meta.env.VITE_NETLIFY_URL || "https://gepcobill.netlify.app/";
    const live2 = live2Url || import.meta.env.VITE_NETLIFY_URL || "https://noteskeepclone.netlify.app/";

  return (
    <footer className="bg-white border-t mt-8">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row items-center md:items-start justify-between gap-4">
        {/* Left: branding */}
        <div className="text-left">
          <div className="text-xl font-semibold text-blue-600">ReactAPIsHub</div>
          <div className="text-sm text-gray-600">Built with React, Vite , Tailwindcss & public APIs</div>
        </div>

        {/* Middle: APIs used (informational only) */}
        <div className="flex-1">
          <div className="flex flex-wrap justify-center md:justify-start gap-2">
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">🌦 Open-Meteo</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">🎬 TMDB</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">📖 alquran.cloud</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">💡 AdviceSlip</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">💵exchangerate.host</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">💰 MetalpriceAPI</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">🎨 TheColorAPI</span>

            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">🌍 REST Countries</span>
            <span className="text-xs font-medium px-3 py-1 rounded-full bg-gray-100 text-gray-800">❓ The-Trivia-API</span>
          </div>
        </div>

        {/* Right: links & copyright */}
        <div className="text-right">
          <div className="flex items-center justify-center md:justify-end gap-3 mb-2">
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-gray-700 hover:text-blue-600 underline"
            >
              View on GitHub
            </a>

            {live ? (
              <a
                href={live}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-700 hover:text-blue-600 underline"
              >
                GepcoBill Bootstrap
              </a>
            ) : null}

                   {live2 ? (
              <a
                href={live2}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-gray-700 hover:text-blue-600 underline"
              >
                Keep Clone JS
              </a>
            ) : null}
          </div>
          

          <div className="text-xs text-gray-500">
            © {new Date().getFullYear()} ReactAPIsHub · Assignment By Taimoor Ali
          </div>
        </div>
      </div>
    </footer>
  );
}
