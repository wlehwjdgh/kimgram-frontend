import React from "react";
import styled, {keyframes} from "styled-components";
import { Logo } from "./Icons";

//이것은 로딩중인 무언가가 있을 때 원하는 곳 어디든 넣을 수 있는 로더 컴포넌트이다.
const Animation = keyframes`
  0%{
    opacity:0
  }
  50%{
    opacity:1
  }
  100%{
    opacity:0
  }
`;

const Loader = styled.div`
  animation: ${Animation} 1s linear infinite;
`;

export default () => (
  <Loader>
    <Logo />
  </Loader>
);

