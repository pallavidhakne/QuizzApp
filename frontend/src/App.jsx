import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Register from "./pages/login/Register";
import Login from "./pages/login/Login";
import Home from "./pages/home/Home";
import Quiz from "./pages/quiz/Quiz";
import ScorePage from "./pages/score/ScorePage";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Toaster position="top-center" reverseOrder={false} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/quiz" element={<Quiz />} />
          <Route path="/score" element={<ScorePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
