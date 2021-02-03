import React from "react";
import { NaverMap } from "react-naver-maps";
import Layout from "components/Layout";

const Home = () => {
  return (
    <Layout>
      <NaverMap
        style={{
          width: "100%",
          height: "85vh",
        }}
      />
    </Layout>
  );
};

export default Home;
