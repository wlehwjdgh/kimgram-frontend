import React, { useState, useEffect } from "react";
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
	createdAt,
	caption,
	location
}) =>{
	/*
		isLiked와 likeCount만 useState하는 이유
		사용자가 눌렀을 때 좋아요 여부와 좋아요 개수를 
		다시 서버로 부터 요청하는 것이 아니고
		그자리에서 바로 갱신하기 위해서.

	*/
	const [isLikedS, setIsLiked] = useState(isLiked);
	const [likeCountS, setLikeCount] = useState(likeCount);
	const [currentItem, setCurrentItem] = useState(0);


	const slide= () => {
		const totalFiles = files.length;
		if(currentItem === totalFiles -1){
			setTimeout(() => setCurrentItem(0),3000);
		}else{
			setTimeout(() => setCurrentItem(currentItem+1),3000);
		}
	}

	/*
		Post Component가 Mount될때 실행됨
	*/
	useEffect(()=>{
		slide();
	},[currentItem]);
	
	console.log(currentItem);
  const comment = useInput("");
  return (
    <PostPresenter
      user={user}
      files={files}
      likeCount={likeCountS}
      location={location}
      caption={caption}
      isLiked={isLikedS}
      comments={comments}
      createdAt={createdAt}
      newComment={comment}
      setIsLiked={setIsLiked}
			setLikeCount={setLikeCount}
			currentItem={currentItem}
    />
  );
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
  caption: PropTypes.string.isRequired,
  location: PropTypes.string,
  createdAt: PropTypes.string.isRequired
};

export default PostContainer;