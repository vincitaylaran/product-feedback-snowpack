import React from 'react';
import { render, RenderResult, screen } from '@testing-library/react';
import { expect } from 'chai';
import RequestCard from '../components/content/RequestCard';
import type { ProductRequest } from 'src/interfaces/productRequest.interface';

describe('Request Card', () => {
  let sampleRequest: ProductRequest;
  let sampleFunc: (requestId: number) => void;
  let component: RenderResult;

  beforeEach(() => {
    sampleRequest = {
      id: 0,
      title: 'Downvote a request',
      category: 'feature',
      status: 'planned',
      upvotes: 10,
      description: 'It would be nice to have a downvote feature.',
      comments: [
        {
          id: 0,
          content: 'Yo',
          user: { image: '', name: 'User', username: 'User name' },
        },
      ],
    };

    sampleFunc = (requestId: number) => undefined;

    component = render(
      <RequestCard request={sampleRequest} upvoteProductRequest={sampleFunc} />,
    );
  });

  it('should contain the correct upvote count', () => {
    const upvoteBtn = component.getByTestId('upvote-btn');

    const upvoteCount = Number(upvoteBtn.textContent);

    expect(upvoteCount).to.equal(sampleRequest.upvotes);
  });

  it('should contain the correct title', () => {
    const { textContent } = component.getByTestId('request-title');

    expect(textContent).to.equal(sampleRequest.title);
  });

  it('should contain the correct description', () => {
    const { textContent } = component.getByTestId('request-description');

    expect(textContent).to.equal(sampleRequest.description);
  });

  it('should contain the correct category', () => {
    const { textContent } = component.getByTestId('request-category');

    const category = textContent?.toLowerCase();

    expect(category).to.equal(sampleRequest.category);
  });

  it('should contain the correct comment count', () => {
    const { textContent } = component.getByTestId('request-commentCount');
    const commentCount = Number(textContent);

    if (!sampleRequest.comments || sampleRequest.comments.length === 0) {
      expect(commentCount).to.equal(0);
    } else {
      expect(commentCount).to.equal(sampleRequest.comments.length);
    }
  });
});
