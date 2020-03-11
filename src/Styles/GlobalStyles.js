import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

//이게 styled-components의 최신 방식으로 만드는 global styles이다.
//App.js에 보면 GlobalStyles가 Theme안에 있기 때문에 Theme의 요소(?)를 prop으로 받아올 수 있따(???)
export default createGlobalStyle`
    ${reset};
    @import url('https://fonts.googleapis.com/css?family=Open+Sans:400,600,700');
    * {
        box-sizing:border-box;
    }
    body {
        background-color:${props => props.theme.bgColor};
        color:${props => props.theme.blackColor};
        font-size:14px;
        font-family:-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        padding-top: 140px;
    }
    a {
        color:${props => props.theme.blueColor};
        text-decoration:none;
    }
    input:focus{
        outline:none;
    }
`;