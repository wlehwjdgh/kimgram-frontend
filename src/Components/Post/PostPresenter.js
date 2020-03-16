import React from "react";
import styled from "styled-components";
import TextareaAutosize from "react-autosize-textarea";
import FatText from "../FatText";
import Avatar from "../Avatar";
import { HeartFull, HeartEmpty, Comment as CommentIcon } from "../Icons";

/*
  user-select = 사용자가 클릭 시 파란색으로 뒤덮이는 것 제어 
*/
const Post = styled.div`
  ${props => props.theme.whiteBox};
  width: 100%;
  max-width: 600px;
  margin-bottom: 25px;
  user-select: none;
`;

const Header = styled.header`
  padding: 15px;
  display: flex;
  align-items: center;
`;

const UserColumn = styled.div`
  margin-left: 10px;
`;

const Location = styled.span`
  display: block;
  margin-top: 5px;
  font-size: 12px;
`;

const Files = styled.div`
  position: relative;
  padding-bottom: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  flex-shrink: 0;
`;

const File = styled.div`
  max-width: 100%;
  width: 100%;
  height: 600px;
  position: absolute;
  top: 0;
  background-image: url(${props => props.src}});
  background-size: cover;
  background-position: center;
  opacity: ${props => (props.showing ? 1 : 0)};
  transition: opacity 0.5s linear;
`;
const Button = styled.span`
  cursor: pointer;
`;

const Meta = styled.div`
  padding: 15px;
`;

const Buttons = styled.div`
  ${Button} {
    &:first-child {
      margin-right: 10px;
    }
  }
  margin-bottom: 10px;
`;

const Timestamp = styled.span`
  font-weight: 400;
  text-transform: uppercase;
  opacity: 0.5;
  display: block;
  font-size: 12px;
  margin: 10px 0px;
  padding-bottom: 10px;
  border-bottom: ${props => props.theme.lightGreyColor} 1px solid;
`;

/*
  아래와 같이 styled component를 만들 수 있다(???)
  괄호 안에 있는 component가 prob called className을 가지고 있으면 
  아래처럼 styled component를 추가할 수있다...

  TODO: styled component에 대해 스터디..
*/

const Textarea= styled(TextareaAutosize)`
  border: none;
  width: 100%;
  resize: none;
  font-size:14px;
  &:focus {
    outline: none;
  }
`;

const Comments = styled.ul`
  margin-top: 10px;
`;

const Comment = styled.li`
  margin-bottom: 7px;
  span {
    margin-right: 5px;
  }
`;

export default ({
  user: { username, avatar },
  location,
  files,
  isLiked,
  likeCount,
  createdAt,
  newComment,
  currentItem,
  toggleLike,
  onKeyPress,
  comments,
  selfComments
}) => (
  <Post>
    <Header>
      <Avatar size="sm" url={avatar} />
      <UserColumn>
        <FatText text={username} />
        <Location>{location}</Location>
      </UserColumn>
    </Header>
    <Files>
      {files && 
        files.map( (file, index) => <File key={file.id} src={file.url} showing={index===currentItem}/>)}
    </Files>
    <Meta>
      <Buttons>
        <Button onClick={toggleLike}>
          {isLiked ? <HeartFull /> : <HeartEmpty />}
        </Button>
        <Button>
          <CommentIcon />
        </Button>
      </Buttons>
      <FatText text={likeCount === 1 ? "1 like" : `${likeCount} likes`} />

      {comments && (
        <Comments>
          {comments.map(comment => (
            <Comment key={comment.id}>
              <FatText text={comment.user.username} />
              {comment.text}
            </Comment>
          ))}
          {selfComments.map(comment => (
            <Comment key={comment.id}>
              <FatText text={comment.user.username} />
              {comment.text}
            </Comment>
          ))}
        </Comments>
      )}
      <Timestamp>{createdAt}</Timestamp>
      <Textarea 
        placeholder={"Add a comment..."} 
        /*  
          netComment는 useInput으로 만든 객체로서
          올드버전에는 {value, onChange}로 이루어져 있었다.
          때문에 {...new Comment} 형식으로 사용이 가능했었다.

          하지만 useInput을 refactor 하면서 newCommnet가 {value, onChange, setValue}로 이루어지게 되면서
          {...newComment} 형식을 사용하지 못하게 되고 아래와 같이 사용하게 되는 것이다.
          {...newComment} 을 사용하면 아래와 같은 경고가 뜨게 된다. 
          index.js:1 Warning: React does not recognize the `setValue` prop on a DOM element.
        */
        //{...newComment}
        value={newComment.value}
        onChange={newComment.onChange}
        /*
          여기서 굳이 form의 onSubmit을 쓰지 않는 이유는
          textarea특성상 엔터를 눌렀을 때 onSubmit이 되지 않고 텍스트 창이 커지면서 줄바꿈이 되도록 설정되어있기 때문

          onkeydown : 키를 눌렀을때 이벤트이다 (shift, alt, controll, capslock 등의 모든 키에 동작한다. 단 한영변환, 한자 등의 특수키는 인식 못한다).
          onkeyup : 키를 눌렀다가 땠을 때 이벤트이다 (onkeydown 에서 인식하는 키들을 인식 한다)
          onkeypress : 실제로 글자가 써질때 이벤트이다 (shift, tap, enter 등의 특수키는 인식 못한다).
        */
        onKeyPress={onKeyPress}
      />
    </Meta>
  </Post>
);