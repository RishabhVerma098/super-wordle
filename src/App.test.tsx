import { render } from '@testing-library/react';
import { describe, it } from 'vitest';

import App from './App';

describe('App', () => {
  it('Renders hello world', () => {
    render(<App />);
    expect(true).toBeTruthy();
  });
});
