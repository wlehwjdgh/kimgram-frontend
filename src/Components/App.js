import React from "react";
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import { HashRouter as Router } from "react-router-dom";
import { useQuery } from "react-apollo-hooks";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import GlobalStyles from "../Styles/GlobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes";
import Footer from "./Footer";
import Header from "./Header";
/*
@client 어노테이션을 하지 않으면
apollo가 query를 api 즉 서버로 보내려고 할 것이다.

@client에 해당 쿼리가 있다고 명시하는 것이다.
api대신에 cache에 대해서 실행하게 되는것이다.
*/
const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${props => props.theme.maxWidth};
  width: 100%;
`;

/*
  ThemeProvider 안에 두가지 요소를 두게되면 에러가 난다 그래서
  <></>를 이용한다..?
*/
export default () => {
  /*
  react apollo가 작동하는법.
  const QUERY처럼 쿼리를 만들고, useQuery명령의 인자로 넣어서 이용하면 
  데이터를 얻을 수 있다,
  */
  const { data : {isLoggedIn} } = useQuery(QUERY);
 
  return (
    <ThemeProvider theme={Theme}>
      <>
        <GlobalStyles />
        <Router>
          <>
            { isLoggedIn && <Header /> }
            <Wrapper>
              <Routes isLoggedIn={isLoggedIn} />
              <Footer />
            </Wrapper>
          </>
        </Router>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
      </>
    </ThemeProvider>
  );
};