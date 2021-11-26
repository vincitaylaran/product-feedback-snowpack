import React from 'react';
import { useParams } from 'react-router-dom';

// TODO: use Apollo Provider to fetch a request with the ID in params.
function Comment() {
  let params = useParams();

  return <div>Comment: #{params.requestId}</div>;
}

export default Comment;
