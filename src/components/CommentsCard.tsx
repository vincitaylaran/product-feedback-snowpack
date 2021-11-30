import React from 'react';
import Card from './Card';
import type { Comment } from '../interfaces/productRequest.interface';
import styles from '../scss/CommentsCard.module.scss';

interface CommentsCardProps {
  comments: Comment[];
}

function CommentsCard({ comments }: CommentsCardProps) {
  return (
    <Card className={styles.commentsCard}>
      <h3 className={styles.commentsCard__count}>{comments.length} Comments</h3>
      <div className={styles.commentsCard__comments}>
        {comments.map((comment) => (
          <div className={styles.comment}>
            <div className={styles.main}>
              <div className={styles.heading}>
                <img className={styles.profilePic} />
                <div className={styles.userInfo}></div>
                <button className={styles.replyBtn}>Reply</button>
              </div>
              <div className={styles.content}>{comment.content}</div>
            </div>

            {comment.replies && (
              <div className={styles.replies}>
                {comment.replies.map((reply) => (
                  <div className={styles.reply}>{reply.content}</div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
}

export default CommentsCard;
