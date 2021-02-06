import React from "react";
import "components/feature/Home/MainMenu.scss";
import PlaceList from "./PlaceList";

const MainMenu = () => {
  const categories = ["양식", "중식", "한식", "일식", "분식", "디저트", "술집"];

  return (
    <div className="mainmenu">
      <ul className="mainmenu-categories">
        {categories.map((category, idx) => (
          <li key={idx} className="mainmenu-category">
            {category}
          </li>
        ))}
      </ul>
      <div className="mainmenu-searchedItems">
        <PlaceList />
      </div>
    </div>
  );
};

export default MainMenu;
