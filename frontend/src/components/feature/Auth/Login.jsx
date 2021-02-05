import React from "react";
import { Button } from "antd";
import openNotification from "utils/openNotification";
import "components/feature/Auth/Login.scss";

const Login = ({ setLoginPage }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="login-title">
        로그인
        <button className="login-close" onClick={() => setLoginPage(false)}>
          x
        </button>
      </div>

      <div className="login-info">
        <input
          type="tel"
          className="login-input"
          placeholder="전화번호를 입력하세요."
          required
        />
      </div>

      <div className="login-submit">
        <button type="submit" className="login-button">
          확인
        </button>
      </div>

      {/* <Button onClick={() => openNotification()}>Success</Button> */}
    </form>
  );
};

export default Login;
