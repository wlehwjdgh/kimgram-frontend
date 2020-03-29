import { gql } from "apollo-boost";

export const GET_USER = gql`
  query seeUser($username: String!) {
    seeUser(username: $username) {
      id
      avatar
      username
      fullName
      isFollowing
      isSelf
      bio
      followingCount
      followersCount
      postsCount
      posts {
        id
        files {
          url
        }
        likeCount
        commentCount
        likeCount
        isLiked
        comments {
          id
          text
          user {
            id
            username
          }
        }
      }
    }
  }
`;

export const LOG_OUT = gql`
  mutation{
		logUserOut @client
  }
`;