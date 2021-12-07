import React from 'react';
import Card from './Card';
import styles from '../scss/AddComment.module.scss';
import Button from './Button';
import InputText from './InputText';

function AddComment() {
  return (
    <Card className={styles.addComment}>
      <h3 className={styles.heading}>Add Comment</h3>
      <InputText placeholder="Type your comment here" />
      {/* <div className={styles.footer}>
        <div>Character count</div>
        <Button>Post Comment</Button>
      </div> */}
    </Card>
  );
}

export default AddComment;
