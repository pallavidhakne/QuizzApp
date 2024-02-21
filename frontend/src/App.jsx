import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from 'react-hot-toast';

import Register from './pages/registration/Register';
import Login from './pages/login/Login';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Toaster position='top-center' reverseOrder={false} />
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;