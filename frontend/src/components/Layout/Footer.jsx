import React, { memo } from "react";
import styled from "styled-components";

const FooterPage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 3rem;
  color: #4daad1;
  font-size: 0.5rem;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

const FooterTitle = styled.span`
  text-align: center;
`;

const Footer = memo(() => {
  return (
    <FooterPage>
      <FooterTitle>
        PINHA
        <br />
        Inha University
      </FooterTitle>
    </FooterPage>
  );
});

export default Footer;
