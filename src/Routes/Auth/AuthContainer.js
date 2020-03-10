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
	
	const [requestSecretMutation]  = useMutation(LOG_IN, {
		/*
		update는 Mutation이 발생할 때 실해되는 함수이다. 두번째 인자로 해당 mutation의 결과를 받는다.
		여기서 mutation은 useMutation()의 반환값인 requestSecretMutation()를 실행했을 때의 반환값인데.
		반환값은 LOG_IN에 명시된 실제로 grapql서버로 요청하는 mutation 함수의 반환값이다.
		apollo docs에 살펴보면 requestSecret은 Boolean을 리턴하는 것을 볼 수 있다.
		따라서 두번째 인자를 console.log 해보면
					{data: {…}}
			data:
			requestSecret: false
			__proto__: Object
			__proto__: Object
			이렇게 나온다.
		보통 cache,local storage 를 업데이트 하거나, apollo client에 접근할때 update함수를 사용한다.
		*/
			/*
		update: (_, { data }) => {
			//data의 형태는 object인데 해당 mutation 즉 여기서는 requestSecret의 결과값으로 표현된다.
			//ex::: data = {requestSecret:ture}

			const { requestSecret } = data;
			if(! requestSecret ){
				//회원목록에 없는 email이면 경고 notification을 띄우고 3초뒤에 signup페이지를 띄운다.
				toast.error("You don't have an account yet, create one");
				setTimeout(() => setAction("signUp"),3000);
			}
		},
		*/

		/*
			useMutation의 첫번째 인자인 LOG_IN mutation은 인자를 1개 email을 받는다.
			이 인자를 넣는 방법은 아래와 같다. 
			우리는 email 인자에 우리가 미리 정의한 email useInput의 value를 사용하는 것이다.
		*/
		variables: { email:email.value }
	});

	const [createAccountMutation] = useMutation(CREATE_ACCOUNT,{
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
	const onSubmit= async (e) => {
		//로그인or SignUp 버튼이 눌렸을 때 리렌더링 즉 새로고침 방지
		e.preventDefault();

		if(action==="logIn"){
			if(email !== ""){
				try{
					/*

					*/
					const  { data:{requestSecret} }  = await requestSecretMutation();
					if(! requestSecret ){
						//회원목록에 없는 email이면 경고 notification을 띄우고 3초뒤에 signup페이지를 띄운다.
						toast.error("You don't have an account yet, create one");
						setTimeout(() => setAction("signUp"),3000);
					}
				}catch{
					toast.error("Can't request secret, try again");
				}
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
				try{
					const {data:{createAccouont} } = await createAccountMutation();
					console.log(createAccouont);
					if(!createAccouont){
						toast.error("Can't create account");
					}else {
						toast.success("Account created! Log In now");
						setTimeout(()=>setAction("logIn"),3000);
					}
				}catch(e){
					toast.error(e.message);
				}
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