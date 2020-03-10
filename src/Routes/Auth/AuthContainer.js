import React, { useState } from "react";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

/*
Auth의 style 관련된건 AuthPresenter.js에 구현
나머지는 여기 AuthContainer.js에 구현한다.
이렇게 하는 이유는 Auth컴포넌트가 길어지기 때문에 복잡한것을 분리하는것이다.
*/
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
  const username = useInput("");
  const firstName = useInput("");
  const lastName = useInput("");
  const email = useInput("");
	const [requestSecret]  = useMutation(LOG_IN, {
		 variables: { email:email.value }});

	/*
	 로그인 버튼을 눌렀을 때 페이지가 새로고침 되지 않게 하기 위해
	 preventDefault() 설정
	*/
	const onLogin=(e) => {
		//로그인 버튼이 눌렸을 때 리렌더링 즉 새로고침 방지
		e.preventDefault();
		if(email !== ""){
			requestSecret();
		}
	};

  return (
		<AuthPresenter
			setAction={setAction}
			action={action}
			username={username}
			firstName={firstName}
			lastName={lastName}
			email={email}
			onLogin={onLogin}
		/>
  );
};