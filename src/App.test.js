import { render, screen, cleanup } from '@testing-library/react';
import App from './App';

afterEach(cleanup);

it('renders the header on correctly', () => {
  render(<App />);
  expect(screen.getByTestId("card-header")).toBeInTheDocument();  
});

it('renders the correct amount of images', () => {
  render(<App />);
  const images = screen.queryAllByRole('img');
  expect(images.length).toBe(11);
});
