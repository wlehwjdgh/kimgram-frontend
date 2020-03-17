import React from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import { FOLLOW, UNFOLLOW } from "./FollowButtonQueries";
import FollowButtonPresenter from "./FollowButtonPresenter";

const FollowButtonContainer = ({ isFollowing, id }) => {
  const followMutation = useMutation(FOLLOW);
  const unfollowMutation = useMutation(UNFOLLOW);

  <FollowButtonPresenter isFollowing={isFollowing}/>
};

FollowButtonContainer.PropTypes = {
  isFollowing: PropTypes.bool.isRequired,
  id: PropTypes.string.isRequired
}

export default FollowButtonContainer;