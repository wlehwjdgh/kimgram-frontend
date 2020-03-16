import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import FatText from "./FatText";
import Button from "./Button";

const Card = styled.div`
  ${props => props.theme.whiteBox};
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

/*
  AvatarComponent에 className을 추가함으로써 
  아래와같이 기존 Avatar를 확장한 EAvatar로 사용할 수 있다.
  classname 있어여만 아래와같이 styled의 인자로 들어갈 수 있는것으로 보인다.

  TODO: styled 공부
*/
const EAvatar = styled(Avatar)`
  margin-bottom:15px;
`;

const ELink = styled(Link)`
  color:inherit;
  margin-bottom: 10px;
`;

const UserCard = ({ username, isFollowing, url, isSelf }) => (
  <Card>
    <EAvatar url={url} size={"md"}/>
    <ELink to={`${username}`}>
      <FatText text={username} />
    </ELink>
    {!isSelf && <Button text={isFollowing ? "Unfollow" : "Follow"} />}
  </Card>
);

UserCard.propTypes = {
  username: PropTypes.string.isRequired,
  isFollowing: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
  isSelf: PropTypes.bool.isRequired
};

export default UserCard;