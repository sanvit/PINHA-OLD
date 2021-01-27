import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "pages/Home";
import Auth from "pages/Auth";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Route exact path="/" component={Home} />
      <Route exact path="/Auth" component={Auth} />
    </BrowserRouter>
  );
};

export default AppRouter;
