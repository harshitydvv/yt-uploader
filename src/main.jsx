import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Home from "./components/Home.jsx";
import App from "./App.jsx";
import Login from "./pages/Login.jsx";
import Upload from "./pages/Upload.jsx";
import { ThemeModeProvider } from "./helper/ThemeContext.jsx";

import { GoogleOAuthProvider } from "@react-oauth/google";
import { Toaster } from "react-hot-toast";

import "./index.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="801509576626-gfes7tlt3jid2b9bq4o28sptejmf2jhs.apps.googleusercontent.com">
      <ThemeModeProvider>
        <Toaster position="top-right" reverseOrder={false} />

        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />}>
              <Route index element={<Navigate to="/login" replace />} />
              <Route path="upload" element={<Upload />} />
              <Route path="list" element={<h1>This is list page</h1>} />
            </Route>

            <Route path="/login" element={<Login />} />
            <Route path="/about" element={<App />} />
          </Routes>
        </BrowserRouter>
      </ThemeModeProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>
);