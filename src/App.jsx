import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import Movie from './pages/Movie';

const App = () => {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="add-movie" element={<Movie />} />
        <Route path="edit-movie" element={<Movie />} />
      </Routes>
    </div>
  );
};

export default App;
