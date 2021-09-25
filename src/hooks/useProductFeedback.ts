import { useState, useEffect } from 'react';

interface ProductFeedback {
  currentUser: User;
  productRequests: ProductRequest[];
}

interface ProductRequest {
  id: number;
  title: string;
  category: string;
  upvotes: number;
  description: string;
  comments?: Comment[];
}

interface Comment {
  id: number;
  content: string;
  user: User;
  replies?: Reply[];
}

interface User {
  image: string;
  name: string;
  username: string;
}

interface Reply {
  content: string;
  replyingTo: string;
  user: User;
}

export function useProductFeedback(data: ProductFeedback) {
  const [feedback, setFeedback] = useState<ProductFeedback>(data);

  const upvoteProductRequest = (id: number): void => {
    let updatedRequests: ProductRequest[] = feedback.productRequests.map(
      (r) => {
        if (r.id === id) r.upvotes++;
        return r;
      },
    );

    let feedbackCopy: ProductFeedback = JSON.parse(JSON.stringify(feedback));
    feedbackCopy.productRequests = updatedRequests;
    setFeedback(feedbackCopy);
  };

  return {
    feedback,
    upvoteProductRequest,
  };
}
