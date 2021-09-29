import { useState } from 'react';
import type { ProductFeedback } from '../interfaces/productFeedback.interface';
import type {
  ProductRequest,
  Reply,
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
      userPreviouslyUpvoted = didUserPreviouslyUpvote(id, currentUser);

      if (userPreviouslyUpvoted) {
        currentUser.upvotedRequests = removeUpvoteRequestId(id, currentUser);
        productRequests = changeUpvoteCount(id, productRequests, false);
      } else {
        currentUser.upvotedRequests.push(id);
        productRequests = changeUpvoteCount(id, productRequests, true);
      }
    } else {
      currentUser.upvotedRequests = [id];
      productRequests = changeUpvoteCount(id, productRequests, true);
    }

    setFeedback(feedbackCopy);
  };

  const changeUpvoteCount = (
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
    user: User,
  ): number[] | undefined => {
    if (user.upvotedRequests) {
      return user.upvotedRequests.filter((requestId) => requestId !== id);
    }
    return;
  };

  const didUserPreviouslyUpvote = (id: number, user: User): boolean => {
    if (user.upvotedRequests) {
      return user.upvotedRequests.some((requestId) => requestId === id);
    }
    return false;
  };

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

  const replyToComment = (
    requestId: number,
    commentId: number,
    reply: Reply,
  ) => {
    const requestsCopy = [...feedback.productRequests];

    requestsCopy.forEach((request) => {
      if (request.id === requestId) {
        if (request.comments) {
          request.comments.forEach((comment) => {
            if (comment.id === commentId) {
              if (comment.replies) {
                comment.replies.push(reply);
              }
            }
          });
        }
      }
    });

    setFeedback({ ...feedback, productRequests: requestsCopy });
  };

  return {
    feedback,
    upvoteProductRequest,
    addComment,
    replyToComment,
  };
}
