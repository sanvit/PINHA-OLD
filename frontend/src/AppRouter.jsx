import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "pages/Home";
import Auth from "pages/Auth";
import MyPage from "pages/MyPage";
import Header from "components/Layout/Header";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={Home} />
      <Route exact path="/Auth" component={Auth} />
      <Route exact path="/MyPage" component={MyPage} />
    </BrowserRouter>
  );
};

export default AppRouter;
