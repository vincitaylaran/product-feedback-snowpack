import React from 'react';
import Card from '../Card';
import PillButton from '../PillButton';

import SuggestionIcon from '../../../public/assets/suggestions/icon-suggestions.svg';
import PlusIcon from '../../../public/assets/shared/icon-plus.svg';
import styles from './OptionBanner.module.scss';

enum SortOrder {
  MostUpvotes = 'Most Upvotes',
  LeastUpvotes = 'Least Upvotes',
  Status = 'Current Status',
}

interface OptionBannerProps {
  suggestionLength: number;
  initialSortOrder?: SortOrder;
}
function OptionBanner({ suggestionLength }: OptionBannerProps) {
  return (
    <Card className={styles.optionbanner}>
      <img src={SuggestionIcon} />
      <h3 className={styles.suggestion_count}>
        {suggestionLength > 0 ? suggestionLength : 0} Suggestion
        {suggestionLength == 1 ? '' : 's'}
      </h3>
      <OptionsDropdown />
      <AddFeedbackButton />
    </Card>
  );
}

interface OptionsDropdownProps {}
function OptionsDropdown({}: OptionsDropdownProps) {
  return (
    <div className={styles.dropdown__container}>
      <span>Sort by :</span>
      <select name="sort_options" className={styles.dropdown__select}>
        {Object.entries(SortOrder).map(([key, value]) => (
          <option value={key}>{value}</option>
        ))}
      </select>
      <div className={styles.dropdown__downarrow}></div>
    </div>
  );
}

interface AddFeedbackButtonProps {}
function AddFeedbackButton({}: AddFeedbackButtonProps) {
  return (
    <button className={styles.addFeedbackButton}>
      <img src={PlusIcon} />
      Add Feedback
    </button>
  );
}

export default OptionBanner;
