import React, { useState } from 'react';
import Card from './Card';
import ArrowIcon from './ArrowIcon';

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
      <OptionsDropdown
        label="Sort by"
        options={[
          'Most Upvotes',
          'Least Upvotes',
          'Most Comments',
          'Least Comments',
        ]}
      />
      <AddFeedbackButton />
    </Card>
  );
}

interface OptionsDropdownProps {
  label: string;
  options: string[];
}

function OptionsDropdown({ label, options }: OptionsDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  return (
    <div
      className={styles.dropdownContainer}
      onClick={() => setIsOpen(!isOpen)}
    >
      <label>
        <span className={styles.label}>{label}</span>
        <span className={styles.colon}>:</span>
        <span className={styles.selectedOption}>{selectedOption}</span>
        <ArrowIcon color="#fff" direction={isOpen ? 'up' : 'down'} />
      </label>

      <div
        className={`${styles.options} ${isOpen ? styles.open : styles.closed}`}
      >
        {options.map((value, i) => (
          <div
            className={styles.option}
            onClick={() => setSelectedOption(value)}
            key={i + value}
          >
            <span>{value}</span>

            {value === selectedOption && (
              <img
                className={styles.checkmark}
                src="../../assets/shared/icon-check.svg"
                alt="Checkmark"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

interface AddFeedbackButtonProps {}

export function AddFeedbackButton({}: AddFeedbackButtonProps) {
  return (
    <button className={styles.addFeedbackButton}>
      <span>+ </span>
      <span className={styles.addFeedbackButton__feedback}>Add </span>
      <span>Feedback</span>
    </button>
  );
}

export default OptionBanner;
