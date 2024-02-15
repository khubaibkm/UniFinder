// App.js
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "react-scroll-to-top";
import Home from "./pages/home/home";
import Living from "./pages/Living_components/living";
import Food from "./pages/Food_components/food";
import Emergency from "./pages/Emergency_components/emergency";
import Shopping from "./pages/Shopping_components/shopping";
import AboutUs from "./components/aboutUs";
import Loader from "./components/Loader";
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
        {loading ? (
          <Loader />
        ) : (
          <Router>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="living" element={<Living />} />
              <Route path="food" element={<Food />} />
              <Route path="shopping" element={<Shopping />} />
              <Route path="emergency" element={<Emergency />} />
              <Route path="aboutus" element={<AboutUs />} />
            </Routes>
          </Router>
        )}
      </div>
    </>
  );
}

export default App;
