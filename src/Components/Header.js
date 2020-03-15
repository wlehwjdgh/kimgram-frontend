import React from "react";
import styled from "styled-components";
import { Link,  withRouter } from "react-router-dom";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Input from "./Input";
import useInput from "../Hooks/useInput";
import { Compass, HeartEmpty, User, Logo } from "./Icons";

const Header = styled.header`
  width: 100%;
  border: 0;
  position: fixed;
  top: 0;
  left: 0;
  background-color: white;
  border-bottom: ${props => props.theme.boxBorder};
  border-radius: 0px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 25px 0px;
  z-index: 2;
`;

const HeaderWrapper = styled.div`
  width: 100%;
  max-width: ${props => props.theme.maxWidth};
  display: flex;
  justify-content: center;
`;

const HeaderColumn = styled.div`
  width: 33%;
  text-align: center;
  &:first-child {
    margin-right: auto;
    text-align: left;
  }
  &:last-child {
    margin-left: auto;
    text-align: right;
  }
`;

const SearchInput = styled(Input)`
  background-color: ${props => props.theme.bgColor};
  padding: 5px;
  font-size: 14px;
  border-radius: 3px;
  height: auto;
  text-align: center;
  width: 70%;
  &::placeholder {
    opacity: 0.8;
    font-weight: 200;
  }
`;

const HeaderLink = styled(Link)`
  &:not(:last-child) {
    margin-right: 30px;
  }
`;

const ME = gql`
  {
    me {
      username
    }
  }
`;


/*
  라우트로 설정된 컴포넌트(이 프로젝트에서는 src/Routes.js에서 설정함)
  는 3가지의 props를 전달받게 됨 history, location, match

  근데 아래 컴포넌트는 라우트로 설정되지 않았기 때문에 위의 props를 받을 수 없다
  withRouter로 해당 컴포넌트를 감싸주면 라우트 props를 받을 수 있다.
  
  이렇게까지 라우트컴포넌트의 props를 받으려 하는 이유는 
  헤더 검색 input에서 검색했을 때 search라우트로 redirect하려고 하는것이다.
  다른 라우트컴포넌트로 redirect 하기 위해서는 props중에서 
  history.push()를 이용하면 된다.
*/
//export default (data) => {
export default withRouter( ({history}) => {
  const search = useInput("");
  const {  data } = useQuery(ME);
  //console.log(data&&data.me);
  const onSearchSubmit = e => {
    e.preventDefault();
    //파라미터의 경로로 redirect하자!
    history.push(`/search?term=${search.value}`);
  };
  return (
    <Header>
      <HeaderWrapper>
        <HeaderColumn>
          <Link to="/">
            <Logo />
          </Link>
        </HeaderColumn>
        <HeaderColumn>
          <form onSubmit={onSearchSubmit}>
            <SearchInput 
              //{...search} 
              value={search.value}
              onChange={search.onChange}
              placeholder="Search" 
            />
          </form>
        </HeaderColumn>
        <HeaderColumn>
          <HeaderLink to="/explore">
            <Compass />
          </HeaderLink>
          <HeaderLink to="/notifications">
            <HeartEmpty />
          </HeaderLink>
          {!(data&&data.me) ? (
            <HeaderLink to="/username">
            <User />
            </HeaderLink>
          ) : (
            <HeaderLink to={data.me.username}>
            <User />
            </HeaderLink>
          )}
        </HeaderColumn>
      </HeaderWrapper>
    </Header>
  );
});