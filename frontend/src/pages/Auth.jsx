import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Layout from "components/Layout";
import styled from "styled-components";

const AuthPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 7rem);
  overflow-y: scroll;
  ::-webkit-scrollbar {
    display: none;
  }
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

  return <Layout></Layout>;
};

export default Auth;
