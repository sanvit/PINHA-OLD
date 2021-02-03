import React from "react";
import { Button } from "antd";
import openNotification from "utils/openNotification";
import "components/feature/Auth/Login.scss";

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <span className="login-title">LogIn</span>
      <input type="tel" className="login-input" required />
      <button type="submit" className="login-button">
        OKAY
      </button>
      <Button onClick={() => openNotification()}>Success</Button>
    </form>
  );
};

export default Login;
