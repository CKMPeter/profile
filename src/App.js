import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./components/mainPage";
import { About } from "./components/about";
import { Contact } from "./components/contact";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* other routes */}
        <Route path="/about" element={ <About/>} />
        <Route path="/contact" element={<Contact/>} />
      </Routes>
    </>
  );
}

export default App;
