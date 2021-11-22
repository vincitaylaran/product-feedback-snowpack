import React from 'react';
import Card from './Card';
import { AddFeedbackButton } from './OptionBanner';
import styles from '../scss/EmptyFeedback.module.scss';

function EmptyFeedback() {
  return (
    <Card className={styles.noFeedback}>
      <div className={styles.noFeedback__content}>
        <img
          className={styles.noFeedback__img}
          src="../assets/suggestions/illustration-empty.svg"
          alt="Illustration empty"
        />
        <h2 className={styles.noFeedback__title}>There is no feedback yet.</h2>
        <p className={styles.noFeedback__description}>
          <span>Got a suggestion?</span>{' '}
          <span>Found a bug that needs to be squashed?</span>{' '}
          <span>We love hearing about new ideas to improve our app.</span>
        </p>
        <AddFeedbackButton />
      </div>
    </Card>
  );
}

export default EmptyFeedback;
