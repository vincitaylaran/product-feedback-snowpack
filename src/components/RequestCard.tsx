import React from 'react';

import type {
  ProductRequest,
  ProductRequestCategory,
} from '../interfaces/productRequest.interface';
import Card from './Card';
import PillButton from './PillButton';
import ArrowUp from '../../public/assets/shared/icon-arrow-up.svg';
import CommentIcon from '../../public/assets/shared/icon-comments.svg';

import styles from '../scss/RequestCard.module.scss';

interface RequestCardProps {
  request: ProductRequest;
  upvoteProductRequest: (requestId: number) => void;
}

function RequestCard({ request, upvoteProductRequest }: RequestCardProps) {
  return (
    <Card className={styles.requestCard}>
      <UpvoteButton
        upvotes={request.upvotes.length}
        upvoteProductRequest={() => upvoteProductRequest(request.id)}
      />
      <RequestDetails
        title={request.title}
        description={request.description}
        category={request.category}
      />
      <Comments commentCount={(request.comments || []).length} />
    </Card>
  );
}

interface UpvoteButtonProps {
  upvotes: number;
  upvoteProductRequest: () => void;
}

// TODO: make color of arrow modular.
function UpvoteButton({ upvotes, upvoteProductRequest }: UpvoteButtonProps) {
  return (
    <button
      className={styles.upvotes}
      onClick={upvoteProductRequest}
      data-testid="upvote-btn"
    >
      <img
        className={styles.upvotes__arrow}
        src={ArrowUp}
        alt="Arrow pointing up"
      />
      <span className={styles.upvotes__count}>{upvotes}</span>
    </button>
  );
}

interface CommentsProps {
  commentCount: number;
}

function Comments({ commentCount }: CommentsProps) {
  return (
    <div className={styles.comments}>
      <img src={CommentIcon} alt="Icon of comment bubble" />{' '}
      <span
        data-testid="request-commentCount"
        className={`${styles.comments__count} ${
          commentCount === 0 && styles.zero
        }`}
      >
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
      <h3 data-testid="request-title" className={styles.requestDetails__title}>
        {title}
      </h3>
      <p
        data-testid="request-description"
        className={styles.requestDetails__description}
      >
        {description}
      </p>
      <PillButton
        onClick={() => null}
        text={formatCategory(category)}
        active={false}
        clickable={false}
      />
    </div>
  );
}

function formatCategory(category: string) {
  return category[0].toUpperCase() + category.substring(1);
}

export default RequestCard;
