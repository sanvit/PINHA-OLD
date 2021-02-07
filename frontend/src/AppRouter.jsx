import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import LoginRequiredRoute from "components/shared/LoginRequiredRoute";
import Home from "pages/Home";
import MyPage from "pages/MyPage";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      {/*<LoginRequiredRoute exact path="/me" component={MyPage} />*/}
      <Route exact path="/mypage" component={MyPage} />
    </BrowserRouter>
  );
};

export default AppRouter;
