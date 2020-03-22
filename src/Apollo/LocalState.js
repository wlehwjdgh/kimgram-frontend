import { noSubselectionAllowedMessage } from "graphql/validation/rules/ScalarLeafs";

/*
Local State는 기본적으로 Client에 없는 state이다.
마치 api의 state처럼(?)
app이 오프라인상태에서 발생하는것임
어떤사람들은 이걸 redux로 하곤 하는데 여기선 이걸로 해도 괜찮다.
*/
export const defaults = {
  isLoggedIn: Boolean(localStorage.getItem("token")) || false
};

export const resolvers = {
	Mutation: {
		//(parent, args, context);
		logUserIn: (_,{ token }, { cache }) => {
			localStorage.setItem("token", token);
			cache.writeData({
				data: {
					isLoggedIn: true
				}
			});
			return null;
		},
		logUserOut: (_,__, { cache }) =>{
			localStorage.removeItem("token");
			/*
				logout시 전체페이지를 reload하고,
				모든 cache를 없애는게 좋을것 같다.
			*/
			window.location="/";
			return null;
		}
	}
}; 