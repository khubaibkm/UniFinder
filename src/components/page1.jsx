import "./page1.css";

export const Page1 = () => {
  return (
    <div id="page1">
      <h4>OVER 200+ ACTIVE LISTINGS</h4>
      <h1>
        Discover the Best Nearby Places & <br /> Things
      </h1>
      <div id="mypic">
        <a href="#">
          <div className="icon-name">
            <img src="src/assets/icons/living.png" alt="living" />
          </div>
        </a>

        <a href="#">
          <img src="src/assets/icons/food.png" alt="Food" />
        </a>
        <a href="#">
          <img src="src/assets/icons/shopping.png" alt="shopping" />
        </a>
        <a href="#">
          <img src="src/assets/icons/emergency.png" alt="emergency" />
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
