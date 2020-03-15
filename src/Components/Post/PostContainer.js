import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { useMutation } from "react-apollo-hooks";
import useInput from "../../Hooks/useInput";
import PostPresenter from "./PostPresenter";
import { TOGGLE_LIKE, ADD_COMMENT } from "./PostQueries";
import { toast } from "react-toastify";

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
  const comment = useInput("");
	/*
	src/Routes/Auth/AuthContainer에 useMutation에 대한 설명을 해 놓았다.
	*/
	const [toggleLikeMutation] = useMutation(TOGGLE_LIKE,{
		variables:{
			postId: id
		}
	});

	const [addCommentMutation] = useMutation(ADD_COMMENT,{
		variables:{
			postId: id,
			text: comment.value
		}
	});

	const slide= () => {
		const totalFiles = files.length;
		if(currentItem === totalFiles -1){
			setTimeout(() => setCurrentItem(0),3000);
		}else{
			setTimeout(() => setCurrentItem(currentItem+1),3000);
		}
	}

	const toggleLike = async () => {
		/*
			await을 하지 않는이유.
			사용자에게 하트 클릭 결과(하트 표시 & 좋아요 카운트 증가)를 빨리 보여주기 위해 
			아무래도 데모 서버이기 때문에 속도가 느려서 이렇게 처리한듯...

			하트를 마구 클릭할때 페이지 요소검사 -> 네트워크 탭을 보면 요청이 펜딩되며 쌓이는 것을 볼 수 있다.
			실제 인스타그램 에서도 똑같은 실험을 했을때 서버 응답 속도가 매우 빠름
		*/
		toggleLikeMutation();

		//새로고침해도 state가 유지된다.. 새로 안 사실 
		if ( isLikedS === true ) {
			setIsLiked(false);
			setLikeCount(likeCountS-1);
		} else {
			setIsLiked(true);
			setLikeCount(likeCountS+1);
		}
	};
	/*
		Post Component가 Mount될때 실행됨
	*/
	useEffect(()=>{
		slide();
	},[currentItem]);

	/*
		onKeyUp()은 src/Componentes/Post/PostPresenter.js에서 댓글 창인 Textarea input에서 쓰인다.
		여기서 굳이 form의 onSubmit을 쓰지 않는 이유는
		textarea특성상 엔터를 눌렀을 때 onSubmit이 되지 않고 텍스트 창이 커지면서 줄바꿈이 되도록 설정되어있기 때문

		또한 엔터키가 눌렸을 때 comment.setValue("")를 호출하는 이유는 위에 나타낸 textarea의 특성을 없애고 
		엔터를 눌렀을 때 값을 초기화 하고 리랜더링 하기 위함이다.
	*/
	const onKeyUp = async (e) =>{
		if(e.keyCode === 13){
			comment.setValue("");
			await addCommentMutation();
		}
		return;
	};

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
			toggleLike={toggleLike}
			onKeyUp={onKeyUp}
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

			//backend 서버 코드에서 comment에 대한 computed field 코드 추가 안하면 에러남
			//[GraphQL error]: Message: Cannot return null for non-nullable field Comment.user., Location: [object Object], Path: seeFeed,0,comments,0,user
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