import React from 'react';

import type {
  ProductRequest,
  ProductRequestCategory,
} from '../../interfaces/productRequest.interface';
import Card from '../Card';
import PillButton from '../PillButton';
import ArrowUp from '../../../public/assets/shared/icon-arrow-up.svg';
import CommentIcon from '../../../public/assets/shared/icon-comments.svg';

import styles from './RequestCard.module.scss';

interface RequestCardProps {
  request: ProductRequest;
}

function RequestCard({ request }: RequestCardProps) {
  // Returns the number of comments in a product request, including replies.
  const getCommentCount = (): number => {
    let commentCount: number = 0;

    if (request.comments) {
      commentCount = request.comments.length;
      request.comments.forEach((comment) => {
        if (comment.replies) {
          commentCount += comment.replies.length;
        }
      });
    }

    return commentCount;
  };

  return (
    <Card className={styles.requestCard}>
      <UpvoteButton upvotes={request.upvotes} />
      <RequestDetails
        title={request.title}
        description={request.description}
        category={request.category}
      />
      <Comments commentCount={getCommentCount()} />
    </Card>
  );
}

interface UpvoteButtonProps {
  upvotes: number;
}

function UpvoteButton({ upvotes }: UpvoteButtonProps) {
  return (
    <div className={styles.upvotes}>
      <img src={ArrowUp} />
      {upvotes}
    </div>
  );
}

interface CommentsProps {
  commentCount: number;
}

function Comments({ commentCount }: CommentsProps) {
  return (
    <div className={styles.comments}>
      <img src={CommentIcon} />{' '}
      <span className={commentCount === 0 ? styles.zero : ''}>
        {commentCount}
      </span>
    </div>
  );
}

interface RequestDetailsProps {
  title: string;
  description: string;
  category: string;
}

function RequestDetails({ title, description, category }: RequestDetailsProps) {
  return (
    <div className={styles.requestDetails}>
      <h3 className={styles.requestDetails__title}>{title}</h3>
      <p className={styles.requestDetails__description}>{description}</p>
      <PillButton
        onClick={() => null}
        text={formatCategory(category)}
        active={false}
      />
    </div>
  );
}

function formatCategory(category: string) {
  return category[0].toUpperCase() + category.substring(1);
}

export default RequestCard;
