import React from 'react';
import Card from './Card';
import type { Comment } from '../interfaces/productRequest.interface';
import type { User } from '../interfaces/user.interface';
import styles from '../scss/CommentsCard.module.scss';
import { v4 as uuidv4 } from 'uuid';

interface CommentsCardProps {
  comments: Comment[] | undefined;
}

function CommentsCard({ comments }: CommentsCardProps) {
  // Temporary solution to fetching user's profile pic.
  const getUserImg = (user: User) => {
    const [firstName] = user.name.split(' ');
    return `../assets/user-images/image-${firstName.toLowerCase()}.jpg`;
  };

  const getCommentCount = () => {
    if (comments) {
      let commentsCount = comments.length;
      let repliesCount = 0;

      comments.forEach((comment) => {
        if (comment.replies) {
          repliesCount += comment.replies.length;
        }
      });

      return commentsCount + repliesCount;
    }
  };

  return (
    <>
      {comments ? (
        <Card className={styles.commentsCard}>
          <h3 className={styles.commentsCard__count}>
            {getCommentCount()} Comments
          </h3>
          <div className={styles.commentsCard__comments}>
            {comments.map((comment, index) => (
              <div className={styles.comment} key={uuidv4()}>
                <div className={styles.main}>
                  <div className={styles.heading}>
                    <img
                      className={styles.profilePic}
                      src={getUserImg(comment.user)}
                      alt="Profile picture"
                    />
                    <div className={styles.userInfo}>
                      <div className={styles.name}>{comment.user.name}</div>
                      <div className={styles.username}>
                        @{comment.user.username}
                      </div>
                    </div>
                    <button className={styles.replyBtn}>Reply</button>
                  </div>
                  <p className={styles.content}>{comment.content}</p>
                </div>

                {comment.replies && (
                  <div className={styles.replies}>
                    {comment.replies.map((reply) => (
                      <p className={styles.reply} key={uuidv4()}>
                        {reply.content}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      ) : (
        <h1>This request does not have comments</h1>
      )}
    </>
  );
}

export default CommentsCard;
