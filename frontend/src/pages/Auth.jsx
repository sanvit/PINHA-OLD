import React, { useState } from "react";
import styled from "styled-components";
import Login from "components/feature/Auth/Login";
import Register from "components/feature/Auth/Register";

const Button = styled.button`
  font-size: 50px;
`;

const Auth = () => {
  const [isLoginView, setIsLoginView] = useState(true);

  const handleClick = () => {
    setIsLoginView((prevState) => !prevState);
  };

  return (
    <>
      {isLoginView ? <Login /> : <Register />}
      <Button onClick={handleClick}>
        {isLoginView ? "회원가입하기" : "로그인하기"}
      </Button>
    </>
  );
};

export default Auth;
