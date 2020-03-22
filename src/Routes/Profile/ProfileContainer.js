import React from "react";
import withRouter from "react-router-dom/withRouter";
import { useQuery } from "react-apollo-hooks";
import { GET_USER } from "./ProfileQueries";
import ProfilePresenter from "./ProfilePresenter";

export default withRouter(({ match: { params: { username } } }) => {
  console.log(username);
  const { data, loading } = useQuery(GET_USER, { variables: { username } });
  console.log(data);
  return <ProfilePresenter loading={loading} data={data} />;
});