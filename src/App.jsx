import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import DrawerAppBar from "./components/nav";
import ScrollToTop from "react-scroll-to-top";
import Home from "./pages/home/home";
import Footer from "./components/footer";
// import Living from "./components/Living_components/living";
function App() {
  return (
    <>
      <ScrollToTop
        className="scrollToTop"
        smooth
        style={{ borderRadius: "50%", padding: "20px 42px 40px 16px" }}
      />
      <div className="app">
        <DrawerAppBar />
        <Router>
        <Home />
        <div id="contact us">
          <Footer />
        </div>
        </Router>
      </div>
    </>
  );
}

export default App;
