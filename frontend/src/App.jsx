import React from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './pages/registration/Register';
import Login from './pages/login/Login';
function App() {
  return (
    <div>
      <BrowserRouter>
       <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;