import "./categories.css";
import DefaultTabPanel from "./DefaultCategoriesBox"

export const DefaultCategories = () => {
  return (
    <div id="categories">
      <h1 className="heading">
        Popular Categories
      </h1>
        <h4 className="subheading">CHECK THEM OUT</h4>
        <DefaultTabPanel/>
    </div>
  );
};