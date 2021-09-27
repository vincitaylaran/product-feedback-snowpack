import { useState, useEffect } from 'react';
import type { ProductFeedback } from '../interfaces/productFeedback.interface';
import type { ProductRequest } from '../interfaces/productRequest.interface';


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
