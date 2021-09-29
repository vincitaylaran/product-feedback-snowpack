import React from 'react';
import { useProductFeedback } from './hooks/useProductFeedback';
import data from './data.json';

interface AppProps {}

function App({}: AppProps) {
  const { feedback, upvoteProductRequest, addComment, replyToComment } =
    useProductFeedback(data);

  // console.log(feedback.productRequests);

  feedback.productRequests.forEach((r) => {
    if (r.comments) {
      r.comments.forEach((c) => {
        if (c.replies) {
          console.log(`Request ID: ${r.id}`);
        }
      });
    }
  });

  console.log(feedback.productRequests);

  return (
    <div>
      <button
        onClick={() =>
          replyToComment(2, 4, {
            content: 'hello',
            replyingTo: 'dude',
            user: feedback.currentUser,
          })
        }
      >
        Reply to comment
      </button>
      <div>
        {feedback.productRequests.map((r) => {
          return (
            <div style={{ marginBottom: '30px' }}>
              <strong>
                {r.id}. {r.title} (upvotes: <i>{r.upvotes}</i>)
              </strong>
              <ul>
                {r.comments &&
                  r.comments.map((c) => {
                    return (
                      <>
                        <li>- {c.content}</li>
                        <ul>
                          {c.replies &&
                            c.replies.map((rp) => (
                              <li style={{ marginLeft: '25px' }}>
                                - @{rp.user.username} {rp.content}
                              </li>
                            ))}
                        </ul>
                      </>
                    );
                  })}
              </ul>
              <button
                style={{ marginRight: '10px' }}
                onClick={() =>
                  addComment(r.id, {
                    content: 'LOL',
                    user: feedback.currentUser,
                  })
                }
              >
                Add comment
              </button>
              <button onClick={() => upvoteProductRequest(r.id)}>Upvote</button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
