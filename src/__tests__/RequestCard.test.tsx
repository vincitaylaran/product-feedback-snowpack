import React from 'react';

// Testing methods
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import { expect } from 'chai';

// The component to test
import RequestCard from '../components/content/RequestCard';

import data from '../data.json';

describe('sample test', () => {
  it('returns true', () => {
    const num = 1;
    expect(num === 1);
  });
});
