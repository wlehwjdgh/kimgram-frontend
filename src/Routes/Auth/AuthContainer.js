import React, { useState } from "react";
import { toast } from "react-toastify";
import AuthPresenter from "./AuthPresenter";
import useInput from "../../Hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT, CONFIRM_SECRET, LOCAL_LOG_IN } from "./AuthQueries";

/*
Auth 컴포넌트 분리
Auth의 
style 관련된건 AuthPresenter.js에 구현
서버 쿼리관련된건 AuthQueries.js
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
	const secret = useInput("");
	const email = useInput("");
	
	/*
		useMutation()의 첫번째 인자는 gql 쿼리문이다.
		두번째 인자는  첫번째 인자읜 gql쿼리문에서 요구되는 인자이다.

		useMutation()의 반환값은 함수이름이다. 
		여기서는 requestSecretMutation()함수가 반횐된 것인데.
		LOG_IN을 하고 싶을때 이 함수를 부르면 된다,
		그렇게 되면 gql 쿼리 요청을 하게되고 해당 쿼리의 반환값을 
		object형태로 받을 수 있다.
		리턴값 중 {data:{실제 gql함수이름}}에 쿼리의 반환값이 들어있다.
	*/
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

	const [confirmSecretMutation] = useMutation(CONFIRM_SECRET,{
		variables:{
			secret: secret.value,
			email: email.value
		}
	});

	/*
		두번째 인자인 variables가 없는 이유
		해당 쿼리에 필요한 인자는 아래의 코드가 실행될 때는 존재하지 않는다.
		mutation에 인자를 전달하는 방법 중 mutation을 실행할 때 전달하는 방법을 택한 것이다. 
		이 파일 아래에 해당 mutation을 실행하는 코드가 있으니 참고하도록 하자.
	*/
	const [localLogInMutation] = useMutation(LOCAL_LOG_IN);
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
					const  { data:{requestSecret} }  = await requestSecretMutation();
					if(! requestSecret ){
						//회원목록에 없는 email이면 경고 notification을 띄우고 3초뒤에 signup페이지를 띄운다.
						toast.error("You don't have an account yet, create one");
						setTimeout(() => setAction("signUp"),3000);
					}else {
						toast.success("Check your inbox for your login secret");
						setAction("confirm");
					}
				}catch{
					toast.error("Can't request secret, try again");
				}
			}else{
				toast.error("Email is required.");
			}
		}else if(action === "signUp"){
			if(
				email.value !=="" &&
				username.value !=="" &&
				firstName.value !=="" &&
				lastName.value !=="" 
			){
				try{
					const {data:{createAccount} } = await createAccountMutation();
					console.log(createAccount);
					if(!createAccount){
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
		}else if(action === "confirm"){
			if(secret.value !== ""){
				try{
					const { data:{ confirmSecret:token } } = await confirmSecretMutation();
					if(token!=="" && token !== undefined){
						/*
							mutation함수에 variables 인자를 전달하는 방법은 2가지 이다.
							1. mutation을 생성할 때 
							2. mutation을 호출할 때

							다른 mutation들(createAccountMutation, requestSecretMutation)과 달리
							localLogInMutation을 호출할때 variables를 전달한 이유는.
							전달될 token이 mutation이 생성될 때는 존재 하지 않기 때문이다.
							token은 바로 위 라인의 await confirmSecretMutation(); 뮤테이션을 통해
							서버로부터 전달된다.
						*/
						localLogInMutation( {variables:{ token }});
					} else {
						throw Error();
					}
				}catch{
					toast.error("Can't confirm secret, check again");
				}
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
			secret={secret}
			onSubmit={onSubmit}
		/>
  );
};