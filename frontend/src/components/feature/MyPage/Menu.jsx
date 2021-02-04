import React from "react";
import "components/feature/MyPage/Menu.scss";

const Menu = () => {
  return (
    <ul className="menu">
      <li className="menu-option">
        <button className="menu-button">저장맛집</button>
      </li>
      <li className="menu-option">
        <button className="menu-button">작성리뷰</button>
      </li>
      <li className="menu-option">
        <button className="menu-button">보유뱃지</button>
      </li>
    </ul>
  );
};

export default Menu;
