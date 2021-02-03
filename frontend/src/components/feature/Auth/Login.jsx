import React from "react";
import "components/feature/Auth/Login.scss";
const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="login-form" onSubmit={(e) => handleSubmit(e)}>
      <span className="login-title">LogIn</span>
      <button></button>
      <input type="number" className="login-input" required />
      <button type="submit" className="login-button">
        OKAY
      </button>
    </form>
  );
};

export default Login;
