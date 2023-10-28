import "./living.css";
import { BrowserRouter as Router, Routes } from "react-router-dom";
export default function Living() {
  return (
      <Router>
        <Routes>
        <div className="listings">
      <div className="list">
        <p style={{ marginBottom: "13px", fontSize: "13px" }}>
          CHECK OUT OUR LISTINGS
        </p>
        <p style={{ lineHeight: 1.3, fontSize: "30px" }}>
          Explore the Living <br />
          Categories.
        </p>
      </div>
    </div>
        </Routes>
      </Router>
  );
}
