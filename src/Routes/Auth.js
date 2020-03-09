import React, { useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Box = styled.div`
  ${props => props.theme.whiteBox}
  border-radius:0px;
  width: 350px;
`;
const StateChanger = styled(Box)`
  text-align: center;
  padding: 20px 0px;
`;

const Link = styled.span`
  color: ${props => props.theme.blueColor};
  cursor: pointer;
`;


export default () => {

  /*
  useState 사용법.
  아래 문법은 배열 비구조화 할당 문법이다.

  useState()은 파라미터로 상태의 기본값을 넣어준다.
  그리고 호출 뒤 배열을 리턴하는데 그 배열의 첫번째 원소는 상태값이고, 
  두번째 요소는 상태를 설정하는 함수이다.
  두번째 요소인 함수에 변경하고자 하는 상태를 파라미터로 넣어서 호출하면
  전달받은 파라미터로 값이 바뀌게 되고 컴포넌트는 정상적으로 리렌더링 된다.
  */
  const [action, setAction] = useState("logIn");

  return (
    <Wrapper>
      <StateChanger>
        {action === "logIn" ? (
          <>
            Don't have an account?{" "}
            <Link onClick={() => setAction("signUp")}>Sign up</Link>
          </>
        ) : (
          <>
            Have an account?{" "}
            <Link onClick={() => setAction("logIn")}>Log in</Link>
          </>
        )}
      </StateChanger>
    </Wrapper>
  );
}