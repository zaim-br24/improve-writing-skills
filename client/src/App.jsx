import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
  SharedLayout,
  WritingSkills,
  Register,
  UploadContent,
  ProtectedRoute,
  Error,
  Settings,
} from "./pages";
import {
  ProfilePage,
  Level,
  Password,
  Practice,
  General,
} from "./pages/Account";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SharedLayout />}>
          <Route index element={<WritingSkills />} />
          <Route
            path="/settings"
            element={
              <ProtectedRoute>
                <Settings />
              </ProtectedRoute>
            }
          >
            <Route index element={<General />} />
            <Route path="level" element={<Level />} />
            <Route path="profile" element={<ProfilePage />} />
            <Route path="password" element={<Password />} />
            <Route path="practice" element={<Practice />} />
          </Route>
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
        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
