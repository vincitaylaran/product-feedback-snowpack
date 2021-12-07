import React, { useState } from 'react';
import Card from './Card';
import styles from '../scss/AddComment.module.scss';
import Button from './Button';
import InputText from './InputText';

function AddComment() {
  const maxCharCount: number = 250;
  const [charCount, setCharCount] = useState<number>(maxCharCount);
  const [text, setText] = useState<string>('');

  const handleTextChange = (value: string): void => {
    let currentCharCount: number = maxCharCount - value.length;

    if (currentCharCount >= 0) {
      setText(value);
      setCharCount(currentCharCount);
    }
  };

  const postComment = (): void => {
    console.log(text);
  };

  return (
    <Card className={styles.addComment}>
      <h3 className={styles.addComment__heading}>Add Comment</h3>
      <InputText
        placeholder="Type your comment here"
        value={text}
        onValueChange={handleTextChange}
      />
      <div className={styles.addComment__footer}>
        <p className={styles.charCount}>{charCount} Characters left</p>
        <Button onClick={postComment}>Post Comment</Button>
      </div>
    </Card>
  );
}

export default AddComment;
