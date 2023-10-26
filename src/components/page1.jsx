import "./page1.css";
// import { Link } from "react-router-dom";
export const Page1 = () => {
  return (
    <div id="page1">
      <h4>OVER 200+ ACTIVE LISTINGS</h4>
      <h1>
        Discover the Best Nearby Places & <br /> Things
      </h1>
      <div id="mypic">
        <a href="#">
          <div className="icon-container">
            <img src="/icons/living.png" alt="living" />
            <p>Living</p>
          </div>
        </a>

        <a href="#">
          <div className="icon-container">
            <img src="/icons/food.png" alt="food" />
            <p>Food</p>
          </div>
        </a>
        <a href="#">
          <div className="icon-container">
            <img src="/icons/shopping.png" alt="shopping" />
            <p>Shopping</p>
          </div>
        </a>
        <a className="emer" href="#">
          <div className="icon-container">
            <img src="/icons/emergency.png" alt="emergency" />
            <p>Emergency</p>
          </div>
        </a>
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
