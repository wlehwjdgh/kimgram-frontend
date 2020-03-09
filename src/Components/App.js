import React from 'react';
import { ThemeProvider } from "styled-components";
import GlobalStyles from '../Styles/GlobalStyles';
import Theme from "../Styles/Theme";
import Router from "./Router"

/*
  ThemeProvider 안에 두가지 요소를 두게되면 에러가 난다 그래서
  <></>를 이용한다..?
*/
export default () => (
  <ThemeProvider theme={Theme}>
    <>
      <GlobalStyles />
      <Router isLoggedIn={!false} />
    </>
  </ThemeProvider>
);
