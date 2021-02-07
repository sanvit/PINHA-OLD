import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import { useAppContext } from "stores/jwt-store";
import Login from "components/feature/Auth/Login";
import Register from "components/feature/Auth/Register";
import "components/Layout/Header.scss";

const AuthPage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  z-index: 99;
  background-color: rgba(0, 0, 0, 0.5);
  overflow-y: hidden;
`;

const Header = () => {
  const history = useHistory();

  const {
    location: { state },
  } = history;

  const [isMainView, setIsMainView] = useState(state === undefined);
  const [loginPage, setLoginPage] = useState(null);
  const [registerPage, setRegisterPage] = useState(null);

  const showPage = (e) => {
    const name = e.target.name;
    if (name === "login") {
      setLoginPage(true);
    } else {
      setRegisterPage(true);
    }
  };

  const {
    state: { isAuthenticated },
  } = useAppContext();

  const goToHome = () => {
    history.push("/");
  };

  const goToMyPage = () => {
    history.push({
      pathname: "MyPage",
      state: "mypage",
    });
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
              className="header-button loginBtn"
              onClick={(e) => showPage(e)}
            >
              로그인
            </button>
            <button
              name="register"
              className="header-button registerBtn"
              onClick={(e) => showPage(e)}
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            <button
              name="mypage"
              className="header-button mypageBtn"
              onClick={goToMyPage}
            >
              마이페이지
            </button>
            <button className="header-button logoutBtn">로그아웃</button>
          </>
        )}
      </div>
      {loginPage && (
        <AuthPage>
          <Login setLoginPage={setLoginPage} />
        </AuthPage>
      )}
      {registerPage && (
        <AuthPage>
          <Register setRegisterPage={setRegisterPage} />
        </AuthPage>
      )}
    </div>
  );
};

export default Header;
