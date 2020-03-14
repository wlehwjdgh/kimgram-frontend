import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
    uri: "http://localhost:4000", //서버주소,
    clientState: {
        defaults,
        resolvers
    },
    //헤더에 로그인 시 서버로부터 부여받은 token값을 붙여야만 token이 필요한 api 사용 가능
    headers: {
        "Authorization": `Bearer ${localStorage.getItem("token")}`
    }
});