import React from "react";
import { withRouter } from "react-router-dom";
import SearchPresenter from "./SearchPresenter";
import { useQuery } from "react-apollo-hooks";
import { SEARCH } from "./SearchQueries";

export default withRouter(({ location: { search } }) => {
  const term = search.split("=")[1];
  
  /*
    skip = 만약 파라미터로 요구되는 term이  누락되었다면 쿼리를 실행하지 않는다.
    term이 누락된 채로 skip을 하지 않으면 쿼리가 실행되고 에러가 발생함.
  */
  const { data, loading } = useQuery(SEARCH, {
    skip: term === undefined,
    variables: {
      term
    }
  });
  
  return <SearchPresenter searchTerm={term} loading={loading} data={data} />;
});