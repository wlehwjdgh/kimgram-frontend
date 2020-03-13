import React, { useState } from "react";
import PropTypes from "prop-types";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";

/*
export default 하지 않는 이유는 
PostContainer.propTypes해야하기 때문이다
*/

const PostContainer = ({ 
  id,
  user,
  files,
  likeCount,
  isLiked,
  comments,
  createdAt
}) =>{
	return <PostPresenter />;
};

PostContainer.propTypes = {
	id: PropTypes.string.isRequired,

	/*
		src/Routes/Feed.js에서 FEED_QUERY를 보면 
		user는 여러게의 항목으로 이루어져 있는 것을 볼 수 있다.
		이때는 아래와 같이 PropTypes의 shape를 사용한다. 
	*/
	user: PropTypes.shape({
		id: PropTypes.string.isRequired,
		avatar: PropTypes.string,
		username: PropTypes.string.isRequired
	}).isRequired,

	/*
		files는 여러개의 항목이 배열 형태로 리턴된다 
		이때는 아래와 같이 PropTypes의 arrayOf를 사용한다.
	*/
	files: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			url: PropTypes.string.isRequired
		})
	).isRequired,

	likeCount: PropTypes.number.isRequired,
	isLiked: PropTypes.bool.isRequired,

	comments: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
			user: PropTypes.shape({
				id: PropTypes.string.isRequired,
				username: PropTypes.string.isRequired
			}).isRequired
		})
	).isRequired,
	createdAt: PropTypes.string
};

export default PostContainer;