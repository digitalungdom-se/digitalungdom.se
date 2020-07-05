import { render, screen } from '@testing-library/react';

import App from './App';
import React from 'react';

test('renders copyright Digital Ungdom', () => {
  render(<App />);
  const copyright = screen.getByText(/Copyright © Digital Ungdom/i);
  expect(copyright).toBeInTheDocument();
});
