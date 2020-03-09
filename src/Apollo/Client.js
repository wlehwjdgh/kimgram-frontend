import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./LocalState";

export default new ApolloClient({
    uri: "http://localhost:4000", //서버주소,
    clientState: {
        defaults,
        resolvers
    }
});