
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';

import Weather from './pages/Weather';



import Countries from './pages/Countries';
import CurrencyApp from './pages/CurrencyApp';
import GoldSilver from './pages/GoldSilver';
import MoviesApp from './pages/MoviesApp';
import TriviaQuizApp from './pages/TriviaQuizApp';
import NasaApod from './pages/NasaApod';
import UrduQuran from './pages/UrduQuran';
import Advice from './pages/Advice';

import ColorPalette from './pages/ColorPalette';

import Footer from './components/Footer';

export default function App() {
return (
<div className="min-h-screen bg-gray-50 flex flex-col">
<Navbar />
<main className="container mx-auto p-4 flex-1">
<Routes>
<Route path="/" element={<Home />} />

<Route path="/advice" element={<Advice />} />
<Route path="/weather" element={<Weather />} />
<Route path="/countries" element={<Countries />} />
<Route path="/currency" element={<CurrencyApp />} />
<Route path="/gold" element={<GoldSilver />} />
<Route path="/movies" element={<MoviesApp />} />
<Route path="/colorpalette" element={<ColorPalette />} />
<Route path="/quiz" element={<TriviaQuizApp />} />
<Route path="/nasa" element={<NasaApod />} />
<Route path="/quran" element={<UrduQuran />} />


</Routes>
</main>
<Footer />
</div>
);
}