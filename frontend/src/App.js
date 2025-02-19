import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import RecommendationForm from "./components/RecommendationForm";
import Home from "./components/Home";
import Favorites from "./components/Favorites";
import ProtectedRoute from "./components/ProtectedRoute";
import { ToastContainer } from "react-toastify";
import LoginAndRegister from "./components/LoginAndRegister";
import SideBar from "./components/SideBar";
import styled from "styled-components";
import EventDetails from "./components/EventDetails";
import AllEvents from "./components/AllEvents";
import MLRecomend from "./components/MLRecomend";
import RegisteredEvents from "./components/RegisteredEvents";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem("userId"));

  useEffect(() => {
    const checkAuth = () => setIsAuthenticated(!!localStorage.getItem("userId"));
    window.addEventListener("storage", checkAuth);
    return () => window.removeEventListener("storage", checkAuth); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    setIsAuthenticated(false); // Update authentication state
  };

  return (
    <Router>
      <ToastContainer style={{ marginTop: "40px" }} position="top-right" autoClose={3500} hideProgressBar={true} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      
      {isAuthenticated ?(
        <AppContainer>
          <SideBarContainer>
            <SideBar onLogout={handleLogout} />
          </SideBarContainer>
     
          <MainContent>
            <Routes>
              {/* Redirect logged-in users away from the login page */}
              <Route path="/" element={isAuthenticated ? <Navigate to="/home" /> : <LoginAndRegister setIsAuthenticated={setIsAuthenticated} />} />

              {/* Protected Routes */}
              <Route path="/home" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Home /></ProtectedRoute>} />
              <Route path="/events" element={<ProtectedRoute isAuthenticated={isAuthenticated}><AllEvents /></ProtectedRoute>} />
              <Route path="/recommend" element={<ProtectedRoute isAuthenticated={isAuthenticated}><RecommendationForm /></ProtectedRoute>} />
              <Route path="/favorites" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Favorites /></ProtectedRoute>} />
              <Route path="/registered" element={<ProtectedRoute isAuthenticated={isAuthenticated}><RegisteredEvents /></ProtectedRoute>} />
              <Route path="/ml" element={<ProtectedRoute isAuthenticated={isAuthenticated}><MLRecomend /></ProtectedRoute>} />
              <Route path="/event/:id" element={<ProtectedRoute isAuthenticated={isAuthenticated}><EventDetails /></ProtectedRoute>} />

              {/* Redirect unknown routes */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/"} />} />
            </Routes>
          </MainContent>
        </AppContainer>
      ) : (
        <Routes>
          <Route path="/" element={<LoginAndRegister setIsAuthenticated={setIsAuthenticated} />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
          
    </Router>
  );
};

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;

const SideBarContainer = styled.div`
  width: 20vw;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;

  @media (max-width: 768px) {
    width: 65%;
    max-width: 280px;
    transform: translateX(0);
  }
`;

const MainContent = styled.div`
  width: 80vw;
  margin-left: 20vw;
  overflow-y: auto;
  height: 100vh;

  @media (max-width: 768px) {
    width: 100vw;
    margin-left: 0;
  }
`;

export default App;
