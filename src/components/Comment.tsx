import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import Loading from './Loading';

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
  const { title, description, category, upvotes, comments } = data.Request;

  if (error) console.error(error);
  if (loading) return <Loading />;
  if (data) console.log(data);

  return (
    <div>
      <div>{title}</div>
      <div>{description}</div>
      <div>{category}</div>
      <div>{upvotes.length}</div>
      <div>
        {comments.map((c: any) => (
          <div>{c.content}</div>
        ))}
      </div>
    </div>
  );
}

export default Comment;
