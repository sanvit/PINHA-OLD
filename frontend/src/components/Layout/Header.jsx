import React, { useState } from "react";
import "components/Layout/Header.scss";
import { useAppContext } from "stores/jwt-store";
import { useHistory } from "react-router-dom";
import Login from "components/feature/Auth/Login";
import Register from "components/feature/Auth/Register";
import styled from "styled-components";

const AuthPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: hidden;
`;

const Header = () => {
  const history = useHistory();

  const {
    location: { state },
  } = history;

  const [isMainView, setIsMainView] = useState(state === undefined);
  const [login, setLogin] = useState(null);
  const [register, setRegister] = useState(null);

  const showPage = (e) => {
    const name = e.target.name;
    if (name === "login") {
      setLogin(true);
      setRegister(false);
    } else {
      setRegister(true);
      setLogin(false);
    }
  };

  const {
    state: { isAuthenticated },
  } = useAppContext();

  const goToHome = () => {
    history.push("/");
    setRegister(false);
    setLogin(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <div className="header">
      <img src="" alt="logo" className="header-logo" onClick={goToHome} />
      <form className="header-search" onSubmit={(e) => handleSubmit(e)}>
        {isMainView && (
          <input
            className="header-input"
            placeholder="원하는 가게를 검색해보세요."
          />
        )}
      </form>
      <div className="header-buttonList">
        {!isAuthenticated ? (
          <>
            <button
              name="login"
              className="header-button login"
              onClick={(e) => showPage(e)}
            >
              로그인
            </button>
            <button
              name="register"
              className="header-button register"
              onClick={(e) => showPage(e)}
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            <button name="mypage" className="header-button mypage">
              마이페이지
            </button>
            <button className="header-button logout">로그아웃</button>
          </>
        )}
      </div>
      {login && (
        <AuthPage>
          <Login />
        </AuthPage>
      )}
      {register && (
        <AuthPage>
          <Register />
        </AuthPage>
      )}
    </div>
  );
};

export default Header;
