// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Home from "./pages/home/home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Living from "./pages/Living_components/living";
import Food from "./pages/Food_components/food";
import Emergency from "./pages/Emergency_components/emergency";
import Shopping from "./pages/Shopping_components/shopping";
import AboutUs from "./components/aboutUs";
import Loader from "./components/Loader";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import HomeWithoutSigning from "./pages/HomeWithoutSigning";

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <ScrollToTop
        className="scrollToTop"
        smooth
        style={{ borderRadius: "50%", padding: "20px 42px 40px 16px" }}
      />
      <div className="app">
        <ToastContainer />
        {loading ? (
          <Loader />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<HomeWithoutSigning />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="/home" element={<Home />} />
              <Route path="/home/living" element={<Living />} />
              <Route path="/home/food" element={<Food />} />
              <Route path="/home/shopping" element={<Shopping />} />
              <Route path="/home/emergency" element={<Emergency />} />
              <Route path="aboutus" element={<AboutUs />} />
            </Routes>
          </Router>
        )}
      </div>
    </>
  );
}

export default App;
