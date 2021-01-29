import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import Login from "components/feature/Auth/Login";
import Register from "components/feature/Auth/Register";
import Layout from "components/Layout";

const AuthPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 4rem);
  overflow-y: scroll;
`;

const Auth = () => {
  const history = useHistory();
  const {
    location: {
      state: { view },
    },
  } = history;
  const [isLoginView, setIsLoginView] = useState(view === "login");

  useEffect(() => {
    setIsLoginView(view === "login");
  }, [view]);

  return (
    <Layout>
      <AuthPage>{isLoginView ? <Login /> : <Register />}</AuthPage>
    </Layout>
  );
};

export default Auth;
