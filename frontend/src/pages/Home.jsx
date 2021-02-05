import React from "react";
import "pages/Home.scss";
import { NaverMap } from "react-naver-maps";
import Layout from "components/Layout";
import MainMenu from "components/feature/Home/MainMenu";

const Home = () => {
  return (
    <Layout>
      <div className="home">
        <div className="home-sidebar">
          <MainMenu />
        </div>
        <div className="home-map">
          <NaverMap
            style={{
              width: "100%",
              height: "100%",
            }}
            defaultCenter={{ lat: 37.45003911472122, lng: 126.65349872605688 }}
          />
        </div>
      </div>
    </Layout>
  );
};

export default Home;
