import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Loading from './Loading';
import MainGrid from './MainGrid';
import Card from './Card';
import RequestCard from './RequestCard';

const GET_COMMENT = gql`
  query Requests($requestId: Int!) {
    Request(id: $requestId) {
      id
      title
      description
      category
      upvotes {
        id
      }
      comments {
        id
        content
        user {
          id
          name
          username
          image
        }
        replies {
          id
          content
          user {
            id
            name
            username
            image
          }
          userId
        }
      }
    }
  }
`;

function Comment() {
  let params = useParams();
  const { data, loading, error } = useQuery(GET_COMMENT, {
    variables: { requestId: Number(params.requestId) },
  });

  if (error) console.error(error);
  if (loading) return <Loading />;
  if (data) console.log(data);

  return (
    <MainGrid>
      <RequestCard request={data.Request} upvoteProductRequest={() => {}} />
    </MainGrid>
  );
}

export default Comment;
