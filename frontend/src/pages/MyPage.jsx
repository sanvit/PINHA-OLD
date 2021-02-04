import React from "react";
import "pages/MyPage.scss";
import Layout from "components/Layout";
import Profile from "components/feature/MyPage/Profile";
import Menu from "components/feature/MyPage/Menu";
import MyContent from "components/feature/MyPage/MyContent";
//import LoginRequiredRoute from "components/shared/LoginRequiredRoute";

const MyPage = () => {
  return (
    //<LoginRequiredRoute>
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
    //</LoginRequiredRoute>
  );
};

export default MyPage;
