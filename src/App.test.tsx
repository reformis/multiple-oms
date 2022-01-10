import React from 'react';
import { render, screen } from '@testing-library/react';
import BBAIM from './routes/BBAIM';

test('renders learn react link', () => {
  render(<BBAIM />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

