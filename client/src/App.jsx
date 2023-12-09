import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SharedLayout,
  WritingSkills,
  Register,
  UploadContent,
  ProtectedRoute,
  Error
} from "./pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<WritingSkills />} />
        </Route>
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin/upload"
          element={
            <ProtectedRoute>
              <UploadContent />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<Error/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
