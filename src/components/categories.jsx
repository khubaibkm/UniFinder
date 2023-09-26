import "./categories.css";
import TabPanel from "./categoriesBox"

export const Categories = () => {
  return (
    <div id="categories">
      <h1 className="heading">
        Popular Categories
      </h1>
        <h4 className="subheading">CHECK THEM OUT</h4>
        <TabPanel/>
    </div>
  );
};