import React, { useState } from "react";
import "components/Layout/Header.scss";
import { useAppContext } from "stores/jwt-store";
import { useHistory } from "react-router-dom";

const Header = () => {
  const history = useHistory();

  const [isMainView, setIsMainView] = useState(true);

  const {
    state: { isAuthenticated },
  } = useAppContext();

  const goToPage = (event, path) => {
    history.push({
      pathname: `${path}`,
      state: { view: event.target.name },
    });

    setIsMainView(false);
  };

  const goToHome = () => {
    history.push("/");
    setIsMainView(true);
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
              onClick={(e) => goToPage(e, "Auth")}
            >
              로그인
            </button>
            <button
              name="register"
              className="header-button register"
              onClick={(e) => goToPage(e, "Auth")}
            >
              회원가입
            </button>
          </>
        ) : (
          <>
            <button
              name="mypage"
              className="header-button mypage"
              onClick={(e) => goToPage(e, "MyPage")}
            >
              마이페이지
            </button>
            <button className="header-button logout">로그아웃</button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
