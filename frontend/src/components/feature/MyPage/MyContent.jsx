import React from "react";
import StoreRegister from "components/feature/MyPage/StoreRegister";
import "components/feature/MyPage/MyContent.scss";

const MyContent = () => {
  return (
    <div className="content">
      <div>Mycontent</div>
      <h1>가게 추가하기</h1>
      <StoreRegister />
    </div>
  );
};

export default MyContent;
