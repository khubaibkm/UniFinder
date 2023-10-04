import "./App.css";
import DrawerAppBar from "./components/nav";
import ScrollToTop from "react-scroll-to-top";
import { Page1 } from "./components/page1";
import { Categories } from "./components/categories";

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
        <Page1 />
      </div>
    </>
  );
}

export default App;
