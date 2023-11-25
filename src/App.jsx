import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DrawerAppBar from "./components/nav";
import ScrollToTop from "react-scroll-to-top";
import Home from "./pages/home/home";
import Footer from "./components/footer";
import Living from "./pages/Living_components/living";
// import Living from "./components/Living_components/living";
import Food from "./pages/Food_components/food";
import Emergency from "./pages/Emergency_components/emergency";
import Shopping from "./pages/Shopping_components/shopping";
import AboutUs from "./components/aboutUs";
function App() {
  return (
    <>
      <ScrollToTop
        className="scrollToTop"
        smooth
        style={{ borderRadius: "50%", padding: "20px 42px 40px 16px" }}
      />
      <div className="app">
        <Router>
        <DrawerAppBar />
          <Routes>           
          <Route path="/" element={<Home />} />
          <Route path="living" element={<Living/>}/>
          <Route path="food" element={<Food/>}/>
          <Route path="shopping" element={<Shopping/>}/>
          <Route path="emergency" element={<Emergency/>}/>       
          <Route path="aboutus" element={<AboutUs/>}/>       
        </Routes>
        <div id="contact us">
          <Footer />
        </div>
        </Router>
      </div>
    </>
  );
}

export default App;
