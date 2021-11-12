import React, { useState } from 'react';
import Card from './Card';

import SuggestionIcon from '../../public/assets/suggestions/icon-suggestions.svg';
import styles from '../scss/OptionBanner.module.scss';
import _ from 'lodash';

interface OptionBannerProps {
  suggestionLength: number;
}

function OptionBanner({ suggestionLength }: OptionBannerProps) {
  return (
    <Card className={styles.optionBanner}>
      <img
        className={styles.suggestionIcon}
        src={SuggestionIcon}
        alt="Suggestion icon"
      />
      <h3 className={styles.suggestionCount}>
        {suggestionLength} Suggestion
        {suggestionLength == 1 ? '' : 's'}
      </h3>
      <OptionsDropdown />
      <AddFeedbackButton />
    </Card>
  );
}

interface OptionsDropdownProps {}

type DropdownOptions =
  | 'most-upvotes'
  | 'least-upvotes'
  | 'most-comments'
  | 'least-comments';

// TODO: make this more generic so that other components can have their own options.
// TODO: should have hover state.
function OptionsDropdown({}: OptionsDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const options: DropdownOptions[] = [
    'most-upvotes',
    'least-upvotes',
    'most-comments',
    'least-comments',
  ];

  return (
    <div className={styles.dropdownContainer}>
      <label htmlFor="sort-options">Sort by : </label>
      <select
        name="sort-options"
        className={`${styles.optionsDropdown} ${
          isOpen ? styles.arrowUp : styles.arrowDown
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {options.map((option) => {
          let optionCapitalized = _.replace(option, '-', ' ');

          return <option value={option}>{optionCapitalized}</option>;
        })}
      </select>
    </div>
  );
}

interface AddFeedbackButtonProps {}

function AddFeedbackButton({}: AddFeedbackButtonProps) {
  return (
    <button className={styles.addFeedbackButton}>
      <span>+ Add Feedback</span>
    </button>
  );
}

export default OptionBanner;
