import React from 'react';
import { render, screen } from '@testing-library/react';
import OMS1 from './OMS1';

test('renders learn react link', () => {
  render(<OMS1 />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
