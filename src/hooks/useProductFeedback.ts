import { useState } from 'react';
import type { ProductFeedback } from '../interfaces/productFeedback.interface';
import type {
  ProductRequest,
  Comment,
} from '../interfaces/productRequest.interface';
import type { User } from '../interfaces/user.interface';

export function useProductFeedback(data: ProductFeedback) {
  const [feedback, setFeedback] = useState<ProductFeedback>(data);

  const upvoteProductRequest = (id: number): void => {
    // Creates a deep copy of feedback.
    let feedbackCopy: ProductFeedback = JSON.parse(JSON.stringify(feedback));
    let { currentUser, productRequests } = feedbackCopy;
    let userPreviouslyUpvoted: boolean;

    if (currentUser.upvotedRequests) {
      // Check if ID exists.
      userPreviouslyUpvoted = didUserPreviouslyUpvote(
        id,
        currentUser.upvotedRequests,
      );

      if (userPreviouslyUpvoted) {
        currentUser.upvotedRequests = removeUpvoteRequestId(
          id,
          currentUser.upvotedRequests,
        );
        productRequests = changeRequestUpvote(id, productRequests, false);
      } else {
        currentUser.upvotedRequests.push(id);
        productRequests = changeRequestUpvote(id, productRequests, true);
      }
    } else {
      currentUser.upvotedRequests = [id];
      productRequests = changeRequestUpvote(id, productRequests, true);
    }

    setFeedback(feedbackCopy);
  };

  const changeRequestUpvote = (
    id: number,
    productRequests: ProductRequest[],
    shouldIncrement: boolean,
  ): ProductRequest[] => {
    return productRequests.map((request) => {
      if (request.id === id) {
        if (shouldIncrement) {
          request.upvotes++;
        } else {
          request.upvotes--;
        }
      }
      return request;
    });
  };

  const removeUpvoteRequestId = (
    id: number,
    requestIdArray: number[],
  ): number[] => requestIdArray.filter((requestId) => requestId !== id);

  const didUserPreviouslyUpvote = (
    id: number,
    requestIdArray: number[],
  ): boolean => requestIdArray.some((requestId) => requestId === id);

  const addComment = (
    requestId: number,
    comment: { content: string; user: User },
  ): void => {
    let feedbackCopy: ProductFeedback = JSON.parse(JSON.stringify(feedback));
    let finalCommentId: number;

    feedbackCopy.productRequests.forEach((request) => {
      if (request.id === requestId) {
        if (request.comments) {
          finalCommentId = request.comments[request.comments.length - 1].id++;
          request.comments.push({
            id: finalCommentId,
            content: comment.content,
            user: comment.user,
          });
        } else {
          request.comments = [];
          request.comments.push({
            id: 1,
            content: comment.content,
            user: comment.user,
          });
        }
      }
    });

    setFeedback(feedbackCopy);
  };

  return {
    feedback,
    upvoteProductRequest,
    addComment,
  };
}
