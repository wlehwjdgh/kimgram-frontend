import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";

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
		/*
		update는 Mutation이 발생할 때 실해되는 함수이다. 두번째 인자로 해당 mutation의 결과를 받는다.
		여기서 mutation은 useMutation()의 첫번째 인자인 LOG_IN에 나와있는 requestSecret의 결과값인데.
		apollo docs에 살펴보면 requestSecret은 Boolean을 리턴하는 것을 볼 수 있다.
		따라서 두번째 인자는 true또는 false이다.
		*/
		update: (_, { data }) => {
			/*
			data의 형태는 object인데 해당 mutation 즉 여기서는 requestSecret의 결과값으로 표현된다.
			ex::: data = {requestSecret:ture}
			*/
			const { requestSecret } = data;
			if(! requestSecret ){
				//회원목록에 없는 email이면 경고 notification을 띄우고 3초뒤에 signup페이지를 띄운다.
				toast.error("You don't have an account yet, create one");
				setTimeout(() => setAction("signUp"),3000);
			}
		},
		/*
			useMutation의 첫번째 인자인 LOG_IN mutation은 인자를 1개 email을 받는다.
			이 인자를 넣는 방법은 아래와 같다. 
			우리는 email 인자에 우리가 미리 정의한 email useInput의 value를 사용하는 것이다.
		*/
		variables: { email:email.value }
	});

	const [createAccount] = useMutation(CREATE_ACCOUNT,{
		variables:{
			email: email.value,
			username: username.value,
			firstName: firstName.value,
			lastName: lastName.value
		}
	});

	/*
	 로그인or SignUp 버튼을 눌렀을 때 페이지가 새로고침 되지 않게 하기 위해
	 preventDefault() 설정
	*/
	const onSubmit=(e) => {
		//로그인or SignUp 버튼이 눌렸을 때 리렌더링 즉 새로고침 방지
		e.preventDefault();

		if(action==="logIn"){
			if(email !== ""){
				requestSecret();
			}else{
				toast.error("Email is required.");
			}
		}else{
			if(
				email.value !=="" &&
				username.value !=="" &&
				firstName.value !=="" &&
				lastName.value !=="" 
			){
				createAccount();
			}else{
				toast.error("All fields are required.");	
			}
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
			onSubmit={onSubmit}
		/>
  );
};