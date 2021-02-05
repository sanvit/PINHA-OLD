import React from "react";
import styled from "styled-components";
import Header from "./Header";
// import Footer from "./Footer";

const Container = styled.div`
  /* display: grid;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
  grid-template-areas:
    "header header header"
    "contents contents sidebar"
    "footer footer footer";
  width: 1024px;
  border: 1px solid #333;
  margin: 10px auto;
  max-width: 100%; */
`;

const Contents = styled.main`
  /* grid-area: contents; */
`;

const Layout = ({ children, thirdPartyComponent = null }) => {
  return (
    <Container>
      <Header />
      <Contents>{children}</Contents>
      {/* <Sidebar thirdPartyComponent={thirdPartyComponent} /> */}
      {/* <Footer /> */}
    </Container>
  );
};

export default Layout;
