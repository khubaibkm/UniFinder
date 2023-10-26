import "./App.css";
import DrawerAppBar from "./components/nav";
import ScrollToTop from "react-scroll-to-top";
import { Page1 } from "./components/page1";
import { Categories } from "./components/categories";
import Review from "./components/review";
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
        <div id="home">
          <Page1 />
        </div>
        <div id="categories">
          <Categories />
        </div>
        <div id="reviews">
          <Review />
        </div>
        {/* <div id="about us">

        </div> */}
        <div id="contact us">
          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
