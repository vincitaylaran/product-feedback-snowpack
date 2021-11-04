import React, { useState } from 'react';
import {
  ProductRequestCategory,
  ProductRequestCategoryFilters,
  ProductRequest,
} from '../interfaces/productRequest.interface';
import Card from './Card';
import PillButton from './PillButton';

import styles from './FilterBox.module.scss';

type Filter = [string, ProductRequestCategoryFilters];
const filters: Filter[] = [
  ['All', 'all'],
  ['Bug', ProductRequestCategory.Bug],
  ['Enhancement', ProductRequestCategory.Enhancement],
  ['Feature', ProductRequestCategory.Feature],
];

interface FilterBoxProps {
  currentFilter: ProductRequestCategoryFilters;
  filterByCategory: (categoryFilter: ProductRequestCategoryFilters) => void;
}
function FilterBox({ currentFilter, filterByCategory }: FilterBoxProps) {
  return (
    <Card className={styles.filter_box}>
      {filters.map(([text, categoryFilter]) => (
        <PillButton
          clickable
          key={categoryFilter}
          text={text}
          active={currentFilter == categoryFilter}
          onClick={() => filterByCategory(categoryFilter)}
        />
      ))}
    </Card>
  );
}

export default FilterBox;
