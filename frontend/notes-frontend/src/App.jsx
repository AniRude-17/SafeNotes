import React, { useState } from 'react';
import './App.css';
import View from './assets/pages/View';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      <div id="Navbar">
        <div id="App">
          Safe Notes
        </div>
      </div>
      <BrowserRouter>
      <Routes>
        <Route path='/:id' element={<View />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
