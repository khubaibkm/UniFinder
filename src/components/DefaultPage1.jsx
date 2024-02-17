import "./page1.css";
import { Link } from "react-router-dom";

export const DefaultPage1 = () => {
  return (
    <div id="page1">
      <h1>Welcome to UniFinder!</h1><br />
      <h1 style={{fontWeight:"300"}}>
        Let's get Started.
      </h1>
      <div id="mypic">
        <Link to="/signup">

          <div className="icon-container">
            <img src="/icons/signup.png" alt="signup" />
            <p>Sign Up</p>
          </div>
        </Link>
        <Link to="signin">
      
          <div className="icon-container">
            <img src="/icons/signin.png" alt="signin" />
            <p>Sign In</p>
          </div>
        
        </Link>
      </div>
      <div id="arr">
        <a href="#page2">
          <div id="arrow">
            <i className="ri-arrow-down-line"></i>
          </div>
        </a>
      </div>
    </div>
  );
};
