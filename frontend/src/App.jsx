import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import { fatchDataFromApi } from './utils/api';
import Register from './pages/registration/Register';
import Login from './pages/login/Login';
import Home from './pages/home/Home';

function App() {
  return (
    <div>
      <BrowserRouter>
      <Toaster position='top-center' reverseOrder={false} />
       <Routes>
       <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;