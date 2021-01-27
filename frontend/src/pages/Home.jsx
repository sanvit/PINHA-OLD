import React from "react";
import { NaverMap } from "react-naver-maps";
import Test from "components/feature/Home/Test";

const Home = () => {
  return (
    <div>
      <Test>Home</Test>
      <NaverMap
        style={{
          width: "100%",
          height: "600px",
        }}
      />
    </div>
  );
};

export default Home;
