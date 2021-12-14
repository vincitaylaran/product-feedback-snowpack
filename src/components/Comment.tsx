import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import MainGrid from './MainGrid';
import RequestCard from './RequestCard';
import CommentsCard from './CommentsCard';
import { useProductFeedback } from '../hooks/useProductFeedback';
import type { ProductRequest } from 'src/interfaces/productRequest.interface';
import AddComment from './AddComment';

function Comment() {
  let params = useParams();
  const { data, findProductRequest } = useProductFeedback();
  const [request, setRequest] = useState<ProductRequest>();

  useEffect(() => {
    let result = findProductRequest(Number(params.requestId));
    setRequest(result);
  }, [data]);

  // TODO: add feature to show an error message if attempting to submit an empty comment.
  // TODO: add feature to reply to a comment.
  // TODO: add feature to add a comment.
  return (
    <MainGrid>
      <RequestCard request={request} upvoteProductRequest={() => {}} />
      <CommentsCard comments={request && request.comments} />
      <AddComment />
    </MainGrid>
  );
}

export default Comment;
