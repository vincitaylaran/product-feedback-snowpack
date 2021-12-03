import React from 'react';
import ArrowIcon from './ArrowIcon';

import type { ProductRequest } from '../interfaces/productRequest.interface';
import Card from './Card';
import PillButton from './PillButton';
import CommentIcon from '../../public/assets/shared/icon-comments.svg';
import { Link } from 'react-router-dom';

import styles from '../scss/RequestCard.module.scss';

interface RequestCardProps {
  request: ProductRequest | undefined;
  upvoteProductRequest: (requestId: number) => void;
}

function RequestCard({ request, upvoteProductRequest }: RequestCardProps) {
  return (
    <Card className={styles.requestCard}>
      {request ? (
        <>
          <UpvoteButton
            upvotes={request.upvotes}
            upvoteProductRequest={() => upvoteProductRequest(request.id)}
          />
          <RequestDetails
            title={request.title}
            description={request.description}
            category={request.category}
          />
          <Comments
            commentCount={(request.comments || []).length}
            requestId={request.id}
          />
        </>
      ) : (
        <h2>Request does not exist</h2>
      )}
    </Card>
  );
}

interface UpvoteButtonProps {
  upvotes: number;
  upvoteProductRequest: () => void;
}

function UpvoteButton({ upvotes, upvoteProductRequest }: UpvoteButtonProps) {
  return (
    <button
      className={styles.upvotes}
      onClick={upvoteProductRequest}
      data-testid="upvote-btn"
    >
      <ArrowIcon color="#4661E6" direction="up" />
      {/* <img
        className={styles.upvotes__arrow}
        src={ArrowUp}
        alt="Arrow pointing up"
      /> */}
      <span className={styles.upvotes__count}>{upvotes}</span>
    </button>
  );
}

interface CommentsProps {
  commentCount: number;
  requestId: number;
}

function Comments({ commentCount, requestId }: CommentsProps) {
  return (
    <div className={styles.comments}>
      <Link className={styles.comments__link} to={`/comments/${requestId}`}>
        <img src={CommentIcon} alt="Icon of comment bubble" />{' '}
        <span
          data-testid="request-commentCount"
          className={`${styles.count} ${commentCount === 0 && styles.zero}`}
        >
          {commentCount}
        </span>
      </Link>
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
