import { useState } from 'react';
import type { ProductFeedback } from '../interfaces/productFeedback.interface';
import type {
  ProductRequest,
  Reply,
  ProductRequestCategory,
} from '../interfaces/productRequest.interface';
import type { User } from '../interfaces/user.interface';

export function useProductFeedback(data: ProductFeedback) {
  const [feedback, setFeedback] = useState<ProductFeedback>(data);

  const createProductRequest = (productRequest: ProductRequest): void => {
    const requestsCopy: ProductRequest[] = [...feedback.productRequests];
    requestsCopy.push(productRequest);
    setFeedback({ ...feedback, productRequests: requestsCopy });
  };

  const findProductRequest = (
    requestId: number,
  ): ProductRequest | undefined => {
    return feedback.productRequests.find((request) => request.id === requestId);
  };

  const deleteProductRequest = (requestId: number): void => {
    const requestsCopy: ProductRequest[] = [...feedback.productRequests];
    const filtered: ProductRequest[] = requestsCopy.filter(
      (request) => request.id !== requestId,
    );
    setFeedback({ ...feedback, productRequests: filtered });
  };

  /**
   * Increments a product request's `upvotes` by 1. If the current user has already
   * upvoted the request, decrement it by 1.
   * @param requestId The ID of the product request.
   */
  const upvoteProductRequest = (requestId: number): void => {
    let feedbackCopy: ProductFeedback = { ...feedback };
    let { currentUser, productRequests } = feedbackCopy;
    let userPreviouslyUpvoted: boolean;

    if (currentUser.upvotedRequests) {
      // Check if ID exists.
      userPreviouslyUpvoted = didUserPreviouslyUpvote(requestId, currentUser);

      if (userPreviouslyUpvoted) {
        currentUser.upvotedRequests = removeUpvoteRequestId(
          requestId,
          currentUser,
        );
        productRequests = changeUpvoteCount(requestId, productRequests, false);
      } else {
        currentUser.upvotedRequests.push(requestId);
        productRequests = changeUpvoteCount(requestId, productRequests, true);
      }
    } else {
      currentUser.upvotedRequests = [requestId];
      productRequests = changeUpvoteCount(requestId, productRequests, true);
    }

    setFeedback(feedbackCopy);
  };

  const changeUpvoteCount = (
    requestId: number,
    productRequests: ProductRequest[],
    shouldIncrement: boolean,
  ): ProductRequest[] => {
    return productRequests.map((request) => {
      if (request.id === requestId) {
        if (shouldIncrement) {
          request.upvotes++;
        } else {
          request.upvotes--;
        }
      }
      return request;
    });
  };

  /**
   * Searches for the product request's ID in the user's `upvotesRequests` array property.
   * If the property is falsy, return `undefined`. Otherwise, returns a filtered array of IDs.
   * @param id The ID of the product request.
   * @param user
   * @return Returns `undefined` if user does not have a `upvotesRequests` property.
   */
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

  /**
   * Pushes a `Comment` to a product request's `comments` array property. The `id` is
   * auto-generated based on the length of `comments`.
   * @param requestId Pass the `id` from the object of type `ProductRequest`.
   * @param comment
   * If the product request's `comments` property is falsy, initialize it with an empty
   * array and give its `id` a value of `1`. If the array has 1 or more comments, then
   * add the comment to the end the `comments` array and give its `id` a value of
   * `comments.length`.
   */
  const addComment = (
    requestId: number,
    comment: { content: string; user: User },
  ): void => {
    let requestsCopy: ProductRequest[] = [...feedback.productRequests];
    let commentId: number;

    requestsCopy.forEach((request) => {
      if (request.id === requestId) {
        if (request.comments) {
          commentId = request.comments.length + 1;
          request.comments.push({
            id: commentId,
            content: comment.content,
            user: comment.user,
          });
        } else {
          request.comments = [
            {
              id: 1,
              content: comment.content,
              user: comment.user,
            },
          ];
        }
      }
    });

    setFeedback({ ...feedback, productRequests: requestsCopy });
  };

  /**
   * Pushes a `Reply` object to the comment's `replies` array property.
   * @param requestId Pass the `id` from object of type `ProductRequest`.
   * @param commentId Pass the `id` from object of type `Comment`
   * @param reply
   *
   * If the comment has no replies, initialize it with a reply.
   */
  const replyToComment = (
    requestId: number,
    commentId: number,
    reply: Reply,
  ) => {
    const requestsCopy: ProductRequest[] = [...feedback.productRequests];

    requestsCopy.forEach((request) => {
      if (request.id === requestId) {
        if (request.comments) {
          request.comments.forEach((comment) => {
            if (comment.id === commentId) {
              if (comment.replies) {
                comment.replies.push(reply);
              } else {
                comment.replies = [reply];
              }
            }
          });
        }
      }
    });

    setFeedback({ ...feedback, productRequests: requestsCopy });
  };

  /**
   * Sorts product requests by upvote count.
   * @param sortByMost Pass in `true` to sort product requests by most upvotes.
   */
  const sortProductRequestsByUpvotes = (sortByMost: boolean): void => {
    let requestsCopy = [...feedback.productRequests];

    requestsCopy.sort((a, b) => {
      if (sortByMost) {
        return b.upvotes - a.upvotes;
      }
      return a.upvotes - b.upvotes;
    });

    setFeedback({ ...feedback, productRequests: requestsCopy });
  };

  /**
   * Sorts product requests by comment count. The number of replies a comment has
   * counts to the sum of comments.
   * @param sortByMost Pass in `true` to sort product requests by most comments.
   *
   * This function assumes that if `comments` is falsy, give it a length of 0.
   */
  const sortProductRequestsByCommentsCount = (sortByMost: boolean): void => {
    let requestsCopy: ProductRequest[] = [...feedback.productRequests];

    requestsCopy.sort((a, b) => {
      let aCommentsCount: number = 0;
      let bCommentsCount: number = 0;

      if (a.comments) aCommentsCount = getCommentCount(a);
      if (b.comments) bCommentsCount = getCommentCount(b);

      if (sortByMost) {
        return bCommentsCount - aCommentsCount;
      }

      return aCommentsCount - bCommentsCount;
    });

    setFeedback({ ...feedback, productRequests: requestsCopy });
  };

  /**
   * Counts the number of comments and replies a product request has.
   * @param productRequest
   */
  const getCommentCount = (productRequest: ProductRequest): number => {
    let commentCount: number = 0;

    if (productRequest.comments) {
      commentCount = productRequest.comments.length;
      productRequest.comments.forEach((comment) => {
        if (comment.replies) commentCount += comment.replies.length;
      });
    }

    return commentCount;
  };

  const filterByCategory = (category: ProductRequestCategory): void => {
    let requestsCopy: ProductRequest[] = [...feedback.productRequests];
    let filtered: ProductRequest[] = requestsCopy.filter(
      (request) => request.category === category,
    );

    setFeedback({ ...feedback, productRequests: filtered });
  };

  return {
    feedback,
    upvoteProductRequest,
    addComment,
    replyToComment,
    createProductRequest,
    deleteProductRequest,
    findProductRequest,
    sortProductRequestsByUpvotes,
    sortProductRequestsByCommentsCount,
    filterByCategory,
  };
}
