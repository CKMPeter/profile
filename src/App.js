import React from "react";
import { Routes, Route } from "react-router-dom";
import { MainPage } from "./components/mainPage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* other routes */}
      </Routes>
    </>
  );
}

export default App;
