import React, { useState } from 'react';
import Card from './Card';
import ArrowIcon from './ArrowIcon';

import SuggestionIcon from '../../public/assets/suggestions/icon-suggestions.svg';
import styles from '../scss/OptionBanner.module.scss';
import _ from 'lodash';
import Button from './Button';
import { Link } from 'react-router-dom';

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
        subtitle="Sort by"
        options={[
          'Most Upvotes',
          'Least Upvotes',
          'Most Comments',
          'Least Comments',
        ]}
        theme="dark"
      />
      <Link to="/new-feedback" className={styles.addFeedbackButton}>
        <Button>+ Add Feedback</Button>
      </Link>
    </Card>
  );
}

interface OptionsDropdownProps {
  subtitle?: string;
  options: string[];
  theme: 'light' | 'dark';
  className?: string;
}

// TODO: make this reusable.
export function OptionsDropdown({
  subtitle,
  options,
  theme,
  className,
}: OptionsDropdownProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedOption, setSelectedOption] = useState<string>(options[0]);

  return (
    <div
      className={`${styles.dropdownContainer} ${
        theme === 'light' ? styles.light : styles.dark
      } ${isOpen && styles.open}  ${className}`}
      onClick={() => setIsOpen(!isOpen)}
    >
      <label className={`${styles.labels}`}>
        {subtitle && (
          <>
            <span className={styles.label}>{subtitle}</span>
            <span className={styles.colon}>:</span>
          </>
        )}

        <span className={styles.selectedOption}>{selectedOption}</span>
        <ArrowIcon
          color={theme === 'light' ? '#4661E6' : '#fff'}
          direction={isOpen ? 'up' : 'down'}
        />
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

// TODO: remove this and replace all of its implementations with the <Button /> component.
export function AddFeedbackButton() {
  return (
    <button className={styles.addFeedbackButton}>
      <span>+ </span>
      <span className={styles.addFeedbackButton__feedback}>Add </span>
      <span>Feedback</span>
    </button>
  );
}

export default OptionBanner;
