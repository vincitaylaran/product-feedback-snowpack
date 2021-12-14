import React, { useState } from 'react';
import Card from './Card';
import type { Comment } from '../interfaces/productRequest.interface';
import type { User } from '../interfaces/user.interface';
import styles from '../scss/CommentsCard.module.scss';
import { v4 as uuidv4 } from 'uuid';
import Button from './Button';

interface CommentsCardProps {
  comments: Comment[] | undefined;
}

function CommentsCard({ comments }: CommentsCardProps) {
  const [toggledReplyId, setToggledReplyId] = useState<number | string>();

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

  const toggleReplyTxtArea = (commentId: number | string): void => {
    if (!toggledReplyId) {
      setToggledReplyId(commentId);
    } else {
      setToggledReplyId(undefined);
    }
  };

  // TODO: create reply thread line for tablet
  return (
    <>
      {comments ? (
        <Card className={styles.commentsCard}>
          <h3 className={styles.commentsCard__count}>
            {getCommentCount()} Comments
          </h3>
          <div className={styles.commentsCard__comments}>
            {comments.map((comment: Comment) => (
              <div className={styles.comment} key={comment.id}>
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
                    <button
                      className={styles.replyBtn}
                      onClick={() => toggleReplyTxtArea(comment.id)}
                    >
                      Reply
                    </button>
                  </div>
                  <p className={styles.content}>{comment.content}</p>
                  <ReplyArea isVisible={toggledReplyId === comment.id} />
                </div>

                {comment.replies && (
                  <div className={styles.replies}>
                    {comment.replies.map((reply) => {
                      if (!reply.id) reply.id = uuidv4();

                      return (
                        <div
                          className={`${styles.comment} ${styles.reply}`}
                          key={uuidv4()}
                        >
                          <div className={styles.main}>
                            <div className={styles.heading}>
                              <img
                                className={styles.profilePic}
                                src={getUserImg(reply.user)}
                                alt="Profile picture"
                              />
                              <div className={styles.userInfo}>
                                <div className={styles.name}>
                                  {reply.user.name}
                                </div>
                                <div className={styles.username}>
                                  @{reply.user.username}
                                </div>
                              </div>
                              {/* TODO: show textarea on toggling this button. */}
                              <button
                                className={styles.replyBtn}
                                onClick={() => toggleReplyTxtArea(reply.id)}
                              >
                                Reply
                              </button>
                            </div>
                            <p className={styles.content}>
                              <span className={styles.replyingTo}>
                                @{reply.replyingTo}{' '}
                              </span>
                              <span>{reply.content}</span>
                            </p>

                            <ReplyArea
                              isVisible={toggledReplyId === reply.id}
                            />
                          </div>
                        </div>
                      );
                    })}
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

interface ReplyAreaProps {
  isVisible?: boolean;
}

function ReplyArea({ isVisible = false }: ReplyAreaProps) {
  return (
    <div className={`${isVisible ? styles.replyTxtArea : styles.hidden}`}>
      <textarea title="reply" />
      <Button>Post Reply</Button>
    </div>
  );
}

export default CommentsCard;
