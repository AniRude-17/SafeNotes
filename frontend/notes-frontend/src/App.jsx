import React, { useState } from 'react';
import './App.css';
import View from './assets/pages/View';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <>
      NOTES
      <BrowserRouter>
      <Routes>
        <Route path='/:id' element={<View />} />
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
