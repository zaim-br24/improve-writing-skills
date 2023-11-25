import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SharedLayout, WritingSkills, Register } from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<WritingSkills />} />
        </Route>
        <Route path="/register" element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
