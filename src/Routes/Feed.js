import React from "react";
import styled from "styled-components";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../Components/Loader";
import { style } from "dom-helpers";
const FEED_QUERY = gql`
	{
		seeFeed {
			id
			location
			caption
			user {
				id
				avatar
				username
			}
			files {
				id
				url
			}
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
			createdAt
		}
	}
`;

//전부 가운데 정렬시키는 Wrapper
const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	min-height: 80vh;
`;

export default () => {
	//why not await??? what is loading?
	const {data, loading} = useQuery(FEED_QUERY);
return <Wrapper>{loading && <Loader size={36}/>}</Wrapper>
}