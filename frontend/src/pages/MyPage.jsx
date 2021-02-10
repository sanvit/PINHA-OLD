import React, { useEffect } from "react";
import Layout from "components/Layout";
import Profile from "components/feature/MyPage/Profile";
import Menu from "components/feature/MyPage/Menu";
import MyContent from "components/feature/MyPage/MyContent";
import useWindowWidth from "../hooks/useWindowWidth";
import "pages/MyPage.scss";

const MyPage = () => {
  const width = useWindowWidth();

  console.log(width);

  return (
    <Layout>
      <div className="mypage">
        <div className="mypage-sidebar">
          <Profile />
          <Menu />
        </div>
        <div className="mypage-content">
          <MyContent />
        </div>
      </div>
    </Layout>
  );
};

export default MyPage;
