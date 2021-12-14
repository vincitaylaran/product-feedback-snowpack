import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import Card from '../components/Card';
import Button from '../components/Button';
import GoBackButton from '../components/GoBackButton';
import PageLayout, { PageNav } from '../components/PageLayout';
import styles from '../scss/NewFeedback.module.scss';
import { OptionsDropdown } from '../components/OptionBanner';
import Dropdown from '../components/Dropdown';

const NewFeedback = () => {
  return (
    <PageLayout>
      <PageNav>
        <GoBackButton />
      </PageNav>
      <Card
        className={styles.newFeedbackCard}
        icon="./assets/shared/icon-new-feedback.svg"
      >
        <h1 className={styles.newFeedbackCard__title}>Create New Feedback</h1>
        <InputArea
          title="Feedback Title"
          subtitle="Add short, descriptive title headline"
          type="dropdown"
        />
      </Card>
    </PageLayout>
  );
};

interface InputAreaProps {
  title: string;
  subtitle: string;
  type: 'text' | 'dropdown' | 'textarea';
}

function InputArea({ title, subtitle, type }: InputAreaProps) {
  return (
    <div className={styles.newFeedbackCard__inputField}>
      <h3 className={styles.inputTitle}>{title}</h3>
      <p className={styles.inputSubtitle}>{subtitle}</p>
      {/* <input type="text" title="title" /> */}
      {type === 'text' && <input type="text" title="text" />}
      {type === 'textarea' && <textarea title="text area" />}
      {type === 'dropdown' && (
        <OptionsDropdown
          theme="light"
          options={['Feature', 'Enhancement', 'Bug']}
          className={styles.inputDropdown}
        />
      )}
      {/* {type === 'dropdown' && <Dropdown />} */}
    </div>
  );
}

export default NewFeedback;
