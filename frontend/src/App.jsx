import Home from "./components/Home";
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import HomeSignup from "./components/HomeSignup";
import UserPage from "./components/UserPage";
import { useState } from "react";
import Admin from "./components/Admin/Admin";

export default function App() {
  const [userName, setUserName] = useState('');


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home userName={setUserName} />} />
        <Route path="/signup" element={<HomeSignup />} />
        <Route
          path="/home"
          element={<UserPage username={userName} />}
        />
        <Route
          path="/admin"
          element={<Admin />}
        />
      </Routes>
    </BrowserRouter>
  );
}
