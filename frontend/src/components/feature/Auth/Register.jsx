import React from "react";
import "components/feature/Auth/Register.scss";

const Register = () => {
  const checkValidation = (e) => {
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
      <span className="register-title">SignIn</span>
      <input
        type="number"
        className="register-input tel"
        placeholder="전화번호를 입력하세요."
        required
      />
      <button
        className="register-validation tel"
        onClick={(e) => checkValidation(e)}
      >
        중복 확인
      </button>
      <input
        className="register-input name"
        placeholder="닉네임을 입력하세요."
        required
      />
      <button
        className="register-validation name"
        onClick={(e) => checkValidation(e)}
      >
        중복 확인
      </button>
      <label className="register-container">
        <span className="register-agreement">개인정보 제공 동의</span>
        <input type="checkbox" className="register-checkbox" required />
      </label>
      <button type="submit" className="register-button">
        OKAY
      </button>
    </form>
  );
};

export default Register;
