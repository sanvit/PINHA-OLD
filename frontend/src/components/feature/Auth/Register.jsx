import React from "react";
import "components/feature/Auth/Register.scss";

const Register = ({ setRegisterPage }) => {
  const checkValidation = (e) => {
    e.preventDefault();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <form className="register-form" onSubmit={(e) => handleSubmit(e)}>
      <div className="register-title">
        회원가입
        <button
          className="register-close"
          onClick={() => setRegisterPage(false)}
        >
          x
        </button>
      </div>

      <div className="register-info">
        <input
          type="tel"
          className="register-input"
          placeholder="전화번호를 입력하세요."
          required
        />
        <button
          className="register-validation"
          onClick={(e) => checkValidation(e)}
        >
          중복 확인
        </button>
      </div>

      <div className="register-info">
        <input
          className="register-input"
          placeholder="닉네임을 입력하세요."
          required
        />
        <button
          className="register-validation"
          onClick={(e) => checkValidation(e)}
        >
          중복 확인
        </button>
      </div>

      <div className="register-container">
        <label>
          <span className="register-agreement">개인정보 제공 동의</span>
          <input type="checkbox" className="register-checkbox" required />
        </label>
      </div>

      <div className="register-submit">
        <button type="submit" className="register-button">
          확인
        </button>
      </div>
    </form>
  );
};

export default Register;
