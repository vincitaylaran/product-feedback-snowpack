import React from 'react';
import Card from '../Card';
import PillButton from '../PillButton';

import styles from './FilterBox.module.scss';

type Filter = [string, boolean];
const filters: Filter[] = [
  ['All', true],
  ['UI', false],
  ['UX', false],
  ['Bug', false],
  ['Enhancement', false],
  ['Feature', false],
];

interface FilterBoxProps {}
function FilterBox({}: FilterBoxProps) {
  return (
    <Card className={styles.filter_box}>
      {filters.map(([text, active]) => (
        <PillButton key={text} text={text} active={active} />
      ))}
    </Card>
  );
}

export default FilterBox;
