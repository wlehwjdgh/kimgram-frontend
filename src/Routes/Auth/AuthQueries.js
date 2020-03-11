import { gql } from "apollo-boost";

export const LOG_IN = gql`
	mutation requestSecret($email: String!){
		requestSecret(email: $email)
	}
`;

export const CREATE_ACCOUNT = gql`
	mutation createAccount(
		$username: String!
		$email: String!
		$firstName: String
		$lastname: String
		$bio: String
	){
		createAccount(
		username:$username
		email:$email
		firstName:$firstName
		lastname:$lastname
		bio:$bio
		)
	}
`;

export const CONFIRM_SECRET = gql`
	mutation confirmSecret(
		$secret: String!
		$email: String!
	){
		confirmSecret(
			secret:$secret
			email:$email
		)
	}
`;


//@client를 기억하라
export const LOCAL_LOG_IN = gql`
	mutation logUserIn($token:String!){
		logUserIn(token: $token) @client
	}
`;