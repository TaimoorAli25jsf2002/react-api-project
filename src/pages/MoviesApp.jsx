import React, { useState, useEffect } from "react";

export default function MoviesApp() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const API_KEY = "d831c1738dbe315836f01f8aad0f8300"; // replace with your TMDB API key
  const API_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
  const IMG_URL = "https://image.tmdb.org/t/p/w300"; // poster size

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(API_URL);
        if (!res.ok) throw new Error("Failed to fetch movies");
        const data = await res.json();
        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8 text-center">🎬 Popular Movies</h1>

      {loading && <p className="text-gray-700 text-lg mb-4">Loading movies...</p>}
      {error && <p className="text-red-500 text-lg mb-4">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full max-w-6xl">
        {movies.map((movie) => (
          <div
            key={movie.id}
            className="bg-white rounded-2xl shadow-lg overflow-hidden hover:scale-105 transition-transform flex flex-col items-center"
          >
            {movie.poster_path ? (
              <img
                src={IMG_URL + movie.poster_path}
                alt={movie.title}
                className="w-full h-72 object-cover"
              />
            ) : (
              <div className="w-full h-72 flex items-center justify-center bg-gray-200">
                No Image
              </div>
            )}
            <div className="p-4 text-center">
              <h2 className="text-lg font-semibold mb-1">{movie.title}</h2>
              <p className="text-gray-600 text-sm">⭐ {movie.vote_average}</p>
              <p className="text-gray-500 text-sm mt-1">{movie.release_date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
