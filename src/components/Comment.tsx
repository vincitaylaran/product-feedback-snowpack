import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import MainGrid from './MainGrid';
import RequestCard from './RequestCard';
import CommentsCard from './CommentsCard';
import { useProductFeedback } from '../hooks/useProductFeedback';
import type { ProductRequest } from 'src/interfaces/productRequest.interface';

function Comment() {
  let params = useParams();
  const { data, findProductRequest } = useProductFeedback();
  const [request, setRequest] = useState<ProductRequest>();

  useEffect(() => {
    let result = findProductRequest(Number(params.requestId));
    setRequest(result);
  }, [data]);

  return (
    <MainGrid>
      <RequestCard request={request} upvoteProductRequest={() => {}} />
      <CommentsCard comments={request && request.comments} />
    </MainGrid>
  );
}

export default Comment;
